import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"

export const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || "mock_id",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || "mock_secret",
        }),
    ],
    pages: {
        signIn: '/auth/signin',
    },
    callbacks: {
        async jwt({ token, user, account }: { token: any, user: any, account: any }) {
            // In a real app, fetch role from DB using user.email
            // For now, let's mock the admin role for a specific email or all for dev

            // MOCK LOGIC: If email contains 'admin', grant admin role
            if (token.email?.includes('admin') || true) { // TEMPORARY: Grant admin to ALL for development ease/demo
                token.role = 'admin';
            } else {
                token.role = 'user';
            }
            return token;
        },
        async session({ session, token }: { session: any, token: any }) {
            if (session.user) {
                session.user.role = token.role;
            }
            return session;
        }
    }
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
