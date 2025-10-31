import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ status: "error", error: "Method not allowed" });
  }

  const { name, email, message } = req.body;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "socam926@gmail.com",
      pass: "mdvcmzlivimdferd" // Use Gmail App Password
    }
  });

  try {
    await transporter.sendMail({
      from: email,
      to: "sfc5954@psu.edu", // You can change this to any recipient
      subject: `Message from ${name}`,
      text: message
    });
    res.status(200).json({ status: "email_sent" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "error", error: error.message });
  }
}
