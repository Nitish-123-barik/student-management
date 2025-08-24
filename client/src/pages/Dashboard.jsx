import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [totalStudents, setTotalStudents] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCount = async () => {
      try {
        const res = await axios.get("https://student-management-1-k4zj.onrender.com/api/students/count");
        setTotalStudents(res.data.total);
      } catch (error) {
        console.error("Error fetching student count:", error);
      }
    };

    fetchCount();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>📊 Student Dashboard</h2>

      {/* Card for Total Students */}
      <div
        style={{
          background: "#f0f4ff",
          padding: "30px",
          borderRadius: "8px",
          textAlign: "center",
          marginBottom: "20px",
          boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
          maxWidth: "300px",
        }}
      >
        <h3>Total Students</h3>
        <p style={{ fontSize: "28px", fontWeight: "bold", color: "#333" }}>
          {totalStudents}
        </p>
      </div>

      {/* Button to go to All Students Page */}
      <button
        onClick={() => navigate("/students")}
        style={{
          padding: "12px 20px",
          background: "#4f46e5",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          fontSize: "16px",
        }}
      >
        View All Students
      </button>
    </div>
  );
};

export default Dashboard;
