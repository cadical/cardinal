        import prisma  from '@/lib/prisma';

        export async function PUT(req: Request, { params }: any) {
          const body = await req.json();
          const product = await prisma.product.update({
            where: { id: params.id },
            data: body,
          });
          return Response.json(product);
        }

        export async function DELETE(_: Request, { params }: any) {
          await prisma.product.delete({ where: { id: params.id } });
          return Response.json({ success: true });
        }