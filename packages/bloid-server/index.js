import { BloidTemplate } from 'bloid-template'
export { BloidServer}

class BloidServer extends BloidTemplate{
  constructor(options = {}) {
    options = {
      type: 'server',
      ...options
    };
    super(options)
    console.log(this.core)
  }
}
