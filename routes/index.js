var express = require('express');
var router = express.Router();
var fs = require('fs'); // File System Module
var xml2js = require('xml2js'); // XML2JS Module
var parser = new xml2js.Parser(); // Creating XML to JSON parser object
var request = require('request');

var url = 'http://openapi.customs.go.kr/openapi/service/newTradestatistics/geteconomytradeList';
var queryParams = '?' + encodeURIComponent('ServiceKey') + '=vWrQTRp%2BZF8PWf6%2Fi3p6XjJJHJNmwnRzwW2gXYw5b5EI%2FCI58nwenZ%2FRYz%2FDEyjjC2IkZ%2BtTvdechGz%2FCJeHqg%3D%3D'; /* Service Key*/
queryParams += '&' + encodeURIComponent('searchBgnDe') + '=' + encodeURIComponent('201701'); /* 파라미터설명 */
queryParams += '&' + encodeURIComponent('searchEndDe') + '=' + encodeURIComponent('201704'); /* 파라미터설명 */

/* GET home page. */
router.get('/', function(req, res, next) {
    var data = [];

    request({
        url: url + queryParams,
        method: 'GET'
    }, function (error, response, body) {
        console.log('Reponse received', body);

        parser.parseString(body, function (err, result) {
            // console.log(JSON.stringify(result.response.body[0].items[0].item[0]));
            data.push(result.response.body[0].items[0].item[0]);
        });

        res.render('index', { title: 'Express', data: data });
    });

});

module.exports = router;
