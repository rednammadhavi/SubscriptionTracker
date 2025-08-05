import twilio from 'twilio';

const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);

export default async function sendSMS(to, name, cost) {
    await client.messages.create({
        body: `Reminder: Your subscription for ${name} worth ₹${cost} is due today.`,
        from: process.env.TWILIO_PHONE,
        to,
    });
}
