import { useState } from "react";
import Navbar from "../components/Navbar";
import Output from "../components/Output";
import { labelDesign, inputDesign, alignBoxes, title, submitButtonDesign, clearButtonDesign, buttonFormat, outputCard, inputCard } from "../Styles";
import BudgetChart from "../charts/BudgetChart";

function Budget() {

    //Hooks
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
        setResult(null);
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

    //Displays the form
    return (
        <div className="grid place-items-center">
            <title>Budget Calculator</title>

            <Navbar/>
            <h1 className={title}>Budget Calculator</h1>

            <div className="grid grid-cols-1 gap-y-6 lg:grid-cols-2 md:gap-16 items-start mx-4">
                <form className={inputCard} onSubmit={handleSubmit} onReset={handleReset}>
                    <div className={alignBoxes}>
                        <label className={labelDesign}>Income ($)</label>
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
                        <div key={index} className="flex gap-x-6 mx-4">
                            <input
                            className={inputDesign}
                            placeholder="Expense name"
                            value={expense.name}
                            onChange={(e) => handleExpenseChange(index, "name", e.target.value)}
                            />

                            <input
                            className={inputDesign}
                            type="number"
                            placeholder="Amount"
                            value={expense.amount}
                            onChange={(e) => handleExpenseChange(index, "amount", e.target.value)}
                            />

                            <button type="button" className="hover:text-[#a11010]" onClick={() => removeExpense(index)}>X</button>
                        </div>
                    ))}

                    <button type="button" className="rounded font-bold text-xs md:text-base p-3 rounded text-[#0b2545] bg-[#a0ce96] mx-4 hover:text-[#f6f8ee]" onClick={addExpense}>Add Expense</button>

                    <div className={buttonFormat}>
                        <button type="reset" className={clearButtonDesign}>Clear</button>
                        <button type="submit" className={submitButtonDesign}>Submit</button>
                    </div>
                </form>

                <div className={outputCard}>
                    <Output answer={output} text="Amount Left: "/>
                    <BudgetChart expenses={expenses}/>
                </div>

            </div>
        </div>
    );
}

export default Budget;