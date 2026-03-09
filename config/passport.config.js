/**
 * config/passport.config.js
 * Passport.js authentication strategies for PrescriptCheck
 * Implements JWT strategy for API authentication
 */

'use strict';

const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');

/**
 * Configures Passport.js with JWT strategy
 * @param {Object} passport - Passport instance
 * @param {Function} findUserById - Function to retrieve user from database by ID
 */
function configurePassport(passport, findUserById) {
  const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET,
    issuer: 'prescriptcheck',
    algorithms: ['HS256'],
  };

  passport.use(
    'jwt',
    new JwtStrategy(jwtOptions, async (payload, done) => {
      try {
        const user = await findUserById(payload.id);
        if (!user) {
          return done(null, false, { message: 'User not found' });
        }
        if (!user.isActive) {
          return done(null, false, { message: 'User account is deactivated' });
        }
        return done(null, user);
      } catch (err) {
        return done(err, false);
      }
    })
  );
}

module.exports = { configurePassport };
