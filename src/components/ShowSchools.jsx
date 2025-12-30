import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function ShowSchools() {
  const [schools, setSchools] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchSchools();
  }, []);

  const fetchSchools = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/schools`);
      setSchools(response.data.data || []);
    } catch (err) {
      setError('Error fetching schools: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this school?')) return;

    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/schools/${id}`);
      setSchools(schools.filter(school => school.id !== id));
    } catch (err) {
      setError('Error deleting school: ' + err.message);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="loading"></div>
        <p className="ml-4 text-gray-600">Loading schools...</p>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-2 text-gray-800">All Schools</h1>
      <p className="text-gray-600 mb-8">Total Schools: {schools.length}</p>

      {error && (
        <div className="bg-red-100 text-red-800 p-4 rounded-lg mb-6">
          {error}
        </div>
      )}

      {schools.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg">
          <p className="text-gray-600 text-lg mb-4">No schools added yet</p>
          <a href="/add-school" className="text-blue-600 hover:underline font-semibold">
            Add the first school →
          </a>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {schools.map((school) => (
            <div
              key={school.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition"
            >
              {school.image && (
                <div className="relative h-48 bg-gray-200">
                  <img
                    src={`data:image/jpeg;base64,${school.image}`}
                    alt={school.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {school.name}
                </h3>

                <div className="space-y-2 text-gray-600 text-sm mb-4">
                  <p><span className="font-semibold">Address:</span> {school.address}</p>
                  <p><span className="font-semibold">City:</span> {school.city}</p>
                  <p><span className="font-semibold">State:</span> {school.state}</p>
                  <p><span className="font-semibold">Contact:</span> {school.contact}</p>
                  <p><span className="font-semibold">Email:</span> {school.email_id}</p>
                </div>

                <button
                  onClick={() => handleDelete(school.id)}
                  className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition font-semibold"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
