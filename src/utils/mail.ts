import { generateVerificationEmail } from "@/templates/emails/verificationEmail";
import nodeMailer from "nodemailer";
interface VerificationMailOptions {
  to: string;
  content: string;
}
// Looking to send emails in production? Check out our Email API/SMTP product!
const transport = nodeMailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: process.env.MAILTRAP_TEST_USERNAME,
    pass: process.env.MAILTRAP_TEST_PASSWORD,
  },
});
const mail = {
  async sendVerificationEmail(options: VerificationMailOptions) {
    transport.sendMail({
      from: process.env.VERIFICATION_EMAIL,
      to: options.to,
      subject: "Auth Verification",
      html: options.content,
    });
  },
};
export default mail;
