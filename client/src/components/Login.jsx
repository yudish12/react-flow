import React, { useState } from "react";
import Logo from "../assets/logo.svg";
import { useAuthContext } from "../context/AuthContext";

const Login = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState({});
  const { login, signup } = useAuthContext();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSignup) {
      await signup(formData);
    } else {
      await login(formData);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f0f4f8",
      }}
    >
      <form className="login-form" onSubmit={handleSubmit}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <div>
            <img src={Logo} alt="logo" />
            <h3
              className="roboto-regular"
              style={{ textAlign: "center", fontSize: "1.953rem" }}
            >
              {isSignup ? "Signup" : "Login"}
            </h3>
            {isSignup && (
              <div
                style={{ display: "flex", flexDirection: "column", gap: "6px" }}
              >
                <label className="roboto-light" htmlFor="name">
                  Name
                </label>
                <input
                  onChange={handleChange}
                  name="name"
                  type="text"
                  id="name"
                  placeholder="Enter your Name"
                />
              </div>
            )}
            <div
              style={{
                marginTop: isSignup ? "16px" : "0px",
                display: "flex",
                flexDirection: "column",
                gap: "6px",
              }}
            >
              <label className="roboto-light" htmlFor="email">
                Email
              </label>
              <input
                onChange={handleChange}
                name="email"
                type="email"
                id="email"
                placeholder="Enter your Email"
              />
            </div>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "6px" }}
            >
              <label
                style={{ marginTop: "16px" }}
                htmlFor="password"
                className="roboto-light"
              >
                Password
              </label>
              <input
                onChange={handleChange}
                id="password"
                type="password"
                name="password"
                placeholder="Enter your Password"
              />
            </div>
          </div>
          <button
            className="roboto-medium"
            style={{
              marginTop: "2rem",
              backgroundColor: "#FF70AB",
              color: "white",
            }}
            type="submit"
          >
            {isSignup ? "Signup" : "Login"}
          </button>
        </div>
        <p className="roboto-light">
          Dont't have an account?{" "}
          <span
            onClick={() => setIsSignup(!isSignup)}
            style={{ color: "#FF70AB", fontWeight: "600", cursor: "pointer" }}
          >
            {!isSignup ? "Register" : "Login"}
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;
