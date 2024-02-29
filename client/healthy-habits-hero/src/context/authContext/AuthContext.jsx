import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext({});

const AuthContextProvider = ({ children }) => {
  const [userAuth, setUserAuth] = useState(
    JSON.parse(localStorage.getItem("userAuth"))
  );
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      try {
        const decodedToken = jwt.decode(storedToken);
        if (decodedToken) {
          const { username, id, email } = decodedToken;
          setUserAuth({ username, id, email });
        }
      } catch (error) {
        setError("Invalid token");
      }
    }
  }, []);

  const signUp = async (formData) => {
    try {
      const res = await axios.post("/api/auth/signup", formData, {
        withCredentials: true,
      });

      if (res.status === 201) {
        navigate("/signin");
      } else {
        setError("Registration failed. Please try again.");
      }
    } catch (err) {
      console.error("Error registering user:", err);
      setError("An error occurred. Please try again later.");
    }
  };

  const signIn = (userData) => {
    const { username, id, token, email, role } = userData;

    localStorage.setItem(
      "userAuth",
      JSON.stringify({ username, id, email, token, role })
    );
    setUserAuth({ username, id, email, role });
    setProfile({ username });
    setLoading(true);
  };

  const signOut = () => {
    localStorage.removeItem("userAuth");
    setUserAuth(null);
  };

  return (
    <AuthContext.Provider
      value={{
        userAuth,
        error,
        loading,
        profile,
        signIn,
        signOut,
        signUp,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
