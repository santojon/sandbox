// this is an inline comment.
var pool = new Bhdr();

/**
 * This is a comment
 * @param param: this is aparam in comment
 */
function mapAndShowSandbox() {
    pool.map(Sandbox);
    new Sandbox({ string: 'test' }).save();

    return 'code from user (last line): <b><small><code>' + pool.exportAs('json')  + '</code></small></b>';
}

console.log('info.');
console.warn('warning!');
console.error('error!!!');
mapAndShowSandbox();
SandboxController