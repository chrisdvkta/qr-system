const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req,res,next)=>{
    let token ; 
    // console.log(req.headers);
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try{
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token,process.env.JWT_SECRET);
            req.user = await User.findById(decoded.id).select('-password');
            next();
        }catch(error){
            return res.status(401).json({message:"not authorized, token failed"});
        }
    }
    if (!token) {
        return res.status(401).json({ message: 'Not authorized, no token' });
      }

}

const admin = (req,res,next)=>{
    if(req.user && req.user.role==='admin'){
        next(); 
    }else{
        res.status(403).json({message:"Not admin,you're a user"});
    }
}

module.exports = {protect,admin};