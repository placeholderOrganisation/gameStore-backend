import emailjs from "@emailjs/nodejs";

interface EmailParams {
  email: string;
  gamename: string;
  platform: string;
  customername: string;
  customercontact: string;
}

const serviceId = process.env.EMAILJS_SERVICE_ID || "";
const templateId = process.env.EMAILJS_TEMPLATE_ID || "";
const publicKey = process.env.EMAILJS_PUBLIC_KEY || "";
const privateKey = process.env.EMAILJS_PRIVATE_KEY || "";

export const sendWaitlistEmail = async (params: EmailParams): Promise<void> => {
  try {
    await emailjs.send(
      serviceId,
      templateId,
      {
        message: "I would like to be added to the waitlist for this game",
        email: params.email,
        gamename: params.gamename,
        platform: params.platform,
        customername: params.customername,
        customercontact: params.customercontact,
      },
      {
        publicKey: publicKey,
        privateKey: privateKey,
      }
    );
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

export const sendSellingRequestEmail = async (params: EmailParams): Promise<void> => {
  try {
    await emailjs.send(
      serviceId,
      templateId,
      {
        message: "I would like to sell my game",
        email: params.email,
        gamename: params.gamename,
        platform: params.platform,
        customername: params.customername,
        customercontact: params.customercontact,
      },
      {
        publicKey: publicKey,
        privateKey: privateKey,
      }
    );
  } catch (error) {
    console.error("Error sending email:", error);
  }
};
