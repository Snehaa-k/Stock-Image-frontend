import React from 'react'
import { NavbarSimple } from '../../../Components/Navbar/Navbar'
import { DefaultGallery } from '../../../Components/GallaryImages/GallaryImages'

const ImageGallery = () => {


  return (
    <div>
    <div>
         <NavbarSimple/>
    </div>
    <div className='text-center text-xl text-black mt-5'>
        GALLARY
    </div>
    <div>
        <DefaultGallery/>
    </div>
    </div>
    
  )
}

export default ImageGallery