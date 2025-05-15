import { Router } from "express";
import {
  sendSellingRequestEmail,
  sendWaitlistEmail,
} from "../services/emailService";

const router = Router();

router.post("/send", async (req, res) => {
  try {
    const {
      email,
      gamename,
      platform,
      customername,
      customercontact,
      mode,
    } = req.body;

    if (
      !email ||
      !gamename ||
      !platform ||
      !customername ||
      !customercontact ||
      !mode
    ) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }

    if (mode === 1) {
      await sendWaitlistEmail({
        email,
        gamename,
        platform,
        customername,
        customercontact,
      });
    } else if (mode === 2) {
      await sendSellingRequestEmail({
        email,
        gamename,
        platform,
        customername,
        customercontact,
      });
    }

    return res.status(200).json({
      success: true,
      message: "Email sent successfully",
    });
  } catch (error) {
    console.error("Error in sendEmail controller:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to send email",
    });
  }
});

export default router;
