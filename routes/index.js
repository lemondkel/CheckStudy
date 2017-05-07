var express = require('express');
var router = express.Router();
var xml2js = require('xml2js'); // XML2JS Module
var parser = new xml2js.Parser(); // Creating XML to JSON parser object
var request = require('request');

var url = 'http://openapi.customs.go.kr/openapi/service/newTradestatistics/geteconomytradeList';
var queryParams = '?' + encodeURIComponent('ServiceKey') + '=vWrQTRp%2BZF8PWf6%2Fi3p6XjJJHJNmwnRzwW2gXYw5b5EI%2FCI58nwenZ%2FRYz%2FDEyjjC2IkZ%2BtTvdechGz%2FCJeHqg%3D%3D';
/* Service Key*/
queryParams += '&' + encodeURIComponent('searchBgnDe') + '=' + encodeURIComponent('201703');
/* 파라미터설명 */
queryParams += '&' + encodeURIComponent('searchEndDe') + '=' + encodeURIComponent('201703');
/* 파라미터설명 */

/* GET home page. */
router.get('/', function (req, res, next) {
    var data = [];

    request({
        url: url + queryParams,
        method: 'GET'
    }, function (error, response, body) {
        // console.log('Reponse received', body);

        parser.parseString(body, function (err, result) {
            // console.log(JSON.stringify(result.response.body[0].items[0].item[0]));
            for (var i = 0; i < result.response.body[0].items[0].item.length; i++)
                data.push(result.response.body[0].items[0].item[i]);
        });

        var balPayments = [];
        var expCnt = [];
        var expDlr = [];
        var impCnt = [];
        var impDlr = [];
        var statCd = [];
        var statCdCntnKor1 = [];
        var year = [];


        for (var i = 0; i < data.length; i++) {
            balPayments.push(data[i].balPayments);
            expCnt.push(data[i].expCnt);
            expDlr.push(data[i].expDlr);
            impCnt.push(data[i].impCnt);
            impDlr.push(data[i].impDlr);
            statCd.push(data[i].statCd);
            statCdCntnKor1.push(data[i].statCdCntnKor1);
            year.push(data[i].year);
        }

        res.render('index', {
            balPayments: balPayments, expCnt: expCnt, expDlr: expDlr, impCnt: impCnt, impDlr: impDlr
            , statCd: statCd, statCdCntnKor1: statCdCntnKor1, year: year
        });
    });

});

module.exports = router;
