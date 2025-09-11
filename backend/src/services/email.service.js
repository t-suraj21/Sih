import sgMail from '@sendgrid/mail';
import { config } from '../config/config.js';

// Initialize SendGrid
if (config.sendgrid?.apiKey) {
  sgMail.setApiKey(config.sendgrid.apiKey);
}

export const sendWelcomeEmail = async (email, name) => {
  try {
    if (!config.sendgrid?.apiKey) {
      console.log(`📧 Email (Mock): Welcome email sent to ${email}`);
      return { success: true, message: 'Welcome email sent (mock)' };
    }

    const msg = {
      to: email,
      from: {
        email: config.sendgrid?.fromEmail || 'support@yatra.com',
        name: config.sendgrid?.fromName || 'Yatra Support'
      },
      subject: 'Welcome to Yatra - Your Trusted Travel Partner!',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 28px;">Welcome to Yatra!</h1>
          </div>
          
          <div style="padding: 30px; background: #f9f9f9;">
            <h2 style="color: #333; margin-bottom: 20px;">Hello ${name}! 👋</h2>
            
            <p style="color: #666; line-height: 1.6; margin-bottom: 20px;">
              Thank you for joining Yatra, India's most trusted tourism platform. We're excited to help you explore incredible destinations safely and securely.
            </p>
            
            <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #333; margin-bottom: 15px;">What you can do with Yatra:</h3>
              <ul style="color: #666; line-height: 1.8;">
                <li>🏨 Book verified hotels and stays</li>
                <li>🎯 Find government-certified guides</li>
                <li>🍽️ Discover FSSAI-approved restaurants</li>
                <li>🚨 Access 24/7 SOS support</li>
                <li>🌱 Earn eco-points for sustainable travel</li>
              </ul>
            </div>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="${config.frontendUrl}" 
                 style="background: #667eea; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; font-weight: bold;">
                Start Exploring
              </a>
            </div>
            
            <p style="color: #999; font-size: 14px; text-align: center;">
              Need help? Contact us at <a href="mailto:${config.sendgrid?.fromEmail || 'support@yatra.com'}">${config.sendgrid?.fromEmail || 'support@yatra.com'}</a>
            </p>
          </div>
        </div>
      `
    };

    await sgMail.send(msg);
    console.log(`📧 Welcome email sent to ${email}`);
    return { success: true };

  } catch (error) {
    console.error('Welcome email error:', error);
    
    if (config.nodeEnv === 'development') {
      console.log(`📧 Email (Fallback): Welcome email sent to ${email}`);
      return { success: true, message: 'Welcome email sent (fallback)' };
    }
    
    throw new Error('Failed to send welcome email');
  }
};

export const sendBookingConfirmationEmail = async (email, bookingDetails) => {
  try {
    if (!config.sendgrid?.apiKey) {
      console.log(`📧 Email (Mock): Booking confirmation sent to ${email}`);
      return { success: true, message: 'Booking confirmation sent (mock)' };
    }

    const msg = {
      to: email,
      from: {
        email: config.sendgrid?.fromEmail || 'support@yatra.com',
        name: config.sendgrid?.fromName || 'Yatra Support'
      },
      subject: `Booking Confirmed - ${bookingDetails.bookingId}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #4CAF50; padding: 20px; text-align: center;">
            <h1 style="color: white; margin: 0;">Booking Confirmed! ✅</h1>
          </div>
          
          <div style="padding: 30px; background: #f9f9f9;">
            <h2 style="color: #333;">Hello ${bookingDetails.guestName}!</h2>
            
            <p style="color: #666;">Your booking has been confirmed. Here are your booking details:</p>
            
            <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Booking ID:</strong></td>
                  <td style="padding: 8px; border-bottom: 1px solid #eee;">${bookingDetails.bookingId}</td>
                </tr>
                <tr>
                  <td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Hotel:</strong></td>
                  <td style="padding: 8px; border-bottom: 1px solid #eee;">${bookingDetails.hotelName}</td>
                </tr>
                <tr>
                  <td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Check-in:</strong></td>
                  <td style="padding: 8px; border-bottom: 1px solid #eee;">${bookingDetails.checkIn}</td>
                </tr>
                <tr>
                  <td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Check-out:</strong></td>
                  <td style="padding: 8px; border-bottom: 1px solid #eee;">${bookingDetails.checkOut}</td>
                </tr>
                <tr>
                  <td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Guests:</strong></td>
                  <td style="padding: 8px; border-bottom: 1px solid #eee;">${bookingDetails.guests}</td>
                </tr>
                <tr>
                  <td style="padding: 8px;"><strong>Total Amount:</strong></td>
                  <td style="padding: 8px; color: #4CAF50; font-weight: bold;">₹${bookingDetails.amount}</td>
                </tr>
              </table>
            </div>
            
            <div style="background: #fff3cd; border: 1px solid #ffeaa7; padding: 15px; border-radius: 5px; margin: 20px 0;">
              <p style="margin: 0; color: #856404;">
                <strong>Important:</strong> Please carry a valid ID proof and this booking confirmation during check-in.
              </p>
            </div>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="${config.frontendUrl}/dashboard/user" 
                 style="background: #667eea; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; font-weight: bold;">
                View Booking Details
              </a>
            </div>
          </div>
        </div>
      `
    };

    await sgMail.send(msg);
    console.log(`📧 Booking confirmation email sent to ${email}`);
    return { success: true };

  } catch (error) {
    console.error('Booking confirmation email error:', error);
    
    if (config.nodeEnv === 'development') {
      console.log(`📧 Email (Fallback): Booking confirmation sent to ${email}`);
      return { success: true, message: 'Booking confirmation sent (fallback)' };
    }
    
    throw new Error('Failed to send booking confirmation email');
  }
};

export const sendPasswordResetEmail = async (email, resetToken, name) => {
  try {
    if (!config.sendgrid?.apiKey) {
      console.log(`📧 Email (Mock): Password reset sent to ${email}`);
      return { success: true, message: 'Password reset email sent (mock)' };
    }

    const resetUrl = `${config.frontendUrl}/reset-password?token=${resetToken}`;

    const msg = {
      to: email,
      from: {
        email: config.sendgrid?.fromEmail || 'support@yatra.com',
        name: config.sendgrid?.fromName || 'Yatra Support'
      },
      subject: 'Reset Your Yatra Password',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #ff6b6b; padding: 20px; text-align: center;">
            <h1 style="color: white; margin: 0;">Password Reset Request</h1>
          </div>
          
          <div style="padding: 30px; background: #f9f9f9;">
            <h2 style="color: #333;">Hello ${name}!</h2>
            
            <p style="color: #666;">We received a request to reset your password. Click the button below to create a new password:</p>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="${resetUrl}" 
                 style="background: #ff6b6b; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; font-weight: bold;">
                Reset Password
              </a>
            </div>
            
            <p style="color: #666; font-size: 14px;">
              If you didn't request this password reset, please ignore this email. The link will expire in 1 hour.
            </p>
            
            <div style="background: #fff3cd; border: 1px solid #ffeaa7; padding: 15px; border-radius: 5px; margin: 20px 0;">
              <p style="margin: 0; color: #856404; font-size: 14px;">
                <strong>Security tip:</strong> Never share your password or reset links with anyone.
              </p>
            </div>
          </div>
        </div>
      `
    };

    await sgMail.send(msg);
    console.log(`📧 Password reset email sent to ${email}`);
    return { success: true };

  } catch (error) {
    console.error('Password reset email error:', error);
    
    if (config.nodeEnv === 'development') {
      console.log(`📧 Email (Fallback): Password reset sent to ${email}`);
      return { success: true, message: 'Password reset email sent (fallback)' };
    }
    
    throw new Error('Failed to send password reset email');
  }
};