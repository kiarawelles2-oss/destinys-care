import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const deliveries = await prisma.delivery.findMany({
      include: { order: true },
    });

    const completedDeliveries = deliveries.filter((d) => d.status === 'Delivered');
    const totalEarnings = completedDeliveries.reduce((sum, d) => sum + d.order.deliveryFee, 0);

    // Calculate this month's earnings
    const now = new Date();
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
    const monthlyEarnings = completedDeliveries
      .filter((d) => new Date(d.createdAt) >= monthStart)
      .reduce((sum, d) => sum + d.order.deliveryFee, 0);

    return NextResponse.json({
      total: totalEarnings,
      monthly: monthlyEarnings,
      deliveries: completedDeliveries.length,
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch earnings' }, { status: 500 });
  }
}
