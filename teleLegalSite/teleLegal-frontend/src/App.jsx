import { BrowserRouter, Routes, Route } from "react-router";
import MainVideoPage from "./components/MainVideoPage";
import Home from "./components/Home";


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/join-video" element={<MainVideoPage />} />
          <Route path="*" element={<h1>Page not found</h1>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
