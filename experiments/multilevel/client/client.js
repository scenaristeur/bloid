var multilevel = require('multilevel');
var net = require('net');

var db = multilevel.client();
var con = net.connect(3000);
con.pipe(db.createRpcStream()).pipe(con);

// asynchronous methods
db.get('foo', function (res) {
console.log("res", res)

/* */ });

// streams
db.createReadStream().on('data', function () {
console.log('data', data)

/* */ });
