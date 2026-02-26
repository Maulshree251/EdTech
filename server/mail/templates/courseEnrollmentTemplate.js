const courseEnrollmentTemplate = (name, courseName) => {
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Course Enrollment Confirmation</title>
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

        .enrollment-card {
            background: linear-gradient(135deg, #667eea15 0%, #764ba215 100%);
            border: 2px solid #667eea;
            padding: 25px;
            margin: 30px 0;
            border-radius: 8px;
        }

        .enrollment-card h2 {
            color: #667eea;
            font-size: 18px;
            margin-bottom: 15px;
            font-weight: 600;
        }

        .course-details {
            background-color: #ffffff;
            padding: 20px;
            border-radius: 6px;
            border-left: 4px solid #667eea;
        }

        .detail-row {
            display: flex;
            justify-content: space-between;
            margin-bottom: 15px;
            padding-bottom: 15px;
            border-bottom: 1px solid #f0f0f0;
        }

        .detail-row:last-child {
            margin-bottom: 0;
            padding-bottom: 0;
            border-bottom: none;
        }

        .detail-label {
            color: #666666;
            font-size: 13px;
            font-weight: 600;
        }

        .detail-value {
            color: #333333;
            font-size: 14px;
            font-weight: 500;
        }

        .success-message {
            background-color: #e8f5e9;
            border-left: 4px solid #4caf50;
            padding: 20px;
            margin: 25px 0;
            border-radius: 4px;
        }

        .success-message p {
            color: #2e7d32;
            font-size: 13px;
            line-height: 1.6;
            margin: 0;
        }

        .next-steps {
            background-color: #f9f9f9;
            padding: 20px;
            margin: 25px 0;
            border-radius: 6px;
            border-left: 4px solid #667eea;
        }

        .next-steps h3 {
            color: #333333;
            font-size: 14px;
            font-weight: 600;
            margin-bottom: 15px;
        }

        .next-steps ol {
            margin-left: 20px;
            color: #555555;
            font-size: 13px;
            line-height: 1.8;
        }

        .next-steps li {
            margin-bottom: 10px;
        }

        .action-buttons {
            text-align: center;
            margin: 30px 0;
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
            margin: 10px 5px;
            transition: background-color 0.3s ease;
        }

        .action-button:hover {
            background-color: #764ba2;
        }

        .action-button.secondary {
            background-color: #f0f4ff;
            color: #667eea;
            border: 2px solid #667eea;
        }

        .action-button.secondary:hover {
            background-color: #e8ecff;
        }

        .info-box {
            background-color: #fff3cd;
            border-left: 4px solid #ffc107;
            padding: 15px;
            margin: 25px 0;
            border-radius: 4px;
        }

        .info-box p {
            color: #856404;
            font-size: 12px;
            line-height: 1.6;
            margin: 0;
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

            .enrollment-card {
                padding: 15px;
            }

            .detail-row {
                flex-direction: column;
            }

            .detail-label {
                margin-bottom: 5px;
            }

            .action-button {
                display: block;
                width: 100%;
                text-align: center;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <!-- Header -->
        <div class="header">
            <h1>🎓 Welcome to Your Course!</h1>
            <p>Enrollment Confirmation</p>
        </div>

        <!-- Content -->
        <div class="content">
            <!-- Greeting -->
            <div class="greeting">
                Hello <strong>${name}</strong>,
                <br><br>
                Congratulations! You have successfully enrolled in a new course. We're excited to have you join our learning community!
            </div>

            <!-- Enrollment Card -->
            <div class="enrollment-card">
                <h2>📚 Course Details</h2>
                <div class="course-details">
                    <div class="detail-row">
                        <span class="detail-label">Course Name:</span>
                        <span class="detail-value">${courseName}</span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">Student Name:</span>
                        <span class="detail-value">${name}</span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">Enrollment Date:</span>
                        <span class="detail-value">${new Date().toLocaleDateString('en-US', { 
                            weekday: 'long', 
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric' 
                        })}</span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">Status:</span>
                        <span class="detail-value" style="color: #4caf50; font-weight: 600;">✓ Active</span>
                    </div>
                </div>
            </div>

            <!-- Success Message -->
            <div class="success-message">
                <p>✓ Your enrollment is confirmed! You now have full access to all course materials, lectures, and resources.</p>
            </div>

            <!-- Next Steps -->
            <div class="next-steps">
                <h3>🚀 Next Steps to Get Started:</h3>
                <ol>
                    <li>Log in to your EduTech account</li>
                    <li>Navigate to the course dashboard</li>
                    <li>Review the course syllabus and schedule</li>
                    <li>Access the first lesson and start learning</li>
                    <li>Join the course discussion forum to connect with fellow students</li>
                </ol>
            </div>

            <!-- Action Buttons -->
            <div class="action-buttons">
                <a href="[COURSE_URL]" class="action-button">Access Course Now</a>
                <a href="[DASHBOARD_URL]" class="action-button secondary">Go to Dashboard</a>
            </div>

            <!-- Info Box -->
            <div class="info-box">
                <p>📌 <strong>Tip:</strong> Bookmark the course page for easy access. You can find all course materials, assignments, and announcements there.</p>
            </div>

            <!-- Support Text -->
            <div class="support-text">
                Need help getting started? Check out our <a href="[HELP_CENTER_URL]">Help Center</a> or <a href="[SUPPORT_URL]">contact our support team</a>.
            </div>
        </div>

        <!-- Footer -->
        <div class="footer">
            <p>Happy Learning with EduTech!</p>
            <p>
                <a href="[WEBSITE_URL]">Visit Our Website</a> | 
                <a href="[COURSES_URL]">Browse More Courses</a> | 
                <a href="[PRIVACY_URL]">Privacy Policy</a>
            </p>
            <p class="timestamp">
                © 2024 EduTech. All rights reserved.
                <br>
                This email was sent to: <strong>${name}</strong>
            </p>
        </div>
    </div>
</body>
</html>`;
};

module.exports = courseEnrollmentTemplate;
