import { NextRequest, NextResponse } from 'next/server';
import { auth, currentUser } from '@clerk/nextjs/server';

export async function POST(req: NextRequest) {
  try {
    // Verify authenticated user via Clerk
    const user = await currentUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { role } = body;

    if (!role || !['customer', 'mechanic'].includes(role)) {
      return NextResponse.json(
        { error: 'Invalid role. Must be "customer" or "mechanic".' },
        { status: 400 },
      );
    }

    // Forward to backend API
    const backendUrl =
      process.env.API_URL || 'http://localhost:5000';

    const res = await fetch(`${backendUrl}/api/onboarding`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-clerk-user-id': user.id,
      },
      body: JSON.stringify({ role }),
    });

    const data = await res.json();

    if (!res.ok) {
      return NextResponse.json(
        { error: data.error || 'Onboarding failed' },
        { status: res.status },
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Onboarding API route error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    );
  }
}
