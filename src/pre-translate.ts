import { ASTNode, parseFragment, serialize } from 'parse5';
import * as dom from 'dom5';
import { isElement } from 'dom5';

export function preTranslate(text: string): string {
  const doc = parseFragment(text);
  dom.nodeWalkAll(doc, (node) => {
    if (shouldPreTranslate(node)) {
      if (isTranslation(dom.getTextContent(node))) {
        dom.setAttribute(node, 'x-translator-translation', 'on');
        const prevNode = getPreviousSibling(node);
        if (prevNode && prevNode.tagName === node.tagName && !isTranslation(dom.getTextContent(prevNode))) {
          dom.setAttribute(prevNode, 'x-translator-original', 'off');
          swapNode(prevNode, node);
        }
      }
    }
    return true;
  });
  return serialize(doc);
}

// tslint:disable:max-line-length
const chinesePattern = /[\u2E80-\u2EFF\u2F00-\u2FDF\u3000-\u303F\u31C0-\u31EF\u3200-\u32FF\u3300-\u33FF\u3400-\u4DBF\u4DC0-\u4DFF\u4E00-\u9FBF\uF900-\uFAFF\uFE30-\uFE4F\uFF00-\uFFEF]/;

export function isTranslation(text: string): boolean {
  return !!text && chinesePattern.test(text);
}

function getPreviousSibling(node: ASTNode): ASTNode | undefined {
  if (!node || !node.parentNode) {
    return undefined;
  }
  const siblings = node.parentNode.childNodes || [];
  const index = siblings.indexOf(node);
  for (let i = index - 1; i >= 0; --i) {
    if (isElement(siblings[i])) {
      return siblings[i];
    }
  }
  return undefined;
}

function swapNode(node1: ASTNode, node2: ASTNode): void {
  if (!node1 || !node1.parentNode) {
    return undefined;
  }
  const siblings = node1.parentNode.childNodes || [];
  const index1 = siblings.indexOf(node1);
  const index2 = siblings.indexOf(node2);
  const id1 = dom.getAttribute(node1, 'id');
  if (id1) {
    dom.removeAttribute(node1, 'id');
    dom.setAttribute(node2, 'id', id1);
  }
  siblings[index1] = node2;
  siblings[index2] = node1;
}

function shouldPreTranslate(node) {
  return /(h\d|p|dt|dd)/i.test(node.tagName!);
}
