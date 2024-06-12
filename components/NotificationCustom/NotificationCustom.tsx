import { Alert } from 'flowbite-react'
import React from 'react'
import { HiInformationCircle } from 'react-icons/hi'
import { MdErrorOutline } from "react-icons/md";

export default function NotificationCustom({ error, success }: { error: string, success?: string }) {
    return (
        <>
            {error ? (
                <Alert color={"failure"} className='mt-2' icon={MdErrorOutline}>
                    {error}
                </Alert>
            ) : (success && (
                <Alert color={"success"} className='mt-2' icon={HiInformationCircle}>
                    {success}
                </Alert>
            )
            )}
        </>
    )
}
