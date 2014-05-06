var fs = require('fs'),
    fis = require('fis');

//设置项目路劲
fis.project.setProjectRoot(__dirname + '/file');
var PROJECT_ROOT = fis.project.getProjectPath();

var _ = fis.util;
var file = fis.file;

var expect = require('chai').expect;
var parser = require(__dirname + '/../../index.js');

describe("test js file", function(){
    var f = fis.file.wrap(PROJECT_ROOT + '/index.js');
    var res = parser(f.getContent(), f, {});


    it('test file.extras.async', function(){
        expect(f.extras).to.be.a('object');
        expect(f.extras.async).to.be.a('array');
        expect(f.extras.async).to.deep.equal(['./inline.js', './inline2.js']);
    });
});

describe("test vm file", function(){
    var f = fis.file.wrap(PROJECT_ROOT + '/index.vm');
    var res = parser(f.getContent(), f, {}).toString().replace(/(\r\n)+|(\n+)|(\t+)|(\s+)/ig, '');

    it ('test content', function() {
        var target_content = fs.readFileSync(PROJECT_ROOT + '/index_target.vm').toString().replace(/(\r\n)+|(\n+)|(\t+)|(\s+)/ig, '');
        expect(res).to.equal(target_content);
    });

    it ('test file.extras.async', function() {
        expect(f.extras).to.be.a('object');
        expect(f.extras.async).to.be.a('array');
        expect(f.extras.async).to.deep.equal(['home:static/ui/B/B.js', 'index.js']);
    });

});