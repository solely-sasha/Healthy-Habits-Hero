// ParentDashboard.jsx
import React, { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import Quote from "./Quote";
import axios from "axios";
import ChoreChart from "./ChoreChart";
import { UserContext } from "../context/UserContext";
import AddAssignments from "./AddAssignments";

export default function ParentDashboard() {
  const { user } = useContext(UserContext);
  // console.log("user information from context on the parent:" , user)
  const navigate = useNavigate();

  return (
    <div className="text-center mt-8">
      <AddAssignments />
      <div className="grid-auto-fit m-3 pt-2">
        <div>
          <Quote />
        </div>
        <div>
          <ChoreChart />
        </div>
        <div>Exercise</div>
        <div>Water</div>
        <div>Bed time</div>
        <div>Rewards</div>
      </div>
    </div>
  );
}
