import { BloidTemplate } from 'bloid-template'
export { BloidRealtime}
import { Thing } from './modules/thing/index.js'
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const fs = require('fs')

let users = {}

console.log("is thing utile ? in bloid-realtime, must review filesystem & realtime interactions")


//let thing = new Thing({id : "test"})
// presque un package.json
let config = {
  "ve:name": "Smag",
  type : ["server"], //pas de ve car type jsonld  /activityStreams ?
  "ve:description": "This is the main worker of a vatch system",
  "ve:groups": ["vatch", "workers", "tools"],
  "ve:links" : {
    type: "link",
    value: {
      name: "Vatch server",
      href: 'https://github.com/scenaristeur/vatch'
    }
  },
  "ve:meta":{
    "ve:dependencies": ["vatch/Watcher", "vatch/Walker"],
    "ve:issues" : ["NOTGOOD, all meta are replaced"]
  }

}
let smagMainWorker = new Thing(config)
console.log("smag : ", smagMainWorker.getData())








class BloidRealtime extends BloidTemplate{
  constructor(options = {}) {
    options = {
      type: 'socket.io',
      ...options
    };
    super(options)
    this.core.io = require("socket.io")(options.server, {
      cors: {
        origin: '*',
        methods: ["GET", "POST"]
      }
    });
    this.onConnection()
  }

  onConnection(){

    let core = this.core
    let io = core.io
    io.on('connection', (socket) => {
      users[socket.id] = {connexion: new Date()}
      let users_nb = Object.keys(users).length
      console.log(users_nb+" users",users)
      socket.broadcast.emit('chat message', 'A new user '+users_nb); //envoyer à tous les autres
      io.emit('users', users); //envoyer à tous
      core.walker.start(core.filesystem.root, function(err, results) {
        if (err) throw err;
        //    console.log(results);
        socket.emit('init', {pathsep: core.filesystem.sep, welcome: "hi", users: users_nb, folder: results}); //envoyer au nouveau
      });
      socket.emit('watcher event', core.watcher.paths)





      socket.on('ld_test', async function(params){
        console.log("params",params)
        let result = await core.ld.test(params)
        console.log("result", result)
        io.emit('ld_test', result);
      });

      // Levelgraph
      // socket.on('put', (thing) => {
      //   console.log(thing)
      //   db.jsonld.put(thing, function(err, obj) {
      //     // do something after the obj is inserted
      //     console.log(err, obj)
      //     io.emit('created', obj);
      //
      //     //
      //     // db.search([{
      //     //   subject: thing['@id'],
      //     // }], function(err, solution){
      //     //
      //     //   console.log("solution",solution)
      //     // })
      //
      //   });
      // })


      /// Basic files
      socket.on('chat message', (msg) => {
        io.emit('chat message', msg); //envoyer à tout le monde
        if(msg.startsWith('data')){
          //  console.log(msg)
          if (msg.endsWith(core.filesystem.sep)){
            try {
              if (!fs.existsSync(msg)) {
                fs.mkdirSync(msg)
              }
            } catch (err) {
              console.error(err)
            }
          }else{
            try {
              if (!fs.existsSync(msg)) {
                let extension = msg.split('.')[1]
                let content = ""

                console.log("ext", extension)
                if (extension == undefined ){
                  let thing = new Thing({
                    "ve:name" : msg.substring(msg.lastIndexOf('/') + 1),
                    "ve:path": msg,
                    "ve:meta": {"ve:created": Date.now()}
                  })
                  content = JSON.stringify(thing.getData(), null, 2)
                }
                fs.writeFile(msg, content, (err) => {
                  if (err) throw err;
                  console.log("The file was succesfully saved!");
                });
              }
            } catch (err) {
              console.error(err)
            }
          }
        }
      });

      socket.on('write file', (msg) => {
        io.emit('chat message', msg.path); //envoyer à tout le monde
        if(msg.path.startsWith('data')){
          fs.writeFile(msg.path, msg.content, (err) => {
            if (err) throw err;
            console.log("The file was succesfully saved!");
          });
        }
      });
      socket.on('read file', (params) => {
        core.filesystem.readFile(params, socket)
      });

      socket.on('disconnect', () => {
        delete users[socket.id]
        io.emit('users', users);
        console.log('user disconnected');
      });
    });
  }
}
