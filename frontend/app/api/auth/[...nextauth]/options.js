import TwitterProvider from "next-auth/providers/twitter";
import GoogleProvider from "next-auth/providers/google";

if (
  !process.env.GOOGLE_CLIENT_ID ||
  !process.env.GOOGLE_CLIENT_SECRET ||
  !process.env.TWITTER_CLIENT_ID ||
  !process.env.TWITTER_CLIENT_SECRET
) {
  throw new Error("Auth required env variables are not set");
}

export const options = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    TwitterProvider({
      clientId: process.env.TWITTER_CLIENT_ID,
      clientSecret: process.env.TWITTER_CLIENT_SECRET,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
};
