import { BloidCore } from '../index.js'
import { assert } from 'chai';  // Using Assert style
import { Config } from '../../bloid/config.js';

let config = new Config({dbName: 'a db name', base: 'https://the_base_of_the_db'})

describe("bloid-core", function() {
  let core = new BloidCore({name: "CoolCore", config: config})
  // let core = new BloidCore({name: "CoolCore", debug: true})

  it("core name should be 'CoolCore'", function() {
    assert.equal(core.name, 'CoolCore');
  });

  // it("core config.type should be 'config'", function() {
  //   assert.equal(core.config.type, 'config');
  // });

  it("core config.db.name should be 'a db name'", function() {
    assert.equal(core.config.get('db.name'), 'a db name');
  });

  it("core config.db.base should be 'https://the_base_of_the_db'", function() {
    assert.equal(core.config.get('db.base'), 'https://the_base_of_the_db');
  });

  it("core commander.type should be 'commander'", function() {
    assert.equal(core.commander.type, 'commander');
  });

  it("core filesystem.type should be 'filesystem'", function() {
    assert.equal(core.filesystem.type, 'filesystem');
  });
  it("core server.type should be 'server'", function() {
    assert.equal(core.server.type, 'server');
  });

  it("core realtime.type should be 'realtime'", function() {
    assert.equal(core.realtime.type, 'realtime');
  });

});
