const http = require('http');
const toden = require('./toden');

http.createServer(async (req, res) => {
    res.writeHead(200, {
        'Content-Type': 'application/json; charset=utf-8;',
        'Access-Control-Allow-Origin': '*' //임시로 넣음
    });
    let url, params;
    if (req.url.includes('?')) {
        [url, params] = req.url.split('?');
    } else {
        url = req.url;
        params = '';
    }
    params = query2object(params);
    res.write(JSON.stringify(await toden(params), null, 4));
    res.end();
}).listen(80);


function query2object(query) {
    if (query.trim() == '') return {};
    const result = {};
    const data = decodeURI(query).split('&');
    for (let n = 0; n < data.length; n++) {
        const datum = data[n].split('=');
        result[datum[0]] = datum[1];
    }
    return result;
}