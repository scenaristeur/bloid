import { createRequire } from 'module';
const require = createRequire(import.meta.url);

const fs = require('fs')
const chokidar = require('chokidar')
const path = require('path');

export { Watcher }

class Watcher {
  constructor(options = {}) {
    options = {
      ...options
    };
    this.paths = []
    this.root= options.root || './data'
    this.core = options.core
    this.init(this.root)
  }

  init(root){
    try {
      if (!fs.existsSync(root)) {
        fs.mkdirSync(root)
      }
    } catch (err) {
      console.error(err)
    }

  }

  look(){
    let core = this.core
    console.log("look")
    // One-liner for current directory
    let watcherChokidar = chokidar.watch(this.root)
    watcherChokidar.on('all', (event, rel_path) => {
      let p = {event: event, path: rel_path}
      p.parts = rel_path.split(path.sep)
      //  p.parent = p.parts.pop().join(path.sep)
      this.paths.push(p)
      core.io.emit('watcher event', [{root: this.root, event: event, path: rel_path}]);
      //callback('watcher event', [{root: this.root, event: event, path: rel_path}])
      //  console.log(this.paths)
    });

    // watcherChokidar.on('ready', logWatched)
    //
    // function logWatched() {
    //   console.log("GET WATCHED",  watcherChokidar.getWatched()   )
    // }
  }

}
