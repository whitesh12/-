import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Loading from "./pages/Loading";
import Translate from "./pages/Translate";
import PreferenceTest from "./pages/PreferenceTest";
import ResultLoading from "./pages/ResultLoading";

function App() {
  return (
    <Routes>

      <Route path="/" element={<Home />} />

      <Route path="/test-loading" element={<Loading />} />

      <Route path="/translate" element={<Translate />} />

      <Route path="/preference-test" element={<PreferenceTest />}/>

      <Route path="/result-loading" element={<ResultLoading />} />

    </Routes>
  );
}

export default App;
