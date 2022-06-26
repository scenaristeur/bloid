var multilevel = require('multilevel');
var net = require('net');

const level = require('level')
const bloidDb = level('./BloidDb')
levelgraph = require('levelgraph'),
jsonld     = require('levelgraph-jsonld'),
opts       = { base: 'http://scenaristeur.github.io/bloid' },
db         = jsonld(levelgraph(bloidDb), opts);


var manu = {
  "@context": {
    "name": "http://xmlns.com/foaf/0.1/name",
    "homepage": {
      "@id": "http://xmlns.com/foaf/0.1/homepage",
      "@type": "@id"
    }
  },
  "@id": "http://manu.sporny.org#person",
  "name": "Manu Sporny",
  "homepage": "http://manu.sporny.org/"
};

db.jsonld.put(manu, function(err, obj) {
  // do something after the obj is inserted
  console.log(err, obj)
});

net.createServer(function (con) {
  con.pipe(multilevel.server(db)).pipe(con);
}).listen(3000);
