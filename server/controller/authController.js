require('dotenv').config();

const User = require('../models/user')
const jwt = require('jsonwebtoken');
 
// Generate Access token
const createToken = _id => {
  return jwt.sign({_id}, process.env.ACCESS_TOKEN_SECRET);
}

// Generate Refresh token..
const generateRefreshToken = _id => {
   return jwt.sign({_id}, process.env.REFRESH_TOKEN_SECRET) 
  }

const signupUser = async (req,res) => {
    const {username,email,password } = req.body
   try {
    const user = await  User.signup(username, email, password)
//     Create a token
    const accessToken = createToken(user._id)
    const refreshToken = generateRefreshToken(user._id)
    res.status(200).json({user, accessToken,refreshToken})
   } catch (error){
    res.status(400).json({error: error.message})
  }
     
    }
    const signinUser = async (req,res) => {
            const {username,password } = req.body
            console.log(username,password)
   try {
    const user = await  User.login(username,  password)
    //create token
    const accessToken = createToken(user._id,)
    const refreshToken = generateRefreshToken(user._id)
    res.status(200).json({user, accessToken, refreshToken})
   } catch (error){
    res.status(400).json({error: error.message})
  }
      
}

let refreshTokens = [];

const refreshToken = (req, res) => {
  const refreshToken = req.headers.token.split(' ')[1];
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Invalid refresh token' });
    }

    // Get the user ID from the User model
    const {_id} =  decoded;
    console.log('user', _id)
    User.findById({_id}, (err, user) => {
      if (err || !user) {
        return res.status(401).json({ message: 'Invalid user' });
      }
      
      // Sign a new access token
      const accessToken = jwt.sign({
        userId: user.id,
      }, process.env.ACCESS_TOKEN_SECRET, 
      // {
      //   expiresIn: '15m'
      // }
      );

      return res.status(200).json({ accessToken });
    });
  });
}  


module.exports = { signupUser, signinUser ,refreshToken}