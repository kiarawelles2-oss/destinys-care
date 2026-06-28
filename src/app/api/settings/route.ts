import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    let settings = await prisma.deliverySetting.findFirst();
    if (!settings) {
      settings = await prisma.deliverySetting.create({
        data: {
          paraMariboFee: 0,
          outsideParaMariboFee: 150,
        },
      });
    }
    return NextResponse.json(settings);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch settings' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    let settings = await prisma.deliverySetting.findFirst();
    if (!settings) {
      settings = await prisma.deliverySetting.create({
        data: body,
      });
    } else {
      settings = await prisma.deliverySetting.update({
        where: { id: settings.id },
        data: body,
      });
    }
    return NextResponse.json(settings);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update settings' }, { status: 500 });
  }
}
