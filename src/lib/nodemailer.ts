import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: `${process.env.MY_EMAIL}`,
    pass: `${process.env.MY_PASS}`,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

export { transporter };
