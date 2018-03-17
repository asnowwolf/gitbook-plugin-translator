"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var pre_translate_1 = require("./pre-translate");
describe('pre-translate the book', function () {
    it('should distinguish between Chinese and English', function () {
        chai_1.expect(pre_translate_1.isTranslation('One')).is.false;
        chai_1.expect(pre_translate_1.isTranslation('一')).is.true;
        chai_1.expect(pre_translate_1.isTranslation('one 一 ./')).is.true;
    });
    it('should add special attribute for elements with Chinese', function () {
        chai_1.expect(pre_translate_1.preTranslate("\n<h1>\u4E00</h1>\n")).eql("\n<h1 x-translator-translation=\"on\">\u4E00</h1>\n");
        chai_1.expect(pre_translate_1.preTranslate("\n<h1>One</h1>\n")).eql("\n<h1>One</h1>\n");
    });
    it('should add special attributes for paired translation and original text', function () {
        chai_1.expect(pre_translate_1.preTranslate("\n<h1>One</h1>\n<h1>Two</h1>\n<H1>\u4E8C</H1>\n")).eql("\n<h1>One</h1>\n<h1 x-translator-translation=\"on\">\u4E8C</h1>\n<h1 x-translator-original=\"off\">Two</h1>\n");
    });
    it('should auto unescape original html before process', function () {
        chai_1.expect(pre_translate_1.preTranslate("\n<h1>One</h1>\n<h1>Two</h1>\n<H1>&#x4E8C;</H1>\n")).eql("\n<h1>One</h1>\n<h1 x-translator-translation=\"on\">\u4E8C</h1>\n<h1 x-translator-original=\"off\">Two</h1>\n");
    });
    it('should swap id for translation and original text', function () {
        chai_1.expect(pre_translate_1.preTranslate("\n<h1 id=\"one\">One</h1>\n<h1 id=\"\u4E00\">\u4E00</h1>\n")).eql("\n<h1 id=\"one\" x-translator-translation=\"on\">\u4E00</h1>\n<h1 x-translator-original=\"off\">One</h1>\n");
    });
});
//# sourceMappingURL=pre-translate.spec.js.map