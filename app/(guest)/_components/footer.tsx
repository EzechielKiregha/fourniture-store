"use client"

import { AdminConnection } from '@/components/modal/admin-con'
import { Button } from '@/components/ui/button'
import { LayoutDashboard } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'

const Footer = () => {

    const nav = useRouter()

    const authenticateAdmin = () => {
        nav.push('/auth-admin');
    }

    return (
        <>
            <div className="flex flex-row justify-center items-center my-3">
                <p>copyright 2024 <a href="#">Exau Sam</a> xpl agency & accademy. Tous droits reservé</p>
                <div className="flex flex-row justify-end space-x-4 items-end mr-0">
                    <AdminConnection onConfirm={authenticateAdmin}>
                        <Button variant="link" size='sm'>
                            <LayoutDashboard className='text-red-700 mr-2'/>
                            <span className="text-red-700">admin</span>
                        </Button>
                    </AdminConnection>
                </div>
            </div>
            
        </>
        
    )
}

export default Footer