declare module "jsonwebtoken" {
  export interface Secret {
    toString(): string;
  }
} 