const mailSender = require("../utils/mailSender");

exports.ContactUs = async (req, res) => {
    try{
        //fetch data
        const {firstName, lastName, email, phoneNo, message} = req.body;
        if(!firstName || !lastName || !email || !message){
            return res.status(400).json({
                success: false,
                message: "please fill the required fields."
            });
        }
        //fetch user id (optional - only available if user is authenticated)
        const userId = req.user?.id || "Guest";
        //send confirmation email to user
        const mailResponse = mailSender(email, 
                                        "Confirmation email",
                                        `Hello ${firstName} ${lastName}. Your data has been successfully recieved. Thank you for contacting us!!`
        )
        
        //send email to admin
        const adminEmail = process.env.ADMIN_EMAIL;
        const adminEmailResponse = await mailSender(
            adminEmail,
            `New Contact Us Message from ${firstName} ${lastName}`,
            `<p><strong>Name:</strong> ${firstName} ${lastName}</p>
             <p><strong>Email:</strong> ${email}</p>
             <p><strong>Phone:</strong> ${phoneNo}</p>
             <p><strong>Message:</strong> ${message}</p>
             <p><strong>User ID:</strong> ${userId}</p>`
        )
        if(!mailResponse || !adminEmailResponse ){
            return res.status(500).json({
                success: false,
                message: "Failed to send email"
            })
        }

        return res.status(200).json({
            success: true,
            message: "Email sent successfully"
        })
    } catch(err){
         console.log("Error in ContactUs:", err);
         return res.status(500).json({
            success: false,
            message: "Error sending email"
        });
    }
}