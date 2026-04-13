import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getDashboard } from "../api/authApi";

export default function Dashboard() {
  const [data, setData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getDashboard();
        setData(res.data);
      } catch (err) {
        console.log(err.response?.data);

        localStorage.removeItem("token");
        navigate("/");
      }
    };

    fetchData();
  }, [navigate]);

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Dashboard</h1>

      <button onClick={logout}>Logout</button>

      {data ? (
        <div>
          <p>Total: {data.total}</p>
          <p>Active: {data.active}</p>
          <p>Pending: {data.pending}</p>
          <p>Completed: {data.completed}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}