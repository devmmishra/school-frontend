import React from 'react';
import { Link } from 'react-router-dom';

export default function Navigation() {
  return (
    <nav className="bg-blue-600 text-white p-4 shadow-lg sticky top-0 z-50">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">School Management</h1>
        <div className="flex gap-6">
          <Link to="/" className="hover:text-blue-200 transition">
            Home
          </Link>
          <Link to="/add-school" className="hover:text-blue-200 transition">
            Add School
          </Link>
          <Link to="/view-schools" className="hover:text-blue-200 transition">
            View Schools
          </Link>
        </div>
      </div>
    </nav>
  );
}
