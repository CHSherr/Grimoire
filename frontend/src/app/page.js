"use client";

import { useState } from "react";
import axios from "axios";

export default function Home() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  function handleUsernameChange(event) {
    setUsername(event.target.value);
  }
  function handlePasswordChange(event) {
    setPassword(event.target.value);
  }

  async function handleLogin() {
    try {
      console.log(username, password);
      const response = await axios.post("http://localhost:5001/auth/login", {
        username,
        password,
      });
      localStorage.setItem("authToken", response.data.token);
      axios
        .get("http://localhost:5001/protected/login", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        })
        .then((response) => {
          console.log("Protected data:", response.data);
        })
        .catch((error) => {
          console.error("Error accessing protected route:", error);
        });
    } catch (error) {
      console.log(error);
    }
  }
  async function handleRegister() {
    try {
      console.log(username, password);
      const response = await axios.post("http://localhost:5001/auth/register", {
        username,
        password,
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex flex-col space-y-4">
        <input value={username} onChange={handleUsernameChange}></input>

        <input value={password} onChange={handlePasswordChange}></input>
        <button onClick={handleLogin}>Login</button>
      </div>
      <div className="flex flex-col space-y-4">
        <input value={username} onChange={handleUsernameChange}></input>

        <input value={password} onChange={handlePasswordChange}></input>
        <button onClick={handleRegister}>Register</button>
      </div>
    </main>
  );
}
