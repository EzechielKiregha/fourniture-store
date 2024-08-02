import { db } from "@/lib/db";
import { NextApiRequest } from "next";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
    { params } : { params : { productId : string }} 
){
    
    const productId  = params.productId

    try {
        const product = await db.product.findUnique({
            where : {
                id : productId
            }
        })
        if (!product){
            return new NextResponse('product not found', {status : 404})
        }
        return NextResponse.json(product)
    } catch (error) {
        console.log("Error Fetching the Porduct")
        return new NextResponse("internal error", {status : 500})
    }


}
export async function PATCH(req : NextRequest){

}