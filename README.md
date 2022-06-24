# bloid

bloid is a mix of vatch https://github.com/scenaristeur/vatch/ & levelgraph-jsonld https://github.com/levelgraph/levelgraph-jsonld

- levelgraph-jsonld (tests/index-levelgraph-jsonld.js)
```
const { Level } = require('level')
const bloidDb = new Level('./BloidDb')
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

```
