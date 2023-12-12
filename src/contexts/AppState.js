"use client";
import React, { useState } from "react";
import AppContext from "./AppContext";

const AppState = ({ children }) => {
  const [user, setUser] = useState(null);
  const [ProjectDescription, setProjectDescription] = useState("");
  console.log(user);

  const data = [
    {
      api_name: "Upwork_bid",
      Email: user ? user.email : "",
      Project_Title: "",
      Source: "",
      Bid_Type: "",
      Name: "",
      Function: "",
      Project_URL: "",
      Bid_Budget: "",
      Ticket_Type: "",
      Comments: "",
      days_before_job_posted: "",
      Bid_Quoted: "",
      Bid_Payment_Terms: "",
      connects_spent: "",
      Connects_spent_on_boosting: "",
      Company_Name: "",
      Day: "",
      Boosted_or_not: "",
      Bid_Type: "",
      Location: "",
    },
  ];

  return (
    <AppContext.Provider
      value={{ user, setUser, data, setProjectDescription, ProjectDescription }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppState;
