"use client"

import { useEffect, useMemo, useState} from 'react'
import { MaterialReactTable } from 'material-react-table';
import { Box, Container, IconButton, Typography } from '@mui/material';
import {
    Edit as EditIcon,
    Delete as DeleteIcon,
} from '@mui/icons-material';
import axios from 'axios';
import Link from 'next/link';
import { Product } from '@prisma/client';


const ProductTable = () => {

    const [allProducts, setAllProducts] = useState<Product[] >([])
    const [loading, setLoading] = useState(true)

    

    useEffect(() => {
        const GetData = async () => {
            try {
                const res = await axios.get(`api/product/`);
                console.log("API response:", res.data); // Add this line
                setAllProducts(res.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        }
        GetData();
    },[])

    const columns = useMemo(
        () => [
        {
            accessorKey: 'name', //access nested data with dot notation
            header: 'nom du produit',
            size: 150,
        },
        {
            accessorKey: 'description',
            header: 'Description',
            size: 250,
        },
        {
            accessorKey: 'price',
            header: 'Prix',
            size: 150,
        },
        // {
        //     accessorKey: 'imageUrl',
        //     header: "lien d'image",
        //     size: 150,
        // },
        
        ],
        [],
    );
    const centerStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
    };

    if (loading) {
        return (
            <Box sx={centerStyle}>
                <Typography variant="h6">Chargement des données...</Typography>
            </Box>
        );
    }

    if (allProducts.length === 0) {
        return (
            <Box sx={centerStyle}>
                <Typography variant="h6">Aucun produit n'a été trouvé.</Typography>
            </Box>
        );
    }

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <MaterialReactTable
                columns={columns} 
                data={allProducts}
                enableRowActions
                renderRowActions={({row}) => (
                    <Box sx={{ display: 'flex', flexWrap: 'nowrap', gap: '8px' }}>
                        <Link href={`/admin-side/product/${row.original.id}`}>
                            <IconButton color="secondary">
                                <EditIcon />
                            </IconButton>
                        </Link>
                        <Link href={`/admin-side/product/${row.original.id}`}>
                            <IconButton color="error" >
                                <DeleteIcon />
                            </IconButton>
                        </Link>
                    </Box>
                )}
            />
        </Container>
    )
}

export default ProductTable