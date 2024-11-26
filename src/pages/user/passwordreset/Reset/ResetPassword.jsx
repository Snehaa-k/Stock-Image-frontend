import React, { useState } from 'react';
import { api, API_URL } from '../../../../Apiservice/Apiservice';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ThreeDots } from 'react-loader-spinner';

const PasswordReset = () => {
  const [emailVerified, setEmailVerified] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [email, setEmail] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const validateEmail = () => {
    const newErrors = {};
    if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Invalid Email Address";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    if (validateEmail()) {
      console.log("Email sent from form:", { email: email });
      setLoading(true);
      try {
        const response = await axios.post(`${API_URL}/forgot-password/`, { email: email });
        console.log(response);

        if (response) {
          setSuccessMessage("Password reset link has been sent to your email.");
          setEmailVerified(true); 
        } else {
          setSuccessMessage("Failed to send reset link. Please try again.");
        }
      } catch (error) {
        console.log(error);
        setSuccessMessage("Error sending reset link. Please try again.");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
        {/* Display success message if any */}
        {successMessage && (
          <div className="bg-green-100 text-green-800 p-3 rounded-md mb-4">
            {successMessage}
          </div>
        )}

        {!emailVerified ? (
          <>
            <h2 className="text-xl font-semibold text-gray-700 mb-4">
              Reset Your Password
            </h2>
            <p className="text-gray-500 mb-6">
              Please enter your registered email address to receive a password reset link.
            </p>
            <form onSubmit={handleEmailSubmit}>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                onChange={(e) => { setEmail(e.target.value); }}
                value={email}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#1e1e1f] focus:border-[#39393c] sm:text-sm"
                placeholder="example@example.com"
                required
              />
              <button
                type="submit"
                className="mt-4 w-full bg-[#0d0d0d] hover:bg-[#49494b] text-white py-2 px-4 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-[#4D49B3] focus:ring-offset-2"
              >
                {loading ? (
              <div className="loading-spinner ml-[150px]">
              <ThreeDots
                visible={true}
                height="40"
                width="80"
                color="white"
                radius="9"
                ariaLabel="three-dots-loading"
              />
            </div>
            ) : (
              "Send Reset Link"
            )}
              </button>
            </form>
          </>
        ) : (
          <>
            <h2 className="text-xl font-semibold text-gray-700 mb-4">
              Check Your Email
            </h2>
            <p className="text-gray-500 mb-6">
              A password reset link has been sent to your email. Please check your inbox.
            </p>
            <button
              onClick={()=>navigate('/login')}
                type="submit"
                className="mt-4 w-full bg-[#0d0d0d] hover:bg-[#49494b] text-white py-2 px-4 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-[#0c0c0c] focus:ring-offset-2"
              >
               Back 
              </button>

          </>
        )}
      </div>
    </div>
  );
};

export default PasswordReset;
