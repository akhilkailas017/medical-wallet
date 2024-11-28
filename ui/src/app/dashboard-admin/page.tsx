"use client";

import { useRouter } from "next/navigation";

export default function AdminDashboard() {
  const router = useRouter();

  const handleCardClick = (path: string) => {
    router.push(path);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
      <h1 className="text-4xl font-bold mb-10 text-gray-800">Admin Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-11/12 max-w-4xl">
        {/* Card for Function 1 */}
        <div
          className="cursor-pointer p-6 bg-white shadow-md rounded-lg hover:shadow-lg transition-shadow flex flex-col items-center justify-center"
          onClick={() => handleCardClick("/function1")}
        >
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Enroll Doctors</h2>
          <p className="text-gray-600 text-center">
            Add Doctors.
          </p>
        </div>

        {/* Card for Function 2 */}
        <div
          className="cursor-pointer p-6 bg-white shadow-md rounded-lg hover:shadow-lg transition-shadow flex flex-col items-center justify-center"
          onClick={() => handleCardClick("/function2")}
        >
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Function 2</h2>
          <p className="text-gray-600 text-center">
            Explore and configure functionality 2.
          </p>
        </div>

        {/* Card for Function 3 */}
        <div
          className="cursor-pointer p-6 bg-white shadow-md rounded-lg hover:shadow-lg transition-shadow flex flex-col items-center justify-center"
          onClick={() => handleCardClick("/function3")}
        >
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Function 3</h2>
          <p className="text-gray-600 text-center">
            View and manage functionality 3.
          </p>
        </div>

        {/* Card for Function 4 */}
        <div
          className="cursor-pointer p-6 bg-white shadow-md rounded-lg hover:shadow-lg transition-shadow flex flex-col items-center justify-center"
          onClick={() => handleCardClick("/function4")}
        >
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Function 4</h2>
          <p className="text-gray-600 text-center">
            Configure and access functionality 4.
          </p>
        </div>
      </div>
    </div>
  );
}
