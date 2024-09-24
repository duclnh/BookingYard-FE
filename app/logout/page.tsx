"use client"
import { Loading } from '@components/index';
import { signOut, useSession } from 'next-auth/react';
import React, { useEffect } from 'react'

export default function Logout() {
    const { data: session, status: status } = useSession();
    useEffect(() => {
        if (session?.user && session.user.role !== 'Customer') {
            signOut({ callbackUrl: "/admin/sign-in" })
        }else{
            signOut({ callbackUrl: "/sign-in" })
        }
        
    }, [status])
    if (status === "loading") {
        return <Loading />
    }
    return (
        <div>

        </div>
    )
}
