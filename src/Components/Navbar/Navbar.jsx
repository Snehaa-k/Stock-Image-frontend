import React, { useState, useEffect } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";

export function NavbarSimple() {
  const [openNav, setOpenNav] = useState(false);
  const [emoji, setEmoji] = useState("");
  const token = localStorage.getItem("accessToken");
  const navigate = useNavigate()


  
  const emojis = [
    "😀", "😁", "😂", "😃", "😄", "😅", "😆", "😉", "😊", "😎", "😍", "🥰", "😘",
    "🥳", "😜", "🤩", "😋", "😛", "😝", "😒", "🙃", "😏", "😌", "😔", "😣", "😖",
    "😞", "😟", "😤", "😢", "😭", "😥", "😓", "😩", "😬", "🤐", "😯", "😦", "😧",
    "😮", "😲", "😳", "🥺", "😱", "😨", "🤯", "😵", "😲"
  ];

  
  useEffect(() => {
    const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
    setEmoji(randomEmoji);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    if(token){

    navigate('/login');
    }
    
  };

  return (
    <nav className="bg-black shadow-md px-4 py-3 lg:px-8">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="text-xl font-bold text-white">
          ImageGallary
        </a>

       
        <div className="hidden lg:flex items-center space-x-6">
          <a href="#" className="text-white hover:text-gray-500 transition">
            Gallary Images
          </a>
          
        </div>

        
        <div className="flex items-center space-x-4">
          {emoji && (
            <span className="text-2xl">{emoji}</span> 
          )}
          <button
            onClick={handleLogout}
            className="text-white bg-blue-950 px-4 py-2 rounded-[6px] hover:bg-gray-600  transition"
          >
            Logout
          </button>
        </div>

        {/* Mobile Menu Icon */}
        <button
          className="lg:hidden text-gray-700 focus:outline-none"
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <XMarkIcon className="h-6 w-6" />
          ) : (
            <Bars3Icon className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {openNav && (
        <div className="lg:hidden mt-4 space-y-2">
          <a href="#" className="block text-dark-700 hover:text-gray-500">
            Gallary Images
          </a>
          
        </div>
      )}
    </nav>
  );
}
