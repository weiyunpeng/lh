var MAIN = require('../main.js');
function run(Request, Response) {
    var Params = MAIN.getParams(Request);
    if (Request.params && Request.params.name) {
        var funs = {
            //两会热词
            hot: hot
        };
        funs[Request.params.name](Params, Request, Response);
    } else {
        Response.end('this is stub');
    }
}
/**
 * 两会热词
 * @param {Object} Request
 * @param {Object} Response
 */
function hot(Params, Request, Response) {
    var fileName = 'index/data/hot.json';
    MAIN.responseStub(Response, fileName);
}

exports.index = run;
