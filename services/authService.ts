"use server"
import { fetchWrapper } from "@utils/index";
import { authOptions } from "@utils/index";
import { NextApiRequest } from "next";
import { getServerSession } from "next-auth";
import { getToken } from "next-auth/jwt";
import { cookies, headers } from "next/headers";


export async function authentication(username: string, password: string) {
    return await fetchWrapper.post("/api/auth/login", {
        username,
        password
    })
}

export async function authenticationByGoogle(googleID: string | undefined,
    name: string | undefined,
    imageUrl: string | undefined,
    email: string | undefined) {
    return await fetchWrapper.post("/api/auth/google", {
        googleID,
        name,
        imageUrl,
        email
    })
}

export async function sendCodeVerification(userID: string) {
    return await fetchWrapper.post("/api/auth/send-verification", {
        userID
    })
}

export async function verificationAccount(userID: string, verificationCode: string) {
    return await fetchWrapper.put("/api/auth/verification-account", {
        userID,
        verificationCode,
    })
}

export async function verificationResetPassword(email: string, verificationCode: string) {
    return await fetchWrapper.post("/api/auth/verification-reset-password", {
        email,
        verificationCode,
    })
}

export async function updateResetPassword(email: string, verificationCode: string, newPassword: string) {
    return await fetchWrapper.put("/api/auth/reset-password", {
        email,
        verificationCode,
        newPassword
    })
}

export async function register(name: string, email: string, password: string) {
    return await fetchWrapper.post("/api/auth/register", {
        name,
        email,
        password
    })
}

export async function sendForgetPassword(email: string) {
    return await fetchWrapper.post("/api/auth/send-reset-password", {
        email
    })
}

export async function getSessions() {
    return await getServerSession(authOptions)
}

export async function getCurrentUser() {
    try {
        const session = await getSessions();
        if (!session) return null;
        return session.user
    } catch (error) {
        return null;
    }
}

export async function getTokenWorkAround() {
    const req = {
        headers: Object.fromEntries(headers() as Headers),
        cookies: Object.fromEntries(
            cookies()
                .getAll()
                .map(c => [c.name, c.value])
        )
    } as NextApiRequest;
    return await getToken({ req });
}