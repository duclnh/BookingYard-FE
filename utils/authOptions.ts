import { authentication, authenticationByGoogle } from "@services/authService";
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
                password: {}
            },
            async authorize(credentials, req) {
                var res = await authentication(credentials!.username, credentials!.password)
                if (res.status === 200) {
                    return res.data
                }
                return null
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
                token.name = user.name;
                token.imageUrl = user.imageUrl
                token.token = user.token
                token.email = user.email;
                token.role = user.role;
                token.isVerification = user.isVerification;
            }
            return token;
        },
        async session({ session, token }) {
            session.user.userID = token.userID;
            session.user.name = token.name;
            session.user.email = token.email;
            session.user.imageUrl = token.imageUrl
            session.user.token = token.token
            session.user.role = token.role;
            session.user.isVerification = token.isVerification;
            return session;
        },
        async signIn({ user, account, profile, }) {
            if (account?.provider === 'google') {
                var res = await authenticationByGoogle(
                    account.providerAccountId,
                    profile?.name,
                    profile?.picture,
                    profile?.email);
                if (res.status !== 200) {
                    return '/sign-in';
                }
                user.userID = res.data.userID
                user.token = res.data.token
                user.imageUrl = res.data.imageUrl
                user.isVerification = res.data.isVerification
            }
            if (!user) {
                return '/sign-in';
            }
            return true;
        },
    },
};
