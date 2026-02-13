// import { PrismaClient } from "@/generated/prisma/client";

// const globalForPrisma = globalThis as unknown as {
//   prisma: PrismaClient | undefined;
// };

// export const prisma =
//   globalForPrisma.prisma ??
//   new PrismaClient({
//     accelerateUrl: process.env.ACCELERATE_URL!,
//   });

// if (process.env.NODE_ENV !== "production") {
//   globalForPrisma.prisma = prisma;
// }

import { PrismaClient } from "@/generated/prisma/client";

export const prisma = new PrismaClient(); // ✅ works if DATABASE_URL is set



// import { PrismaClient } from '@/generated/prisma/client'

// const prisma = new PrismaClient({})

// export default prisma;



// // import { PrismaClient } from '@prisma/client';
// // import { PrismaClient } from '@prisma/client/edge'
// import { PrismaClient } from "../generated/prisma/client";
// import { withAccelerate } from '@prisma/extension-accelerate'

// // const prisma = new PrismaClient().$extends(withAccelerate())

// const prismaClientSingleton = () => {
//   // return new PrismaClient();
//   return new PrismaClient(
    
//   ).$extends(withAccelerate())
// };

// declare const globalThis: {
//   prismaGlobal: ReturnType<typeof prismaClientSingleton>;
// } & typeof global;

// const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

// export default prisma;

// // Ensure the prisma instance is reused across hot reloads in development
// if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = prisma;