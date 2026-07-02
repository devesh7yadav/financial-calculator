import { useState } from "react";
import Navbar from "../components/Navbar";
import Output from "../components/Output";
import { labelDesign, inputDesign, alignBoxes, title, submitButtonDesign, clearButtonDesign, buttonFormat, outputCard, inputCard } from "../Styles";
import MortgageChart from "../charts/MortgageChart";

function Mortgage() {

    //Hooks
    const [formData, setFormData] = useState({
        "principal": "",
        "interest": "",
        "time": "",
    });
    const [result, setResult] = useState(null);
    const [interestAmount, setInterestAmount] = useState(null);

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
        formData.interest === "" ||
        formData.time === ""
        ){
        setResult("Missing field(s)");
        return;
        }

        //Interest is too high
        if (formData.interest > 100){
          setResult("Interest Too High");
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

        //Makes sure the answer can be displayed
        if(data.amount == null || data.amount > 1e+10) {
          setResult("Too Big");
          return;
        }

        setResult(Number(data.amount).toFixed(2));
        setInterestAmount(Number(data.totalInterest).toFixed(2));
    };


  //Resets all the fields
  const handleReset = () => {
    setFormData({
        principal: "",
        interest: "",
        time: "",
    })
    setResult(null);
    setInterestAmount(null);
  }

  //Output
  let output;
  if (result === null){
    output = "--";
  } else if (!isNaN(result)){
    output = `$${result} /month`;
  } else{
    output = result;
  }
 
  //Displays the form
  return (
    <div className="grid place-items-center">
      <title>Mortgage Calculator</title>

      <Navbar/>
      <h1 className={title}>Mortgage Calculator</h1>

      <div className="grid grid-cols-1 gap-y-6 lg:grid-cols-2 md:gap-16 items-start mx-4">
        <form className={inputCard} onSubmit={handleSubmit} onReset={handleReset}>
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
          <Output answer={output} text="You will pay: "/>
          <MortgageChart principal={Number(formData.principal)} interest={Number(interestAmount)}/>
        </div>


      </div>
    </div>
  );
}

export default Mortgage;