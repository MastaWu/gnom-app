module.exports = function() {
	switch(process.env.NODE_ENV) {
		case 'development' :
		return {
			database : {
                host: '127.0.0.1',
                port: '3306',
                user: 'root',
                password: 'password'
            }
		};
		
		case 'production' :
		return {
			
		};
		
		default:
		return {
		    database : {
                host: '127.0.0.1',
                port: '3306',
                user: 'root',
                password: 'password'
            }
		};
	}
};