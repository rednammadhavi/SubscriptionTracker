import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

export default async function sendEmail(to, name, cost) {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to,
        subject: 'Subscription Reminder',
        text: `Reminder: Your subscription for ${name} worth ₹${cost} is due today.`,
    };

    await transporter.sendMail(mailOptions);
}
