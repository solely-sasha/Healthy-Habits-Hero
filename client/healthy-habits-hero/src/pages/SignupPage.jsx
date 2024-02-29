import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function SignupPage() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    email: "",
    username: "",
    password: "",
    role: "",
    parentEmail: "", 
  });
  const [userRole, setUserRole] = useState("");

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    if (type === "radio") {
      setUserRole(value);
    } else {
      setUserData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let url = "/api/auth/signup";
      if (userRole === "child") {
        url += "/child";
      }
      const res = await axios.post(url, {
        ...userData,
        role: userRole,
      });
      console.log("User signed up successfully:", res.data);
      setUserData({
        email: "",
        username: "",
        password: "",
        role: "",
        parentEmail: "", 
      });
      setUserRole("");
      navigate("/signin");
    } catch (err) {
      console.error("Error registering user:", err);
    
    }
  };

  const { username, email, password, parentEmail } = userData;

  return (
    <>
      <section className="py-24 md:py-32 bg-white">
        <div className="container px-4 mx-auto">
          <div className="max-w-sm mx-auto">
            <div className="mb-6 text-center">
              <h3 className="mb-4 text-2xl md:text-3xl font-rubik font-bold">
                Sign up for an account
              </h3>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label className="block mb-2 text-coolGray-800 font-medium">
                  Email
                </label>
                <input
                  value={email}
                  onChange={handleChange}
                  name="email"
                  className="appearance-none block w-full p-3 leading-5 text-coolGray-900 border border-coolGray-200 rounded-lg shadow-sm placeholder-coolGray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                  type="email"
                  placeholder="Email"
                />
              </div>
              <div className="mb-6">
                <label className="block mb-2 text-coolGray-800 font-medium">
                  Username
                </label>
                <input
                  value={username}
                  onChange={handleChange}
                  name="username"
                  className="appearance-none block w-full p-3 leading-5 text-coolGray-900 border border-coolGray-200 rounded-lg shadow-sm placeholder-coolGray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                  type="text"
                  placeholder="Username"
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
                  className="appearance-none block w-full p-3 leading-5 text-coolGray-900 border border-coolGray-200 rounded-lg shadow-sm placeholder-coolGray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                  type="password"
                  placeholder="Password"
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
                    checked={userRole === "parent"}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  <label className="mr-4">Parent</label>
                  <input
                    type="radio"
                    name="role"
                    value="child"
                    checked={userRole === "child"}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  <label>Child</label>
                </div>
              </div>
              {userRole === "child" && (
                <div className="mb-6">
                  <label className="block mb-2 text-coolGray-800 font-medium">
                    Parent's Email
                  </label>
                  <input
                    value={parentEmail}
                    onChange={handleChange}
                    name="parentEmail"
                    className="appearance-none block w-full p-3 leading-5 text-coolGray-900 border border-coolGray-200 rounded-lg shadow-sm placeholder-coolGray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                    type="email"
                    placeholder="Parent's Email"
                  />
                </div>
              )}
              <button
                className="inline-block py-3 px-7 mb-6 w-full text-base text-green-50 font-medium text-center leading-6 bg-customGreen hover:bg-green-600 focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 rounded-md shadow-sm"
                type="submit"
              >
                Sign Up
              </button>
              <div className="flex justify-center items-center space-x-3">
                <p>Already have an account? </p>
                <p className="text-gray-500 hover:text-customGreen">
                  <Link to="/signin">Signin</Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
