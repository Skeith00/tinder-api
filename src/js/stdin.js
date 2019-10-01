var fs = require('fs');

module.exports.readLine = function readLine() {
    var BUFSIZE=256;
    var buf = Buffer.alloc(BUFSIZE);
    var bytesRead;
    
    bytesRead = 0;
    bytesRead = fs.readSync(process.stdin.fd, buf, 0, BUFSIZE);
    //console.log('Bytes read: %s; content:\n%s', bytesRead, buf.toString("utf8", 0, bytesRead));
    let value = buf.toString("utf8", 0, bytesRead);
    return value;
};
