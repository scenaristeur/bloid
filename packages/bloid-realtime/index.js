import { BloidTemplate } from 'bloid-template'
export { BloidRealtime}

class BloidRealtime extends BloidTemplate{
  constructor(options = {}) {
    super(options)
    this.type = "realtime"
  }
}
