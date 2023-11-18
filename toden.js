const axios = require('axios');

async function init() {
    var url = 'https://api-public.odpt.org/api/v4/odpt:Train?odpt:operator=odpt.Operator:Toei';
    var response = await axios.get(url);
    var data = [];
    response.data.forEach((e) => {
        if (e['odpt:railway'] != 'odpt.Railway:Toei.Arakawa') return;
        var stn, status;
        if (e['odpt:toStation'] == null) {
            stn = e['odpt:fromStation'];
            status = 'Arrived';
        } else {
            stn = e['odpt:toStation'];
            status = 'Approaching';
        }
        data.push({
            no: e['odpt:trainNumber'],
            stn: stn.split('.').at(-1),
            status: status,
            dest: e['odpt:destinationStation'][0].split('.').at(-1),
            isUp: e['odpt:railDirection'] == 'odpt.RailDirection:Toei.Minowabashi'
        });
    });
    return data;
}

module.exports = init;
