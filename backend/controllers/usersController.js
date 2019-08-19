var mongoose = require('mongoose');
var User = mongoose.model('User');


exports.create_user = function(req, res) {
    var user = new User(req.body);
    user.save(function(err, newUser) {
        if(err)
            res.send(err);
        res.status(201).json(newUser);
    });
};

exports.get_user = function(req, res) {
    let uid = res.locals.uid;
    User.findOne({firebase_uid: uid}, function(err, user) {
        if(user && !err) {
            res.status(200).json(user);
        } else {
            res.status(404).json({
                description: 'User not found!'
            });
        }
    }); 
}

exports.update_user = function(req, res) {
    let uid = res.locals.uid;
    let updateUser = new User(req.body);
    User.findOneAndUpdate({firebase_uid: uid}, updateUser.prepareUpdate(), {new: true}, function(err, updateUser){
        if (err)
			res.send(err);
		else{
			if(updateUser == null){
				res.status(404).send({
					description: 'User not found'
				});
			}
			else{
				res.json(updateUser);
			}
		}
    });
};

