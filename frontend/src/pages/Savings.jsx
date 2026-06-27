import { useState } from "react";
import Navbar from "../Navbar";
import Output from "../Output";
import { labelDesign, inputDesign, alignBoxes, title, submitButtonDesign, clearButtonDesign, buttonFormat, outputCard, inputCard } from "../Styles";
import SavingsChart from "../charts/SavingsChart";

function Savings() {

    //Hooks
    const [formData, setFormData] = useState({
        "goal": "",
        "current": "",
        "interest": "",
        "time": "",
    });
    const [result, setResult] = useState(null);
    const [graphData, setGraphData] = useState([{year:0, amount:0}]);

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
        setGraphData(data.values);
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
    setGraphData([{year:0, amount:0}]);
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

      <div className="grid grid-cols-1 gap-y-6 lg:grid-cols-2 md:gap-16 items-start mx-4">
        <form className={inputCard} onSubmit={handleSubmit} onReset={handleReset}>
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
            <button type="reset" className={clearButtonDesign}>Clear</button>
            <button type="submit" className={submitButtonDesign}>Submit</button>
          </div>
        </form>

        <div className={outputCard}>
          <Output answer={output} text="Monthly Contribution: "/>
          <SavingsChart values={graphData}/>
        </div>

      </div>
    </div>
  );
}

export default Savings;