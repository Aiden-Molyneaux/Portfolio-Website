import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";

const sesClient = new SESClient({ region: "us-east-1" });

export const handler = async (event) => {
  const formData = JSON.parse(event.body);
  const { name, email, message } = formData;

  const emailParams = {
    Source: 'molyneaux271@gmail.com', 
    Destination: {
      ToAddresses: ['aidenmolyneaux@hotmail.com'],
    },
    ReplyToAddresses: [email], // User's email from the form for the reply-to field
    Message: {
      Subject: {
        Data: `New Message from ${name}`,
      },
      Body: {
        Text: {
          Data: `Contact form submission:\n\nName: ${name}\nEmail: ${email}\nMessage:\n${message}`,
        },
      },
    },
  };

  try {
    // Send the email using SESClient
    const command = new SendEmailCommand(emailParams);
    await sesClient.send(command);
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Email sent successfully!' }),
    };
  } catch (error) {
    console.error('Error sending email:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Failed to send email' }),
    };
  }
};