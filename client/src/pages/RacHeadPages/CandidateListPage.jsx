import React, { useEffect, useState } from "react";
import SideNavbar from "../../components/RacHeadComponents/SideNavbar";
import RacHeader from "../../components/RacHeadComponents/RacHeader";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { IoSearch } from "react-icons/io5";
import { BiFilterAlt } from "react-icons/bi";
import { Avatar, Button, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import Tooltip from "@mui/material/Tooltip";
import axios from "axios";

const columns = [
  { id: "serial", label: "#", minWidth: 20 },
  { id: "profilePic", label: "Profile Pic", minWidth: 80 },
  { id: "fullName", label: "Full Name", minWidth: 150 },
  { id: "email", label: "Email ID", minWidth: 200 },
  { id: "domain", label: "Domain", minWidth: 120 },
  { id: "department", label: "Department", minWidth: 150 },
  { id: "status", label: "Status", minWidth: 100 },
  { id: "view", label: "", minWidth: 100 },
  { id: "delete", label: "", minWidth: 50 },
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

const ExpertDetailsPage = () => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [rows, setRows] = useState([]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const base_url = import.meta.env.VITE_BASE_URL;
  const allExperts = async () => {
    try {
      const response = await axios.get(`${base_url}/api/candidate/all`, {
        withCredentials: true,
      });
      setRows(response?.data);
      console.log(response?.data);
    } catch (error) {
      console.log("error fetching the all route");
    }
  };

  const [delId, setdelId] = useState("");
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this expert?"
    );
    if (!confirmDelete) return;

    try {
      const response = await axios.delete(`${base_url}/api/expert/del/${id}`, {
        withCredentials: true,
      });
      if (response) {
        setRows((prevRows) => prevRows.filter((row) => row._id !== id));
        console.log("Expert deleted successfully");
      }
    } catch (error) {
      console.error("Error deleting the expert", error);
    }
  };

  useEffect(() => {
    allExperts();
  }, []);

  return (
    <section className="h-screen w-screen flex bg-[#f6f6f6]">
      <SideNavbar />
      <main className="relative flex flex-col flex-grow gap-y-8 px-8 py-6 overflow-y-auto">
        <RacHeader />
        <div className="w-full rounded-md bg-white h-full">
          <header className="flex justify-between items-center px-8 py-5 border-b">
            <h1 className="text-xl font-medium text-[#0E8CCA]">Experts List</h1>
            <div className="flex items-center gap-4">
              <Paper
                component="form"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  width: 300,
                  boxShadow: "none",
                  padding: "0.8rem 0.2rem",
                  border: "1px solid #ccc",
                }}
              >
                <IoSearch
                  style={{ margin: "0 8px", color: "#464646" }}
                  size={20}
                />
                <input
                  type="text"
                  placeholder="Search experts"
                  style={{
                    border: "none",
                    outline: "none",
                    flex: 1,
                    fontSize: "14px",
                  }}
                />
              </Paper>
              <Paper
                component="div"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  cursor: "pointer",
                  boxShadow: "none",
                  padding: "0.7rem 0.2rem",
                  border: "1px solid #ccc",
                  width: "100px",
                }}
              >
                <BiFilterAlt
                  style={{ margin: "0 8px", color: "#464646" }}
                  size={20}
                />
                <span className="text-[#333] text-md font-normal">Filter</span>
              </Paper>
            </div>
          </header>
          <Paper sx={{ width: "100%", overflow: "hidden", boxShadow: "none" }}>
            <TableContainer sx={{ maxHeight: 440 }} className="no-scrollbar">
              <Table stickyHeader>
                <TableHead>
                  <TableRow>
                    {columns.map((column) => (
                      <TableCell
                        key={column.id}
                        style={{
                          minWidth: column.minWidth,
                          backgroundColor: "#f8f9fa",
                          color: "#464646",
                        }}
                      >
                        {column.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, index) => (
                      <TableRow
                        key={index}
                        sx={{
                          "&:hover": { backgroundColor: "inherit" },
                        }}
                      >
                        <TableCell>{row.serial}</TableCell>
                        <TableCell>
                          <Avatar
                            style={{
                              backgroundColor: getRandomColor(),
                              color: "#fff",
                            }}
                          >
                            {/* {row?.personalDetails?.name?.fullName?.charAt(0)} */}
                          </Avatar>
                        </TableCell>
                        <TableCell>
                          {row?.personalDetails?.name?.firstName}{" "}
                          {row?.personalDetails?.name?.lastName}
                        </TableCell>
                        <TableCell>
                          {row?.personalDetails?.contact?.email}
                        </TableCell>

                        {/* <TableCell>
                          {row?.fieldOfExpertise?.designation}
                        </TableCell> */}
                        <TableCell>
                          <span
                            className={`border px-4 py-2 rounded-md`}
                            style={{
                              color:
                                row.status === "Active" ? "#00BD40" : "#FF0000",
                              borderColor:
                                row.status === "Active" ? "#00BD40" : "#FF0000",
                              backgroundColor:
                                row.status === "Active"
                                  ? "rgba(0, 189, 64, 0.12)"
                                  : "rgba(255, 0, 0, 0.12)", // Default: Industry
                            }}
                          >
                            {row.status ? "Blocked" : "Active"}
                          </span>
                        </TableCell>
                        <TableCell>
                          <Tooltip title="View Details" arrow>
                            <button
                              onClick={() => handleDelete(row?._id)}
                              style={{
                                border: "2px solid #0897FF",
                                color: "#0897FF",
                                padding: "0.4rem 1.2rem",
                                borderRadius: "5px",
                              }}
                            >
                              View
                            </button>
                          </Tooltip>
                        </TableCell>
                        <TableCell>
                          <Tooltip title="Delete Record" arrow>
                            <IconButton>
                              <DeleteIcon />
                            </IconButton>
                          </Tooltip>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[10, 25, 100]}
              component="div"
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              sx={{ justifyContent: "flex-start", display: "flex" }}
            />
          </Paper>
        </div>
      </main>
    </section>
  );
};

export default ExpertDetailsPage;