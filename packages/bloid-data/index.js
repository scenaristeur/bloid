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

let wikidata_context = {
  "@context": {
    "@vocab": "https://scenaristeur/github.io/bloid/",
    "name": "https://www.wikidata.org/wiki/Q82799",
    "type": "https://www.wikidata.org/wiki/Q21146257",
    "description": "https://www.wikidata.org/wiki/Q1200750",
    "version": "https://www.wikidata.org/wiki/Q20826013",
    "creator": "https://www.wikidata.org/wiki/Q2500638",
    //  "@base": "https://www.wikidata.org/wiki/"
  }
}


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
    this.levelgraphdb = levelgraph(this.universDB)
    this.db         = jsonld(this.levelgraphdb, this.opts);
    //  console.log("BloidData", this)
  }


  // async test(params){
  //
  //   await this.test(params)
  //   let result = { status: "ok", params: params}
  //
  //   result.params.end = Date.now()
  //   return result
  // }


  async crud(params){
    console.log(params)
    switch (params.action) {
      case 'create':
      this.create(params)
      break;
      case 'get':
      this.get(params)
      break;
      case 'getById':
      this.getById(params)
      break;
      case 'read':

      break;
      case 'update':

      break;
      case 'delete':

      break;
      default:

    }
  }



  create(params){
    console.log("!!!create", params)
    let module = this

    this.db.jsonld.put(params.thing, /*opts, */ function(err, obj) {
      // console.log("err", err)
      // console.log("result", result)
      // params.err = err
      // params.result = result
      // params.end = Date.now()
      //
      // err ? params.status = "ko" : params.status = "ok"
      // module.core.io.emit('ld_crud', params)
      let p_o = {
        action: "ld_object",
        obj: obj,
        err : err,
      }
      params = Object.assign(params, p_o)
      module.core.io.emit('ld_crud', params)
      // do something after the obj is inserted
    });
  }


  // get(params){
  //   console.log("get top level",params)
  //
  //   let module = this
  //   // let db = this.db
  //   let db = this.levelgraphdb
  //     let term = params.what
  //
  // }

  get(params){
    console.log("!!! GET", params)

    let module = this
    //  let module = this
    let db = this.db
    //  if(debug)  console.log(data)

    let term = params.what //|| data.array[1] // data.what pour commander.js / à corriger : data.array[1] dans prompt/command
    //  if(debug) console.log(term)



    let search_criterias = {
      subject: db.v('subject'),
      predicate: db.v('predicate'),
      object: db.v('object'),
      //  filter: search_filter
    }
    if (params.what != undefined && params.what.length > 0){
      function search_filter(triple) {
        triple.term = term
        triple.found = []
        return (triple.subject != undefined && triple.subject.includes(term) && triple.found.push('s') )
        || (triple.predicate!= undefined && triple.predicate.includes(term) && triple.found.push('p')  )
        || (triple.object != undefined && triple.object.includes(term) && triple.found.push('o') );
      }
      search_criterias.filter = search_filter
    }

    //console.log(search_criterias)

    db.search(search_criterias, function process(err, result) {
      console.log("err",err)
      console.log("result", result)
      params.err = err
      params.result = result
      params.end = Date.now()
      err ? params.status = "ko" : params.status = "ok"
      const socket = module.core.io.sockets.sockets.get(params.socket_id);

      console.log(params)
      if (params.callback == undefined){
        socket.emit('ld_crud', params)
      }


      let known = []
      result.map(r => {
        if (!known.includes(r.subject)){
          console.log("search",r.subject)
          known.push(r.subject)
          db.jsonld.get(r.subject, wikidata_context, function(err,obj) {
            // obj will be the very same of the manu object

            let p_o = {
              action: "ld_object",
              obj: obj,
              err : err,
            }
            params = Object.assign(params, p_o)
            socket.emit('ld_crud', params)
          })
        }
      });
    })
  }

  async getById (params){
    let module = this

    console.log("!!!GETBYID", params)
    const socket = module.core.io.sockets.sockets.get(params.socket_id);
    let opts = this.opts
    //opts['@context'] =  manu['@context']
    console.log(opts)
    await this.db.jsonld.get(params['@id'], wikidata_context, function(err, obj) {
      params.operation = "get"
      console.log("err", err)
      console.log("obj", obj)
      params.err = err
      params.obj = obj
      params.end = Date.now()

      err ? params.status = "ko" : params.status = "ok"
      socket.emit('ld_crud', params)
      // do something after the obj is inserted
    });

    // db.jsonld.get(r.subject, wikidata_context, function(err,obj) {
    //   // obj will be the very same of the manu object
    //
    //   let p_o = {
    //     action: "ld_object",
    //     obj: obj,
    //     err : err
    //   }
    //   socket.emit('ld_crud', p_o)
    // })
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
