import React, { useState } from 'react';
import { Calendar, User, Lock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import { toast } from 'react-toastify';
import { ThreeDots } from 'react-loader-spinner';
import { API_URL } from '../../Apiservice/Apiservice';

const Signup = () => {
  const navigate = useNavigate()
  const [loading,setLoading] = useState(false)
  const [errors, setErrors] = useState({});
  

  const [formData, setFormData] = useState({
    username:'',
    email: '',
    phonenumber:'',
    password: '',
    confirm:''

  });
  console.log(formData,"form");

  const validateForm = () => {
    const errors = {};
    
   
    if (!formData.username.trim()) {
      errors.username = "Username is required";
    }

   
    if (!formData.email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Invalid email address";
    }

  
    if (!formData.phonenumber) {
      errors.phonenumber = "Phone number is required";
    } else if (!/^\d{10}$/.test(formData.phonenumber)) {
      errors.phonenumber = "Phone number must be 10 digits";
    }

   
    if (!formData.password) {
      errors.password = "Password is required";
    } else if (formData.password.length < 8) {
      errors.password = "Password must be at least 8 characters long";
    } else if (!/(?=.*[a-zA-Z])(?=.*[0-9])/.test(formData.password)) {
      errors.password = "Password must include letters and numbers";
    }

   
    if (!formData.confirm) {
      errors.confirm = "Confirm password is required";
    } else if (formData.confirm !== formData.password) {
      errors.confirm = "Passwords do not match";
    }

    setErrors(errors);

    
    return Object.keys(errors).length === 0;
  };
  

  const HandleSignup = async (e) => {
    e.preventDefault(); 
    if (!validateForm()){
      toast.error(errors[Object.keys(errors)[0]]);
      return
    }

    try {
      setLoading(true)
      const response = await axios.post(`${API_URL}/register/`, {
        username:formData.username,
        email: formData.email,
        phonenumber:formData.phonenumber,
        password: formData.password,
    
      });
      if (response.status == 201) {
        console.log(response,"yaa");
       
          
          toast.success('Sigup Successful! ');

         

            
            navigate('/login')
            
        
          
        
      }
      setLoading(false)

      console.log("Signup Successful:", response.status);
    } catch (error) {
      console.error("Error during signup:", error.response.data.error);
      toast.error(`${error.response.data.error}`)
      setLoading(false)

      
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center ">
      <div className="w-full max-w-md">
      
            <div className="text-center">
              <div className="flex justify-center mb-4">
                
              </div>
              <h1 className="text-2xl font-bold text-[#060606] mb-5">SIGNUP</h1>
            </div>
          {/* </CardHeader>
          <CardContent> */}
            <form  className="space-y-6" onSubmit={HandleSignup}>

               
              <div className="space-y-2">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  </div>
                  <input
                    type="text"
                    placeholder="Username"
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4D49B3] focus:border-transparent outline-none"
                    value={formData.username}
                    onChange={(e) => setFormData({...formData, username: e.target.value})}
                    required
                  />

                </div>
                
              </div>

              

              <div className="space-y-2">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  </div>
                  <input
                    type="email"
                    placeholder="Email Address"
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4D49B3] focus:border-transparent outline-none"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  </div>
                  <input
                    type="tel"
                    placeholder="Phone Number"
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4D49B3] focus:border-transparent outline-none"
                    value={formData.phonenumber}
                    onChange={(e) => setFormData({...formData, phonenumber: e.target.value})}
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  </div>
                  <input
                    type="password"
                    placeholder="Password"
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4D49B3] focus:border-transparent outline-none"
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  </div>
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4D49B3] focus:border-transparent outline-none"
                    value={formData.confirm}
                    onChange={(e) => setFormData({...formData, confirm: e.target.value})}
                    required
                  />
                </div>
              </div>
             

              <div className="flex items-center justify-between">
               
               
              </div>

              <button 
            type="submit" 
            
            className="w-full bg-[#0e0e0f] hover:bg-[#3d3a8f] text-white py-2 px-4 rounded-lg transition-colors duration-200"
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
              "Sign in"
            )}
          </button>
            </form>

            <div className="mt-6 text-center text-sm">
              <span className="text-gray-600">Alredy have an account ?</span>
              <a href="#" className="font-medium text-[#4D49B3] hover:text-[#3d3a8f]">
                Login 
              </a>
            </div>
          {/* </CardContent>
        </Card> */}
      </div>
    </div>
  );
};

export default Signup;