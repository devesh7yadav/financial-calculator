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
        const hasEmptyExpense = expenses.some(e => e.name === "" || e.amount === "");
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

  return (
    <div>
      <h1>Budget Calculator</h1>

      {/*Handles all the inputs */}
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          id="income"
          name="income"
          placeholder="Income"
          value={formData.income}
          onChange={handleChange}
        />


        {/*Adds expense textboxes */}
        {expenses.map((expense, index) => (
            <div key={index}>
                <input
                placeholder="Expense name"
                value={expense.name}
                onChange={(e) => handleExpenseChange(index, "name", e.target.value)}
                />

                <input
                type="number"
                placeholder="Amount"
                value={expense.amount}
                onChange={(e) => handleExpenseChange(index, "amount", e.target.value)}
                />

                <button type="button" onClick={() => removeExpense(index)}>Remove</button>
            </div>
        ))}

        <button type="button" onClick={addExpense}>Add Expense</button>

        <button type="submit">Submit</button>
      </form>

      {result !== null && <h2>{result}</h2>}
    </div>
  );
}

export default Budget;