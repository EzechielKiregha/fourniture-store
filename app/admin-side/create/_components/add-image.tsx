import { Button } from '@/components/ui/button'
import { Pencil, PlusCircle } from 'lucide-react'
import React, { useState } from 'react'

interface ImageFormProps {
    productId : string,
}


function ImageForm({
    productId
} : ImageFormProps) {

    const [isEditing, setIsEditing] = useState<boolean>(false)
    
    const toggleEdit = () => setIsEditing((current) => !current)



    return (
        <div className="mt-6 bg-slate-50 p-4 rounded-md">
            <div className="flex font-medium items-center justify-between">
                <Button onClick={toggleEdit} >
                    {isEditing && (
                        <>Annuler</>
                    )}
                    {/* CONDITION NEEDED FOR LATER */}
                    {!isEditing ? (
                        <>
                            <PlusCircle className='h-4 w-4 mr-2' />
                            Add Image
                        </>
                    ) : (
                        <>
                            <Pencil className='h-4 w-4 mr-2' />
                            Edit Image
                        </>
                    ) }
                </Button>
            </div>
        </div>
    )
}

export default ImageForm