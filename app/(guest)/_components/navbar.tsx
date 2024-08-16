"use client"
import { Button } from '@/components/ui/button'
import React, { useState, useEffect, useRef } from 'react'
import { adminLinks, navLinks } from './constants'
import Logo from './logo'
import { Menu, X } from 'lucide-react'
import Link from 'next/link'

interface NavProps{
    admin : boolean,
    auth : boolean,
}

function Navbar(
    { admin, auth } : NavProps
) {
    const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const mobileMenuRef = useRef(null);

    useEffect(() => {
        
        const handleScroll = () => {
            const isScrolled = window.scrollY > 10;
            if (isScrolled !== scrolled) {
                setScrolled(isScrolled);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [scrolled]);

    const toggleNavbar = () => {
        setMobileDrawerOpen(prevState => !prevState);
    }

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 py-2 transition-all duration-700 ${
            scrolled && !admin ? 'bg-white shadow-md text-black' : (scrolled ? 'bg-white shadow-md text-black' : 'bg-black text-white' )
        }`}>
            {!admin ? (
                <div className="container px-4 mx-auto relative text-sm ">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center flex-shrink-0">
                            <div className="flex flex-row px-2 py-0">
                                <Logo/>
                                <h1 className="text-3xl font-bold">
                                    <span className="text-red-600">F</span>urniture <span className="text-red-600">D</span>esign
                                </h1>
                            </div>
                        </div>
                        <ul className="hidden lg:flex lg:flex-row">
                            {navLinks.map((item, index) => (
                                <li key={index}>
                                    <Link href={item.href}>
                                    <Button size="sm" variant="link" className={`font-bold hover:text-red-600 ${scrolled ? 'text-black' : 'text-white'}`}>
                                        {item.label}
                                    </Button>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                        <div className="hidden lg:flex justify-center">
                            <Button variant='link' size='sm' className='bg-red-600 text-white hover:bg-red-700'>
                                Commander
                            </Button>
                        </div>

                        <div className="lg:hidden md:flex flex-col justify-end">
                            <button onClick={toggleNavbar}>
                                {mobileDrawerOpen ? <X/> : <Menu/>}
                            </button>
                        </div>
                        <div 
                            ref={mobileMenuRef} 
                            className={`fixed top-0 left-0 right-0 z-20 bg-white text-black 
                                shadow-lg p-6 lg:hidden
                                transform transition-all duration-900 ease-in-out
                                ${mobileDrawerOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}`}
                        >
                            <div className="flex items-center flex-shrink-0">
                                <div className="flex flex-row px-2 py-0">
                                    <Logo/>
                                    <h1 className="text-3xl font-bold">
                                        <span className="text-red-600">F</span>urniture <span className="text-red-600">D</span>esign
                                    </h1>
                                </div>
                            </div>
                            <button onClick={toggleNavbar} className="absolute top-4 right-4">
                                <X />
                            </button>
                            <ul className="mt-8">
                                {navLinks.map((item, index) => (
                                    <li key={index} className="my-4">
                                        <Button size="sm" variant="link" className='font-bold hover:text-red-600'>
                                            {item.label}
                                        </Button>
                                    </li>
                                ))}
                            </ul>
                            <div className="flex items-center mt-6">
                                <Button variant='link' size='sm' className='bg-red-600 text-white hover:bg-red-700'>
                                    Commander
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="container px-4 mx-auto relative text-sm ">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center flex-shrink-0">
                            <div className="flex flex-row px-2 py-0">
                                <Logo/>
                                <h1 className="text-3xl font-bold">
                                    <span className="text-red-600">F</span>urniture <span className="text-red-600">D</span>esign
                                </h1>
                            </div>
                        </div>
                        <ul className="hidden lg:flex lg:flex-row">
                            {!auth && adminLinks.map((item, index) => (
                                <li key={index}>
                                    <Link href={item.href}>
                                    <Button size="sm" variant="link" className={`font-bold hover:text-red-600 ${scrolled ? 'text-black' : 'text-white'}`}>
                                        {item.label}
                                    </Button>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                        <div className="hidden lg:flex justify-center">
                            <Button variant='destructive' size='sm' className='bg-red-600 text-white hover:bg-red-700'>
                                Deconnecter
                            </Button>
                        </div>

                        <div className="lg:hidden md:flex flex-col justify-end">
                            <button onClick={toggleNavbar}>
                                {mobileDrawerOpen ? <X/> : <Menu/>}
                            </button>
                        </div>
                        <div 
                            ref={mobileMenuRef} 
                            className={`fixed top-0 left-0 right-0 z-20 bg-white text-black 
                                shadow-lg p-6 lg:hidden
                                transform transition-all duration-900 ease-in-out
                                ${mobileDrawerOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}`}
                        >
                            <div className="flex items-center flex-shrink-0">
                                <div className="flex flex-row px-2 py-0">
                                    <Logo/>
                                    <h1 className="text-3xl font-bold">
                                        <span className="text-red-600">F</span>urniture <span className="text-red-600">D</span>esign
                                    </h1>
                                </div>
                            </div>
                            <button onClick={toggleNavbar} className="absolute top-4 right-4">
                                <X />
                            </button>
                            <ul className="mt-8">
                                {!auth && adminLinks.map((item, index) => (
                                    <li key={index} className="my-4">
                                        <Button size="sm" variant="link" className='font-bold hover:text-red-600'>
                                            {item.label}
                                        </Button>
                                    </li>
                                ))}
                            </ul>
                            <div className="flex items-center mt-6">
                                <Button variant='destructive' size='sm' className='bg-red-600 text-white hover:bg-red-700'>
                                    Deconnecter
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    )
}

export default Navbar