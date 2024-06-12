"use client"
import { HubConnection } from '@microsoft/signalr';
import { User } from 'next-auth'
import React, { ReactNode, useState } from 'react'

type Props = {
    children: ReactNode,
    user: User | null,
}

export default function SignalProvider({ children, user }: Props) {
    const [connection, setConnection] = useState<HubConnection | null>(null);
    return (
        <div>

        </div>
    )
}
