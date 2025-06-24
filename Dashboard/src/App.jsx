import "./App.css";
import { Route, Routes } from "react-router-dom";
import RaffleShow from "./Components/RaffleShow";
import HomePage from "./HomePage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/RaffleShow" element={<RaffleShow />} />
        <Route path="/" element={<HomePage />} />
      </Routes>
    </>
  );
}

export default App;
