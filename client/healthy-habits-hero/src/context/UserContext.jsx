import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      const decodedToken = decodeToken(storedToken);
      setUser(decodedToken);
    }
  }, []);

  const decodeToken = (token) => {
    try {
      const payload = JSON.parse(
        Buffer.from(token.split(".")[1], "base64").toString()
      );
      return payload;
    } catch (err) {
      console.error("Error decoding token:", err);
      return null;
    }
  };

  const signin = async (credentials) => {
    try {
      const res = await axios.post("/api/auth/signin", credentials);
      const token = res.data.token;
      localStorage.setItem("token", token);
      const decodedToken = decodeToken(token);
      setUser(decodedToken);
    } catch (err) {
      console.error(err);
    }
  };

  const signout = async () => {
    try {
      await axios.get("/api/auth/signout");
      localStorage.removeItem("token");
      setUser(null);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <UserContext.Provider value={{ user, signin, signout, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
