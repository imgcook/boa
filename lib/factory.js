'use strict';

const path = require('path');
const binary = require('@mapbox/node-pre-gyp');
const bindingPath = binary.find(path.resolve(path.join(__dirname, '../package.json')));
const { Python } = require(bindingPath);

const condaPath = path.dirname(bindingPath);
if (!process.env.PYTHONHOME) {
  process.env.PYTHONHOME = condaPath;
}

// create the global-scoped instance
let pyInst = global.__pipcook_boa_pyinst__;
if (pyInst == null) {
  pyInst = new Python(process.argv.slice(1));
  global.__pipcook_boa_pyinst__ = pyInst;
}

// FIXME(Yorkie): move to costa or daemon?
const globals = pyInst.globals();
const builtins = pyInst.builtins();

module.exports = {
  condaPath,
  pyInst,
  globals,
  builtins,
};
