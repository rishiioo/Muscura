const cron = require('node-cron');
const User = require('../models/User');
const sendEmail = require('../utils/mailer');

// Runs daily at 9:00 AM
const startExpiryReminder = () => {
  cron.schedule('0 9 * * *', async () => {
    console.log('Running daily subscription expiry check...');

    const threeDaysFromNow = new Date();
    threeDaysFromNow.setDate(threeDaysFromNow.getDate() + 3);

    try {
      const expiringUsers = await User.find({
        subscriptionEnd: { $lte: threeDaysFromNow, $gt: new Date() },
        reminderSentAt: null,
      });

      for (const user of expiringUsers) {
        try {
          await sendEmail(
            user.email,
            'Your Muscura subscription is expiring soon!',
            `Hi ${user.name},\n\nYour subscription is expiring on ${user.subscriptionEnd.toLocaleDateString()}. Please renew soon to keep accessing your workouts.\n\nBest,\nMuscura Team`
          );

          user.reminderSentAt = new Date();
          await user.save();
        } catch (emailErr) {
          console.error(`Failed to send reminder to ${user.email}:`, emailErr);
        }
      }
    } catch (err) {
      console.error('Error running expiry reminder job:', err);
    }
  });
};

module.exports = startExpiryReminder;