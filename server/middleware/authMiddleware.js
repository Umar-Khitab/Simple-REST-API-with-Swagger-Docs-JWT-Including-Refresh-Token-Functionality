require('dotenv').config();
const jwt = require('jsonwebtoken')

const User = require('../models/user');

const authenticateToken = async (req,res,next) =>{
  //verify user is authenticated
  const authorization = req.headers.token
//   console.log(authorization)
  if(!authorization){
      return res.status(401).json({error: 'Authorization token required'})
  }
  const token = authorization.split(' ')[1]
  console.log(token)
  try{
       jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
      // req.user = await User.findOne({_id})
      // console.log(req.user)
      next();
  }catch (error){
      console.log(error)
      res.status(401).json({error: 'Request is not authorized'})
  }
  
}
module.exports = {authenticateToken}

// __________________
// const  authenticateToken  = (req,res,next) => {
//     const authHeader = req.header.token;
//     console.log("run",authHeader)
//     const token = authHeader && authHeader.split(' ')[1]
//     if(token === null ) return res.sendStatus(401)

//     jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
//         if(err) return res.sendStatus(403)
//         req.user = user
//         next();
//     })
// }
// module.exports = {authenticateToken}