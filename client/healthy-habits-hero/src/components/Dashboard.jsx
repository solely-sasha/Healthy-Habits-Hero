// ParentDashboard.jsx
import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import Quote from "./Quote";
import axios from "axios";
import ChoreChart from "./ChoreChart";
import ParentDashboard from "./ParentDashboard";
import ChildDashboard from "./ChildDashboard";
import { UserContext } from "../context/UserContext";

export default function Dashboard() {
  const { user, setUser } = useContext(UserContext);

  return (
    <div>
      {user && (
        <>
        
          {user.role === "parent" && <ParentDashboard userData={user} />}
          {user.role === "child" && <ChildDashboard userData={user} />}
        </>
      )}
    </div>
  );
}
