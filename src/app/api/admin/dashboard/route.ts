import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const totalOrders = await prisma.order.count();
    const revenue = await prisma.order.aggregate({
      _sum: { totalAmount: true },
    });

    const paidOrders = await prisma.order.count({
      where: { paid: true },
    });

    const unpaidOrders = totalOrders - paidOrders;

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const ordersToday = await prisma.order.count({
      where: {
        createdAt: {
          gte: today,
          lt: tomorrow,
        },
      },
    });

    const pendingDeliveries = await prisma.delivery.count({
      where: { status: 'Pending' },
    });

    return NextResponse.json({
      totalOrders,
      revenue: revenue._sum.totalAmount || 0,
      paidVsUnpaid: { paid: paidOrders, unpaid: unpaidOrders },
      ordersToday,
      pendingDeliveries,
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch dashboard stats' }, { status: 500 });
  }
}
