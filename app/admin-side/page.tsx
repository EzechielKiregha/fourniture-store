
import { Button } from '@/components/ui/button'
import Link from 'next/link';
import React from 'react'
import Navbar from '../(guest)/_components/navbar';
import ProductTable from './product/_components/table';

function Dashboard() {

    return (
        <>
            <Navbar admin={true}/>
            <div className="mt-20 flex flex-row justify-between items-center m-4">
                <h1 className="text-4xl">Mes Produits</h1>
                <Link href='/admin-side/create' ><Button>creer un nouveau produit</Button></Link>
            </div>
            <ProductTable/>
        </>
    )
}

export default Dashboard