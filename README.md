# bloid

- Bloid allows you to manage your (meta)datas anf files between real life and virtual worlds.
- My computer was a dumb machine, and we will learn together how to build a smart one.
- Bloid is a user interface to manage your multiple verses.
- The first important level is to register/manage your health (meta)data in a secure place : your personnal device



# reactive
- Bloid should allow many secure independant userspace on same machine (fuse ?)
- Bloid should manage (store, secure, allow to share...) files (vatch), data and metadata (levelgraphjsonld / os)
- Bloid should respond in a intuitive way
- Bloid should be real time, notify me one important event (socket.io, os )
- Bloid should be local-first, and synch to any type of device (Solid, ipfs, gundb..., multilevel (not working yet)? )
- Bloid should keep an history of actions (trellis ? ActivityPub ?), a versioning of objects (git-ipfs?)
- intelligent comment un enfant qui apprend de zéro, le système s'adapte à son utilisateur et peut partager ses methodes apprises avec d'autres systèmes partenaires, apprendre d'eux... Progressive Neural network

# access
- bloid can be accessed via
  - command line like os / installed on the system / https://www.twilio.com/blog/how-to-build-a-cli-with-node-js
  - forms like vatch-vue (socket.io)
  - graph view like agent
  - accessed with a widget on a smartphone / shareable webapp
  - other

bloid is a mix of vatch https://github.com/scenaristeur/vatch/ & levelgraph-jsonld https://github.com/levelgraph/levelgraph-jsonld & https://scenaristeur.github.io/agent

levelgraphjsonld as an issue  with levelgraph since level has been updated to 8.0.0 https://github.com/Level/level/blob/master/UPGRADING.md

A store cannot be opened by multiple instances of levelup simultaneously



voir aussi multilevel pour exposer la base :
- https://github.com/bkrith/multilevel
- ou https://github.com/juliangruber/multilevel compatible websocket-stream & authentication

- levelgraph-jsonld (tests/index-levelgraph-jsonld.js)


# lerna js
- tool for monorepos https://lerna.js.org/



# fuse user space
- https://www.youtube.com/watch?v=SG10bZeYi6k
- http://events17.linuxfoundation.org/sites/events/files/slides/frontendFS.pdf / https://files.speakerdeck.com/presentations/c4252dbd24364771b26b15dea45e9e49/ClayNodeInteractiveTalk.pdf
- https://github.com/mafintosh/fuse-bindings
- successor https://github.com/fuse-friends/fuse-native



~/.os$ cat .config.jsonld
{
      "db_name": "Universe",
      "db_path": "/home/xxxx/.os/UniverseDb",
      "description": "A cool jsonld database for storing my thoughts",
      "version": "0.0.1",
      "owner": "smag",
      "base_opts": "{ base: 'http://local/base' }"
    }



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

 # connexions
 - gundb
 - ipfs
 -  matrix-crdt
 - telegram bot api


# sur vatch-vue
- create folder ending with a slash
`/data/Bloid/ + send` -> create a /data/Bloid folder
- create file not ending with a slash
`/data/Bloid/vatch + send` -> create a /data/Bloid/vatch file
