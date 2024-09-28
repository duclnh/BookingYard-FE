"use client"
import { Loading } from '@components/index';
import { useSession } from 'next-auth/react'
import React, { useEffect } from 'react'

export default function Authorization() {
    const { data: session, status: status } = useSession();

    useEffect(() => {
        if (session != null) {
            if (session.user.role === "Admin") {
                window.location.href = "/admin/company/dashboard";
            } else if (session.user.role === "CourtOwner") {
                window.location.href = "/admin/owner/dashboard";
            } else {
                window.location.href = "/admin/owner/court";
            }
        }
    }, [status])

    if(status === 'loading'){
        return <Loading />
    }
    return (
        <>
        </>
    )
}
