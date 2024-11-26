import axios from "axios";
import React, { useState } from "react";
import { API_URL } from "../../../../Apiservice/Apiservice";
import { useNavigate, useParams } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";
import { toast } from "react-toastify";
const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate()
  const { id, token } = useParams();
  
  const validatePasswords = () => {
    const newErrors = [];
    if (!newPassword) {
      newErrors.newPassword = "Password is required";
    } else if (newPassword.length < 6) {
      newErrors.newPassword = "Password must be at least 6 characters";
    }
    if (newPassword !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    setErrorMessage(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    if (validatePasswords()) {
      setLoading(true);
      try {
        const response = await axios.post(`${API_URL}/password-reset/`, {id:id, token:token, password:newPassword});
        console.log(response);
        
        
       if(response){

        toast.success("Your password has been reset successfully!");
        navigate("/login");}
      } catch (error) {
        console.error(error);
        
        setErrorMessage("Failed to reset password. Please try again later.");
      } finally {
        setLoading(false);
      }
    }else{
      toast.error(errorMessage)
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Reset Your Password</h2>
        <p className="text-gray-600 mb-6">Enter and confirm your new password below.</p>
{/* 
        {successMessage && (
          <div className="bg-green-100 text-green-800 p-3 rounded-md mb-4">
            {successMessage}
          </div>
        )} */}
{/* 
        {errorMessage && (
          <div className="bg-red-100 text-red-800 p-3 rounded-md mb-4">
            {errorMessage}
          </div>
        )} */}

        <form onSubmit={handlePasswordReset}>
          <label htmlFor="new-password" className="block text-sm font-medium text-gray-700">
            New Password
          </label>
          <input
            type="password"
            id="new-password"
            name="new-password"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#0c0c0c] focus:border-[#131314] sm:text-sm"
            placeholder="Enter new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />

          <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700 mt-4">
            Confirm Password
          </label>
          <input
            type="password"
            id="confirm-password"
            name="confirm-password"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#0f0f10] focus:border-[#232325] sm:text-sm"
            placeholder="Re-enter new password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            className="mt-6 w-full bg-[#0d0d0d] hover:bg-[#3b3b3d] text-white py-2 px-4 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-[#141416] focus:ring-offset-2"
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
              "Reset Password"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
