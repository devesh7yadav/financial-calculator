import { Routes, Route, Link } from "react-router-dom";
import InterestCalculator from "./pages/InterestCalculator";
import Home from "./pages/Home";
import Savings from "./pages/Savings";
import Mortgage from "./pages/Mortgage";
import Budget from "./pages/Budget";

function App() {

  return (
    <div>
      <Link className="grid text-3xl md:text-4xl justify-center font-bold text-[#134074] my-6" to="/"> Financial Calculator </Link>

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