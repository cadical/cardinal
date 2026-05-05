 import  prisma  from '@/lib/prisma';

    export async function GET() {
        const orders = await prisma.order.findMany({
        include: { orderItems: true },
        });
        return Response.json(orders);
    }