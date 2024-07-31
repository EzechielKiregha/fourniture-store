import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req : NextRequest) {
    try {

        const data = await req.json()
        const {productName} = data

        if(!productName){
            return new NextResponse("Name is Missing", {status : 301})
        }

        const Product = await db.product.create({
            data : {
                name : productName,
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