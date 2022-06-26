import { BloidTemplate } from 'bloid-template'
export { BloidData}


// let home = process.env.HOME
// let db_path = home+"/.os/.universDB"
// // const { Level } = require('level')
// // const universDB     = new Level(path)
//
// const level   = require('level'),
// universDB     = level(db_path)
//
// console.log(universDB)
// const levelgraph = require('levelgraph'),
// jsonld     = require('levelgraph-jsonld'),
// opts       = { base: 'http://local/base' },
// db         = jsonld(levelgraph(universDB), opts);
//
//
// var manu = {
//   "@context": {
//     "name": "http://xmlns.com/foaf/0.1/name",
//     "homepage": {
//       "@id": "http://xmlns.com/foaf/0.1/homepage",
//       "@type": "@id"
//     }
//   },
//   "@id": "http://dodo.sporny.org#person",
//   "name": "Dodo",
//   "homepage": "http://dod.sporny.org/"
// };
//
// db.jsonld.put(manu, function(err, obj) {
//   // do something after the obj is inserted
//   console.log(err, obj)
// });



class BloidData extends BloidTemplate{
  constructor(options = {}) {
    options = {
      type: 'data',
      ...options
    };
    super(options)
    console.log("config", this.name, this.base)
    this.init()

  }
  init(){

  }
}
