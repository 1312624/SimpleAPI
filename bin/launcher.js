// live code reloading
require('piping')({
    hook: true,
    ignore: /(\/\.|~$|\.json$)/i,
});

// babel transpile
require('../server.babel');