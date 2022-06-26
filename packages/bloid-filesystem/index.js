import { BloidTemplate } from 'bloid-template'
export { BloidFilesystem }

class BloidFilesystem extends BloidTemplate{
  constructor(options = {}) {
    super(options)
    this.type = "filesystem"
  }
}
