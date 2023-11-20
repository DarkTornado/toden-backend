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

    var result = [];
    var stns = [{"k":"미노와바시","j":"三ノ輪橋","e":"Minowabashi"},{"k":"아라카와잇츄마에","j":"荒川一中前","e":"ArakawaItchumae"},{"k":"아라카와쿠야쿠쇼마에","j":"荒川区役所前","e":"Arakawakuyakushomae"},{"k":"아라카와니초메","j":"荒川二丁目","e":"ArakawaNichome"},{"k":"아라카와나나초메","j":"荒川七丁目","e":"ArakawaNanachome"},{"k":"마치야에키마에","j":"町屋駅前","e":"MachiyaEkimae"},{"k":"마치야니초메","j":"町屋二丁目","e":"MachiyaNichome"},{"k":"히가시오구산초메","j":"東尾久三丁目","e":"HigashiOguSanchome"},{"k":"쿠마노마에","j":"熊野前","e":"Kumanomae"},{"k":"미야노마에","j":"宮ノ前","e":"Miyanomae"},{"k":"오다이","j":"小台","e":"Odai"},{"k":"아라카와유엔치마에","j":"荒川遊園地前","e":"ArakawaYuenchimae"},{"k":"아라카와샤코마에","j":"荒川車庫前","e":"ArakawaShakomae"},{"k":"카지와라","j":"梶原","e":"Kajiwara"},{"k":"사카에쵸","j":"栄町","e":"Sakaecho"},{"k":"오지에키마에","j":"王子駅前","e":"OjiEkimae"},{"k":"아스카야마","j":"飛鳥山","e":"Asukayama"},{"k":"타키노가와잇초메","j":"滝野川一丁目","e":"TakinogawaItchome"},{"k":"니시가하라욘초메","j":"西ヶ原四丁目","e":"NishigaharaYonchome"},{"k":"신코신즈카","j":"新庚申塚","e":"ShinKoshinzuka"},{"k":"코신즈카","j":"庚申塚","e":"Koshinzuka"},{"k":"스가모신덴","j":"巣鴨新田","e":"Sugamoshinden"},{"k":"오츠카에키마에","j":"大塚駅前","e":"OtsukaEkimae"},{"k":"무코하라","j":"向原","e":"Mukohara"},{"k":"히가시이케부쿠로욘초메","j":"東池袋四丁目","e":"HigashiIkebukuroYonchome"},{"k":"도덴조시가야","j":"都電雑司ヶ谷","e":"TodenZoshigaya"},{"k":"키시보진마에","j":"鬼子母神前","e":"Kishibojimmae"},{"k":"가쿠슈인시타","j":"学習院下","e":"Gakushuinshita"},{"k":"오모카게바시","j":"面影橋","e":"Omokagebashi"},{"k":"와세다","j":"早稲田","e":"Waseda"}];
    var stnMap = {};
    stns.forEach((e) => {
        stnMap[e.e] = {
            k: e.k,
            j: e.j
        };
    });
    stns.forEach((e, i) => {
        result[i] = {
            stn: {
                ko: e.k,
                ja: e.j,
                en: e.e
            },
            up: [],
            dn: []
        };
        data.forEach((e) => {
            if (stns[i].e != e.stn) return;
            var datum = {
                no: e.no,
                status: e.status,
                dest: {
                    ko: stnMap[e.dest].k,
                    ja: stnMap[e.dest].j,
                    en: e.dest
                }
            };
            if (e.isUp) result[i].up.push(datum);
            else result[i].dn.push(datum);
        });
    });

    return result;
}

module.exports = init;
