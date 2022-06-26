
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const Conf = require('conf');

export { Config }
class Config extends Conf {
  constructor(options) {
    options = {
      name: 'config',
      ...options
    };
    super(options)
    console.log(this.options)
    this.set('db.name', options.dbName);
    this.set('db.base', options.base)
    this.set('user.avatar', '🦄');
    this.set('user.name', process.env.USER || null)
    this.set('user.home', process.env.HOME || null)
    this.set('user.editor', process.env.EDITOR || 'nano' )
    // /etc/alternatives/editor ? atom ? nano ?

    // Use dot-notation to access nested properties
    // this.set('foo.bar', true);
    // console.log(this.get('foo'));
    //
    // this.set('boo.bi.bap', 12);
    //=> {bar: true}

    // this.delete('unicorn');
    // console.log(this.get('unicorn'));

    if (this.debug){
      console.log('-- Config :',this.store)
      console.log("-- stored at ",this.path)
    }
    return this
  }
}
