import { mailtrapclient, sender } from './mailtrap.js';
import { VERIFICATION_EMAIL_TEMPLATE } from './emailTemplates.js';

export const SendVerificationEmail = async (email, verificationToken) => {
    const recipient = [{ email }];

    try {
        const response = await mailtrapclient.send({
            to: recipient,
            from: sender,
            subject: "Verify your email",
            html: VERIFICATION_EMAIL_TEMPLATE.replace('{verificationCode}', verificationToken),
            category: 'email_verification'
        });

        console.log("Email Sent Successfully", response);
    } catch (error) {
        console.error("Error sending VerificationEmail", error);
        throw new Error("Error sending VerificationEmail", error);
    }
};

export const sendWelcomeEmail = async (email, name) => {
    const recipient = [{ email }];

    try {
        const response = await mailtrapclient.send({
            from: sender,
            to: recipient,
            template_uuid: "4cd64d67-7a71-4889-94ee-19657c16eac9",
            template_variables: {
                "company_info_name": "Bishal Majhi",
                name: name
            }
        })
        console.log("Welcome Email Sent Successfully", response)

    } catch (error) {

    }
}