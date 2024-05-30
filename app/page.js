"use client";
import React from "react";

import Pomodoro from "../components/Pomodoro";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="bg-green-500 rounded-md w-full flex items-center  text-white justify-center h-64">
        <Pomodoro />
      </div>
    </main>
  );
}
