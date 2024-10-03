import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses"; // Import only SES client from AWS SDK v3

const sesClient = new SESClient({ region: "us-east-1" }); // Replace with your region

export const handler = async (event) => {
  const formData = JSON.parse(event.body); // Parse form data
  const { name, email, message } = formData; // Extract form fields

  // Define email parameters
  const emailParams = {
    Source: 'aidenmolyneaux@hotmail.com', // Your verified email address
    Destination: {
      ToAddresses: ['aidenmolyneaux@hotmail.com'], // Your email address to receive the form details
    },
    ReplyToAddresses: [email], // User's email from the form for the reply-to field
    Message: {
      Subject: {
        Data: `New Form Submission from ${name}`,
      },
      Body: {
        Text: {
          Data: `You received a new form submission:\n\nName: ${name}\nEmail: ${email}\nMessage:\n${message}`,
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