import twilio from 'twilio';
import { config } from '../config/config.js';

let twilioClient = null;

// Initialize Twilio client
if (config.twilio.accountSid && config.twilio.authToken) {
  twilioClient = twilio(config.twilio.accountSid, config.twilio.authToken);
}

export const sendOTP = async (phoneNumber, otp) => {
  try {
    if (!twilioClient) {
      // Mock SMS sending for development
      console.log(`📱 SMS (Mock): Sending OTP ${otp} to ${phoneNumber}`);
      return { success: true, message: 'OTP sent successfully (mock)' };
    }

    const message = await twilioClient.messages.create({
      body: `Your Yatra verification code is: ${otp}. Valid for 5 minutes. Do not share this code with anyone.`,
      from: config.twilio.phoneNumber,
      to: phoneNumber
    });

    console.log(`📱 SMS sent successfully: ${message.sid}`);
    return { success: true, messageId: message.sid };

  } catch (error) {
    console.error('SMS sending error:', error);
    
    // For development, don't fail - just log and continue
    if (config.nodeEnv === 'development') {
      console.log(`📱 SMS (Fallback): Sending OTP ${otp} to ${phoneNumber}`);
      return { success: true, message: 'OTP sent successfully (fallback)' };
    }
    
    throw new Error('Failed to send SMS');
  }
};

export const sendBookingConfirmation = async (phoneNumber, bookingDetails) => {
  try {
    if (!twilioClient) {
      console.log(`📱 SMS (Mock): Booking confirmation sent to ${phoneNumber}`);
      return { success: true, message: 'Booking confirmation sent (mock)' };
    }

    const message = `Yatra Booking Confirmed! 
Booking ID: ${bookingDetails.bookingId}
Hotel: ${bookingDetails.hotelName}
Check-in: ${bookingDetails.checkIn}
Check-out: ${bookingDetails.checkOut}
Amount: ₹${bookingDetails.amount}
Show this message at check-in.`;

    const result = await twilioClient.messages.create({
      body: message,
      from: config.twilio.phoneNumber,
      to: phoneNumber
    });

    console.log(`📱 Booking SMS sent: ${result.sid}`);
    return { success: true, messageId: result.sid };

  } catch (error) {
    console.error('Booking SMS error:', error);
    
    if (config.nodeEnv === 'development') {
      console.log(`📱 SMS (Fallback): Booking confirmation sent to ${phoneNumber}`);
      return { success: true, message: 'Booking confirmation sent (fallback)' };
    }
    
    throw new Error('Failed to send booking confirmation SMS');
  }
};

export const sendCancellationNotification = async (phoneNumber, bookingDetails) => {
  try {
    if (!twilioClient) {
      console.log(`📱 SMS (Mock): Cancellation notification sent to ${phoneNumber}`);
      return { success: true, message: 'Cancellation notification sent (mock)' };
    }

    const message = `Yatra Booking Cancelled
Booking ID: ${bookingDetails.bookingId}
Hotel: ${bookingDetails.hotelName}
Refund: ₹${bookingDetails.refundAmount}
Refund will be processed in 3-5 business days.`;

    const result = await twilioClient.messages.create({
      body: message,
      from: config.twilio.phoneNumber,
      to: phoneNumber
    });

    console.log(`📱 Cancellation SMS sent: ${result.sid}`);
    return { success: true, messageId: result.sid };

  } catch (error) {
    console.error('Cancellation SMS error:', error);
    
    if (config.nodeEnv === 'development') {
      console.log(`📱 SMS (Fallback): Cancellation notification sent to ${phoneNumber}`);
      return { success: true, message: 'Cancellation notification sent (fallback)' };
    }
    
    throw new Error('Failed to send cancellation notification SMS');
  }
};

export const verifyOTP = async (phoneNumber, otp) => {
  // This function is handled by Redis storage in the controller
  // This is just a placeholder for any additional SMS verification logic
  return { success: true };
};