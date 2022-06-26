// minimal os tools
import { BloidTemplate } from 'bloid-template'
import { BloidCommander } from 'bloid-commander'
// import { BloidCli } from 'bloid-cli'
// import { BloidCommons } from 'bloid-commons'
import { BloidConfig } from 'bloid-config'
import { BloidData } from 'bloid-data'
import { BloidFilesystem } from 'bloid-filesystem'
// import { BloidModels } from 'bloid-models'
import { BloidRealtime } from 'bloid-realtime'
// import { BloidRepl } from 'bloid-repl'
// import { BloidServer } from 'bloid-server'

export { BloidCore }

class BloidCore extends BloidTemplate{
  constructor(options = {}) {
    super(options)
    this.type = "core"
    this.config = new BloidConfig({core: this})
    this.commander = new BloidCommander({core: this})
    this.filesystem = new BloidFilesystem({core: this})
    this.data = new BloidData({core: this})
    this.realtime = new BloidRealtime({core: this})

  }
}
