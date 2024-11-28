"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  const handleDoctorLogin = () => {
    setIsModalOpen(false);
    router.push("/login-doctor");
  };

  const handlePatientLogin = () => {
    setIsModalOpen(false);
    router.push("/patient-login");
  };

  const handleSignup = () => {
    router.push("/register-doctor");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="flex justify-between items-center p-4 bg-blue-600 text-white shadow-md">
        <h1 className="text-2xl font-bold">HealthCare Hospital</h1>
        <div className="flex gap-4">
          
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded"
          >
            Login
          </button>
          <button
            onClick={handleSignup}
            className="bg-white text-blue-600 hover:bg-gray-200 py-2 px-4 rounded"
          >
            Sign Up
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="flex flex-col items-center justify-center text-center py-16 px-4">
        <Image
          src="/hospital-logo.png" // Replace with your hospital logo
          alt="Hospital Logo"
          width={200}
          height={200}
          priority
        />
        <h2 className="text-4xl font-bold mt-8">Welcome to HealthCare Hospital</h2>
        <p className="text-lg mt-4 text-gray-700">
          Your trusted partner in health and wellness. We provide world-class medical services with
          compassionate care.
        </p>
      </main>

      {/* Footer */}
      <footer className="text-center py-4 bg-gray-800 text-white">
        <p>&copy; {new Date().getFullYear()} HealthCare Hospital. All rights reserved.</p>
      </footer>

      {/* Login Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-96">
            <h3 className="text-xl font-bold mb-4 text-center">Login</h3>
            <button
              onClick={handleDoctorLogin}
              className="w-full bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded mb-4"
            >
              Doctor Login
            </button>
            <button
              onClick={handlePatientLogin}
              className="w-full bg-green-500 hover:bg-green-700 text-white py-2 px-4 rounded"
            >
              Patient Login
            </button>
            <button
              onClick={() => setIsModalOpen(false)}
              className="mt-4 w-full bg-gray-300 hover:bg-gray-400 text-gray-700 py-2 px-4 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
