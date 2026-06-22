import { useState } from "react";
import Navbar from "../Navbar";
import Output from "../Output";
import { labelDesign, inputDesign, alignBoxes, title, buttonDesign, buttonFormat } from "../Styles";

function Savings() {

    //Hooks
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
        setResult("Missing field(s)");
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

        setResult(data.amount);
    };

  //Resets all the fields
  const handleReset = () => {
    setFormData({
        goal: "",
        current: "",
        interest: "",
        time: "",
    })
    setResult(null);
  }

  //Output
  let output;
  if (result === null){
    output = "--";
  } else if (result < 0){
    output = "No contributions needed"
  } else if (!isNaN(result)){
    output = `$${result.toFixed(2)}`;
  } else{
    output = result;
  }

  //Displays the form
  return (
    <div className="grid place-items-center">
      <Navbar/>
      <h1 className={title}>Savings Goal Calculator</h1>

      <div className="grid grid-cols-1 gap-y-6 md:grid-cols-2 md:gap-16">
        <form className="grid gap-6 flex-1" onSubmit={handleSubmit} onReset={handleReset}>
          <div className={alignBoxes}>
            <label htmlFor="goal" className={labelDesign}>Goal ($)</label>
            <input
              className={inputDesign}
              type="number"
              id="goal"
              name="goal"
              value={formData.goal}
              onChange={handleChange}
            />
          </div>

          <div className={alignBoxes}>
            <label htmlFor="current" className={labelDesign}>Current Amount ($)</label> 
            <input
              className={inputDesign}
              type="number"
              id="current"
              name="current"
              value={formData.current}
              onChange={handleChange}
            />
          </div>

          <div className={alignBoxes}>
            <label htmlFor="interest" className={labelDesign}>Annual Interest Rate (%)</label> 
            <input
              className={inputDesign}
              type="number"
              id="interest"
              name="interest"
              value={formData.interest}
              onChange={handleChange}
            />
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

        <Output answer={output} text="Monthly Contribution: "/>

      </div>
    </div>
  );
}

export default Savings;