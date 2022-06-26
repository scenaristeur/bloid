const { v4: uuidv4 } = require('uuid');

class Thing {
  "@context"= {
    "@vocab": "https://www.w3.org/ns/activitystreams",
    "as": "https://www.w3.org/ns/activitystreams",
    "ve": "https://scenaristeur.github.io/verse/",
    "@id": "id",
    "@type": "type"
  }
  "id" = null
  "ve:url" = {
    type: "link",
    value: {
      name: "test url",
      href: "thhp://"
    }
  } // can be found at many urls
  "ve:name" = null
  "type" = {
    //https://w3c.github.io/json-ld-syntax/#sets
    "@set": ["thing" ]
  }
  "ve:age" = -1 //can be used for status and/or priority notions
  "ve:description" = "test string"
  "ve:groups" = null
  // internal properties of that thing
  "ve:properties" = null // {name: [value1, value2, {type: "text", value: "hello"}, {type: "link", value: {name: "hello", href: "http://..."} }, {type: "textarea", value: "blabblablab"}, {type: "thing", value: {id: uuid, ...}}]}
  "ve:actions" = null
  //links to other things
  "ve:links" = null
  "ve:meta" = {
    "ve:credits": null,
    "ve:author": null,
    "ve:maintainer": null,
    "ve:created": null,
    "ve:updated": null,
    "ve:version": "0.0.0",
    "ve:parent": null,
    "ve:ancestor": null,
    "ve:oldCid": null,
    "ve:fusion": null,
    "ve:merge": null,
    "ve:fork": null,
    "ve:retrolink": null,
    "ve:dependencies": null,
    "ve:modele": null,
    "ve:modele_version": null,
    "ve:schema": null,
    "ve:shape": null,
    "ve:context": null,
    "ve:permissions": {
      "ve:owner": null, // agent/public/group
      "ve:read": null,
      "ve:write": null,
      "ve:append": null,
      "ve:create": null,
      "ve:read": null,
      "ve:update": null,
      "ve:delete": null
    }
  }
  "ve:tags" = null
  "ve:data" = { }

  constructor(config = {}){
    //this.data = Object.assign(schema, options);
    this.config = config
    this["ve:meta"]["ve:created"] = Date.now()
    //  console.log(this)
    this.init()
  }
  init(){
    let entries = Object.entries (this.config)
    console.log(entries)
    for (const key in this.config){

      const val = this.config[key]
      console.log("conf", key, val, Array.isArray(val))
      console.log(this[key])
      if (Array.isArray(val)){
        if (this[key] ==  null){
          this[key] = {'@set': val}
        }else if (typeof this[key] == "string" || typeof this[key] == "object") {
          this[key]['@set'] = [this[key]].concat(val)
        }
        
      }

    }
    //  this = Object.assign(this, config);

    //this.id = config.id || uuidv4();

    console.log("this",this)
  }
  getData(){
    return this
  }
}

module.exports = Thing
