import nodemailer from "nodemailer"

   class EmailService  {
    async sendEmail(email: string, code: string) {

        let transport = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "apitestblogger@gmail.com", // generated ethereal user
                pass: "lfommghhiouvpevu", // generated ethereal password
            },
        });

        await transport.sendMail({
            from: '"Artur" <apitestblogger@gmail.com>', // sender address
            to: email, // list of receivers
            subject: "Confirm Email", // Subject line
            text: `https://somesite.com/confirm-email?code=${code}`,
        });
        return

    }
        async resendEmail(email: string, subject: string, message: string) {
            let transporter = nodemailer.createTransport({
                service: "gmail",
                auth: {
                    user: "apitestblogger@gmail.com", // generated ethereal user
                    pass: "lfommghhiouvpevu", // generated ethereal password
                },
            });
            await transporter.sendMail({
                from: '"Artur" <apitestblogger@gmail.com>',
                to: email,
                subject: subject,
                html: message,
            });

            return
        }
}
export const emailService  = new EmailService()