import React from 'react'

function Banniere() {
    return (
        <div className="relative w-full h-screen overflow-hidden">
            <div 
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{
                    backgroundImage: "url('/fond.jpg')",
                    backgroundAttachment: "fixed"
                }}
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-center text-white p-4">
                <h2 className="text-4xl font-bold mb-4">Un bon confort pour un bon repos</h2>
                <p className="text-xl mb-8 max-w-2xl">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
                    sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip 
                    ex ea commodo consequat.
                </p>
                <div className="space-x-4">
                    <a href="#menu" className="bg-red-600 text-white text-xl py-2 px-4 rounded hover:bg-red-700 transition duration-300">
                        Notre Collection
                    </a>
                    <a href="Pay.html" className="bg-gray-600 text-white text-xl py-2 px-4 rounded hover:bg-gray-700 transition duration-300">
                        Commander
                    </a>
                </div>
            </div>  
        </div>
    )
}

export default Banniere