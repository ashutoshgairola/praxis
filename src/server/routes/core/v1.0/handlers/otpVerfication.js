const { verifyUser } = require("../../../../../data_model/operations/Users");

const { TWILIO_SERVICE_SID, TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN } =
  process.env;
const client = require("twilio")(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, {
  lazyLoading: true,
});
// todo   otp service

async function sendOtp(req, res, next) {
  const { countryCode, phoneNumber } = req.body;

  try {
    const otpResponse = await client.verify
      .services(TWILIO_SERVICE_SID)
      .verifications.create({
        to: `+${countryCode}${phoneNumber}`,
        channel: "sms",
      });
    res
      .status(200)
      .send(`OTP send successfully!: ${JSON.stringify(otpResponse)}`);
  } catch (error) {
    res
      .status(error?.status || 400)
      .send(error?.message || "Something went wrong!");
  }
}

async function verifyOtp(req, res, next) {
  const { countryCode, phoneNumber, otp } = req.body;

  try {
    const verifiedResponse = await client.verify
      .services(TWILIO_SERVICE_SID)
      .verificationChecks.create({
        to: `+${countryCode}${phoneNumber}`,
        code: otp,
      });
    if (verifiedResponse.valid === true) {
      let response = await verifyUser(phoneNumber)
      res.status(200).json(response)
    } else {
      res.status(400)
        .send(`OTP Verification Failed: ${JSON.stringify(verifiedResponse)}`);
    }
  } catch (error) {
    res.status(error?.status || 400)
      .send(error?.message || "Something went wrong!");
  }
}

module.exports = {
  sendOtp,
  verifyOtp,
};
