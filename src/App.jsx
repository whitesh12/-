import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Loading from "./pages/Loading";
import Translate from "./pages/Translate";
import PreferenceTest from "./pages/PreferenceTest";

function App() {
  return (
    <Routes>

      <Route path="/" element={<Home />} />

      <Route path="/loading" element={<Loading />} />

      <Route path="/translate" element={<Translate />} />

      <Route path="/preference-test" element={<PreferenceTest />}/>

    </Routes>
  );
}

export default App;