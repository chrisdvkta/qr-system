const jwt = require('jsonwebtoken');

function verifyUser(req, res, next) {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: "Unauthorized: no token" });
    }
    try {
        const decoded = jwt.verify(token, process.env.NEXT_PUBLIC_JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(500).json({ error: "Invalid token" });
    }
}

function verifyAdmin(req, res, next) {
    verifyUser(req, res, (err) => {
        if (err) return;
        if (req.user?.role !== 'admin') {
            return res.status(403).json("NO ADMIN ACCESS");
        }
        next();
    });
}

module.exports = {
    verifyUser,
    verifyAdmin,
};
