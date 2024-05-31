"use client";
import React from "react";

import Pomodoro from "../components/Pomodoro";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-14">
      <div className="  w-full flex  items-center text-white  h-64">
        <Pomodoro />
      </div>
    </main>
  );
}
