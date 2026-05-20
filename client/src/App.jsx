import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./routes/ProtectedRoute";
import Interview from "./pages/Interview";
import Jobs from "./pages/Jobs";


import Assistant from "./pages/Assistant";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route
  path="/dashboard"
  element={
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  }
/>

<Route
  path="/interview"
  element={<Interview />}
/>
<Route
  path="/jobs"
  element={<Jobs />}
/>

<Route
  path="/assistant"
  element={<Assistant />}
/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;