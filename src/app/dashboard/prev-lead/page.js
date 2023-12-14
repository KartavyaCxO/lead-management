"use client";
import { use, useEffect, useState } from "react";
import Link from "next/link";
export default function PrevLead() {
  const [leadData, setLeadData] = useState([]);
  useEffect(() => {
    fetch("/api/zohoapi")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        if ("message" in data) {
          setLeadData(data.message);
        } else {
          setLeadData([]);
        }
      });
  }, []);
  return (
    <div>
      <div>
        <table className="table">
          {/* head */}
          <thead>
            <tr className="text-black">
              <th></th>
              <th>Title</th>
              <th>Company</th>
              <th>Function</th>
              <th>Location</th>
              <th>Boosted</th>
              <th>Ticket Type</th>
              <th>Connects Spent</th>
              <th>Bid Quoted</th>
              <th>Created_By</th>
              <th>Created_Time</th>
              <th>Project URL</th>
            </tr>
          </thead>
          <tbody>
            {leadData.length > 0 ? (
              leadData.map((item, i) => {
                return (
                  <tr key={`bid${i}`}>
                    <th></th>
                    <td>{item.ptitle}</td>
                    <td>{item.company_name}</td>
                    <td>{item.function}</td>
                    <td>{item.location}</td>
                    <td>{item.boosted}</td>
                    <td>{item.ticket_type}</td>
                    <td>{item.connects_spent}</td>
                    <td>{item.bitquoted}</td>
                    <td>{item.createdby.name}</td>
                    <td>{item.createdtime}</td>
                    <td>
                      <Link href={item.project_url}>{item.project_url}</Link>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <th></th>
                <td>No Data</td>
                <td>No Data</td>
                <td>No Data</td>
                <td>No Data</td>
                <td>No Data</td>
                <td>No Data</td>
                <td>No Data</td>
                <td>No Data</td>
                <td>No Data</td>
                <td>No Data</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
