const User = require('../../models/User');


exports.get_info = async (req, res) => {
    const {user_id} = req
    const user = await User.get_byId(user_id);
    res.json(user);

}


exports.create_user = async (req, res) => {

    const { name, username, email, password, birth, gender  } = req.body;

    if (!(name && username && email && password && birth && gender)) {
        return res.status(400).json({sucess: false, error: "All fields must be filled"});
    }

   const user = await User.create_user(name, username, email, password, birth, gender);    

   res.status(201).json({sucess: true ,user: user});
}


exports.update_user = async (req, res) => {

    const { name, username, email, password, birth, gender  } = req.body;
    const {user_id} = req;

   const user = await User.update_user(user_id, name, username, email, password, birth, gender);    

   res.status(201).json({sucess: true ,user: user});
}


exports.delete_user = async (req, res) => {

    const {user_id} = req;
    const {answer} = req.params;
    if (answer.toLowerCase() != "yes" ) {
       return res.json({sucess: false, error: "Couldn't Delete User"} ) 
    }
    const user = await User.delete_user(user_id) 

    res.json({sucess: true, msg: "User Deleted"} ) 
}