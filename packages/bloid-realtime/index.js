import { BloidTemplate } from 'bloid-template'
export { BloidRealtime}

class BloidRealtime extends BloidTemplate{
  constructor(options = {}) {
    options = {
      type: 'realtime',
      ...options
    };
    super(options)
  }
}
