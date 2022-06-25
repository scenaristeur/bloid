let home = process.env.HOME
let db_path = home+"/.os/.universDB"
// const { Level } = require('level')
// const universDB     = new Level(path)

const multilevel = require('@bkrith/multilevel');

const multi = new multilevel();

// const level   = require('level'),
// universDB     = level(db_path)
universDB = multi.level(db_path);
levelgraph = require('levelgraph'),
jsonld     = require('levelgraph-jsonld'),
opts       = { base: 'http://scenaristeur.github.io/bloid' },
db         = jsonld(levelgraph(universDB), opts);

multi.levelModule = db;



// .then((res)=> {
  console.log("listening multi on port 22500")
// })

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

multi.listen({ port: 22500 })
