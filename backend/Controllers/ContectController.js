import transporter from "../Config/mail.js";
import AdminContactTemplate from "../Templates/AdminContactTemplate.js";
import AutoReplyTemplate from "../Templates/AutoReplyTemplate.js";

export const sendContactMail = async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;

        if (!name || !email || !subject || !message) {
            return res.status(400).json({
                success: false,
                message: "Please fill all required fields.",
            });
        }

        //  Send email to Admin
        await transporter.sendMail({
            from: process.env.MAIL_FROM,
            to: process.env.ADMIN_EMAIL || process.env.MAIL_USER,
            subject: `New Contact Request - ${subject}`,
            html: AdminContactTemplate({
                name,
                email,
                subject,
                message,
            }),
        });

        //  Auto reply to User
        await transporter.sendMail({
            from: process.env.MAIL_FROM,
            to: email,
            subject: "Thank you for contacting EcoBazar 🌿",
            html: AutoReplyTemplate({
                name,
            }),
        });

        return res.status(200).json({
            success: true,
            message: "Message sent successfully.",
        });

    } catch (error) {
        console.error("CONTACT ERROR:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to send message.",
            error: error.message,
        });
    }
};