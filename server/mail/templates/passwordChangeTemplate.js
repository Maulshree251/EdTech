const passwordChangeTemplate = (userName) => {
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Password Changed Successfully</title>
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

        .info-box {
            background-color: #f0f4ff;
            border-left: 4px solid #667eea;
            padding: 20px;
            margin: 25px 0;
            border-radius: 4px;
        }

        .info-box h3 {
            color: #667eea;
            font-size: 14px;
            font-weight: 600;
            margin-bottom: 10px;
        }

        .info-box p {
            color: #555555;
            font-size: 13px;
            line-height: 1.6;
            margin-bottom: 8px;
        }

        .security-notice {
            background-color: #fff3cd;
            border-left: 4px solid #ffc107;
            padding: 20px;
            margin: 25px 0;
            border-radius: 4px;
        }

        .security-notice h3 {
            color: #856404;
            font-size: 14px;
            font-weight: 600;
            margin-bottom: 10px;
        }

        .security-notice p {
            color: #5d4a23;
            font-size: 13px;
            line-height: 1.6;
            margin-bottom: 8px;
        }

        .security-notice ul {
            margin-left: 20px;
            color: #5d4a23;
            font-size: 12px;
            line-height: 1.8;
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

        .support-text {
            color: #666666;
            font-size: 13px;
            line-height: 1.6;
            margin: 25px 0;
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
            <h1>🔐 Password Changed</h1>
            <p>Your account security is our priority</p>
        </div>

        <!-- Content -->
        <div class="content">
            <!-- Greeting -->
            <div class="greeting">
                Hello <strong>${userName}</strong>,
                <br><br>
                We're confirming that your password has been successfully changed. Your account is now secured with your new password.
            </div>

            <!-- What Happened -->
            <div class="info-box">
                <h3>✓ What Happened</h3>
                <p>Your password was changed on <strong>${new Date().toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                })} at ${new Date().toLocaleTimeString('en-US', { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                })}</strong></p>
            </div>

            <!-- Security Notice -->
            <div class="security-notice">
                <h3>⚠️ Security Tips</h3>
                <p>To keep your account safe, remember:</p>
                <ul>
                    <li>Never share your password with anyone</li>
                    <li>Use a strong, unique password</li>
                    <li>Avoid using easily guessable information</li>
                    <li>Log out from other devices if you changed your password due to suspected compromise</li>
                </ul>
            </div>

            <!-- Action Button -->
            <center>
                <a href="[LOGIN_URL]" class="action-button">Back to Your Account</a>
            </center>

            <!-- Support Text -->
            <div class="support-text">
                If you didn't change your password or think your account may be compromised, please <a href="[SUPPORT_URL]" style="color: #667eea; text-decoration: none;"><strong>contact our support team</strong></a> immediately.
            </div>
        </div>

        <!-- Footer -->
        <div class="footer">
            <p>Thank you for using EduTech</p>
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

module.exports = passwordChangeTemplate;
