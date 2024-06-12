import { DefaultSession } from "next-auth";

declare module 'next-auth' {
    interface Session {
        user: {
            userID: string;
            name: string;
            token: string;
            imageUrl: string;
            email: string;
            expiration: string;
            role: string;
            isVerification: boolean
        }
    }
    interface User {
        userID: string;
        name: string;
        imageUrl: string;
        token: string;
        email: string;
        expiration: string;
        role: string;
        isVerification: boolean
    }

    interface Profile{
        picture: string
    }

}
declare module 'next-auth/jwt' {
    interface JWT {
        userID: string;
        name: string;
        imageUrl: string;
        email: string;
        expiration: string;
        role: string;
        isVerification: boolean
        token: string;
    }
}