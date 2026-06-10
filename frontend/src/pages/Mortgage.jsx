import { useState } from "react";

function Mortgage() {

    const [formData, setFormData] = useState({
        "principal": "",
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
        formData.principal === "" ||
        formData.interest === "" ||
        formData.time === ""
        ){
        setResult("Missing field(s)");
        return;
        }

        const response = await fetch("http://localhost:5000/api/mortgage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            principal: Number(formData.principal),
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
        {/*<label htmlFor="principal">Principal:</label> Incase i change my mind later*/} 
        <input
          type="number"
          id="principal"
          name="principal"
          placeholder="Principal"
          value={formData.principal}
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

      {result !== null && <h2>{result}</h2>}
    </div>
  );
}

export default Mortgage;