import { useState } from "react";

function Savings() {

    const [formData, setFormData] = useState({
        "goal": "",
        "current": "",
        "interest": "",
        "time": "",
    });

    const [result, setResult] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    //Sends to backend, handles the submit
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (
        formData.goal === "" ||
        formData.current === "" ||
        formData.interest === "" ||
        formData.time === ""
        ){
        setResult("Missing fields");
        return;
        }

        const response = await fetch("http://localhost:5000/api/savingsGoal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            goal: Number(formData.goal),
            current: Number(formData.current),
            interest: Number(formData.interest),
            time: Number(formData.time),
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
      <h1>Savings Goal Calculator</h1>

      {/*Handles all the inputs */}
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          id="goal"
          name="goal"
          placeholder="Goal"
          value={formData.goal}
          onChange={handleChange}
        />

        <input
          type="number"
          id="current"
          name="current"
          placeholder="Current"
          value={formData.current}
          onChange={handleChange}
        />

        <input
          type="number"
          id="interest"
          name="interest"
          placeholder="Interest"
          value={formData.interest}
          onChange={handleChange}
        />

        <input
          type="number"
          id="time"
          name="time"
          placeholder="Time"
          value={formData.time}
          onChange={handleChange}
        />

        <button type="submit">Submit</button>
      </form>

      {result !== null && <h2>You need to contribute: {result} per month</h2>}
    </div>
  );
}

export default Savings;