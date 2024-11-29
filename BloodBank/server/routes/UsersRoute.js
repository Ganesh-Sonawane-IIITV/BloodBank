const router = require("express").Router();
const bcrypt = require("bcryptjs");
const User = require("../models/UserModel");
const jwt = require('jsonwebtoken');
const authMiddleware = require("../middlewares/authMiddleware");

//regsiter new user (Register API)
router.post("/register", async (req, res) => {
  try {
    //check if user is already exist
    const userExist = await User.findOne({ email: req.body.email });
    if (userExist) {
      return res.send({
        success: false,
        message: "User already exists",
      });
    }

    //hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    req.body.password = hashedPassword;

    //save user
    const user = new User(req.body);
    await user.save();

    return res.send({
      success: true,
      message: "User registered successfully",
    });
  } catch (error) {
    return res.send({
      success: false,
      message: error.message,
    });
  }
});

//login user
router.post('/login', async(req, res) => {
    try {
        //xheck if user exists or not
        const user = await User.findOne({ email: req.body.email})
        if(!user){
            return res.send({
                success: false,
                message: 'User not found',
            });
        }

        //compare password
        const validPassword = await bcrypt.compare(
            req.body.password,
            user.password

        );

        if(!validPassword){
            return res.send({
                success: false,
                message: "Invalid password"
            })
        }
      //generate token
      const token = jwt.sign(
        { userId : user._id},process.env.jwt_secret, {expiresIn: '1d'}

      )
      
      return res.send({
        success: true,
        message: 'User logged in successfully',
        data: token
      })
        
    } catch (error) {
        return res.send({
        success: false,
        message: error.message,
        })
        
        
    }


});

router.get('/get-current-user',authMiddleware, async(req,res) => {
  try {
    const user = await User.findOne({_id: req.body.userId});
    //user.password = undefined;
    return res.send({
      success: true,
      message: 'User fetched successfully !',
      data: user,

    });
    
  } catch (error) {
    return res.send({
      success: false,
      message: error.message,
    });
    
  }
})

module.exports = router;
