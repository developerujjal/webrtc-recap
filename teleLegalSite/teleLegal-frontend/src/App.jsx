import { BrowserRouter, Routes, Route } from "react-router";
import MainVideoPage from "./components/MainVideoPage";
import Home from "./components/Home";
import ProDashboard from "./components/ProDeshboard/ProDeshBoard";


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/join-video" element={<MainVideoPage />} />
          <Route path="/deshboard" element={<ProDashboard />}/>
          <Route path="*" element={<h1>Page not found</h1>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
