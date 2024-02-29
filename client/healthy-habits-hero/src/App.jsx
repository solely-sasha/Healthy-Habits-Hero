import React, { useContext, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SigninPage from "./pages/SigninPage";
import SignupPage from "./pages/SignupPage";
import Navbar from "./components/Navbar";
import ChildDashboard from "./components/ChildDashboard";
import ParentDashboard from "./components/ParentDashboard";
import Profile from "./components/Profile";
import AddChild from "./components/AddChild";
import { UserContext } from "./context/UserContext";
import { ChildDataProvider } from "./context/ChildContext";

function App() {
  const { user } = useContext(UserContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (
      !user &&
      window.location.pathname !== "/signin" &&
      window.location.pathname !== "/signup"
    ) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signin" element={<SigninPage />} />
        <Route path="/signup" element={<SignupPage />} />
      
          <Route
            path="/dashboard"
            element={
              user &&
              (user.role === "parent" ? (
                <ParentDashboard userData={user} />
              ) : (
                <ChildDashboard userData={user} />
              ))
            }
          />
     
        <Route path="/profile" element={<Profile />} />
        <Route path="/add-child" element={<AddChild />} />
      </Routes>
    </>
  );
}

export default App;
