import nodemailer from 'nodemailer';

interface ISendMail {
  to: string;
  body: string;
}

export default class EtherealMail {
  static async sendMail({ to, body }: ISendMail): Promise<void> {
    const account = await nodemailer.createTestAccount();

    const transporter = nodemailer.createTransport({
      host: account.smtp.host,
      port: account.smtp.port,
      secure: account.smtp.secure,
      auth: {
        user: account.user,
        pass: account.pass,
      },
    });

    const message = await transporter.sendMail({
      from: 'Sender Name <sender@example.com>',
      to: to,
      subject: 'Nodemailer is unicode friendly ✔',
      text: body,
      html: '<p><b>Hello</b> to myself!</p>',
    });

    console.log('Message sent %s', message.messageId);
    console.log('Preview URL:  sent %s', nodemailer.getTestMessageUrl(message));
  }
}
