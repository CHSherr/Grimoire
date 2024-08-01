"use client";

import { useState } from "react";
import Image from "next/image";
import { Axios } from "axios";

export default function Home() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  function handleUsernameChange(event) {
    setUsername(event.target.value);
  }
  function handlePasswordChange(event) {
    setPassword(event.target.value);
  }

  function handleSubmit() {
    try {
      Axios.post("/api/login", { username, password }).then((response) => {
        console.log(response);
      });
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex flex-col space-y-4">
        <input value={username} onChange={handleUsernameChange}></input>

        <input value={password} onChange={handlePasswordChange}></input>
        <button>Login</button>
      </div>
    </main>
  );
}
