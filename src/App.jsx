import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";
import Home from './pages/user/Home/HomePage';
import 'react-toastify/dist/ReactToastify.css';

import { ToastContainer,toast} from 'react-toastify';
import { NavbarSimple } from "./Components/Navbar/Navbar";
import { DefaultGallery } from "./Components/GallaryImages/GallaryImages";
import ImageGallery from "./pages/user/Gallery/ImageGallery";
import PasswordReset from "./pages/user/passwordreset/Reset/ResetPassword";
import ResetPassword from "./pages/user/passwordreset/Newpassword/NewPassword";


function App() {
  
    

  return (
    <>
     <div>
    
      <ToastContainer 
        position="top-right" 
        autoClose={5000} 
        hideProgressBar={false} 
        newestOnTop={false} 
        closeOnClick 
        rtl={false} 
        pauseOnFocusLoss 
        draggable 
        pauseOnHover
      />
      <Router >
      <Routes>
      <Route path="/"  element={<Navigate to="/login" />}/>
      <Route path="/:mode" element={<Home/>} />
      {/* <Route path="/nav" element={<NavbarSimple/>} /> */}
      {/* <Route path="/gallary" element={<DefaultGallery/>} /> */}
      <Route path="/gallary" element={<ImageGallery/>} />
      <Route path="/reset" element={<PasswordReset/>} />
      <Route path="/password-reset-confirm/:id/:token" element={<ResetPassword/>} />
      
      
      
      </Routes>
      
      </Router>
   
   
      </div>
    </>
  )
}

export default App
