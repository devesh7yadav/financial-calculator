import { Link } from "react-router-dom";
import { BsGraphUpArrow } from "react-icons/bs";
import { PiPiggyBankFill } from "react-icons/pi";
import { FaHouseChimney } from "react-icons/fa6";
import { BsCalculatorFill } from "react-icons/bs";

//Styles
const textStyle = "border p-2 rounded font-semibold sm:text-2xl md:text-3xl text-center hover:text-[#8da9c4] w-full max-w-96 h-36 flex flex-col justify-center gap-2 shadow-xl";
const imageStyle = "text-5xl mx-auto";

function Home() {
    return (
        <div>
            <title>Financial Calculator</title>
            
            <h2 className="text-center sm:text-xl md:text-2xl text-[#0b2545] my-10">Welcome, click on one of the calculators below.</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 place-items-center gap-12 w-fit mx-auto border rounded-xl p-12 shadow-xl bg-[#f6f8ee]">
                <Link to="/interest" className={textStyle}> <BsGraphUpArrow className={imageStyle}/> Compound Interest</Link>
                <Link to="/savingsGoal" className={textStyle}> <PiPiggyBankFill className={imageStyle} color="pink"/> Savings Goal</Link>
                <Link to="/mortgage" className={textStyle}> <FaHouseChimney className={imageStyle}/> Mortgage</Link>
                <Link to="/budget" className={textStyle}> <BsCalculatorFill className={imageStyle}/> Budgeting</Link>
            </div>
        </div>
    )
}

export default Home;