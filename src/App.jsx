import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Loading from "./pages/Loading";
import Translate from "./pages/Translate";

function App() {
  return (
    <Routes>

      <Route path="/" element={<Home />} />

      <Route path="/loading" element={<Loading />} />

      <Route path="/translate" element={<Translate />} />

    </Routes>
  );
}

export default App;