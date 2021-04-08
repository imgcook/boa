import test from 'ava';
import * as boa from '../../';

test('test typescript kwargs', (t) => {
  const string = boa.import('string');
  const fmt = string.Formatter();
  t.is(fmt.format('foobar {0} {1}', 'a', 'b'), 'foobar a b');
  t.is(fmt.format('foobar {name}', boa.kwargs({ name: 'test' })),
                  'foobar test');
});
