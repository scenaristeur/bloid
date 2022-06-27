import { BloidTemplate } from 'bloid-template'
export { BloidData}

// const { Level } = require('level')
// const universDB     = new Level(path)
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const level   = require('level')
const levelgraph = require('levelgraph')
const jsonld     = require('levelgraph-jsonld')

class BloidData extends BloidTemplate{
  constructor(options = {}) {
    options = {
      type: 'data',
      ...options
    };
    super(options)
    console.log("config", this.name, this.base)

    this.home = process.env.HOME
    this.db_path = this.home+"/.os/."+this.name
    this.universDB     = level(this.db_path)

    this.opts       = { base: this.base },
    this.db         = jsonld(levelgraph(this.universDB), this.opts);
    //  console.log("BloidData", this)
  }


  async test(params){

    let result = { status: "ok", params: params}
    result.params.end = Date.now()
    return result
  }

}
