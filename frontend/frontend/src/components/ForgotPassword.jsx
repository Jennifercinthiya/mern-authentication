import { useState } from "react";
import { forgotPassword } from "../api/authApi";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await forgotPassword({ email });

      alert("Reset link sent!");
      setEmail("");
    } catch (err) {
      alert(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={box}>
      <form onSubmit={submit} style={card}>
        <h2>Forgot Password</h2>

        <input style={input} placeholder="Email" onChange={(e) => setEmail(e.target.value)} />

        <button style={btn}>
          {loading ? "Sending..." : "Send Link"}
        </button>
      </form>
    </div>
  );
}

const box = { display:"flex", justifyContent:"center", alignItems:"center", height:"100vh", background:"#f4f4f4" };
const card = { width:"320px", padding:"20px", background:"white", borderRadius:"10px", textAlign:"center" };
const input = { width:"100%", padding:"10px", margin:"10px 0" };
const btn = { width:"100%", padding:"10px", background:"#007bff", color:"white", border:"none" };