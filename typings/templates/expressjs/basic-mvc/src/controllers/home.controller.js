exports.getHome = async (req, res, next) => {
	try {
		return res.render('home', {
			title: 'Trang chủ',
		});
	} catch (error) {
		console.error('GET HOME ERROR: ', error);
		return res.render('404.pug');
	}
};
