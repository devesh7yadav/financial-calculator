import { useState } from "react";
import Navbar from "../Navbar";

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

  //Styling
  const labelDesign = "w-48 shrink-0 font-bold text-[#13315c]";
  const inputDesign = "outline-1 w-full border p-2 rounded font-semibold text-[#13315c]";
  const alignBoxes = "flex items-center gap-4";
 
  //Displays the form
  return (
    <div>
      <Navbar/>
      <h1 className="flex justify-center font-semibold text-2xl text-[#0b2545] my-6">Savings Goal Calculator</h1>

      <div className="flex max-w-5xl px-24 gap-x-12 items-start">
        <form className="flex flex-col gap-6 flex-1" onSubmit={handleSubmit} onReset={handleReset}>
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

          <button type="submit" className="border p-3 rounded font-bold text-[#0b2545] bg-[#5f92cc] hover:text-[#8da9c4]">Submit</button>
          <button type="reset" className="border p-3 rounded font-bold text-[#a11010] bg-[#5f92cc] hover:text-[#8da9c4]">Clear</button>
        </form>

        <div className="min-w-[220px] border p-4 rounded">
            <h2 className="text-sm text-[#134074]">Monthly Contribution:</h2>
            <div className="text-xl font-semibold text-[#13315c] mt-2"> {output} </div>
        </div>

      </div>
    </div>
  );
}

export default Savings;