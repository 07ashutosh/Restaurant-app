// Looking to send emails in production? Check out our Email API/SMTP product!
import { MailtrapClient } from "mailtrap";

const TOKEN = process.env.MAILTRAP_API_TOKEN;

const client = new MailtrapClient({ token: process.env.MAILTRAP_API_TOKEN! });

const sender = {
  email: "hello@example.com",
  name: "Asutosh test",
};

export {
  client,
  sender
}

