import { Routes, Route, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import Home from "@/pages/Non-Auth/Home";
import MovieDetails from "@/pages/Non-Auth/MovieDetails";
function App() {
  const navigate = useNavigate();

  const handleLoginSuccess = () => {
    toast.success("Login successful!");
    navigate("/home");
  };

  return (
    <Routes>
      <Route path="/" element={<Home onLoginSuccess={handleLoginSuccess} />} />
      <Route path="/moviedetails/:id" element={<MovieDetails />} />
    </Routes>
    
  );
}

export default App;