import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // Use true for port 465, false for port 587
  auth: {
    user: process.env.APP_USER,
    pass: process.env.APP_PASS,
  },
});

export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql",
    }),
    user : {
      additionalFields : {
        role : {
          type : "string",
          defaultValue : "CUSTOMER",
          required : false,
        },
        status : {
          type : "string",
          defaultValue : "ACTIVE",
          required : false
        }
      }
    },
    emailAndPassword: { 
    enabled: true, 
    autoSignIn : false,
    requireEmailVerification : true
  },
    emailVerification :{
      sendOnSignUp : true,
      autoSignInAfterVerification : true,
      sendVerificationEmail: async ( { user, url, token }, request) => {
        try {
          const verificationUrl =  `${process.env.APP_URL}/verify-email?token=${token}`
          const info = await transporter.sendMail({
            from: '"medistore" <ahmedtasin225@gmail.com>',
            to: user.email,
            subject: "Please verify your email.",
            html: `<!DOCTYPE html>
              <html lang="en">
              <head>
                <meta charset="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>Email Verification</title>
              </head>
              <body style="margin:0; padding:0; background-color:#f4f4f5; font-family:Arial, Helvetica, sans-serif;">
                <table width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    <td align="center" style="padding:40px 0;">
                      <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff; border-radius:8px; overflow:hidden;">
                        
                        <!-- Header -->
                        <tr>
                          <td style="background:#111827; padding:20px; text-align:center;">
                            <h1 style="color:#ffffff; margin:0;">Prisma Blog</h1>
                          </td>
                        </tr>

                        <!-- Content -->
                        <tr>
                          <td style="padding:30px; color:#333333;">
                            <h2 style="margin-top:0;">Verify your email address</h2>
                            <p style="font-size:16px; line-height:1.6;">
                              Hi ${user.name} <br /><br />
                              Thank you for signing up for <strong>Prisma Blog</strong>.
                              Please confirm your email address by clicking the button below.
                            </p>

                            <div style="text-align:center; margin:30px 0;">
                              <a
                                href="${verificationUrl}"
                                style="
                                  background:#2563eb;
                                  color:#ffffff;
                                  padding:14px 28px;
                                  text-decoration:none;
                                  border-radius:6px;
                                  font-size:16px;
                                  font-weight:bold;
                                  display:inline-block;
                                "
                              >
                                Verify Email
                              </a>
                            </div>

                            <p style="font-size:14px; color:#555;">
                              If the button doesn’t work, copy and paste this link into your browser:
                            </p>

                            <p style="font-size:14px; word-break:break-all; color:#2563eb;">
                              ${url}
                            </p>

                            <p style="font-size:14px; color:#777;">
                              This link will expire soon for security reasons.
                            </p>
                          </td>
                        </tr>

                        <!-- Footer -->
                        <tr>
                          <td style="background:#f9fafb; padding:20px; text-align:center; font-size:13px; color:#888;">
                            © ${new Date().getFullYear()} Prisma Blog. All rights reserved.
                          </td>
                        </tr>

                      </table>
                    </td>
                  </tr>
                </table>
              </body>
              </html>`
          });

          // console.log("Message sent:", info.messageId);
        } catch (err) {
          console.log(err)
          throw err
        }
      },
    },
});