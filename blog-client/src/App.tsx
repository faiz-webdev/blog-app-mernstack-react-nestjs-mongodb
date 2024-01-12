import { Routes, Route } from "react-router-dom";
import Mainlayout from "./features/common/layouts/Main.layout";
import Posts from "./features/post/pages/Posts";
import Auth from "./features/auth/pages/Auth";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Mainlayout />}>
          <Route index element={<Posts />}></Route>
          <Route path='/auth' element={<Auth />}></Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
