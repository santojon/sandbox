/**
 * Example function (code inside as with right aling please!)
 */
function defCode() {
// this is an inline comment.
var pool = new Bhdr();

/**
 * This is a comment
 * @param param: this is aparam in comment
 */
function mapAndShowSandbox() {
    pool.map(Sandbox);
    new Sandbox({ string: 'test' }).save();

    return 'code from user (last line): &ltb&gt&ltsmall&gt&ltcode&gt' + pool.exportAs('json')  + '&lt/code&gt&lt/small&gt&lt/b&gt';
}

console.log('info.');
console.warn('warning!');
console.error('error!!!');
mapAndShowSandbox();
}

/**
 * Used to get only te code of internal part of function
 */
defCode.asString = function( ) {
    return defCode.toString()
        .replace(/function defCode\(\) {\n/g, '')
            .replace(/mapAndShowSandbox\(\);\n}/g, 'mapAndShowSandbox\(\);');
};