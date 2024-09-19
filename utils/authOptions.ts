import { authentication, authenticationByGoogle, authenticationManager } from "@services/authService";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: "jwt",
    },
    providers: [
        CredentialsProvider({
            name: "CredentialsProvider",
            credentials: {
                username: {},
                password: {},
                type: {},
            },
            async authorize(credentials, req) {
                var res: { status: any, data: any } = { status: 500, data: null };
                console.log(credentials?.type)
                if (credentials?.type === "admin") {
                    res = await authenticationManager(credentials.username, credentials.password)
                } else if (credentials) {
                    res = await authentication(credentials.username, credentials.password)
                }
                if (res.status === 200) {
                    return res.data
                } else if (res.status === 400) {
                    throw new Error(res.data.title);
                }
                throw new Error('Sign-in failed');
            }
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",

        })
    ],
    pages: {
        signIn: '/sign-in'
    },
    callbacks: {
        async jwt({ token, user, account }) {
            if (user) {
                token.userID = user.userID;
                token.token = user.token
                token.role = user.role;
                token.isVerification = user.isVerification;
                token.expiration = user.expiration
            }
            return token;
        },
        async session({ session, token }) {
            session.user.userID = token.userID;
            session.user.role = token.role;
            return session;
        },
        async signIn({ user, account, profile, }) {
            try {
                if (account?.provider === 'google') {
                    var res = await authenticationByGoogle(
                        account.providerAccountId,
                        profile?.name,
                        profile?.picture,
                        profile?.email);
                    if (res.status == 400) {
                        if (res.data.title.includes("This email is already registered"))
                            return '/sign-in?error=This email is already registered'
                        
                        return '/sign-in?error=This email is banned';
                    } else if (res.status === 200) {
                        user.userID = res.data.userID
                        user.token = res.data.token
                        user.expiration = res.data.expiration
                        user.isVerification = res.data.isVerification
                        user.role = res.data.role
                    } else {
                        return '/sign-in?error=error system'
                    }

                }
                return true;
            } catch (error) {
                return '/sign-in?error=error system';
            }
        },
    },
};
