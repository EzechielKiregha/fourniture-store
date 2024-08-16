// pages/api/verifyOTP.ts
import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import bcrypt from 'bcryptjs'
import { sign } from 'jsonwebtoken'
import { readFileSync } from 'fs'

export async function POST(req: NextRequest) {
    const { phone, otp } = await req.json()

    try {
        // Find the most recent OTP for this phone number
        const latestOtp = await db.optCode.findFirst({
            where: {
                phone: phone,
                expiresAt: {
                    gt: new Date() // Check if the OTP hasn't expired yet
                }
            },
            orderBy: {
                createdAt: 'desc'
            }
        })

        if (!latestOtp) {
            return new NextResponse('Invalid or expired OTP', { status: 400 })
        }

        // Verify OTP
        const hashedOtp = await bcrypt.hash(otp.toString(), 10)
        const isValidOtp = await bcrypt.compare(otp, latestOtp.otp)

        if (!isValidOtp) {
            return new NextResponse('Invalid OTP', { status: 400 })
        }

        // Find the admin
        const admin = await db.admin.findFirst({
            where: {
                phone: phone
            }
        })

        if (!admin) {
            return new NextResponse('Admin not found', { status: 404 })
        }

        // Create a JWT token
        // var privateKey = readFileSync('private.key');
        // const token = sign(
        //     { id: admin.id, email: admin.email },
        //     privateKey,
        //     { expiresIn: '1h' }
        // )

        // Delete the used OTP
        await db.optCode.delete({
            where: {
                id: latestOtp.id
            }
        })

        // Return the token
        return new NextResponse('success login', {status : 200})

    } catch (error) {
        console.error('Error verifying OTP:', error)
        return new NextResponse('Internal server error', { status: 500 })
    }
}