import { BloidTemplate } from 'bloid-template'
export { BloidCommander }

class BloidCommander extends BloidTemplate{
  constructor(options = {}) {
    super(options)
    this.type = "commander"
  }
}
