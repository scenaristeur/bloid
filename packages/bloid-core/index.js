// minimal os tools
import { BloidTemplate } from 'bloid-template'
// import { BloidCli } from 'bloid-cli'
// import { BloidCommons } from 'bloid-commons'
// import { BloidConfig } from 'bloid-config'
// import { BloidData } from 'bloid-data'
// import { BloidFilesystem } from 'bloid-filesystem'
// import { BloidModels } from 'bloid-models'
// import { BloidRealtime } from 'bloid-realtime'
// import { BloidRepl } from 'bloid-repl'
// import { BloidServer } from 'bloid-server'

export { BloidCore }

class BloidCore extends BloidTemplate{
  constructor(options = {}) {
    super(options)
    this.type = "core"

  }
}
