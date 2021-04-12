#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { run } = require('./utils');

const args = process.argv.slice(2).join(' ');
const bindingPath = path.resolve(__dirname, '../binding/v6');

if (!fs.existsSync(bindingPath)) {
  throw new TypeError('Binding should be built first.');
}

run(`${bindingPath}/bin/python ${bindingPath}/bin/pip`, args);
