const axios = require('axios');

async function init() {
    var url = 'https://api-public.odpt.org/api/v4/odpt:Train?odpt:operator=odpt.Operator:Toei';
    var response = await axios.get(url);
    var data = [];
    response.data.forEach((e) => {
        if (e['odpt:railway'] != 'odpt.Railway:Toei.Arakawa') return;
        data.push(e);
    });
    return data;
}

module.exports = init;
