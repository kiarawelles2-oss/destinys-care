import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { generateOrderNumber } from '@/lib/utils';

export async function GET() {
  try {
    const orders = await prisma.order.findMany({
      include: { customer: true, items: { include: { product: true } } },
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(orders);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch orders' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const orderNumber = generateOrderNumber();

    // Create or find customer
    const customer = await prisma.customer.upsert({
      where: { phone: body.phone },
      update: {},
      create: {
        name: body.customerName,
        phone: body.phone,
        address: body.address,
        city: 'Paramaribo',
      },
    });

    // Create order
    const order = await prisma.order.create({
      data: {
        orderNumber,
        customerId: customer.id,
        totalAmount: body.totalAmount,
        deliveryFee: body.deliveryFee,
        paymentMethod: body.paymentMethod,
        notes: body.notes,
        status: 'Nieuw',
        items: {
          create: body.items.map((item: any) => ({
            productId: item.productId,
            quantity: item.quantity,
            price: 0, // Will be updated with product price
          })),
        },
      },
      include: { items: { include: { product: true } } },
    });

    return NextResponse.json(order);
  } catch (error) {
    console.error('Error creating order:', error);
    return NextResponse.json({ error: 'Failed to create order', message: String(error) }, { status: 500 });
  }
}
