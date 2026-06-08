import { Routes, Route, Link } from "react-router-dom";
import InterestCalculator from "./pages/InterestCalculator";
import Home from "./pages/Home";
import Savings from "./pages/Savings";
import Mortgage from "./pages/Mortgage";
import Budget from "./pages/Budget";

function App() {

  return (
    <div>
      <h1>Financial Calculator</h1>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/interest" element={<InterestCalculator />}/>
        <Route path="/savingsGoal" element={<Savings />}/>
        <Route path="/mortgage" element={<Mortgage />}/>
        <Route path="/budget" element={<Budget />}/>
      </Routes>

      {/*Links*/}
      <nav>
        <Link to="/"> Home </Link>
        <Link to="/interest"> Compound Interest </Link>
        <Link to="/savingsGoal"> Savings Goal </Link>
        <Link to="/mortgage"> Mortgage </Link>
        <Link to="/budget"> Budgeting </Link>
      </nav>
    </div>
  )
}

export default App;