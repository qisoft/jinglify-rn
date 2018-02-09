import R from 'ramda'
import { createTransform } from 'redux-persist';
import Immutable from 'seamless-immutable'

// is this object already Immutable?
const isImmutable = R.has('asMutable')

// change this Immutable object into a JS object
const convertToJs = (state) => state.asMutable({deep: true})

// optionally convert this object into a JS object if it is Immutable
const fromImmutable = R.when(isImmutable, convertToJs)

// convert this JS object into an Immutable object
const toImmutable = (raw) => Immutable(raw)

// the transform interface that redux-persist is expecting
export default createTransform((raw) => {
  console.log({ storing: raw });
  return fromImmutable(raw);

}, (state) => {
  let immutable = toImmutable(state);
  console.log({ retrieving: immutable });
  return immutable;
})
