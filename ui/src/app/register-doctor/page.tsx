"use client"; // Enables client-side rendering
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const DoctorRegisterPage = () => {
    const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    registrationNumber: "",
    yearOfRegistration: "",
    specialization: "",
    stateMedicalCouncil: "",
    password: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Call your API endpoint here
      const response = await fetch("http://localhost:5000/doctor-register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        window.alert("Doctor registration successful!");
        router.push("/login");
      } else {
        const errorData = await response.json();
        setMessage(errorData.error || "Doctor registration failed");
      }
    } catch (error) {
      setMessage("An error occurred during registration");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-lg bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-center mb-6 text-black">Doctor Registration</h1>
        <form onSubmit={handleSubmit}>
          {/* Name Field */}
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Enter your name"
              required
            />
          </div>

          {/* Registration Number Field */}
          <div className="mb-4">
            <label htmlFor="registrationNumber" className="block text-sm font-medium text-gray-700">
              Registration Number
            </label>
            <input
              type="text"
              id="registrationNumber"
              name="registrationNumber"
              value={formData.registrationNumber}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Enter your registration number"
              required
            />
          </div>

          {/* Year of Registration Field */}
          <div className="mb-4">
            <label htmlFor="yearOfRegistration" className="block text-sm font-medium text-gray-700">
              Year of Registration
            </label>
            <input
              type="number"
              id="yearOfRegistration"
              name="yearOfRegistration"
              value={formData.yearOfRegistration}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Enter the year of registration"
              required
            />
          </div>

          {/* Specialization Field */}
          <div className="mb-4">
            <label htmlFor="specialization" className="block text-sm font-medium text-gray-700">
              Specialization
            </label>
            <input
              type="text"
              id="specialization"
              name="specialization"
              value={formData.specialization}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Enter your specialization"
              required
            />
          </div>

          {/* State Medical Council Field */}
          <div className="mb-4">
            <label htmlFor="stateMedicalCouncil" className="block text-sm font-medium text-gray-700">
              State Medical Council
            </label>
            <select
              id="stateMedicalCouncil"
              name="stateMedicalCouncil"
              value={formData.stateMedicalCouncil}
              onChange={handleChange}
              className="text-black mt-1 p-2 w-full border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            >
              <option value="">Select State Medical Council</option>
              <option value="Kerala">Kerala</option>
              <option value="Tamil Nadu">Tamil Nadu</option>
              <option value="Karnataka">Karnataka</option>
              <option value="Maharashtra">Maharashtra</option>
              {/* Add more options as needed */}
            </select>
          </div>

          {/* Password Field */}
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Enter a secure password"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
          >
            Register
          </button>
        </form>

        {/* Message Display */}
        {message && (
          <p className={`mt-4 text-center ${message.includes("successful") ? "text-green-500" : "text-red-500"}`}>
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default DoctorRegisterPage;
