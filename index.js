const http = require('http');

http.createServer((req, res) => {
    res.writeHead(200, {
        'Content-Type': 'application/json; charset=utf-8;',
        'Access-Control-Allow-Origin': '*' //임시로 넣음
    });
    
    res.end();

}).listen(80);
