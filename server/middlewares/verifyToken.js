const jwt=require('jsonwebtoken');

const verifyToken=async (req ,res,next)=>{
    const bearerToken=req.headers.authorization;
    if(! bearerToken){ 
        return res.status(401).json({status:false,message:"Access Denied. Access token required"})
    }

    const token=bearerToken.split(' ')[1];
    try {
        const payload=jwt.verify(token,'MERN');
        req.payload=payload;
        next();
    } catch (error) {
        return res.status(403).json({status:false,message:"Invalid or Expired Token"})
    }
}


module.exports=verifyToken;