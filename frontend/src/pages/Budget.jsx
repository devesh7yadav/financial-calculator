import { useState } from "react";

function Budget() {

    const [formData, setFormData] = useState({
        "income": "",
    });
    const [expenses, setExpenses] = useState([
        { name: "", amount: "" }
    ]);

    const [result, setResult] = useState(null);

    //Add an expense
    const addExpense = () => {
        setExpenses(prev => [
            ...prev,
            { name: "", amount: "" }
        ]);
    };

    //Remove an expense
    const removeExpense = (index) => {
        setExpenses(prev => prev.filter((_, i) => i !== index));
    }

    //Handle an income change
    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    //Handle an expense change
    const handleExpenseChange = (index, field, value) => {
        const updated = [...expenses];
        updated[index][field] = value;
        setExpenses(updated);
    }

    //Sends to backend, handles the submit
    const handleSubmit = async (e) => {
        e.preventDefault();

        //Makes sure all fields are full
        const hasEmptyExpense = expenses.some(e => e.amount === "");
        if (formData.income === "" || hasEmptyExpense){
            setResult("Missing fields");
            return;
        }

        const response = await fetch("http://localhost:5000/api/budget", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            income: Number(formData.income),
            expenses: expenses.map(e => ({
                name: e.name,
                amount: Number(e.amount)
            }))
        }),
        });

        const data = await response.json();

        if(!response.ok) {
            setResult(data.message);
            return;
        }

        setResult(Number(data.amount).toFixed(2));
    };

    //Resets all the fields
    const handleReset = () => {
        setFormData({income: ""})
        setExpenses([{ name: "", amount: "" }]);
        setResult(null);
    } 

    //Output
    let output;
    if (result === null){
        output = "--";
    } else if (!isNaN(result)){
        output = `$${result}`;
    } else{
        output = result;
    }

    //Styling
    const labelDesign = "w-48 shrink-0 font-bold text-[#13315c]";
    const inputDesign = "outline-1 w-full border p-2 rounded font-semibold text-[#13315c]";
    const alignBoxes = "flex items-center gap-4";
    
    //Displays the form
    return (
        <div>
            <h1 className="flex justify-center font-semibold text-2xl text-[#0b2545] my-6">Budget Calculator</h1>

            <div className="flex max-w-5xl px-24 gap-x-12 items-start">
                <form className="flex flex-col gap-6 flex-1" onSubmit={handleSubmit} onReset={handleReset}>
                    <div className={alignBoxes}>
                        <label htmlFor="income" className={labelDesign}>Income ($)</label>
                        <input
                            className={inputDesign}
                            type="number"
                            id="income"
                            name="income"
                            value={formData.income}
                            onChange={handleChange}
                        />
                    </div>


                    {/*Adds expense textboxes */}
                    {expenses.map((expense, index) => (
                        <div key={index} className="flex gap-x-6">
                            <input
                            className="outline-1 border p-2 rounded font-semibold text-[#13315c]"
                            placeholder="Expense name"
                            value={expense.name}
                            onChange={(e) => handleExpenseChange(index, "name", e.target.value)}
                            />

                            <input
                            className="outline-1 border p-2 rounded font-semibold text-[#13315c]"
                            type="number"
                            placeholder="Amount"
                            value={expense.amount}
                            onChange={(e) => handleExpenseChange(index, "amount", e.target.value)}
                            />

                            <button type="button" className="border p-1 rounded font-semibold text-[#a11010] bg-[#da9a10] hover:text-[#000000]" onClick={() => removeExpense(index)}>Remove</button>
                        </div>
                    ))}

                    <button type="button" className="border p-1 rounded font-bold text-[#0b2545] bg-[#2eb613] hover:text-[#eef4ed]" onClick={addExpense}>Add Expense</button>

                    <button type="submit" className="border p-3 rounded font-bold text-[#0b2545] bg-[#5f92cc] hover:text-[#8da9c4]">Submit</button>
                    <button type="reset" className="border p-3 rounded font-bold text-[#a11010] bg-[#5f92cc] hover:text-[#8da9c4]">Clear</button>
                </form>

                <div className="min-w-[220px] border p-4 rounded">
                    <h2 className="text-sm text-[#134074]">Amount Left:</h2>
                    <div className="text-xl font-semibold text-[#13315c] mt-2">{output}</div>
                </div>
            </div>
        </div>
    );
}

export default Budget;