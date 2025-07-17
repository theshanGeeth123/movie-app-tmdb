import React from 'react'
import {Link} from 'react-router-dom'

function NavBar() {
  return (
    <>

        <nav className='bg-black text-white h-15 flex justify-between px-20 max-sm:flex-col max-sm:items-center max-sm:justify-center max-sm:h-30 fixed w-full '>
            <div className='text-blue-300 my-auto text-[16px] sm:text-[18px] md:text-[20px] lg:text-[22px] font-medium
            '>
                <Link className='bg-gradient-to-l from-blue-500 to-blue-100 bg-clip-text text-transparent' to="/home">Movie App</Link>
            </div>

            <div className='my-auto text-[13px] sm:text-[14px] md:text-[15px] lg:text-[16px] font-bold max-sm:flex flex-col justify-center items-center text-blue-200 '>
               <Link className='sm:mr-13  transition-colors duration-200  hover:text-blue-300  ' to="/home">Home</Link>
                <Link className='transition-colors duration-200 hover:text-red-300' to="/favourites">Favourites</Link>
            </div>
        </nav>
    </>
  )
}

export default NavBar
