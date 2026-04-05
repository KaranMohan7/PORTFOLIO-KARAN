import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    const { name, email, message } = await req.json();

    // 🔥 transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS, // app password
      },
    });

    // 🔥 email template (HTML - clean UI)
const htmlTemplate = `
  <div style="font-family: Arial, sans-serif; padding: 20px; background: #f4f4f5;">
    <div style="max-width: 600px; margin: auto; background: #ffffff; padding: 25px; border-radius: 12px;">
      
      <h2 style="margin-bottom: 8px;">📩 New Contact Message</h2>
      <p style="color: #666; font-size: 14px;">
        You’ve received a new inquiry from Karan's portfolio
      </p>

      <hr style="margin: 20px 0;" />

      <p style="margin: 6px 0;"><strong>👤 Name:</strong> ${name}</p>
      <p style="margin: 6px 0;"><strong>📧 Email:</strong> ${email}</p>

      <hr style="margin: 20px 0;" />

      <div>
        <p style="margin-bottom: 8px;"><strong>📝 Details:</strong></p>
        <div style="background:#f9fafb; padding: 12px; border-radius: 8px; line-height:1.6;">
          ${message}
        </div>
      </div>

      <hr style="margin: 20px 0;" />

      <!-- 🔥 Smart Hint Section -->
      <div style="font-size: 13px; color:#666;">
        <p style="margin-bottom: 6px;"><strong>💡 Note:</strong></p>
        <ul style="padding-left: 18px; margin:0;">
          <li>If this is a <b>freelance/project inquiry</b>, review requirements & respond with timeline/budget.</li>
          <li>If this is a <b>job opportunity</b>, check role details & respond with availability.</li>
        </ul>
      </div>

      <hr style="margin: 20px 0;" />

      <!-- CTA -->
      <div style="text-align:center;">
        <a href="mailto:${email}" 
           style="display:inline-block; margin-top:10px; background:#000; color:#fff; padding:10px 18px; border-radius:6px; text-decoration:none;">
          Reply to ${name}
        </a>
      </div>

      <p style="font-size: 12px; color: #999; margin-top: 20px; text-align:center;">
        — Sent via Karan's portfolio contact form 🚀
      </p>

    </div>
  </div>
`;

    // 🔥 AUTO CONFIRMATION MAIL TO USER
    const userTemplate = `
      <div style="font-family: Arial, sans-serif; padding: 20px; background:#f4f4f5;">
        <div style="max-width:600px; margin:auto; background:#fff; padding:25px; border-radius:10px;">
          
          <h2>Hey ${name} 👋</h2>

          <p style="color:#555;">
            Thanks for reaching out! I've successfully received your message.
          </p>

          <p style="color:#555; margin-top:10px;">
            I’ll review your details and get back to you within <b>24 hours</b>.
          </p>

          <hr style="margin:20px 0;" />

          <p style="color:#555;">
            Meanwhile, feel free to check out my work:
          </p>

          <div style="margin:20px 0;">
            <a href="https://portfolio-karan-two.vercel.app/"
               style="background:#000; color:#fff; padding:10px 18px; text-decoration:none; border-radius:6px;">
              View Portfolio
            </a>
          </div>

          <p style="color:#555;">
            Or connect with me on LinkedIn:
          </p>

          <p>
            🔗 <a href="https://www.linkedin.com/in/karan-mohan-talwar-aaa731295/">LinkedIn</a>
          </p>

          <hr style="margin:20px 0;" />

          <p style="font-size:12px; color:#999;">
            — Karan Mohan Talwar <br/>
            Full Stack Developer
          </p>

        </div>
      </div>
    `;

    await transporter.sendMail({
      from: `"Karan Mohan Talwar" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "✅ Your message has been received",
      html: userTemplate,
    });

    // 🔥 send mail
    await transporter.sendMail({
      from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      replyTo: email, // 👈 direct reply client ko jayega
      subject: `🚀 New Message from ${name}`,
      html: htmlTemplate,
    });

    return Response.json({ success: true, message: "Mail Sent Successfully" }, {status: 200});

  } catch (error) {
    console.log("EMAIL ERROR:", error);
    return Response.json({ success: false, message: "Email failed" }, { status: 500 });
  }
}