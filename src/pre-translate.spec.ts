import { expect } from 'chai';
import { isTranslation, preTranslate } from './pre-translate';

describe('pre-translate the book', () => {
  it('should distinguish between Chinese and English', function () {
    expect(isTranslation('One')).is.false;
    expect(isTranslation('一')).is.true;
    expect(isTranslation('one 一 ./')).is.true;
  });

  it('should add special attribute for elements with Chinese', function () {
    expect(preTranslate(`
<h1>一</h1>
`)).eql(`
<h1 x-translator-translation="on">一</h1>
`);

    expect(preTranslate(`
<h1>One</h1>
`)).eql(`
<h1>One</h1>
`);
  });

  it('should add special attributes for paired translation and original text', function () {
    expect(preTranslate(`
<h1>One</h1>
<h1>Two</h1>
<H1>二</H1>
`)).eql(`
<h1>One</h1>
<h1 x-translator-translation="on">二</h1>
<h1 x-translator-original="off">Two</h1>
`);
  });

  it('should auto unescape original html before process', function () {
    expect(preTranslate(`
<h1>One</h1>
<h1>Two</h1>
<H1>&#x4E8C;</H1>
`)).eql(`
<h1>One</h1>
<h1 x-translator-translation="on">二</h1>
<h1 x-translator-original="off">Two</h1>
`);
  });

  it('should swap id for translation and original text', function () {
    expect(preTranslate(`
<h1 id="one">One</h1>
<h1 id="一">一</h1>
`)).eql(`
<h1 id="one" x-translator-translation="on">一</h1>
<h1 x-translator-original="off">One</h1>
`);
  });
});
