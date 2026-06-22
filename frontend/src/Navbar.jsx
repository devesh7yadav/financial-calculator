import { Link } from "react-router-dom";

function Navbar(){
    return(
        <div>
            {/*Links*/}
            <nav className="grid grid-cols-2 text-md sm:grid-cols-4 sm:text-2xl place-items-center w-fit mx-auto text-center gap-6 text-[#0b2545] underline">
                <Link className="hover:text-[#8da9c4]" to="/interest"> Compound Interest </Link>
                <Link className="hover:text-[#8da9c4]" to="/savingsGoal"> Savings Goal </Link>
                <Link className="hover:text-[#8da9c4]" to="/mortgage"> Mortgage </Link>
                <Link className="hover:text-[#8da9c4]" to="/budget"> Budgeting </Link>
            </nav>
        </div>
    )
}

export default Navbar;