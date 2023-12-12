import GoogleProvider from "next-auth/providers/google";
const id = process.env.GOOGLE_ID;
const secret = process.env.GOOGLE_SECRET;
export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: id,
      clientSecret: secret,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
};
