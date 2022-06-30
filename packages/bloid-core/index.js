// minimal os tools
import { BloidTemplate } from 'bloid-template'
import { BloidCommander } from 'bloid-commander'
// import { BloidCli } from 'bloid-cli'
// import { BloidCommons } from 'bloid-commons'
// integré dans core import { BloidConfig } from 'bloid-config'
import { BloidData } from 'bloid-data'
import { BloidFilesystem } from 'bloid-filesystem'
// import { BloidModels } from 'bloid-models'

// import { BloidRepl } from 'bloid-repl'
import { BloidServer } from 'bloid-server'
import { BloidUser } from 'bloid-user'

export { BloidCore }

class BloidCore extends BloidTemplate{
  constructor(options = {}) {
    options = {
      type: 'core',
      ...options
    };
    super(options)
    //this.config = new BloidConfig({core: this})
    this.commander = new BloidCommander({core: this})

    this.ld = new BloidData({core: this, name: this.config.get('db.name'), base: this.config.get('db.base')})
    this.server = new BloidServer({core: this})
    this.filesystem = new BloidFilesystem({core: this, root: this.config.get('filesystem.root')})
    this.user = new BloidUser({core: this})
    this.init()
  }
  init(){
    //console.log(this.socket.io)
    //this.filesystem.watcher.watch(this.socket.io.emit)
    console.log(this.watcher)
    this.watcher.look()
  }
}
