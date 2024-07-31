
import { Button } from '@/components/ui/button'
import { redirect } from 'next/navigation';
import { useRouter } from 'next/router'
import React from 'react'

function Dashboard() {

    const nav = (link : string) => {
        return redirect(link);
    }

    return (
        <div className="">
            <h1 className="text-4xl">Mes Produits</h1>
            <a href='/admin-side/create' ><Button>Create Product</Button></a>
        </div>
    )
}

export default Dashboard