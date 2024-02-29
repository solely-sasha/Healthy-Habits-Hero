import React, { useEffect, useState } from "react";
import axios from "axios";

function Quote() {
  const [quote, setQuote] = useState("");

  useEffect(() => {
    axios.get("https://api.quotable.io/random").then((response) => {
      setQuote(response.data.content);
    });
  }, []);

  return (
    <div className="custom-3d-border bg-customGold p-6 rounded text-center m-1">
      <h2 className=" font-shantell text-lg font-semibold mb-4  p-6">
        Quote of the Day
      </h2>
      <p className="p-6 ">{quote}</p>
    </div>
  );
}

export default Quote;
