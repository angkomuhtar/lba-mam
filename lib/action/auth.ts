"use server";
import { signIn, signOut } from "@/auth";
import { AuthError } from "next-auth";

export const loginAction = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  try {
    await signIn("credentials", {
      email,
      password,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { message: "Invalid credentials" };
        default:
          return {
            message: "Something went wrong with the authentication",
          };
      }
    }
    throw error;
  }
};

export async function handleSignOut() {
  await signOut();
}
