"use client"

import React from 'react'
import {
    Form,
    FormField,
    FormControl,
    FormItem,
    FormLabel,
    FormMessage,
    FormDescription
} from '@/components/ui/form'
import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import toast from 'react-hot-toast'

const formSchema = z.object({
    name : z.string().min(1, {
        message : 'ce champ ne doit etre vide'
    })
})

function CreateProduct() {

    const router = useRouter()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver : zodResolver(formSchema),
        defaultValues : {
            name : ""
        }
    })

    const { isSubmitting, isValid } = form.formState;

    const onSubmit = async (values : z.infer<typeof formSchema>) => {
        try {
            
            const response = await axios.post('/api/product', values)
            if(response.status === 200){
                console.log("Product Created")
                router.push(`/admin-side/product/${response.data.id}`)
                toast.success('Produit ajouter avec succes')
            } else {
                toast.error('Echec ')
            }
        } catch (error) {
            console.log('Something went wrong')
            toast.error('Echec interne ! ')
        }
    }

    return (
        <div className="max-w-5xl mx-auto flex items-center justify-center h-full p-44">
            <div>
                <h1 className="text-2xl">
                    Le nom du produit
                </h1>
                <p className="text-sm text-slate-500">
                    Quel nom voudriez-vous donne a votre produit.
                </p>
                <Form {...form}>
                    <form 
                        onSubmit={form.handleSubmit(onSubmit)}
                        className='pt-8 space-y-8'
                    >
                        <FormField
                            control={form.control}
                            name="name"
                            render={({field}) => (
                            <FormItem>
                                <FormLabel >
                                    Nom du produit
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        disabled = {isSubmitting}
                                        placeholder='eg. table'
                                        {...field}
                                    />
                                </FormControl>
                                <FormDescription >
                                    Tu peux toujours change ce nom de produit plutard
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                            )}
                        />
                        <div className="flex items-center gap-x-6">
                            <Button onClick={() => router.push('/admin-side/')} type='button' variant='ghost'>
                                Anuler
                            </Button>
                            <Button
                                disabled={!isValid || isSubmitting}
                                type='submit'
                            >
                                Continuer
                            </Button>
                        </div>
                    </form>
                </Form>
            </div>
        </div>
    )
}

export default CreateProduct