import { BrowserRouter, Route, Router, Routes, useLocation } from "react-router-dom";
import Footer from "./components/Footer";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Welcome from "./pages/Welcome";

function AppContent() {
  const location = useLocation();


  return (
    <>
      <Routes>

        <Route path="/" element={<Welcome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>

      <Footer />
    </>
  );
}


function App() {
  return (

      <AppContent />
    

  );
}

export default App;
