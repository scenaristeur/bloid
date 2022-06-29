# bloid

```
mkdir -p ~/.os/.universDB #where your jsonldgraph db will be stored
cd bloid
npx lerna bootstrap
npm run client:install
npm run start
#enjoy !
```

if you want to update your client
```
npm run client:update
```
- or on another window run bloid-client in dev mode https://github.com/scenaristeur/bloid-client
- or use the online version https://scenaristeur.github.io/bloid-client/

the two (server & client) should be able to realtime communicate through port 5000 via socket.io


# what it does
## On the client,

 the `let` command let you create new things :
- `let` catch in client src/views/TerminalView with `this.commands.let = ({_}) =>{...}` open a modal where you can type details of the thing
- when hiting the save button on the src/views/crud/CrudLet.vue a new 'crud' thing is created with action 'create' and the global function $io_ld_crud is called
```
save(){
    console.log("save ", this.thing)
    let crud = {action: "create", thing: this.thing, start: Date.now()}
    this.$io_ld_crud(crud)
  },
```
- the $io_ld_crud function in client /src/pugins/vue-socket.js send this 'crud' thing to the server with socket.io
```
Vue.prototype.$io_ld_crud= async function(params){
  console.log(params)
  socket.emit("ld_crud", params)
}
```

## On the server
- the server is receiving communication in packages/bloid-realtime/index.js transmitting it to the core.ld.crud function
located in packages/bloid-data/index.js
```
socket.on('ld_crud', function(params){
  params.socket_id = socket.id
  console.log("params",params)
core.ld.crud(params)
});
```
- according to params.action (create), the `this.create(params)` is then launched
- the last one put the thing in the levelgraph-jsonld database. the result of this 'put action' is then send to all connected clients with  `module.core.io.emit('ld_crud', params)`


```
create(params){
    console.log("!!!create", params)
    let module = this

    this.db.jsonld.put(params.thing, /*opts, */ function(err, obj) {
      console.log("err", err)
      console.log("obj", obj)
      params.err = err
      params.obj = obj
      params.end = Date.now()

      err ? params.status = "ko" : params.status = "ok"
      module.core.io.emit('ld_crud', params)
      // do something after the obj is inserted
    });
}
```
## back on each client,
in src/plugins/vue-socket.js
```
socket.on('ld_crud', function(result) {
  console.log(result)
  store.commit("crud/addHistory", result)
});
```
the result of the action is added to the store of each client and can be used /displayed like in src/views/crud/CrudHistor.vue






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


# let command
you can add new thing with just the `let` command or a complete one :
```
let # -> create a blank new thing
let fada # -> create a new thing with name 'fada'
let age champ ville # -> create a new thing with custom 3 fields
let ghy=az kut=fdy dfds=ryusq #-> create a new thing with 3 custom fileds already filed
# work in progress create a thing specifying the type of field according to rdf datatypes https://www.w3.org/TR/swbp-xsch-datatypes/
let name=dav age=45 force=12 date=14/05/1977^^date "prefered color"=blue^^color
let name=dav age=45 force=12^^number resistance=2.567^^number date=14/05/1977^^date color=blue^^color
```


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

# graphdb
- https://orientdb.org/
- virtuoso
- fuseki
- virtuoso



# should plug to wikidata
- to get interopérable resources, see scenaristeur.github.io/agent for working api query

# lerna js
- tool for monorepos https://lerna.js.org/

# test
```
~/dev/bloid/packages/bloid-core$ npx lerna bootstrap

~/dev/bloid/packages/bloid-core$ npm run test

> bloid-core@0.0.1-alpha.0 test
> mocha test

bloid-core
✔ core name should be 'CoolCore'
✔ core config.type should be 'config'
✔ core commander.type should be 'commander'
✔ core filesystem.type should be 'filesystem'


4 passing (5ms)

```

# ld-query
- https://github.com/goofballLogic/ld-query

# fuse user space
- https://www.youtube.com/watch?v=SG10bZeYi6k
- http://events17.linuxfoundation.org/sites/events/files/slides/frontendFS.pdf / https://files.speakerdeck.com/presentations/c4252dbd24364771b26b15dea45e9e49/ClayNodeInteractiveTalk.pdf
- https://github.com/mafintosh/fuse-bindings
- successor https://github.com/fuse-friends/fuse-native


# commandline crud for collaborate
https://vuonganht.medium.com/creating-my-first-command-line-crud-app-61fc4fd6e530

# fuse
- https://fusejs.io/demo.html


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
