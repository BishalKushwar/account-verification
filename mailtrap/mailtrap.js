import { MailtrapClient } from "mailtrap";
import dotenv from "dotenv";

dotenv.config();

const TOKEN = "5e2ccb04a736d994b46a0f692457bde5";
// const TOKEN = process.env.MAIL_TOKEN;

export const mailtrapclient = new MailtrapClient({
  token: TOKEN,
});

export const sender = {
  email: "hello@demomailtrap.com",
  name: "Bishal majhi",
};

