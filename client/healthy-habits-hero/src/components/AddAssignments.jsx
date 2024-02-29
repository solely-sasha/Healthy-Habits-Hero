import React, { useState } from "react";
import axios from "axios";

export default function addAssignments() {
  const [isLoading, setIsLoading] = useState(false);

  const handleAssignments = async () => {
    try {
      setIsLoading(true);
      await axios.post("/api/choreAssignments/assign-random");
      setIsLoading(false);
      alert("Random chores assigned successfully!");
    } catch (error) {
      console.error("Error assigning random chores:", error);
      setIsLoading(false);
      alert("Failed to assign random chores. Please try again later.");
    }
  };

  return (
    <div>
      <button
        onClick={handleAssignments}
        disabled={isLoading}
        className={`bg-customBlue text-white px-4 py-2 rounded ${
          isLoading ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        {isLoading ? "Assigning Chores..." : "Assign Random Chores"}
      </button>
    </div>
  );
}
