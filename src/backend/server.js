const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const PORT = 5000;

// Enable CORS and JSON body parsing
app.use(cors());
app.use(bodyParser.json());

// Define a simple GET route at the root to test server functionality
app.get('/', (req, res) => {
    res.send('Server is running');
});

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'belmonteisel@gmail.com', // Replace with your Gmail address
        pass: 'vwgr qboi poef komh' // Replace with the app password generated from Google
    },
    tls: {
        rejectUnauthorized: false
    }
});


// Define your /send-otp POST route
app.post('/send-otp', (req, res) => {
    const { email, otp } = req.body;

    const mailOptions = {
        from: 'your-email@gmail.com',
        to: email,
        subject: 'Your OTP Code',
        text: `Your OTP code is: ${otp}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
            return res.status(500).send({ message: 'Error sending OTP email' });
        }
        res.status(200).send({ message: 'OTP email sent successfully' });
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
