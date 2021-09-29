
const User = require('../models/User')
const ErrorResponse = require('../utils/errorResponse')
class AuthController {

      static loginPage(req, res, next){
         try{
             res.render('auth/login')
         }
         catch(err){
            next(err)
         }
      }
      static async login(req, res, next){
         try{
            const {email , password} = req.body;
            if (!email || !password) {
               return next(ErrorResponse.badRequest('All fields are required'))
            }
            const user = await User.findOne({email}).select('+password');
            if(!user){
               return next(new ErrorResponse(401, 'Wrong credentials'))
            }
            const isValid = await user.matchPassword(password);
            if(!isValid){
               return next(new ErrorResponse(401, 'Wrong credentials') )
            }
            user.password = undefined
            req.session.user = user;
            res.status(200).json({msg:'success', user})
         }
         catch(err){
               next(err)
         }
      }
      static registerPage(req, res, next){
         try{
               res.render('auth/register')
         }
         catch(err){
            next(err)
         }
      }
      static async register(req, res, next){
         try{
            const {username , email , password} = req.body;
            if (!email || !password || !username) {
               return next(ErrorResponse.badRequest('All fields are required'))
            }
            const user = await User.create({username, email,password});
            req.session.user = user;
            res.status(204).json({msg:'success', user})
         }
         catch(err){
               next(err)
         }
      }
      static forgotPasswordPage(req, res, next){
         res.send('forgot password page')
      }
      static async getResetToken(req, res, next){
         res.send('reset token logic')
      }
      static resetPasswordPage(req, res, next){
         res.send('change password page')
      }
      static async resetPassword(req, res, next){
         res.send('change password logic')
      }

      static async logout(req,res, next){
           
           try {
             req.session.destroy()
             res.redirect('back')
           } catch (err) {
              next(err)
           }

      }

}

module.exports = AuthController ;