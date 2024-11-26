import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import Login from "../../../Components/Login/Login";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Avatar,
} from "@material-tailwind/react";
import Signup from "../../../Components/Signup/Signup";

const Home = () => {
  const { mode } = useParams();
  const navigate = useNavigate();

  const renderContent = () => {
    if (mode === "login") {
      return <Login />;
    } else if (mode === "signup") {
      return <Signup/>;
    } else {
      return <Login />;
    }
  };

  const handleToggle = () => {
    if (mode === "signup") {
      navigate("/login");
    } else {
      navigate("/signup");
    }
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen h-[720px]">
      {/* Left Section */}
      <div className="w-full lg:w-1/2 relative h-[730px]">
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/30 z-10"></div>
        <img
          src="https://images.unsplash.com/photo-1552960562-daf630e9278b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
          alt="Background"
          className="object-cover w-full h-full mt-0"
        />
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center  text-white z-20 p-8">
          <Card shadow={false} className="max-w-sm w-full bg-opacity-60 bg-white p-6 rounded-lg">
            <CardHeader className="flex justify-center">
              
            </CardHeader>
            <CardBody className="text-center">
              <Typography variant="h5" className="font-semibold">
                IMAGE GALLEGRY
              </Typography>
              <Typography variant="body2" className="text-gray-600 mt-2">
                How we design and code open-source projects with creativity and
                efficiency.
              </Typography>
            </CardBody>
          </Card>
        </div>
      </div>

      {/* Right Section */}
      <div className="w-full lg:w-1/2 bg-white flex flex-col justify-center items-center p-8">
        {/* Toggle Button */}
        <div className="self-end mt-[50px]">
          <button
            onClick={handleToggle}
            className="px-4 py-2 bg-[#060606] text-white rounded-md shadow-lg"
          >
            {mode === "signup" ? "Login" : "Sign Up"}
          </button>
        </div>

        {/* Main Content */}
        <div className="w-full max-w-md mt-[-50px]">
          {renderContent()}
        </div>

      </div>
    </div>
  );
};

export default Home;
