//version 0.0.0
import { v4 as uuidv4 } from 'uuid';
export { Thing }
class Thing {
  model = {
    "@context": {
      "@vocab": "https://www.w3.org/ns/activitystreams",
      "as": "https://www.w3.org/ns/activitystreams",
      "ve": "https://scenaristeur.github.io/verse/",
      "@id": "id",
      "@type": "type"
    },
    "id" : undefined,
    "ve:url": undefined, // can be found at many urls
    "ve:name":undefined,
    "type": "thing",
    "ve:age": -1 , //can be used for status and/or priority notions
    "ve:description": undefined,
    "ve:groups": undefined,
    // internal properties of that thing
    "ve:properties": [], // {name: [value1, value2, {type: "text", value: "hello"}, {type: "link", value: {name: "hello", href: "http://..."} }, {type: "textarea", value: "blabblablab"}, {type: "thing", value: {id: uuid, ...}}]}
    "ve:actions": [],
    //links to other things
    "ve:links": [],
    "ve:meta": {
      "ve:credits": undefined,
      "ve:author": undefined,
      "ve:maintainer": undefined,
      "ve:created": undefined,
      "ve:updated": undefined,
      "ve:version": "0.0.0",
      "ve:parent": undefined,
      "ve:ancestor": undefined,
      "ve:oldCid": undefined,
      "ve:fusion": undefined,
      "ve:merge": undefined,
      "ve:fork": undefined,
      "ve:retrolink": undefined,
      "ve:dependencies": undefined,
      "ve:modele": {
        name: "Thing",
        id: "https://github.com/scenaristeur/vatch/blob/main/modules/thing/index.js"
      },
      "ve:modele_version": "0.0.0",
      "ve:schema": undefined,
      "ve:shape": undefined,
      "ve:context": undefined,
      "ve:permissions": {
        "ve:owner": undefined, // agent/public/group
        "read": undefined,
        "write": undefined,
        "append": undefined,
        "create": undefined,
        "read": undefined,
        "update": undefined,
        "delete": undefined
      },
      "ve:tags": undefined
    }
  }

  constructor(options = {}){
    //this.data = Object.assign(schema, options);
    this.data = Object.assign(this.model, options);
    this.data.id = options.id || uuidv4();
    this.data["ve:meta"]["ve:created"] = Date.now()
    //  this.data["ve:meta"]["ve:model"] = Object.assign({},this.model)


    console.log(this)
  }
  getData(){
    return this
  }
}
