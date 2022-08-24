import nodemailer from "nodemailer"

export const emailService  = {
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
}