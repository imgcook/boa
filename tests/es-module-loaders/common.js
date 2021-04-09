const test = require('ava');
/* eslint-disable no-process-exit */

const path = require('path');
const { spawn } = require('child_process');

function getAbsolutePath(relativePath) {
  return path.join(__dirname, relativePath);
}

const FLAG = '--experimental-loader';
const PATH_ESM_LOADER = getAbsolutePath('../../esm/loader.mjs');

const [major] = process.version.replace('v', '').split('.');
if (major <= '12') {
  // See https://github.com/nodejs/node/pull/29796
  console.log(`1..0 # Skipped: Current nodejs version: ${
    process.version} does not support \`--experimental-loader\`.`);
  test('ignore', t => t.pass());
  return;
}

function check(t, appPath) {
  const options = { encoding: 'utf8', stdio: 'inherit' };
  const args = ['--no-warnings', '--unhandled-rejections=strict', FLAG, PATH_ESM_LOADER];
  // See https://github.com/nodejs/node/pull/31974
  if (process.version < 'v14.0.0') {
    args.push('--experimental-modules');
  }
  args.push(getAbsolutePath(appPath));
  // Running with tap causes errors
  // See https://github.com/tapjs/node-tap/issues/673
  // 
  // The nyc 14 conflicts with the node `--experimental-loader` design,
  // which currently uses nyc 15 and tap 14 in combination with a skip error.
  const child = spawn(process.execPath, args, options);
  child.on('close', (code, signal) => {
    t.is(signal, null);
    t.is(code, 0);
    t.end();
  });
}

test.cb('python stdlib', t => check(t, './py/test-esm-loader-stdlib.mjs'));

test.cb('python thirdparty', t => check(t, './py/test-esm-loader-thirdparty.mjs'));

test.cb('python custom', t => check(t, './py/test-esm-loader-custom.mjs'));

test.cb('javascript thirdparty', t => check(t, './js/test-esm-loader-thirdparty.mjs'));

test.cb('javascript custom', t => check(t, './js/test-esm-loader-custom.mjs'));

test.cb('dynamic imports', t => check(t, './py/test-esm-loader-dynamic-imports.mjs'));
