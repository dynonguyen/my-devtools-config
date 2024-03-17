import { EXTENSION_ID } from '@command-palette/shared';
import { omit } from 'lodash-es';

console.log('background', EXTENSION_ID);
console.log(omit({ name: 1, age: 9 }, 'name'));
