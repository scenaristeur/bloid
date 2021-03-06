#!/usr/bin/env node

// minimal os tools
let debug = false
import { Config } from '../config.js';
import { BloidCore } from 'bloid-core'
let conf = {
  dbName: 'universDB',
  base: 'https://scenaristeur.github.io/bloid',
  filesystem_root: './data',
  debug: debug
}

let config = new Config(conf)

let core = new BloidCore({debug: debug, config: config})

// import { LevelgraphJsonld } from '../core/levelgraph-jsonld/index.js';
// let levelgraphJsonld = new LevelgraphJsonld({name: "base de test", active: true})
//
// let core = new Core({bases: {levelgraphJsonld : levelgraphJsonld}})

// console.log("try 'test' then 'ls' or 'find henry' and '2' for selecting")
