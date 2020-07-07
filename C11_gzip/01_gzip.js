var zlib = require('zlib');
zlib.gzip('Hello, world!', function (error, result) {
   if (error) throw error;
     console.log(result);
});