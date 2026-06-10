import { Routes, Route, Link } from "react-router-dom";
import InterestCalculator from "./pages/InterestCalculator";
import Home from "./pages/Home";
import Savings from "./pages/Savings";
import Mortgage from "./pages/Mortgage";
import Budget from "./pages/Budget";

function App() {

  return (
    <div className="">
      <Link className="flex justify-center font-bold text-4xl text-[#134074] my-6" to="/"> Financial Calculator </Link>

      {/*Links*/}
      <nav className="flex justify-center gap-6 text-[#0b2545] text-2xl underline">
        <Link className="hover:text-[#8da9c4]" to="/interest"> Compound Interest </Link>
        <Link className="hover:text-[#8da9c4]" to="/savingsGoal"> Savings Goal </Link>
        <Link className="hover:text-[#8da9c4]" to="/mortgage"> Mortgage </Link>
        <Link className="hover:text-[#8da9c4]" to="/budget"> Budgeting </Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/interest" element={<InterestCalculator />}/>
        <Route path="/savingsGoal" element={<Savings />}/>
        <Route path="/mortgage" element={<Mortgage />}/>
        <Route path="/budget" element={<Budget />}/>
      </Routes>

    </div>
  )
}

export default App;