import { EXTENSION_ID } from '@dcp/shared';
import { omit } from 'lodash-es';

console.log('background', EXTENSION_ID);
console.log(omit({ name: 1, age: 9 }, 'name'));
