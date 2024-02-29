import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import Quote from "./Quote";
import axios from "axios";
import ChoreChart from "./ChoreChart";

import { UserContext } from "../context/UserContext";

export default function ChildDashboard() {
  const { user } = useContext(UserContext);
  console.log(user);

  return (
    <div className="text-center mt-8">
      <h1 className="text-4xl font-bold mb-4">Welcome!</h1>
      {user && user.role === "child" ? (
        <div>
          <h2>{user.name}</h2>
          <p>Age: {user.age}</p>
         
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
