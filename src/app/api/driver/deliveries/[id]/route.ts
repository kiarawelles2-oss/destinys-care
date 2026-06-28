import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await request.json();
    const delivery = await prisma.delivery.update({
      where: { id: params.id },
      data: { status: body.status },
    });
    return NextResponse.json(delivery);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update delivery' }, { status: 500 });
  }
}
