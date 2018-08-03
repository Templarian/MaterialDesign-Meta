const util = require('@mdi/util');

const meta = util.getMeta(false);

util.write('meta.json', JSON.stringify(meta));