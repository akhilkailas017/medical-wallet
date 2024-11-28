"use client";

import React, { useEffect, useState } from "react";

interface RegisterRequest {
  _id: string;
  name: string;
  registrationNumber: string;
  yearOfRegistration: string;
  specialization: string;
  stateMedicalCouncil: string;
}

const EnrollDoctorPage: React.FC = () => {
  const [registerRequests, setRegisterRequests] = useState<RegisterRequest[]>(
    []
  );
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Fetch all registration requests
  const fetchRegisterRequests = async () => {
    try {
      const response = await fetch("http://localhost:5000/register-requests");
      if (!response.ok) {
        throw new Error("Failed to fetch registration requests");
      }
      const data = await response.json();
      setRegisterRequests(data);
    } catch (error) {
      console.error("Error fetching registration requests:", error);
      setMessage("Error fetching data");
    }
  };

  // Handle verify request
  const handleVerify = async (registrationNumber: string) => {
    setLoading(true);
    setMessage("");
    try {
      const response = await fetch(
        `http://localhost:5000/doctor-enroll/${registrationNumber}`,
        { method: "GET" }
      );
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Verification failed");
      }
      setMessage("Doctor verified successfully");
      // Refresh the list after verification
      fetchRegisterRequests();
    } catch (error) {
      console.error("Error verifying doctor:", error);
      setMessage("Error verifying doctor");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRegisterRequests();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-5xl p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center mb-6">Enroll Doctors</h1>
        {message && (
          <div
            className={`text-center mb-4 ${
              message.includes("successfully")
                ? "text-green-500"
                : "text-red-500"
            }`}
          >
            {message}
          </div>
        )}
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse border border-gray-300">
            <thead>
              <tr>
                <th className="border border-gray-300 px-4 py-2">Name</th>
                <th className="border border-gray-300 px-4 py-2">
                  Registration Number
                </th>
                <th className="border border-gray-300 px-4 py-2">Year</th>
                <th className="border border-gray-300 px-4 py-2">
                  Specialization
                </th>
                <th className="border border-gray-300 px-4 py-2">State</th>
                <th className="border border-gray-300 px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {registerRequests.map((req) => (
                <tr key={req._id}>
                  <td className="border border-gray-300 px-4 py-2">
                    {req.name}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {req.registrationNumber}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {req.yearOfRegistration}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {req.specialization}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {req.stateMedicalCouncil}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <button
                      onClick={() => handleVerify(req.registrationNumber)}
                      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
                      disabled={loading}
                    >
                      {loading ? "Processing..." : "Verify"}
                    </button>
                  </td>
                </tr>
              ))}
              {registerRequests.length === 0 && (
                <tr>
                  <td
                    colSpan={6}
                    className="text-center border border-gray-300 px-4 py-2 text-gray-500"
                  >
                    No registration requests found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default EnrollDoctorPage;
