import { BloidTemplate } from 'bloid-template'
export { BloidData}

class BloidData extends BloidTemplate{
  constructor(options = {}) {
    super(options)
    this.type = "data"
  }
}
