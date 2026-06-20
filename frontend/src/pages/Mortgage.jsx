import { useState } from "react";
import Navbar from "../Navbar";
import { labelDesign, inputDesign, alignBoxes } from "../Styles";

function Mortgage() {

    //Hooks
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
    };


  //Resets all the fields
  const handleReset = () => {
    setFormData({
        principal: "",
        interest: "",
        time: "",
    })
    setResult(null);
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
    <div>
      <Navbar/>
      <h1 className="flex justify-center font-semibold text-2xl text-[#0b2545] my-6">Mortgage Calculator</h1>

      <div className="flex max-w-5xl px-24 gap-x-12 items-start">
        <form className="flex flex-col gap-6 flex-1" onSubmit={handleSubmit} onReset={handleReset}>
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
            <label htmlFor="principal" className={labelDesign}>Annual Interest Rate (%)</label> 
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
            <label htmlFor="principal" className={labelDesign}>Time (yrs)</label> 
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
          <h2 className="text-sm text-[#134074]">You will pay:</h2>
          <div className="text-xl font-semibold text-[#13315c] mt-2"> {output} </div>
        </div>

      </div>
    </div>
  );
}

export default Mortgage;