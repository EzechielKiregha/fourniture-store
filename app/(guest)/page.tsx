import React from 'react'
import Navbar from './_components/navbar'
import Banniere from './_components/banierre'
import Footer from './_components/footer'

function Home() {
    return (
        <>
            <Navbar admin={false}/>
            <div className="relative">
                
                <Banniere />
                <div className="pt-20">
                    <Footer/>
                </div>
            </div>
        </>
    )
}

export default Home