import { omit } from 'lodash-es';

console.log('background');
console.log(omit({ name: 1, age: 9 }, 'name'));
