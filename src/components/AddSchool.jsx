import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';

export default function AddSchool({ onSchoolAdded }) {
  const { register, handleSubmit, formState: { errors }, reset, watch } = useForm();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [imagePreview, setImagePreview] = useState(null);
  const image = watch('image');

  const validateForm = (data) => {
    const newErrors = {};

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email_id)) {
      newErrors.email_id = 'Please enter a valid email address';
    }

    // Phone validation - 10 digits
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(data.contact)) {
      newErrors.contact = 'Contact must be 10 digits';
    }

    return newErrors;
  };

  const handleImageChange = (e) => {
    const file = e.target.files;
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setMessage('Image size must be less than 5MB');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data) => {
    const validationErrors = validateForm(data);
    if (Object.keys(validationErrors).length > 0) {
      Object.keys(validationErrors).forEach(key => {
        setMessage(validationErrors[key]);
      });
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      const formData = new FormData();
      formData.append('name', data.name);
      formData.append('address', data.address);
      formData.append('city', data.city);
      formData.append('state', data.state);
      formData.append('contact', data.contact);
      formData.append('email_id', data.email_id);

      if (data.image && data.image.length > 0) {
        formData.append('image', data.image);
      }

      const response = await axios.post(
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
      
      if (onSchoolAdded) {
        onSchoolAdded();
      }

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
            ? 'bg-green-100 text-green-800' 
            : 'bg-red-100 text-red-800'
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
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
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
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
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
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
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
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
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
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
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
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            {errors.email_id && <p className="error-message">{errors.email_id.message}</p>}
          </div>
        </div>

        {/* Image Upload */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            School Image (Optional)
          </label>
          <input
            type="file"
            accept="image/*"
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
            </div>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-400 flex items-center justify-center gap-2"
        >
          {loading && <span className="loading"></span>}
          {loading ? 'Adding School...' : 'Add School'}
        </button>
      </form>
    </div>
  );
}