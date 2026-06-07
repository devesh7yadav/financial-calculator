import { useState } from "react";

function InterestCalculator() {

  const [formData, setFormData] = useState({
    principal: "",
    rate: "",
    freq: "",
    time: "",
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
      formData.rate === "" ||
      formData.freq === "" ||
      formData.time === ""
    ){
      setResult("Missing fields");
      return;
    }

    const response = await fetch("http://localhost:5000/api/interest", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        principal: Number(formData.principal),
        rate: Number(formData.rate),
        freq: Number(formData.freq),
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
      <h1>Interest Calculator</h1>

      {/*Handles all the inputs */}
      <form onSubmit={handleSubmit}>
        <label htmlFor="principal">Principal:</label>
        <input
          type="number"
          id="principal"
          name="principal"
          value={formData.principal}
          onChange={handleChange}
        />

        <label htmlFor="rate">Interest Rate:</label>
        <input
          type="number"
          id="rate"
          name="rate"
          value={formData.rate}
          onChange={handleChange}
        />

        <label htmlFor="freq">Frequency:</label>
        <input
          type="number"
          id="freq"
          name="freq"
          value={formData.freq}
          onChange={handleChange}
        />

        <label htmlFor="time">Time:</label>
        <input
          type="number"
          id="time"
          name="time"
          value={formData.time}
          onChange={handleChange}
        />

        <button type="submit">Submit</button>
      </form>

      {result !== null && <h2>{result}</h2>}
    </div>
  );
}

export default InterestCalculator;