"use client";

import { useState } from "react";
import axios from "axios";

export default function Home() {
  const [username, setUsername] = useState("Username");
  const [password, setPassword] = useState("Password");
  function handleUsernameChange(event) {
    setUsername(event.target.value);
  }
  function handlePasswordChange(event) {
    setPassword(event.target.value);
  }
  const [register, setRegister] = useState(false);
  function handleRegisterClick() {
    setRegister(!register);
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
  function handleFocus(event) {
    if (event.target.value === "Username") {
      setUsername("");
    } else if (event.target.value === "Password") {
      setPassword("");
    }
  }
  function handleBlur(event) {
    if (event.target.value === "") {
      if (event.target.id === "username") {
        setUsername("Username");
      } else if (event.target.id === "password") {
        setPassword("Password");
      }
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
    <main>
      <nav>
        <div className="flex flex-row space-x-4">Grimoire</div>
      </nav>

      <div className="flex min-h-screen flex-col items-center space-y-4 p-24">
        <h1>
          <b>Welcome to Grimoire!</b>
        </h1>
        <p>Register your new account</p>
        <div className="flex flex-col space-y-4" id="form">
          <input
            value={username}
            onChange={handleUsernameChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            id="username"
            className="p-2 border-2 border-gray-300 rounded-md"
          ></input>

          <input
            value={password}
            onChange={handlePasswordChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            id="password"
            className="p-2 border-2 border-gray-300 rounded-md"
          ></input>
          <a href="/login">Already has an account?</a>
          <button
            onClick={handleRegister}
            className="border-2 border-gray-300 inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
          >
            Register
          </button>
        </div>
      </div>
    </main>
  );
}
