import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

import axios from "axios";

export default function SigninPage() {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "parent",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let url = "/api/auth/signin";
      const res = await axios.post(url, formData, {
        withCredentials: true,
      });
      console.log("login success", res.data);
      setUser(res.data);
      navigate("/dashboard");
    } catch (err) {
      setError(true);
      console.log(err);
    }
  };

  const { email, password, role } = formData;
  return (
    <>
      <section className="py-24 md:py-32 bg-white">
        <div className="container px-4 mx-auto">
          <div className="max-w-sm mx-auto">
            <div className="mb-6 text-center">
              <h3 className="mb-4 text-2xl md:text-3xl font-bold">
                Sign in to your account
              </h3>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label className="block mb-2 text-coolGray-800 font-medium">
                  Email
                </label>
                <input
                  onChange={handleChange}
                  value={email}
                  name="email"
                  className="appearance-none block w-full p-3 leading-5 text-coolGray-900 border border-coolGray-200 
                  rounded-lgshadow-md placeholder-coolGray-400 focus:outline-none focus:ring-2 focus:ring-customYellow focus:ring-opacity-50"
                  type="email"
                  placeholder="email"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2 text-coolGray-800 font-medium">
                  Password
                </label>
                <input
                  value={password}
                  onChange={handleChange}
                  name="password"
                  className="appearance-none block w-full p-3 leading-5 text-coolGray-900 border border-coolGray-200 rounded-lgshadow-md placeholder-coolGray-400
                   focus:outline-none focus:ring-2 focus:ring-customYellow focus:ring-opacity-50"
                  type="password"
                  placeholder="************"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2 text-coolGray-800 font-medium">
                  Role
                </label>
                <div className="flex items-center">
                  <input
                    type="radio"
                    name="role"
                    value="parent"
                    checked={role === "parent"}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  <label className="mr-4">Parent</label>
                  <input
                    type="radio"
                    name="role"
                    value="child"
                    checked={role === "child"}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  <label>Child</label>
                </div>
              </div>
              <button
                className="inline-block py-3 px-7 mb-6 w-full text-base text-white font-medium text-center leading-6
                 bg-yellow-500 hover:bg-customOrange focus:ring-2 focus:ring-customYellow focus:ring-opacity-50  hover:text-gray-300 rounded-md shadow-sm"
                type="submit"
              >
                Sign In
              </button>
              <p className="text-center">
                <span className="text-xs font-medium">
                  Don’t have an account? <Link to="/signup">Sign up</Link>
                </span>
                <button
                  className="inline-block text-xs font-medium text-customOrange hover:text-customRed hover:underline"
                  type="submit"
                >
                  Sign up
                </button>
              </p>
              {error && (
                <h3 className="text-red-500 text-sm">something went wrong</h3>
              )}
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
