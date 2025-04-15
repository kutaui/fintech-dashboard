import "dotenv/config";

const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN;

export const COOKIE_NAME = "auth_token";
export const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/",
  signed: true,
  maxAge: 86400 * 1000,
};

export type TokenPayload = {
  userId: number;
  email: string;
};

export function generateToken(payload: TokenPayload): string {
  try {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
  } catch (error: any) {
    throw new Error("Failed to generate authentication token");
  }
}

export function verifyToken(token: string): TokenPayload | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return decoded as TokenPayload;
  } catch (error: any) {
    return null;
  }
}
