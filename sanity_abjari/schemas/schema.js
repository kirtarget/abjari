import product from './product'
import banner from './banner'
import wearUs from './wearUs'

import createSchema from 'part:@sanity/base/schema-creator'

import schemaTypes from 'all:part:@sanity/base/schema-type'

export default createSchema({
    name: 'default',

    types: schemaTypes.concat([product, banner, wearUs]),
})
