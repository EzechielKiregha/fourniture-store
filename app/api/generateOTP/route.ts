// pages/api/generateOTP.js
import crypto from 'crypto'
import twilio from 'twilio'
import bcrypt from 'bcryptjs'
import { db } from '@/lib/db'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
    const data = await req.json()

    // Check if the phone number belongs to an admin
    const admin = await db.admin.findFirst({
        where: {
            phone: data.phone
        }
    })

    if (!admin) {
        return new NextResponse('Unauthorized', { status: 401 })
    }

    // Generate a six digit number using the crypto module
    const otp = crypto.randomInt(100000, 999999)

    // Hash the OTP
    const hashedOtp = await bcrypt.hash(otp.toString(), 10)

    // Initialize the Twilio client
    const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN)

    try {
        // Send the OTP via SMS
        await client.messages.create({
            body: `Cher Administrateur de Fourniture Design Store, \n
            Votre code de verification est  ${otp}`,
            from: process.env.TWILIO_PHONE_NUMBER,
            to: data.phone,
        })

        // Store the hashed OTP in the database along with the phone number and expiry time
        const optCode = await db.optCode.create({
            data: {
                phone: data.phone,
                otp: hashedOtp,
                expiresAt: new Date(Date.now() + 10 * 60 * 1000), // 10 minutes from now
            }
        })

        if (!optCode) {
            return new NextResponse('Failed to create OTP', { status: 500 })
        }

        // Respond with a success status
        return NextResponse.json({ message: 'OTP sent successfully' })
    } catch (err) {
        console.error(err)
        return new NextResponse('Could not send OTP', { status: 500 })
    }
}