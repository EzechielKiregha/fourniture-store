import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req : NextRequest) {
    try {

        const { name } = await req.json()

        console.log('Nom :', name)

        const Product = await db.product.create({
            data : {
                name : name,
            }
        })

        if(!Product){
            return new NextResponse("Table Creation Failed",{status : 500})
        }

        return NextResponse.json(Product)
        
    } catch (error) {
        console.log("Failed Error: ", )
        return new NextResponse('Internal Error', {status : 500})
    }
}

export async function GET(){
    try {
        const product = await db.product.findMany()
        console.log("Products fetched:", product); 
        if (product.length === 0){
            return new NextResponse('No products found', {status : 404})
        }
        return NextResponse.json(product)
    } catch (error) {
        console.log("Error Fetching the Product:", error)
        return new NextResponse("internal error", {status : 500})
    }
}