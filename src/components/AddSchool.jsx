import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';

export default function AddSchool({ onSchoolAdded }) {
<<<<<<< HEAD
  const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [imagePreview, setImagePreview] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      const file = files[0];
      
      // Check file type
      if (!file.type.startsWith('image/')) {
        setMessage('Please select a valid image file');
        e.target.value = '';
        return;
      }
      
      // Check file size (5MB)
      if (file.size > 5 * 1024 * 1024) {
        setMessage('Image size must be less than 5MB');
        e.target.value = '';
        return;
      }
      
      // Set file for form submission
      setSelectedFile(file);
      setValue('image', file);
      
      // Create preview
=======
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [imagePreview, setImagePreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files;
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setMessage('Image size must be less than 5MB');
        return;
      }
>>>>>>> 40958ea (school-project)
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data) => {
    setLoading(true);
    setMessage('');

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email_id)) {
      setMessage('Please enter a valid email address');
      setLoading(false);
      return;
    }

    // Phone validation - 10 digits
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(data.contact)) {
      setMessage('Contact must be 10 digits');
      setLoading(false);
      return;
    }

    try {
      const formData = new FormData();
      formData.append('name', data.name);
      formData.append('address', data.address);
      formData.append('city', data.city);
      formData.append('state', data.state);
      formData.append('contact', data.contact);
      formData.append('email_id', data.email_id);
<<<<<<< HEAD
      
      if (selectedFile) {
        formData.append('image', selectedFile);
=======

      if (data.image && data.image.length > 0) {
        formData.append('image', data.image);
>>>>>>> 40958ea (school-project)
      }

      await axios.post(
        `${process.env.REACT_APP_API_URL}/schools`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      setMessage('School added successfully!');
      reset();
      setImagePreview(null);
<<<<<<< HEAD
      setSelectedFile(null);
      onSchoolAdded && onSchoolAdded();
=======
>>>>>>> 40958ea (school-project)

      setTimeout(() => {
        window.location.href = '/view-schools';
      }, 2000);
    } catch (error) {
      const errorMsg = error.response?.data?.error || 'Failed to add school';
      setMessage(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Add School</h1>

      {message && (
        <div className={`p-4 rounded-lg mb-6 ${
          message.includes('successfully') 
<<<<<<< HEAD
            ? 'bg-green-100 text-green-800 border border-green-200' 
            : 'bg-red-100 text-red-800 border border-red-200'
=======
            ? 'bg-green-100 text-green-800' 
            : 'bg-red-100 text-red-800'
>>>>>>> 40958ea (school-project)
        }`}>
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-8 rounded-lg shadow-lg">
        {/* School Name */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            School Name *
          </label>
          <input
            type="text"
            placeholder="Enter school name"
            {...register('name', { required: 'School name is required' })}
<<<<<<< HEAD
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
=======
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
>>>>>>> 40958ea (school-project)
          />
          {errors.name && <p className="error-message">{errors.name.message}</p>}
        </div>

        {/* Address */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Address *
          </label>
          <textarea
            placeholder="Enter school address"
            rows="3"
            {...register('address', { required: 'Address is required' })}
<<<<<<< HEAD
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
=======
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
>>>>>>> 40958ea (school-project)
          />
          {errors.address && <p className="error-message">{errors.address.message}</p>}
        </div>

        {/* City & State */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              City *
            </label>
            <input
              type="text"
              placeholder="Enter city"
              {...register('city', { required: 'City is required' })}
<<<<<<< HEAD
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
=======
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
>>>>>>> 40958ea (school-project)
            />
            {errors.city && <p className="error-message">{errors.city.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              State *
            </label>
            <input
              type="text"
              placeholder="Enter state"
              {...register('state', { required: 'State is required' })}
<<<<<<< HEAD
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
=======
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
>>>>>>> 40958ea (school-project)
            />
            {errors.state && <p className="error-message">{errors.state.message}</p>}
          </div>
        </div>

        {/* Contact & Email */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Contact (10 digits) *
            </label>
            <input
              type="tel"
              placeholder="10 digit mobile"
              maxLength="10"
              {...register('contact', { required: 'Contact is required' })}
<<<<<<< HEAD
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
=======
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
>>>>>>> 40958ea (school-project)
            />
            {errors.contact && <p className="error-message">{errors.contact.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email *
            </label>
            <input
              type="email"
              placeholder="school@email.com"
              {...register('email_id', { required: 'Email is required' })}
<<<<<<< HEAD
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
=======
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
>>>>>>> 40958ea (school-project)
            />
            {errors.email_id && <p className="error-message">{errors.email_id.message}</p>}
          </div>
        </div>

<<<<<<< HEAD
        {/* Image Upload - FIXED */}
=======
        {/* Image Upload */}
>>>>>>> 40958ea (school-project)
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            School Image (Optional)
          </label>
          <input
            type="file"
            accept="image/*"
<<<<<<< HEAD
            onChange={handleImageChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
          <p className="text-xs text-gray-500 mt-1">Max file size: 5MB. JPG, PNG supported</p>
          {imagePreview && (
            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <img 
                src={imagePreview} 
                alt="Preview" 
                className="max-h-40 max-w-full rounded-lg object-cover shadow-md" 
              />
=======
            {...register('image')}
            onChange={(e) => {
              register('image').onChange(e);
              handleImageChange(e);
            }}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          />
          <p className="text-xs text-gray-500 mt-1">Max file size: 5MB</p>
          {imagePreview && (
            <div className="mt-4">
              <img src={imagePreview} alt="Preview" className="max-h-40 rounded" />
>>>>>>> 40958ea (school-project)
            </div>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
<<<<<<< HEAD
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-all duration-200"
=======
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-400 flex items-center justify-center gap-2"
>>>>>>> 40958ea (school-project)
        >
          {loading && <span className="loading"></span>}
          {loading ? 'Adding School...' : 'Add School'}
        </button>
      </form>
    </div>
  );
}
