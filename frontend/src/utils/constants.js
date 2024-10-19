require('dotenv').config(); // Load environment variables from .env file

const constants = {
    MONGO_URL:"mongodb+srv://dussenvander369:<dussenvander369>@qr.ohv7f.mongodb.net/?retryWrites=true&w=majority&appName=QR" ,
    JWT_SECRET: "dFwS1ynrMHLIt8OVTJhsM5VHjaxMocFX18ATbHutgg0="|| "",
    PORT: process.env.PORT || 3005,
};

if (!constants.MONGO_URL) {
    throw new Error('Please define the MONGO_URL environment variable.');
}

module.exports = constants;