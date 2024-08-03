"use client";

import { useState } from "react";
import axios from "axios";

export default function Home() {
  return (
    <main className="min-h-screen">
      <nav className="grid grid-cols-6">
        <p className="col-start-1">Grimoire</p>
        <a
          href="/login"
          className="col-start-5 bg-blue-400 rounded-full border-2 border-gray-300 hover:bg-blue-500 text-center text-white"
        >
          Login
        </a>
        <a
          href="/register"
          className="col-start-6 bg-green-500 hover:bg-green-600 border-2 border-gray-300 rounded-full text-center text-white"
        >
          Register
        </a>
      </nav>
    </main>
  );
}
