import { db } from "@/lib/db";
import { Product } from "@prisma/client";
import axios from "axios";
import { CircleDollarSign, File, Image, LayoutDashboard, ListChecks } from "lucide-react";
import { redirect } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import NameForm from "../_components/name-form";
import DescriptionForm from "../_components/description-form";
import ImageForm from "../_components/image-form";
import PriceForm from "../_components/price-form";
import Navbar from "@/app/(guest)/_components/navbar";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowBack } from "@mui/icons-material";

const ProductPage = async (
    { params } : { params : { productId : string }}
) => {

    const productId = params.productId;

    const product  = await db.product.findUnique({
        where : {
            id : productId
        }
    })
    if (!product){
        toast.error('product not found')
        redirect('/admin-side/')
    }

    return (
        <>
        <Navbar admin={true} auth={false}/>
        <div className="mt-20 m-4">
            
            <div className="flex items-center justify-between">
                <div className="gap-y-2 flex flex-col">
                    <h1 className="text-2xl font-medium">
                        Tout Concernant {product?.name}
                    </h1>
                </div>
                <Link href='/admin-side'>
                    <Button variant="link" className={`font-bold hover:text-red-600 text-black`}>
                        <ArrowBack/>retour a la table de produits
                    </Button>
                </Link>
            </div>
            <div className="grid grid-clos-1 md:grid-cols-2 gap-6 mt-16">
                <div>
                    <div className="flex items-center gap-x-2">
                        <LayoutDashboard className="h-6 w-6 mr-2" />
                        <h2 className="text-xl">
                            Personnalizer ton product
                        </h2>
                    </div>
                    <ImageForm
                        initialData={product}
                        productId={product.id} />
                    <NameForm
                        initialData={product}
                        productId={product.id} />
                    <DescriptionForm
                        initialData={product}
                        productId={product.id} />
                    
                    
                </div>
                <div className="space-y-2">
                    <div>
                        <div className="flex items-center gap-x-2">
                            <CircleDollarSign className="h-6 w-6" />
                            <h2 className="text-xl">
                                Concerant le prix du produit
                            </h2>
                        </div>
                        <PriceForm
                            initialData={product}
                            productId={product.id} />
                    </div>
                    <div>
                        <div className="flex items-center gap-x-2">
                            <Image />
                            <h2 className="text-xl">
                                Autres Photos
                            </h2>
                        </div>
                    </div>
                </div>

            </div>
        </div></>
    )
}

export default ProductPage