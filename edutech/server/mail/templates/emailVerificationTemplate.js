const emailVerificationTemplate = (userName, verificationCode) => {
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Verify Your Email</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background-color: #f5f5f5;
            padding: 20px;
        }

        .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }

        .header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: #ffffff;
            padding: 30px 20px;
            text-align: center;
        }

        .header h1 {
            font-size: 28px;
            font-weight: 600;
            margin-bottom: 10px;
        }

        .header p {
            font-size: 14px;
            opacity: 0.9;
        }

        .content {
            padding: 40px 30px;
        }

        .greeting {
            font-size: 16px;
            color: #333333;
            margin-bottom: 25px;
            line-height: 1.6;
        }

        .verification-section {
            background-color: #f0f4ff;
            border: 2px solid #667eea;
            padding: 30px;
            margin: 30px 0;
            border-radius: 8px;
            text-align: center;
        }

        .verification-section h2 {
            color: #667eea;
            font-size: 18px;
            margin-bottom: 20px;
            font-weight: 600;
        }

        .verification-section p {
            color: #555555;
            font-size: 13px;
            margin-bottom: 15px;
        }

        .otp-code {
            font-size: 32px;
            font-weight: 700;
            color: #667eea;
            letter-spacing: 8px;
            font-family: 'Courier New', monospace;
            padding: 20px;
            background-color: #ffffff;
            border-radius: 6px;
            margin: 20px 0;
            border: 2px dashed #667eea;
        }

        .expiration-notice {
            background-color: #fff3cd;
            border-left: 4px solid #ffc107;
            padding: 15px;
            margin: 25px 0;
            border-radius: 4px;
        }

        .expiration-notice p {
            color: #856404;
            font-size: 13px;
            line-height: 1.6;
            margin: 0;
        }

        .expiration-notice strong {
            color: #d39e00;
            font-weight: 600;
        }

        .action-button {
            display: inline-block;
            background-color: #667eea;
            color: #ffffff;
            padding: 12px 35px;
            text-decoration: none;
            border-radius: 25px;
            font-weight: 600;
            font-size: 14px;
            margin: 25px 0;
            transition: background-color 0.3s ease;
        }

        .action-button:hover {
            background-color: #764ba2;
        }

        .instructions {
            background-color: #f9f9f9;
            padding: 20px;
            margin: 25px 0;
            border-radius: 6px;
            border-left: 4px solid #667eea;
        }

        .instructions h3 {
            color: #333333;
            font-size: 14px;
            font-weight: 600;
            margin-bottom: 15px;
        }

        .instructions ol {
            margin-left: 20px;
            color: #555555;
            font-size: 13px;
            line-height: 1.8;
        }

        .instructions li {
            margin-bottom: 10px;
        }

        .support-text {
            color: #666666;
            font-size: 13px;
            line-height: 1.6;
            margin: 25px 0;
        }

        .support-text a {
            color: #667eea;
            text-decoration: none;
            font-weight: 600;
        }

        .support-text a:hover {
            text-decoration: underline;
        }

        .security-info {
            background-color: #e8f5e9;
            border-left: 4px solid #4caf50;
            padding: 15px;
            margin: 25px 0;
            border-radius: 4px;
        }

        .security-info p {
            color: #2e7d32;
            font-size: 12px;
            line-height: 1.6;
            margin: 0;
        }

        .footer {
            background-color: #f9f9f9;
            padding: 25px 30px;
            border-top: 1px solid #eeeeee;
            text-align: center;
        }

        .footer p {
            color: #888888;
            font-size: 12px;
            line-height: 1.6;
            margin-bottom: 10px;
        }

        .footer a {
            color: #667eea;
            text-decoration: none;
        }

        .footer a:hover {
            text-decoration: underline;
        }

        .timestamp {
            color: #999999;
            font-size: 11px;
            margin-top: 15px;
        }

        @media (max-width: 600px) {
            .container {
                border-radius: 0;
            }

            .header {
                padding: 20px 15px;
            }

            .header h1 {
                font-size: 24px;
            }

            .content {
                padding: 25px 15px;
            }

            .verification-section {
                padding: 20px 15px;
            }

            .otp-code {
                font-size: 28px;
                letter-spacing: 6px;
            }

            .action-button {
                display: block;
                text-align: center;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <!-- Header -->
        <div class="header">
            <h1>✉️ Verify Your Email</h1>
            <p>Complete your account setup</p>
        </div>

        <!-- Content -->
        <div class="content">
            <!-- Greeting -->
            <div class="greeting">
                Hi <strong>${userName}</strong>,
                <br><br>
                Thank you for signing up with EduTech! To get started, please verify your email address by entering the code below.
            </div>

            <!-- Verification Code Section -->
            <div class="verification-section">
                <h2>Your Verification Code</h2>
                <p>Enter this code on the verification page:</p>
                <div class="otp-code">${verificationCode}</div>
                <p style="font-size: 12px; color: #888888;">(This code is case-sensitive)</p>
            </div>

            <!-- Expiration Notice -->
            <div class="expiration-notice">
                <p>⏰ <strong>Important:</strong> This code will expire in <strong>24 hours</strong>. Please verify your email as soon as possible.</p>
            </div>

            <!-- Instructions -->
            <div class="instructions">
                <h3>How to Verify Your Email:</h3>
                <ol>
                    <li>Copy the verification code above</li>
                    <li>Go to the email verification page on our website</li>
                    <li>Paste the code in the verification field</li>
                    <li>Click "Verify" to confirm your email</li>
                </ol>
            </div>

            <!-- Action Button -->
            <center>
                <a href="[VERIFICATION_URL]" class="action-button">Verify Email Now</a>
            </center>

            <!-- Security Information -->
            <div class="security-info">
                <p>🔒 <strong>Security Note:</strong> Never share this code with anyone. EduTech staff will never ask for your verification code via email or message.</p>
            </div>

            <!-- Support Text -->
            <div class="support-text">
                Didn't create this account or need help? <a href="[SUPPORT_URL]">Contact our support team</a> immediately.
            </div>
        </div>

        <!-- Footer -->
        <div class="footer">
            <p>Welcome to EduTech - Your Learning Platform</p>
            <p>
                <a href="[WEBSITE_URL]">Visit Our Website</a> | 
                <a href="[HELP_CENTER_URL]">Help Center</a> | 
                <a href="[PRIVACY_URL]">Privacy Policy</a>
            </p>
            <p class="timestamp">
                © 2024 EduTech. All rights reserved.
                <br>
                This email was sent to: <strong>${userName}</strong>
            </p>
        </div>
    </div>
</body>
</html>`;
};

module.exports = emailVerificationTemplate;
