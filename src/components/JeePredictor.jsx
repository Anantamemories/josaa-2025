import React, { useState, useEffect } from "react";
import data from "../data/jee_data.json";

const JeePredictor = () => {
  const [rank, setRank] = useState(0);
  const [quota, setQuota] = useState("");
  const [homeState, setHomeState] = useState("");
  const [category, setCategory] = useState("");
  const [gender, setGender] = useState("");
  const [results, setResults] = useState([]);

  const seatTypes = Array.from(new Set(data.map(item => item["Seat Type"])));
  const genders = Array.from(new Set(data.map(item => item.Gender)));
  const quotas = Array.from(new Set(data.map(item => item.Quota)));
  const states = Array.from(new Set(data.map(item => item["Institute Name"].split(" ").slice(-1).join(" "))));

  const handleFilter = () => {
    const filtered = data.filter(item => {
      const closingRank = parseFloat(item["Closing Rank"]);
      return (
        item.Quota === quota &&
        item["Seat Type"] === category &&
        item.Gender.toLowerCase().includes(gender.toLowerCase()) &&
        !isNaN(closingRank) &&
        closingRank >= parseFloat(rank)
      );
    });
    setResults(filtered);
  };

  return (
    <div className="p-4 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input type="number" placeholder="JEE Main Rank" onChange={e => setRank(e.target.value)} />
        <select onChange={e => setQuota(e.target.value)} defaultValue="">
          <option disabled value="">Select Quota</option>
          {quotas.map(q => <option key={q} value={q}>{q}</option>)}
        </select>
        <select onChange={e => setHomeState(e.target.value)} defaultValue="">
          <option disabled value="">Select Home State</option>
          {states.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
        <select onChange={e => setCategory(e.target.value)} defaultValue="">
          <option disabled value="">Select Category</option>
          {seatTypes.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
        <select onChange={e => setGender(e.target.value)} defaultValue="">
          <option disabled value="">Select Gender</option>
          {genders.map(g => <option key={g} value={g}>{g}</option>)}
        </select>
        <button onClick={handleFilter}>Predict Colleges</button>
      </div>

      {results.length > 0 && (
        <div className="overflow-auto">
          <table className="min-w-full text-sm text-left border mt-4">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2">Institute Name</th>
                <th className="p-2">Program</th>
                <th className="p-2">Opening Rank</th>
                <th className="p-2">Closing Rank</th>
                <th className="p-2">Fees (4Y)</th>
                <th className="p-2">Avg. Yearly Fees</th>
                <th className="p-2">Avg. Package</th>
                <th className="p-2">Highest Package</th>
                <th className="p-2">Source</th>
              </tr>
            </thead>
            <tbody>
              {results.map((row, i) => (
                <tr key={i} className="border-t">
                  <td className="p-2">{row["Institute Name"]}</td>
                  <td className="p-2">{row["Academic Program Name"]}</td>
                  <td className="p-2">{row["Opening Rank"]}</td>
                  <td className="p-2">{row["Closing Rank"]}</td>
                  <td className="p-2">{row["Total B.Tech Fees (4 Years)"]}</td>
                  <td className="p-2">{row["Avg. Yearly Fees"]}</td>
                  <td className="p-2">{row["Average Package"]}</td>
                  <td className="p-2">{row["Highest Package"]}</td>
                  <td className="p-2">{row["Sources"]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default JeePredictor;