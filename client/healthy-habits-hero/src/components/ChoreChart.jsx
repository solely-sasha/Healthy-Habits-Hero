import React, { useEffect, useContext, useState } from "react";
import axios from "axios";
import { UserContext } from "../context/UserContext";

export default function ChoreChart() {
  const { user, setUser } = useContext(UserContext);
  const [chores, setChores] = useState([]);
  const [children, setChildren] = useState([]);

  useEffect(() => {
    const fetchChores = async () => {
      try {
        const response = await axios.get("/api/chores");
        setChores(response.data.chores);
      } catch (error) {
        console.error("Error fetching chores:", error);
      }
    };

    fetchChores();
  }, [user]);

  useEffect(() => {
    const fetchChildren = async () => {
      try {
        const parentId = user._id;
        const response = await axios.get(`/api/user/${parentId}/children`);
        setChildren(response.data);
      } catch (error) {
        console.error("Error fetching children:", error);
      }
    };

    fetchChildren();
  }, [user]);

  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  const choreTable = (
    <>
      <thead className="font-bold">
        <tr>
          <th></th>
          {children.map((child) => (
            <th
              className="font-shantell text-lg tracking-widest bg-customBlue"
              key={child._id}
            >
              {child.name}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {days.map((day) => (
          <tr key={day}>
            <td className="p-3 bg-customBlue font-bold hover:bg-customBlue hover:opacity-50">
              {day}
            </td>
            {children.map((child) => (
              <td
                className="p-3 border bg-customWhite text-customFontGray font-bold hover:bg-custombblue hover:opacity-75"
                key={child.id}
              >
                {chores.length > 0 &&
                  chores[Math.floor(Math.random() * chores.length)].choreName}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </>
  );

  return (
    <div>
      <div>{choreTable}</div>
    </div>
  );
}
