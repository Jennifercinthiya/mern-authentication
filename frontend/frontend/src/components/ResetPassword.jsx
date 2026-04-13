import { useState } from "react";
import { resetPassword } from "../api/authApi";

export default function ResetPassword() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submit = async (e) => {
    e.preventDefault();

    try {
      await resetPassword({ email, newPassword: password });

      alert("Password Reset Success");
    } catch (err) {
      alert(err.response?.data?.message);
    }
  };

  return (
    <div style={box}>
      <form onSubmit={submit} style={card}>
        <h2>Reset Password</h2>

        <input style={input} placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
        <input style={input} type="password" placeholder="New Password" onChange={(e) => setPassword(e.target.value)} />

        <button style={btn}>Reset</button>
      </form>
    </div>
  );
}

const box = { display:"flex", justifyContent:"center", alignItems:"center", height:"100vh", background:"#f4f4f4" };
const card = { width:"320px", padding:"20px", background:"white", borderRadius:"10px", textAlign:"center" };
const input = { width:"100%", padding:"10px", margin:"10px 0" };
const btn = { width:"100%", padding:"10px", background:"purple", color:"white", border:"none" };