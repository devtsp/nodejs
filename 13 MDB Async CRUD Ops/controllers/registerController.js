const User = require('../model/User');
const bcrypt = require('bcrypt');

const handleNewUser = async (req, res) => {
	const { user, pwd } = req.body;
	if (!user || !pwd)
		return res
			.status(400)
			.json({ 'message': 'Username and password are required.' });
	// Check for duplicate usernames in the db
	// With mongoose we do it with .findOne(). In an async block we define .exec() at the end
	const duplicate = await User.findOne({ username: user }).exec();
	if (duplicate) return res.sendStatus(409); //Conflict

	try {
		const hashedPwd = await bcrypt.hash(pwd, 10);
		// With mongoose we create and store new user all at once
		const result = await User.create({
			// Id will be created automatically
			'username': user,
			'password': hashedPwd,
		});
		console.log(result);
		res.status(201).json({ 'success': `New user ${user} created!` });
	} catch (err) {
		res.status(500).json({ 'message': err.message });
	}
};

module.exports = { handleNewUser };
