import { DefaultSession } from "next-auth";

declare module 'next-auth' {
    interface Session {
        user: {
            userID: string;
            token: string;
            expiration: string;
            role: string;
            isVerification: boolean,
            isCollapse?:boolean
        }
    }
    interface User {
        userID: string;
        token: string;
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
        expiration: string;
        role: string;
        isVerification: boolean
        token: string;
    }
}