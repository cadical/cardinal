 import { auth } from '@/lib/auth';
import  prisma  from '@/lib/prisma';
import { headers } from 'next/headers';

    export async function GET() {
        try {
            const session = await auth.api.getSession({
                  headers: await headers(),
            })
             const orders = await prisma.order.findMany({
                where: {
                    userId: session?.user?.id,
                },
                include: { orderItems: true },
                });
        return Response.json(orders);
        } catch (error) {
            return Response.json({ error: "Failed to fetch orders" }, { status: 500 }); 
        }
       
    }



//     let orders = [];

// export async function GET() {
//   return Response.json(orders);
// }

// export async function POST(req) {
//   const body = await req.json();

//   const order = {
//     id: crypto.randomUUID(),
//     status: "Processing",
//     createdAt: new Date().toISOString(),
//     ...body,
//   };

//   orders.push(order);

//   return Response.json(order);
// }