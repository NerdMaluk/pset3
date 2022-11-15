const User = require('../../models/User');
const jwt = require('jsonwebtoken');

exports.create = async (req, res) => {

    const { email, password } = req.body;

   const user = await User.get_byEmail(email);    

   if (!user) {
     return res.status(401).json({ error: 'Wrong Email or Password'});
   }

   // check if password is valid
   const isPasswordValid = await User.check_password(password, user.password);

   if (!isPasswordValid) {
     return res.status(401).json({
        error: 'Wrong Email or Password'
     })
   }

   res.status(201).json(
    {
        name: user.name,
        token: jwt.sign({id: user.id}, "bbef357897e532a60da4830fac13623e", {
            expiresIn: '30d'
        } )
    }
   );
}