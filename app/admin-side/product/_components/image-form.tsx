"use client"
import { Button } from '@/components/ui/button'
import { Product } from '@prisma/client'
import { ImageIcon, Pencil, PlusCircle, UploadCloud } from 'lucide-react'
import Image from 'next/image'
import React, { useState } from 'react'

interface ImageFormProps {
    initialData : Product,
    productId : string,
}


function ImageForm({
    productId,
    initialData
} : ImageFormProps) {

    const [isEditing, setIsEditing] = useState<boolean>(false)
    
    const toggleEdit = () => setIsEditing((current) => !current)

    return (
        <div className="mt-6 bg-slate-50 p-4 rounded-md">
            <div className="flex font-medium items-center justify-between">
                Photo du produit
                <Button onClick={toggleEdit} variant="ghost">
                    {isEditing && (
                        <>Anuler</>
                    )}

                    {!isEditing && !initialData.imageUrl ? (
                        <>
                        <PlusCircle className="h-4 w-4 mr-2"/>
                        Ajouter la photo
                        </>
                    ): !isEditing && (
                        <>
                        <Pencil className="h-4 w-4 mr-2"/>
                            Modifier la photo
                        </>
                    )}
                    
                </Button>
            </div>
            {!isEditing && (
                !initialData.imageUrl ? (
                    <div className="flex items-center justify-center h-60 rounded-md bg-slate-200">
                        <ImageIcon className="h-10 w-10 text-slate-500" />
                    </div>
                ) : (
                    <div className="relative aspect-video mt-2">
                        <Image
                            alt = "Upload"
                            fill
                            className="object-cover rounded-md"
                            src={initialData.imageUrl}
                        />
                    </div>
                )
            )}
            {isEditing && (
                <div>
                    {/* <FileUpload
                        endpoint="courseImage"
                        onChange={(url) => {
                            if (url) {
                                onSubmit({imageUrl : url})
                            }
                        }}
                    /> */}
                    <UploadCloud className='h-12 w-12'/>
                    
                    <div className="text-xs text-muted-foreground mt-4">
                        16:9 aspect ratio recommended
                    </div>
                </div>
            )}
        </div>
    )
}

export default ImageForm