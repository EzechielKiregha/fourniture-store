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
import { cn } from '@/lib/utils'
import { Textarea } from '@/components/ui/textarea'
import { Product } from '@prisma/client'

interface DescriptionFormProps {
    initialData : Product
    productId : string
}

const formSchema = z.object(
    {
        description : z.string().min(1, {
            message : "Description est obligatoire"
        })
    }
)

const DescriptionForm = ({
    initialData,
    productId
} : DescriptionFormProps) => {

    const [isEditing, setIsEditing] = useState(false);
    const router = useRouter()

    const toggleEdit = () => setIsEditing((current) => !current)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver : zodResolver(formSchema),
        defaultValues : {
            description : initialData?.description || ""
        }
    })

    const { isSubmitting, isValid } = form.formState

    const onSubmit = async (values : z.infer<typeof formSchema>) => {
        try {
            await axios.patch(`/api/product/${productId}`, values)
            toast.success("product Updated Successfully")
            toggleEdit()
            router.refresh()
        } catch {
            toast.error("Something Went Wrong")
        }
    }
  return (
    <div className="mt-6 border bg-slate-100 dark:bg-slate-800 dark:text-slate-200 p-4 rounded-md">
        <div className="flex font-medium items-center justify-between">
            Description du produit
            <Button onClick={toggleEdit} variant="ghost">
                {isEditing ? (
                    <>Anuler</>
                ) : (
                    <>
                        <Pencil className="h-4 w-4 mr-2"/>
                        Modifier la description
                    </>
                )}
                
            </Button>
        </div>
        {!isEditing && (
            <p className={ cn(
                "text-sm mt-2",
                !initialData.description && "text-slate-500 italic"
            ) }>
                {initialData.description || "No Description"}
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
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Textarea
                                    disabled={isSubmitting}
                                    placeholder="e.g 'Ce produit est apropos de ...'"
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

export default DescriptionForm