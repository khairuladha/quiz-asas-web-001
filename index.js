const http = require('http');
const url = require('url');

const reqHandler = (req, res) => {

	const reqUrl = url.parse(req.url, true);
	
	if ((reqUrl.pathname == '/utama' || reqUrl.pathname == '/')  && req.method === 'GET') {

		res.writeHead(201, {'Content-Type': 'text/html'});
		res.write('Asas pembangunan web dengan NodeJS');
		res.end();

	}
	
	else if(reqUrl.pathname == '/pengguna' && req.method === 'GET'){
		
		console.log('Request Type:' +
            req.method + ' Endpoint: ' +
            reqUrl.pathname);

			penggunaRequest(req, res); // panggil penggunaRequest

	}
	
	else if(reqUrl.pathname == '/waktu' && req.method === 'GET'){
		
		res.writeHead(203, {'Content-Type': 'text/html'});
		let date = new Date();

		// current date
		let hari = ("0"+ date.getDate()).slice(-2); // adjust 0 before single digit date
		let bulan = ("0"+(date.getMonth()+1)).slice(-2);
		let tahun = date.getFullYear();
		
		let jam = date.getHours();
		let minit = date.getMinutes();
		let saat = date.getSeconds();
		

		res.write(' Tarikh ' + hari +':'+ bulan +':'+ tahun); 
		res.write('    Masa : '+jam+':'+minit+':'+saat)
		res.end(); 

	}


	else if((reqUrl.pathname == '/tambahsatu/2' || reqUrl.pathname == '/tambahsatu/6') && req.method === 'GET' ){

		var namaUrl  = reqUrl.pathname;
		var nom1 = 1;
		var jumlahNum;

		console.log(namaUrl);

		switch (namaUrl){
			case '/tambahsatu/2':
					res.writeHead(203, {'Content-Type': 'text/html'});
				
					var nom2 = 2;
	
					jumlahNum = nom1 + nom2;
	
					res.write(`${jumlahNum}`);
					res.end();
			break;

			case '/tambahsatu/6':

			res.writeHead(203, {'Content-Type': 'text/html'});
				
					var nom2 = 6;

					jumlahNum = nom1 + nom2;

					res.write(`${jumlahNum}`);
					res.end();
			break;

		}

		res.end();
	}

	else {
		res.writeHead(404, {'Content-Type': 'text/html'});
		res.write('error 404 : source not found');
		res.end();
	}
};

//tindak balas dari url pengguna
penggunaRequest = function (req, res) {
    const reqUrl = url.parse(req.url, true).query;
    var nama = ' '; 
    if (reqUrl.nama) {
        nama = reqUrl.nama
    }

    var response = {
          nama
    };

    res.statusCode = 202;
    res.setHeader('Content-Type', 'text/html');
	
	var response2= JSON.stringify(response) //exe : '{"nama":"John", "age":30}'
	var obj = JSON.parse(response2);

	console.log(obj);

	res.write(`Selamat Kembali ${obj.nama}`)
	res.end();
};

const serverErrHandler = (err) => {
	console.log(err);
};


const processTermHandler = () => {
	console.log('\nCaptured termination signal: server shutting down');
	process.exit();	

};

//set server options
const serverOptions = { 
	port: 8081  // set server to listen to port 8080
};

const serverListenerHandler = () => {
	console.log(`Server is listening at port ${serverOptions.port}\nPress Ctrl+C to terminate.`);
};

const server = http.createServer(reqHandler);

server.on('error', serverErrHandler);

process.on('SIGINT', processTermHandler);

server.listen(serverOptions, serverListenerHandler);