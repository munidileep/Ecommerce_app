const nodemailer = require("nodemailer");

const sendMail = async (towhom, otp) => {
    let transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 465,
        secure: true,
        service: "gmail",
        auth: {
            user: "munidileepbasabathini2000@gmail.com",        // Your Gmail
            pass: "ixoz dhgj lupo ugoc"                         // App password (not regular password)
        }
    });

    // let mailOptions = {
    //     from: "munidileepbasabathini2000@gmail.com",
    //     to: towhom,
    //     subject: "OTP for Password Reset",
    //     text: `From BLUESHOP,
    //     Your OTP for resetting your password is: ${otp},
    //     Keep Shopping enjoy,
    //     Thank You.`
    // };
    let mailOptions = {
        from: "munidileepbasabathini2000@gmail.com",
        to: towhom,
        subject: "Your OTP for Password Reset - BLUESHOP",
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eee; border-radius: 10px; background-color: #f9f9f9;">
                <h2 style="text-align: center; color: #056a8e;">BLUESHOP</h2>
                <p>Dear Customer,</p>
                <p>We received a request to reset your password. Please use the following One-Time Password (OTP) to proceed:</p>
                <div style="text-align: center; margin: 20px 0;">
                    <span style="display: inline-block; background-color: #056a8e; color: white; padding: 15px 30px; font-size: 24px; border-radius: 8px;">
                        ${otp}
                    </span>
                </div>
                <p>This OTP is valid for 3 minutes. Do not share this code with anyone.</p>
                <p>Thank you for choosing <strong>BLUESHOP</strong>. Keep shopping and enjoy!</p>
                <br>
                <p style="color: #555;">Best regards,<br>The BLUESHOP Team</p>
            </div>
        `
    };
    

    await transporter.sendMail(mailOptions);
};

module.exports = sendMail;
