import { BloidTemplate } from 'bloid-template'
export { BloidCommander }

import { program } from 'commander';

class BloidCommander extends BloidTemplate{
  constructor(options = {}) {
    options = {
      type: 'commander',
      ...options
    };
    super(options)
  }
}
