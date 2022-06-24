# bloid

bloid is a mix of vatch https://github.com/scenaristeur/vatch/ & levelgraph-jsonld https://github.com/levelgraph/levelgraph-jsonld & https://scenaristeur.github.io/agent

levelgraphjsonld as an issue  with levelgraph since level has been updated to 8.0.0 https://github.com/Level/level/blob/master/UPGRADING.md

A store cannot be opened by multiple instances of levelup simultaneously



voir aussi multilevel pour exposer la base :
- https://github.com/bkrith/multilevel
- ou https://github.com/juliangruber/multilevel compatible websocket-stream & authentication

- levelgraph-jsonld (tests/index-levelgraph-jsonld.js)


# fuse user space
- https://www.youtube.com/watch?v=SG10bZeYi6k
- http://events17.linuxfoundation.org/sites/events/files/slides/frontendFS.pdf / https://files.speakerdeck.com/presentations/c4252dbd24364771b26b15dea45e9e49/ClayNodeInteractiveTalk.pdf
- https://github.com/mafintosh/fuse-bindings
- successor https://github.com/fuse-friends/fuse-native

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
