import { BloidCore } from '../index.js'
import { assert } from 'chai';  // Using Assert style
import { Config } from '../../bloid/config.js';

let conf = {
  dbName: 'a db name',
  base: 'https://the_base_of_the_db',
  filesystem_root: './fake_data',
  debug: false
}

let config = new Config(conf)

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

  it("core filesystem.root should be './fake_data'", function() {
    assert.equal(core.filesystem.root, './fake_data');
  });

  it("core server.type should be 'server'", function() {
    assert.equal(core.server.type, 'server');
  });

  it("core socket.type should be 'socket.io'", function() {
    assert.equal(core.socket.type, 'socket.io');
  });

});
