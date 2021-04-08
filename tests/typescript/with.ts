import test from 'ava';
import * as boa from '../../';

test.cb('test typescript with-statement', (t) => {
  t.plan(1);
  const { open } = boa.builtins();
  boa.with(open(__filename, 'r'), (f) => {
    console.log(f);
    t.pass();
    // no need to close because of `boa.with()`.
  }).then(() => {
    t.end();
  });
});
