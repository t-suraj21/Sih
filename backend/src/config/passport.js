import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import User from '../models/User.js';
import { config } from './config.js';

// Serialize user for the session
passport.serializeUser((user, done) => {
  done(null, user._id);
});

// Deserialize user from the session
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

// Google OAuth Strategy - Only configure if credentials are provided
if (config.googleOAuth.clientId && config.googleOAuth.clientSecret) {
  passport.use(
    new GoogleStrategy(
      {
        clientID: config.googleOAuth.clientId,
        clientSecret: config.googleOAuth.clientSecret,
        callbackURL: config.googleOAuth.redirectUri,
        scope: ['profile', 'email'],
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          // Extract user information from Google profile
          const email = profile.emails[0].value;
          const name = profile.displayName;
          const googleId = profile.id;
          const avatar = profile.photos?.[0]?.value;

          // Check if user already exists
          let user = await User.findOne({ 
            $or: [
              { email: email },
              { googleId: googleId }
            ]
          });

          if (user) {
            // User exists, update Google ID if not set
            if (!user.googleId) {
              user.googleId = googleId;
              user.emailVerified = true; // Google emails are verified
              if (avatar && !user.avatar) {
                user.avatar = avatar;
              }
              await user.save();
            }
            
            // Update last login
            await user.updateLastLogin();
            
            return done(null, user);
          }

          // Create new user
          user = await User.create({
            name: name,
            email: email,
            googleId: googleId,
            avatar: avatar,
            emailVerified: true, // Google emails are verified
            role: 'tourist', // Default role for Google sign-ups
            isActive: true,
            // No password needed for OAuth users
          });

          return done(null, user);
        } catch (error) {
          console.error('Google OAuth error:', error);
          return done(error, null);
        }
      }
    )
  );
  console.log('✅ Google OAuth strategy configured');
} else {
  console.warn('⚠️  Google OAuth not configured - GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET not set');
  console.warn('   To enable Google Sign-In, add credentials to backend/.env');
  console.warn('   See GOOGLE_OAUTH_SETUP.md for instructions');
}

export default passport;

