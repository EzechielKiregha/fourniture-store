"use client"

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger
} from '@/components/ui/alert-dialog'
import { AlertCircle } from 'lucide-react';

interface AdminConnectionProps {
    children : React.ReactNode;
    onConfirm : () =>  void;
}

export const AdminConnection = ({
    children,
    onConfirm,
} : AdminConnectionProps) => {


    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                {children}
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        <div className="justify-center items-center flex flex-col">
                            <AlertCircle/> Cette page est reserver a l'administrateur <br/>
                        </div>
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        cliquer "Continuer" pour poursuivre le processus. 
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>
                        Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction onClick={onConfirm}>
                        Continuer
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}