import { BloidTemplate } from 'bloid-template'
export { BloidServer}
import { BloidRealtime } from 'bloid-realtime'

import { createRequire } from 'module';
const require = createRequire(import.meta.url);

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
// import getPort, {portNumbers} from 'get-port';
import getPort from 'get-port';
const open = require('open');

class BloidServer extends BloidTemplate{
  constructor(options = {}) {
    options = {
      type: 'server',
      ...options
    };
    super(options)
    this.core.socket = new BloidRealtime({core: this.core, server:server})
     app.use(express.static('./public/'));
    // app.use(express.static('./public'));
    app.get('/', (req, res) => {
      // res.sendFile('./public/index.html');
      res.sendFile('./public/index.html');
    });

    this.listen()
    //console.log(this.core)
  }

  async listen(){
    // this.port = await getPort({port: portNumbers(3000, 3100)})
    this.port = await getPort({port: [5000, 5001, 5002]})
    server.listen(this.port, () => {
      console.log('server running at localhost:'+this.port);
      console.log('1. First time client install: `npm run client:install`')
      console.log('2. later client update: `npm run client:update`');
      open('http://localhost:'+this.port);
    });
  }
}
