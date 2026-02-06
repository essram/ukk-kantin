"use client";

import { useState, ReactNode } from "react";

interface AlertProps {
  children: ReactNode;
  type?: "success" | "error" | "info" | "warning";
}

export default function Alert({ children, type = "info" }: AlertProps) {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  const colors = {
    success: "bg-green-100 border-green-500 text-green-700",
    error: "bg-red-100 border-red-500 text-red-700",
    info: "bg-blue-100 border-blue-500 text-blue-700",
    warning: "bg-yellow-100 border-yellow-500 text-yellow-700",
  };

  return (
    <div
      className={`flex items-center justify-between border-l-4 p-4 rounded-md shadow-md ${colors[type]}`}
    >
      <span className="text-sm">{children}</span>
      <button
        onClick={() => setVisible(false)}
        className="text-sm font-bold text-gray-500 hover:text-gray-800"
      >
        ✕
      </button>
    </div>
  );
}
