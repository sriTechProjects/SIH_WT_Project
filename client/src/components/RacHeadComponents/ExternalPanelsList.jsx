import React, { useState, useEffect } from "react";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Avatar, Select, MenuItem } from "@mui/material";

const columns = [
  { id: "profilePic", label: "Profile Pic", minWidth: 80 },
  { id: "fullName", label: "Full Name", minWidth: 150 },
  { id: "domain", label: "Domain", minWidth: 120 },
  { id: "designation", label: "Domain", minWidth: 120 },
];

const getRandomColor = () => {
  const colors = [
    "#0fa3b1",
    "#9d4edd",
    "#f85e00",
    "#588157",
    "#bf3100",
    "#16425b",
    "#64a6bd",
    "#e56b6f",
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};

const ExternalPanelsList = () => {
  const [loading, setLoading] = useState(false);
  const [domain, setDomain] = useState("");
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);
  const [domains, setDomains] = useState([]);

  useEffect(() => {
    const fetchDomains = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/expert/uniqueDomain"
        );
        setDomains(response?.data?.data || []); // Handle missing data gracefully
      } catch (err) {
        console.error("Failed to fetch domains", err);
      }
    };
    fetchDomains();
  }, []);

  const handleDomainChange = async (event) => {
    const selectedDomain = event.target.value;
    setDomain(selectedDomain);
    if (!selectedDomain) return; // Prevent unnecessary API calls
    setLoading(true);
    setError(false);

    try {
      const response = await axios.get(
        `http://localhost:8000/api/panel/getExperts?jobDomain=${selectedDomain}`
      );
      const experts = response?.data?.data || [];
      setData(experts);
      if (experts.length === 0) {
        setError(true);
      }
    } catch (err) {
      setError(true);
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen w-screen bg-[#f6f6f6] flex flex-col items-center pt-10">
      <div className="mb-5">
        <Select
          value={domain}
          onChange={handleDomainChange}
          displayEmpty
          style={{ minWidth: 200 }}
        >
          <MenuItem value="">Select Job Domain</MenuItem>
          {domains.map((domainOption, index) => (
            <MenuItem key={index} value={domainOption}>
              {domainOption}
            </MenuItem>
          ))}
        </Select>
      </div>

      {loading ? (
        <div className="text-gray-700">Loading...</div>
      ) : error ? (
        <div className="text-red-500">No experts available.</div>
      ) : data.length > 0 ? (
        <TableContainer sx={{ maxHeight: 560, width: "fit-content", background:"white" }} className="no-scrollbar">
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    style={{
                      minWidth: column.minWidth,
                      backgroundColor: "#464646",
                      color: "#fff",
                    }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <Avatar
                      style={{
                        backgroundColor: getRandomColor(),
                        color: "#fff",
                      }}
                    >
                      {row.fullName?.charAt(0)}
                    </Avatar>
                  </TableCell>
                  <TableCell>{row.fullName}</TableCell>
                  <TableCell>
                    <span
                      className="border px-4 py-2 rounded-md"
                      style={{
                        color: "#0897FF",
                        borderColor: "#0897FF",
                        backgroundColor: "rgba(8, 151, 255, 0.12)",
                      }}
                    >
                      {row.domain}
                    </span>
                  </TableCell>
                  <TableCell>{row.designation}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : null}
    </div>
  );
};

export default ExternalPanelsList;
