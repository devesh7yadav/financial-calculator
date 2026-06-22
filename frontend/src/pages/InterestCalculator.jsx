import { useState } from "react";
import Navbar from "../Navbar";
import Output from "../Output";
import { labelDesign, inputDesign, alignBoxes, title, buttonDesign, buttonFormat } from "../Styles";

function InterestCalculator() {

  //Hooks
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

    //Empty Fields
    if (
      formData.principal === "" ||
      formData.rate === "" ||
      formData.freq === "" ||
      formData.time === ""
    ){
      setResult("Missing field(s)");
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

    //Makes sure the answer can be displayed
    if(data.amount == null || data.amount > 1e+10) {
      setResult("Too Big");
      return;
    }

    setResult(Number(data.amount).toFixed(2));
  };

  //Resets all the fields
  const handleReset = () => {
    setFormData({
        principal: "",
        rate: "",
        freq: "",
        time: "",
    })
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
      <Navbar/>
      <h1 className={title}>Compound Interest Calculator</h1>

      <div className="grid grid-cols-1 gap-y-6 md:grid-cols-2 md:gap-16">
        <form className="grid gap-6 flex-1" onSubmit={handleSubmit} onReset={handleReset}>
          <div className={alignBoxes}>
            <label htmlFor="principal" className={labelDesign}>Principal ($)</label>
            <input
              className={inputDesign}
              type="number"
              id="principal"
              name="principal"
              value={formData.principal}
              onChange={handleChange}
            />
          </div>

          <div className={alignBoxes}>
            <label htmlFor="rate" className={labelDesign}>Annual Interest Rate (%)</label>
            <input
              className={inputDesign}
              type="number"
              id="rate"
              name="rate"
              value={formData.rate}
              onChange={handleChange}
            />
          </div>

          <div className={alignBoxes}>
            <label htmlFor="freq" className={labelDesign}>Frequency (/yr)</label>
            <select
              className={inputDesign}
              id="freq"
              name="freq"
              value={formData.freq}
              onChange={handleChange}
            >
              <option value="">Select</option>
              <option value="365">Daily</option>
              <option value="52">Weekly</option>
              <option value="12">Monthly</option>
              <option value="4">Quarterly</option>
              <option value="2">Semi-Annually</option>
              <option value="1">Annually</option>
            </select>
          </div>

          <div className={alignBoxes}>
            <label htmlFor="time" className={labelDesign}>Time (yrs)</label>
            <input
              className={inputDesign}
              type="number"
              id="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
            />
          </div>

          <div className={buttonFormat}>
            <button type="submit" className={`${buttonDesign} text-[#0b2545]`}>Submit</button>
            <button type="reset" className={`${buttonDesign} text-[#a11010]`}>Clear</button>
          </div>
        </form>

        <Output answer={output} text="You will have: "/>

      </div>
    </div>
  );
}

export default InterestCalculator;