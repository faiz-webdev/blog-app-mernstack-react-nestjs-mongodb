import { Routes, Route } from "react-router-dom";
import Mainlayout from "./features/common/layouts/Main.layout";
import Posts from "./features/post/pages/Posts";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Mainlayout />}>
          <Route index element={<Posts />}></Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
