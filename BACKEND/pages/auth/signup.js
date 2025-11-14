import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react"; 

export default function SignUp() {
  // const { data: session, status } = useSession();
  const [form, setForm] = useState({ email: "", password: "", confirmPassword: "" });
  const [error, setError] = useState("");
  const router = useRouter();


  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };



  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      setError("Password does not match");
      return;
    }

    const res = await fetch(`/api/auth/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    if (data.error) {
      setError("Error happened here");
      setTimeout(() => setError(""), 3000);
    } else {
      router.push("/auth/signin");
    }
  };

  return (
    <>
      <div className="flex flex-center full-h ">
        <div className="loginform">
          <div className="heading">Đăng ký Tạo Quản trị viên</div>
          <form className="form" onSubmit={handleSubmit}>
            <input type="email" name="email" onChange={handleChange} className="input" placeholder="Enter email Address" />
            <input type="password" name="password" onChange={handleChange} className="input" placeholder="Password" />
            <input type="password" name="confirmPassword" onChange={handleChange} className="input" placeholder="Confirm Password" />
            <button className="login-button" type="submit">Đăng ký</button>
            {error && <p style={{ color: "red" }}>{error}</p>}
          </form>
        </div>
      </div>
    </>
  );
}