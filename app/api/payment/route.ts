import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { amount, email, firstName, lastName, reference } = body

    // Flutterwave API endpoint
    const flutterwaveUrl = 'https://api.flutterwave.com/v3/payments'

    // Initialize payment with Flutterwave
    const response = await fetch(flutterwaveUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.FLUTTERWAVE_SECRET_KEY}`,
      },
      body: JSON.stringify({
        tx_ref: reference,
        amount: amount,
        currency: 'USD',
        payment_options: 'card,account,ussd,mobilemoneyghana',
        customer: {
          email: email,
          phonenumber: '',
          name: `${firstName} ${lastName}`,
        },
        customizations: {
          title: 'Cadical Medical Supplies',
          description: 'Medical Equipment & Supplies Purchase',
          logo: 'https://cadical.com/logo.png',
        },
      }),
    })

    const data = await response.json()

    if (!response.ok) {
      return NextResponse.json(
        { error: 'Payment initialization failed' },
        { status: 400 }
      )
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error('Payment error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// Webhook handler for payment status
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { reference } = body

    // Verify payment status with Flutterwave
    const response = await fetch(
      `https://api.flutterwave.com/v3/transactions/${reference}/verify`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${process.env.FLUTTERWAVE_SECRET_KEY}`,
        },
      }
    )

    const data = await response.json()

    if (data.status === 'success') {
      // Update order status in database
      // await prisma.order.update({...})

      return NextResponse.json({ status: 'success', data })
    }

    return NextResponse.json({ status: 'pending' })
  } catch (error) {
    console.error('Verification error:', error)
    return NextResponse.json(
      { error: 'Verification failed' },
      { status: 500 }
    )
  }
}
