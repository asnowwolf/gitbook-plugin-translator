"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var parse5_1 = require("parse5");
var dom = require("dom5");
var dom5_1 = require("dom5");
function preTranslate(text) {
    var doc = parse5_1.parseFragment(text);
    dom.nodeWalkAll(doc, function (node) {
        if (shouldPreTranslate(node)) {
            if (isTranslation(dom.getTextContent(node))) {
                dom.setAttribute(node, 'x-translator-translation', 'on');
                var prevNode = getPreviousSibling(node);
                if (prevNode && prevNode.tagName === node.tagName && !isTranslation(dom.getTextContent(prevNode))) {
                    dom.setAttribute(prevNode, 'x-translator-original', 'off');
                    swapNode(prevNode, node);
                }
            }
        }
        return true;
    });
    return parse5_1.serialize(doc);
}
exports.preTranslate = preTranslate;
// tslint:disable:max-line-length
var chinesePattern = /[\u2E80-\u2EFF\u2F00-\u2FDF\u3000-\u303F\u31C0-\u31EF\u3200-\u32FF\u3300-\u33FF\u3400-\u4DBF\u4DC0-\u4DFF\u4E00-\u9FBF\uF900-\uFAFF\uFE30-\uFE4F\uFF00-\uFFEF]/;
function isTranslation(text) {
    return !!text && chinesePattern.test(text);
}
exports.isTranslation = isTranslation;
function getPreviousSibling(node) {
    if (!node || !node.parentNode) {
        return undefined;
    }
    var siblings = node.parentNode.childNodes || [];
    var index = siblings.indexOf(node);
    for (var i = index - 1; i >= 0; --i) {
        if (dom5_1.isElement(siblings[i])) {
            return siblings[i];
        }
    }
    return undefined;
}
function swapNode(node1, node2) {
    if (!node1 || !node1.parentNode) {
        return undefined;
    }
    var siblings = node1.parentNode.childNodes || [];
    var index1 = siblings.indexOf(node1);
    var index2 = siblings.indexOf(node2);
    var id1 = dom.getAttribute(node1, 'id');
    if (id1) {
        dom.removeAttribute(node1, 'id');
        dom.setAttribute(node2, 'id', id1);
    }
    siblings[index1] = node2;
    siblings[index2] = node1;
}
function shouldPreTranslate(node) {
    return /(h\d|p|dt|dd|t)/i.test(node.tagName);
}
//# sourceMappingURL=pre-translate.js.map