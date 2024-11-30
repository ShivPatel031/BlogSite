import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";

const verifyEmail = async (un_verified_email, user) => {
    console.log(un_verified_email)

    return new Promise((resolve, reject) => {
        const transporter = nodemailer.createTransport({ 
            service: 'gmail',
            secure: true,
            port: 465,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            },
            tls: {
                rejectUnauthorized: false
            }
        });
        
        const token = jwt.sign({
                data: user
            },
            process.env.JWT_SECRET, {
                expiresIn: '10m'
            }
        );

        const mailConfigurations = {
            to: un_verified_email, 
            subject: 'Email Verification for BlogSite',
            text: `Hi! There, You have recently visited 
               our website and entered your email.
               Please follow the given link to verify your email:
               http://${process.env.BACKEND_URL}/api/v1/user/verify/${token} 
               Thanks`
        };

        transporter.sendMail(mailConfigurations, (error, info) => {
            if (error) {
                // Handle the error appropriately
                console.error('Error occurred while sending email:', error.message);
                reject(new Error('Error while verifying email: ' + error.message));
            } else {
                console.log('Email sent successfully');
                resolve(`Verification link sent to ${un_verified_email}. Please verify within the next 10 minutes.`);
            }
        });
    })
}
export {verifyEmail};