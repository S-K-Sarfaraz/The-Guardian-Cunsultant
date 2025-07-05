import React from 'react'
import Image from 'next/image'
import logo from './../assets/logosaas.png'
import { SocialIcon } from 'react-social-icons';

function Footer() {
  return (
    <footer className='bg-black text-[#bcbcbc] text-sm py-10 text-center'>
      <div className='container'>
        <div className='inline-flex relative before:content-[""] before:h-full before:top-2 before:bottom-0 before:blur before:w-full before:bg-[linear-gradient(to_right,#f87bff,#fb92cf,#ffdd9b,#c2f0b1,#2fd8fe)] before:absolute'>
            <Image src={logo} alt='Logo' height={40} width={40} className='relative'/>
        </div>
        <nav className='flex flex-col md:flex-row md:justify-center gap-6 mt-6 '> 
          <a href="#">About</a>
          <a href="#">Features</a>
          <a href="#">Customer</a>
          <a href="#">Pricing</a>
          <a href="#">Help</a>
        </nav>
        <div className='flex justify-center gap-3 mt-6'>
            <SocialIcon 
                url="https://x.com/" 
                style={{ height: 35, width: 35 }} 
                bgColor="#000000" 
                fgColor="#bcbcbc" 
                network="x" 
            />
            <SocialIcon 
                url="https://instagram.com/" 
                style={{ height: 35, width: 35 }} 
                bgColor="#000000" 
                fgColor="#bcbcbc" 
                network="instagram" 
            />
            <SocialIcon 
                url="https://linkedin.com/" 
                style={{ height: 35, width: 35 }} 
                bgColor="#000000" 
                fgColor="#bcbcbc" 
                network="linkedin" 
            />
            <SocialIcon 
                url="https://pinterest.com/" 
                style={{ height: 35, width: 35 }} 
                bgColor="#000000" 
                fgColor="#bcbcbc" 
                network="pinterest" 
            />
            <SocialIcon 
                url="https://youtube.com/" 
                style={{ height: 35, width: 35 }} 
                bgColor="#000000" 
                fgColor="#bcbcbc" 
                network="youtube" 
            />
        </div>
        <p className='mt-6'>&copy; 2024 Your Company, Inc. All rights reserved</p>
      </div>
    </footer>
  )
}

export default Footer;
