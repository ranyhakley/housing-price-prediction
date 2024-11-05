"use server";

import React from "react";
import { Resend } from "resend";
import { validateString, getErrorMessage } from "@/utils/utils";
import ContactFormEmail from "@/email/contactFormEmail";

const resend = new Resend(process.env.RESEND_API_KEY);

// simple in-memory store for the last sent timestamp
let lastSentTimestamp: number | null = null;
const RATE_LIMIT_INTERVAL_MS = 60000; // 1 minute

export const sendEmail = async (formData: FormData) => {
  const senderEmail = formData.get("senderEmail");
  const message = formData.get("message");

  // simple server-side validation
  if (!validateString(senderEmail, 500)) {
    return {
      error: "Invalid sender email",
    };
  }
  if (!validateString(message, 5000)) {
    return {
      error: "Invalid message",
    };
  }

  // check rate limit
  const now = Date.now();
  if (lastSentTimestamp && (now - lastSentTimestamp < RATE_LIMIT_INTERVAL_MS)) {
    return {
      error: "Please wait before sending another email.",
    };
  }

  let data;
  try {
    data = await resend.emails.send({
      from: "Portfolio Website <portfolio@ranyhakley.com>",
      to: "ranyhakleyh@gmail.com",
      subject: "Message from Portfolio Website",
      replyTo: senderEmail,
      react: React.createElement(ContactFormEmail, {
        message: message,
        senderEmail: senderEmail,
      }),
    });

    // update the last sent timestamp
    lastSentTimestamp = Date.now();
  } catch (error: unknown) {
    return {
      error: getErrorMessage(error),
    };
  }

  return {
    data,
  };
};
