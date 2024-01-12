import { Routes, Route } from "react-router-dom";
import Mainlayout from "./features/common/layouts/Main.layout";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Mainlayout />}>

        </Route>
      </Routes>
    </div>
  );
}

export default App;
