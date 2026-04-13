import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../api/authApi";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();

    console.log("Login submit triggered:", email, password);

    try {
      setLoading(true);

      const res = await loginUser({ email, password });

      console.log("LOGIN RESPONSE:", res.data);

      // ✅ SAVE TOKEN SAFELY
      if (res.data?.token) {
        localStorage.setItem("token", res.data.token);
      } else {
        throw new Error("Token not received from backend");
      }

      alert("Login Success");

      // ✅ REDIRECT
      navigate("/dashboard");

    } catch (err) {
      console.log("LOGIN ERROR:", err.response?.data || err.message);
      alert(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={box}>
      <form onSubmit={submit} style={card}>
        <h2>Login</h2>

        <input
          style={input}
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          style={input}
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button style={btn} disabled={loading}>
          {loading ? "Loading..." : "Login"}
        </button>

        <p>
          <Link to="/register">Register</Link> |{" "}
          <Link to="/forgot">Forgot Password</Link>
        </p>
      </form>
    </div>
  );
}
const box = { display:"flex", justifyContent:"center", alignItems:"center", height:"100vh", background:"#f4f4f4" };
const card = { width:"320px", padding:"20px", background:"white", borderRadius:"10px", textAlign:"center" };
const input = { width:"100%", padding:"10px", margin:"10px 0" };
const btn = { width:"100%", padding:"10px", background:"#007bff", color:"white", border:"none" };