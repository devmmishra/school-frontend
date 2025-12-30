import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="text-center py-20">
      <h1 className="text-4xl font-bold mb-6 text-gray-800">
        Welcome to School Management System
      </h1>
      <p className="text-gray-600 mb-8 text-lg max-w-2xl mx-auto">
        Manage schools efficiently with our modern system. Add new schools, upload images,
        and view all schools in a responsive grid layout.
      </p>
      <div className="flex gap-4 justify-center flex-wrap">
        <Link
          to="/add-school"
          className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
        >
          Add New School
        </Link>
        <Link
          to="/view-schools"
          className="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition"
        >
          View All Schools
        </Link>
      </div>

      <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="font-bold text-lg mb-2 text-blue-600">📋 Add Schools</h3>
          <p className="text-gray-600">
            Easily add new schools with details like name, address, contact information, and images.
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="font-bold text-lg mb-2 text-green-600">👀 View Schools</h3>
          <p className="text-gray-600">
            Browse all schools in a beautiful, responsive grid layout that works on all devices.
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="font-bold text-lg mb-2 text-purple-600">✨ Features</h3>
          <p className="text-gray-600">
            Form validation, image upload, responsive design, and MySQL database integration.
          </p>
        </div>
      </div>
    </div>
  );
}
