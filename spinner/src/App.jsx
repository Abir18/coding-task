import {useState} from "react";
import "./App.css";
import Spinner from "./Spinner";

function App() {
  const [names, setNames] = useState([
    "Ibrahim",
    "Jasim",
    "Jisan",
    "Teebro",
    "Rifat"
  ]);

  return (
    <div className="App">
      <Spinner names={names} />
    </div>
  );
}

export default App;
