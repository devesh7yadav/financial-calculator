import { Link } from "react-router-dom";
import { BsGraphUpArrow } from "react-icons/bs";
import { PiPiggyBankFill } from "react-icons/pi";
import { FaHouseChimney } from "react-icons/fa6";
import { BsCalculatorFill } from "react-icons/bs";

//Styles
const textStyle = "border p-2 rounded font-semibold text-3xl text-center hover:text-[#8da9c4] w-96 h-36 flex flex-col justify-center gap-2"

function Home() {
    return (
        <div>
            <h2 className="flex justify-center text-2xl text-[#0b2545] my-10">Welcome, click on one of the calculators below.</h2>

            <div className="flex justify-center gap-25">
                <Link to="/interest" className={textStyle}> <BsGraphUpArrow className="text-5xl mx-auto"/> Compound Interest</Link>
                <Link to="/savingsGoal" className={textStyle}> <PiPiggyBankFill className="text-5xl mx-auto" color="pink"/> Savings Goal</Link>
            </div>

            <div className="my-12 flex justify-center gap-25">
                <Link to="/mortgage" className={textStyle}> <FaHouseChimney className="text-5xl mx-auto"/> Mortgage</Link>
                <Link to="/budget" className={textStyle}> <BsCalculatorFill className="text-5xl mx-auto"/> Budgeting</Link>
            </div>
        </div>
    )
}

export default Home;