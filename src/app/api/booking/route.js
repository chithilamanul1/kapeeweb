import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const body = await req.json();
    const { name, email, phone, pickup, destination, date, time, passengers, vehicle, days, nameboard, notes, price, currency } = body;

    const apiKey = process.env.RESEND_API_KEY;
    
    if (!apiKey) {
      console.warn("RESEND_API_KEY not found in environment variables. Email notification skipped.");
      return NextResponse.json({ success: true, warning: "Email not sent (API key missing)" });
    }

    // Prepare Email Content
    const emailHtml = `
      <div style="font-family: sans-serif; max-width: 600px; margin: auto; border: 1px solid #eee; padding: 20px; border-radius: 10px;">
        <h2 style="color: #059669; text-align: center;">Booking Confirmation</h2>
        <p>Dear ${name},</p>
        <p>Thank you for booking with <strong>Kapee Travels</strong>. Here is your trip summary:</p>
        
        <div style="background: #f9fafb; padding: 15px; border-radius: 8px; margin: 20px 0;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="color: #6b7280; font-size: 12px; text-transform: uppercase;">Vehicle</td><td style="font-weight: bold; text-align: right;">${vehicle?.name}</td></tr>
            <tr><td style="color: #6b7280; font-size: 12px; text-transform: uppercase;">Pickup</td><td style="font-weight: bold; text-align: right;">${pickup}</td></tr>
            <tr><td style="color: #6b7280; font-size: 12px; text-transform: uppercase;">Destination</td><td style="font-weight: bold; text-align: right;">${destination}</td></tr>
            <tr><td style="color: #6b7280; font-size: 12px; text-transform: uppercase;">Date & Time</td><td style="font-weight: bold; text-align: right;">${date} @ ${time}</td></tr>
            <tr><td style="color: #6b7280; font-size: 12px; text-transform: uppercase;">Duration</td><td style="font-weight: bold; text-align: right;">${days} Day(s)</td></tr>
            <tr><td style="color: #6b7280; font-size: 12px; text-transform: uppercase;">Passengers</td><td style="font-weight: bold; text-align: right;">${passengers}</td></tr>
            ${nameboard ? `<tr><td style="color: #6b7280; font-size: 12px; text-transform: uppercase;">Nameboard</td><td style="font-weight: bold; text-align: right; color: #059669;">${nameboard}</td></tr>` : ''}
            <tr style="border-top: 1px solid #e5e7eb; padding-top: 10px;">
              <td style="font-weight: bold; padding-top: 10px;">Total Price</td>
              <td style="font-weight: bold; font-size: 18px; text-align: right; color: #059669; padding-top: 10px;">${currency} ${price}</td>
            </tr>
          </table>
        </div>

        <div style="background: #fff7ed; border: 1px solid #ffedd5; padding: 10px; border-radius: 8px; color: #9a3412; font-size: 12px;">
          <strong>Important Note:</strong> Fuel is not included in the price. Customer must pay for fuel separately. Unlimited kilometers are included.
        </div>

        <p style="margin-top: 20px;">If you have any questions, please contact us on WhatsApp at +94 76 874 3357.</p>
        <p>Safe Travels,<br/><strong>The Kapee Travels Team</strong></p>
      </div>
    `;

    // Send to Customer
    const customerRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Kapee Travels <onboarding@resend.dev>', // Should be updated to custom domain once verified
        to: [email],
        subject: `Booking Confirmed: ${pickup} to ${destination}`,
        html: emailHtml,
      }),
    });

    // Send to Admin
    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Booking Alert <onboarding@resend.dev>',
        to: ['chithilamanul1@gmail.com'], // Using user's email as default admin
        subject: `New Booking Request from ${name}`,
        html: `
          <h3>New Booking Details</h3>
          <p><strong>Customer:</strong> ${name} (${phone})</p>
          <p><strong>Email:</strong> ${email}</p>
          <hr/>
          ${emailHtml}
          <p><strong>Notes:</strong> ${notes || 'None'}</p>
        `,
      }),
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Email API Error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
