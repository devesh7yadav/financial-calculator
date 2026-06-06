import { useState } from "react";

function App() {

  const handleChange = (e) => {
    const {name, value} = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/interest", {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        principal: Number(formData.principal),
        rate: Number(formData.rate),
        freq: Number(formData.freq),
        time: Number(formData.time)
      })
    });

    const data = await response.json();

    console.log(data);
  };

  const [formData, setFormData] = useState({
    principal: '',
    rate: '',
    freq: '',
    time: ''
  });

  return (
    <div>
      <h1>Financial Calculator</h1>


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
      
    </div>
  )
}

export default App;