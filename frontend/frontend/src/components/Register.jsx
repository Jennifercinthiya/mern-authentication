import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../api/authApi";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();

    try {
      await registerUser({ username, email, phone, password });

      alert("Registered Successfully");

      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message || "Register failed");
    }
  };

  return (
    <div style={box}>
      <form onSubmit={submit} style={card}>
        <h2>Register</h2>

        <input style={input} placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
        <input style={input} placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
        <input style={input} placeholder="Phone" onChange={(e) => setPhone(e.target.value)} />
        <input style={input} type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />

        <button style={btn}>Register</button>
      </form>
    </div>
  );
}

const box = { display:"flex", justifyContent:"center", alignItems:"center", height:"100vh", background:"#f4f4f4" };
const card = { width:"320px", padding:"20px", background:"white", borderRadius:"10px", textAlign:"center" };
const input = { width:"100%", padding:"10px", margin:"10px 0" };
const btn = { width:"100%", padding:"10px", background:"#28a745", color:"white", border:"none" };