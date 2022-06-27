import { BloidTemplate } from 'bloid-template'
export { BloidData}

// const { Level } = require('level')
// const universDB     = new Level(path)
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const level   = require('level')
const levelgraph = require('levelgraph')
const jsonld     = require('levelgraph-jsonld')



var manu = {
  "@context": {
    "@vocab": "http://xmlns.com/foaf/0.1/",
    "homepage": { "@type": "@id" },
    "knows": { "@type": "@id" },
    "based_near": { "@type": "@id" }
  },
  "@id": "http://manu.sporny.org#person",
  "name": "Manu Sporny",
  "homepage": "http://manu.sporny.org/",
  "knows": [{
    "@id": "https://my-profile.eu/people/deiu/card#me",
    "name": "Andrei Vlad Sambra",
    "based_near": "http://dbpedia.org/resource/Paris"
  }, {
    "@id": "http://melvincarvalho.com/#me",
    "name": "Melvin Carvalho",
    "based_near": "http://dbpedia.org/resource/Honolulu"
  }, {
    "@id": "http://bblfish.net/people/henry/card#me",
    "name": "Henry Story",
    "based_near": "http://dbpedia.org/resource/Paris"
  }, {
    "@id": "http://presbrey.mit.edu/foaf#presbrey",
    "name": "Joe Presbrey",
    "based_near": "http://dbpedia.org/resource/Cambridge"
  }]
};


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

    await this.test(params)
    let result = { status: "ok", params: params}

    result.params.end = Date.now()
    return result
  }

  ////////////////////////
  // TEST
  //////////////////

  async test(params){
    await this.putmanu(params)
    await this.getmanu(params)
  }

  async getmanu (params){
    let module = this

    console.log("!!!GET", params)
    let opts = this.opts
    opts['@context'] =  manu['@context']
    console.log(opts)
    await this.db.jsonld.get(manu['@id'], opts,  function(err, obj) {
      params.operation = "get"
      console.log("err", err)
      console.log("obj", obj)
      params.err = err
      params.obj = obj
      params.end = Date.now()

      err ? params.status = "ko" : params.status = "ok"
      module.core.io.emit('ld_test', params)
      // do something after the obj is inserted
    });
  }
  async putmanu(params){

    console.log("!!!PUT", params)
    if (params.data._[1] != undefined){
      console.log("creating ", params.data._[1])
      manu.name = params.data._[1]
    }
    let module = this
    let opts = this.opts
    opts['@context'] =  manu['@context']
    console.log(opts)
    //await this.db.jsonld.put(manu, opts,  this.core.io.emit('ld_test', "put ok"))
    this.db.jsonld.put(manu, /*opts, */ function(err, obj) {
      params.operation = "put"
      console.log("err", err)
      console.log("obj", obj)
      params.err = err
      params.obj = obj
      params.end = Date.now()

      err ? params.status = "ko" : params.status = "ok"
      module.core.io.emit('ld_test', params)
      // do something after the obj is inserted
    });
  }

}
