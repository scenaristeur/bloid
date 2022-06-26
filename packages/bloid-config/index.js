import { BloidTemplate } from 'bloid-template'
export { BloidConfig }

class BloidConfig extends BloidTemplate{
  constructor(options = {}) {
    super(options)
    this.type = "config"
  }
}
