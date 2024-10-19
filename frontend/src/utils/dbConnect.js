const mongoose = require('mongoose');
const constants = require('./constants');

const MONGOURL = constants.MONGO_URL;

let cached = global.mongoose;

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
    if (cached.conn) {
        return cached.conn;
    }

    if (!cached.promise) {
        cached.promise = mongoose.connect(MONGOURL, {
            bufferCommands: false,
        }).then((mongooseInstance) => mongooseInstance);
    }

    cached.conn = await cached.promise;
    return cached.conn;
}

module.exports = dbConnect;