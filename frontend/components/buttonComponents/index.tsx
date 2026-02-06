"use client";

import React from 'react';

type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  type?: "button" | "reset" | "submit"
};

export const ButtonPrimary: React.FC<ButtonProps> = ({ children, onClick, className, type }) => (
  <button
  type={type}
    onClick={onClick}
    className={`bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg mt-1 mx-1 ${className}`}
  >
    {children}
  </button>
);

export const ButtonSuccess: React.FC<ButtonProps> = ({ children, onClick, className, type }) => (
  <button
  type={type}
    onClick={onClick}
    className={`bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg mt-1 mx-1 ${className}`}
  >
    {children}
  </button>
);

export const ButtonDanger: React.FC<ButtonProps> = ({ children, onClick, className, type }) => (
  <button
  type={type}
    onClick={onClick}
    className={`bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg mt-1 mx-1 ${className}`}
  >
    {children}
  </button>
);

export const ButtonInfo: React.FC<ButtonProps> = ({ children, onClick, className, type }) => (
  <button
  type={type}
    onClick={onClick}
    className={`bg-yellow-600 hover:bg-yellow-700 text-white font-semibold py-2 px-4 rounded-lg mt-1 mx-1 ${className}`}
  >
    {children}
  </button>
);