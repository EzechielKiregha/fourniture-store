"use client"

import React, { useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import Navbar from '@/app/(guest)/_components/navbar'
import { Button } from '@/components/ui/button'

const phoneSchema = z.object({
    phone: z.string().min(10, { message: 'Le numéro de téléphone doit avoir au moins 10 chiffres' })
})

const otpSchema = z.object({
    otp: z.string().length(6, { message: 'L\'OTP doit contenir 6 chiffres' })
})

type PhoneFormValues = z.infer<typeof phoneSchema>;
type OtpFormValues = z.infer<typeof otpSchema>;

function AdminLogin() {
    const [step, setStep] = useState(1)
    const [phone, setPhone] = useState("")
    const router = useRouter()

    const { register: registerPhone, handleSubmit: handlePhoneSubmit, formState: { errors: phoneErrors, isSubmitting: isPhoneSubmitting } } = useForm<PhoneFormValues>({
        resolver: zodResolver(phoneSchema)
    })

    const { register: registerOtp, handleSubmit: handleOtpSubmit, formState: { errors: otpErrors, isSubmitting: isOtpSubmitting } } = useForm<OtpFormValues>({
        resolver: zodResolver(otpSchema)
    })

    const onPhoneSubmit: SubmitHandler<PhoneFormValues> = async (data) => {
        try {
            const response = await axios.post('/api/generateOTP', data)
            if (response.status === 200) {
                setPhone(data.phone)
                setStep(2)
                toast.success('OTP envoyé avec succès')
            } else {
                toast.error('Échec de l\'envoi de l\'OTP')
            }
        } catch (error) {
            console.log('Something went wrong', error)
            toast.error('Erreur interne!')
        }
    }

    const onOtpSubmit: SubmitHandler<OtpFormValues> = async (data) => {
        try {
            const response = await axios.post('/api/verifyOTP', { ...data, phone })
            if (response.status === 200) {
                router.push('/admin-side')
                toast.success('Connexion réussie')
            } else {
                toast.error('OTP invalide')
            }
        } catch (error) {
            console.log('Something went wrong', error)
            toast.error('Erreur interne!')
        }
    }

    return (
        <>
            <Navbar admin={true} auth={true} />
            <div className="max-w-5xl mx-auto flex items-center justify-center h-full p-44">
                <div>
                    <h1 className="text-2xl">
                        Authentification de l'administrateur
                    </h1>
                    <p className="text-sm text-slate-500">
                        {step === 1 ? "Entrez votre numéro de téléphone" : "Entrez l'OTP reçu"}
                    </p>
                    {step === 1 ? (
                        <form onSubmit={handlePhoneSubmit(onPhoneSubmit)} className='pt-8 space-y-8'>
                            <div>
                                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                                    Numéro de téléphone
                                </label>
                                <input
                                    type="text"
                                    id="phone"
                                    {...registerPhone('phone')}
                                    className="mt-1 block w-full p-2 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                    placeholder="Entrez votre numéro de téléphone"
                                />
                                {phoneErrors.phone && <p className="mt-2 text-sm text-red-600">{phoneErrors.phone.message}</p>}
                            </div>
                            <div className="flex items-center gap-x-6">
                                <Button
                                    type="button"
                                    onClick={() => router.push('/')}
                                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                                >
                                    Annuler
                                </Button>
                                <Button
                                    type="submit"
                                    disabled={isPhoneSubmitting}
                                >
                                    Envoyer OTP
                                </Button>
                            </div>
                        </form>
                    ) : (
                        <form onSubmit={handleOtpSubmit(onOtpSubmit)} className='pt-8 space-y-8'>
                            <div>
                                <label htmlFor="otp" className="block text-sm font-medium text-gray-700">
                                    OTP
                                </label>
                                <input
                                    type="text"
                                    id="otp"
                                    {...registerOtp('otp')}
                                    className="mt-1 block w-full p-4 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                    placeholder="Entrez l'OTP reçu"
                                />
                                {otpErrors.otp && <p className="mt-2 text-sm text-red-600">{otpErrors.otp.message}</p>}
                            </div>
                            <div className="flex items-center gap-x-6">
                                <Button
                                    type="button"
                                    variant="ghost"
                                    onClick={() => setStep(1)}
                                >
                                    Retour
                                </Button>
                                <Button
                                    type="submit"
                                    variant="default"
                                    disabled={isOtpSubmitting}
                                >
                                    Vérifier OTP
                                </Button>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </>
    )
}

export default AdminLogin