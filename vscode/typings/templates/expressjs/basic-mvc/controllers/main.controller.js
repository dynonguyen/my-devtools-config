exports.getHomePage = (req, res, next) => {
	try {
		res.render('index.html');
	} catch (error) {
		throw error;
	}
};
