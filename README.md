GitBook Translator Plugin
=========================

GitBook 翻译器插件
=========================

## Usage

## 用法

Add this plugin to `book.json` (create it if it doesn't exist) in the project's root directory:

在项目根目录下的 `book.json`（如果没有就创建它） 中添加本插件：

```json
{
  "plugins": ["translator"]
}
```

## Format conventions

## 格式约定

* For headings and ordinary paragraphs, write Chinese in the space immediately below the corresponding English, with a blank line in between

  对于标题和普通段落，把中文写在对应的英文下面

  e.g.

  如

  ```

  ## One

  ## 一

  ```

  or

  或

  ```

  One

  一

  ```

* For the list, wrap the line after the English, add an extra blank line, and use the same indentation to write Chinese, such as:

  对于列表，在英文后面换行，加一个额外的空行，并用同样的缩进写上中文，如：

  ```
  * One

    一

  * Two

    二

  ```

* For other inline texts, such as in the table `|---|---|`, use the custom tag `<t></t>` to wrap it, such as:

  对于其它内联文本，如出现在 `|---|---|` 表格中的，请用自定义标签 `<t></t>` 包裹起来，如：

  ```
  | One | Two | Three |
  | --- | --- | ----- |
  | Hello | World | ! |
  ```

  要翻译为

  Should translate to

  ```
  | <t>One</t><t>一</t> | <t>Two</t><t>二</t> | <t>Three</t><t>三</t> |
  | --- | --- | ----- |
  | <t>Hello</t><t>你好</t> | <t>World</t><t>世界</t> | ! |
  ```

  还可以任意加空格和 `-` 来调整格式。

  You can also add spaces and `-` to adjust the format。

* For inline HTML tags, the following elements are automatically processed: `/h\d|p|dt|dd|t/`.

  对于内联的 HTML 元素，下列元素会被自动处理 `/h\d|p|dt|dd|t/`。

* Those English texts that do not need to be translated need only be kept as they are.

  不需要翻译的英文保持原样即可。
