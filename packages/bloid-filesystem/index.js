import { BloidTemplate } from 'bloid-template'
export { BloidFilesystem }

class BloidFilesystem extends BloidTemplate{
  constructor(options = {}) {
    options = {
      type: 'filesystem',
      ...options
    };
    super(options)
  }
}
