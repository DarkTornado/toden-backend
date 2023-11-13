const axios = require('axios');

async function init() {
    var url = 'https://api-public.odpt.org/api/v4/odpt:Train?odpt:operator=odpt.Operator:Toei';
    var response = await axios.get(url);
    return response.data;
}

module.exports = init;
