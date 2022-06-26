import { BloidTemplate } from 'bloid-template'
export { BloidFilesystem }
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const path = require('path');
const fs = require('fs')


import { Watcher} from './modules/watcher/index.js'
import { Walker} from './modules/walker/index.js'

import {fileTypeFromFile} from 'file-type';


class BloidFilesystem extends BloidTemplate{
  constructor(options = {}) {
    options = {
      type: 'filesystem',
      ...options
    };
    super(options)
    this.sep = path.sep
    if (path.sep === "\\") {  console.log("Windows System");} else {console.log("Not a Windows System");}
    this.storage = {root: this.root, folders: [], files: []}
    this.core.watcher = new Watcher({root: this.root, core: this.core})
    this.core.walker = new Walker({root: this.root, core: this.core})

  }

  async readFile(params, socket){
    let f = params.path
    if (f== undefined){
      console.log("oho there is no params.path", params)
      return
    }
    let type = await fileTypeFromFile('.'+path.sep+f)
    // console.log(await fileTypeFromFile('Unicorn.png'));
    type != undefined ? console.log("mime type",type) : ""
    //image loading
    if(type != undefined && type.mime != undefined && type.mime.split('/')[0] == 'image'){
      fs.readFile(f, /*{encoding: 'base64'},*/ function (err,data) {
        if (err) {
          console.log('error', err)
          params.error = err
          socket.emit('cat file', params);
        }
        params.content = data.toString('base64')
        params.type = type
        socket.emit('cat file', params);
        console.log('image file is initialized');
      });
    }
    else{
      fs.readFile(f, 'utf8', function (err,data) {
        if (err) {
          console.log('error', err)
          params.error = err
          socket.emit('cat file', params);
        }
        params.content = data
        params.type = type
        socket.emit('cat file', params);
      });
    }


  }
}
