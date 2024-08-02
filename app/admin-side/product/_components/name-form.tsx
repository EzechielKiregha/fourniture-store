"use client"

import * as z from 'zod'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { zodResolver } from '@hookform/resolvers/zod'

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage
} from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Pencil } from 'lucide-react'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'

interface NameFormProps {
    initialData : {
        name : string
    }
    productId : string
}

const formSchema = z.object(
    {
        name : z.string().min(1, {
            message : "Nom est obligatoire"
        })
    }
)

const NameForm = ({
    initialData,
    productId
} : NameFormProps) => {

    const [isEditing, setIsEditing] = useState(false);
    const router = useRouter()

    const toggleEdit = () => setIsEditing((current) => !current)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver : zodResolver(formSchema),
        defaultValues : initialData
    })

    const { isSubmitting, isValid } = form.formState

    const onSubmit = async (values : z.infer<typeof formSchema>) => {
        try {
            await axios.patch(`/api/product/${productId}`, values)
            toast.success("Produit Modifier avec succes")
            toggleEdit()
            router.refresh()
        } catch {
            toast.error("Something Went Wrong")
        }
    }

  return (
    <div className="mt-6 border bg-slate-100 dark:bg-slate-800 dark:text-slate-200 p-4 rounded-md">
        <div className="flex font-medium items-center justify-between">
            Nom du Produit
            <Button onClick={toggleEdit} variant="ghost">
                {isEditing ? (
                    <>Anuler</>
                ) : (
                    <>
                        <Pencil className="h-4 w-4 mr-2"/>
                        Modifier le Nom
                    </>
                )}
                
            </Button>
        </div>
        {!isEditing && (
            <p className="text-sm mt-2">
                {initialData.name}
            </p>
        )}
        {isEditing && (
            <Form {...form}>
                <form 
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4 mt-4"
                >
                    <FormField 
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input
                                disabled={isSubmitting}
                                placeholder="e.g Python Essentials"
                                {...field }
                                />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                    />
                    <div className="flex items-center gap-x-2">
                        <Button 
                        disabled = {!isValid || isSubmitting}
                        type="submit"
                        >
                            Save
                        </Button>
                    </div>

                </form>
            </Form>
        )}
    </div>
  )
}

export default NameForm