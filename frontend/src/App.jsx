import { Routes, Route, Link } from "react-router-dom";
import InterestCalculator from "./pages/InterestCalculator";
import Home from "./pages/Home";

function App() {

  return (
    <div>
      <h1>Financial Calculator</h1>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/interest" element={<InterestCalculator />}/>
      </Routes>

      {/*Links*/}
      <nav>
        <Link to="/"> Home </Link>
        <Link to="/interest"> Compound Interest </Link>
        <Link to="/savings"> Savings Goal </Link>
        <Link to="/mortgage"> Mortgage </Link>
        <Link to="/budget"> Budgeting </Link>
      </nav>
    </div>
  )
}

export default App;