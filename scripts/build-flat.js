
const util = require('@mdi/util');

const meta = util.getMeta(false);

util.write('./json/flat-meta.json', JSON.stringify(meta));
