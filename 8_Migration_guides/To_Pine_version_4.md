# 到 Pine Script™ 版本 4 

这是将 Pine Script™ 代码`@version=3`从`@version=4`.

## 转换器

Pine 编辑器附带了一个实用程序，可以自动将 v3 指标和策略转换为 v4。要访问它，请打开其中的脚本`//@version=3`，然后选择下拉菜单中的选项：`Convert to v4 More`

![../_images/v3_to_v4_convert_button.png](https://www.tradingview.com/pine-script-docs/en/v5/_images/v3_to_v4_convert_button.png)

并非所有脚本都可以自动从 v3 转换为 v4。如果您想手动转换脚本或者您的指标在转换后返回编译错误，请参阅下面的指南以获取更多信息。

## 重命名内置常量、变量和函数

在 Pine Script™ v4 中，以下内置常量、变量和函数已重命名：

- 颜色常量（例如`red`）被移动到`color.*`命名空间（例如`color.red`）。
- 该`color`函数已重命名为`color.new`.
- 类型常量`input()`（例如`integer`）被移动到`input.*`命名空间（例如`input.integer`）。
- 绘图样式常量（例如`histogram`style）被移动到`plot.style_*`命名空间（例如`plot.style_histogram`）。
- 函数的样式常量`hline`（例如`dotted`样式）被移动到`hline.style_*`命名空间（例如`hline.style_dotted`）。
- 星期几的常量（例如`sunday`）被移动到`dayofweek.*`命名空间（例如 `dayofweek.sunday`）。
- 当前图表时间范围的变量（例如`period`, `isintraday`）被移动到`timeframe.*`命名空间（例如`timeframe.period`, `timeframe.isintraday`）。
- 该`interval`变量已重命名为`timeframe.multiplier`.
- 和变量分别重命名为和`ticker`。`tickerid``syminfo.ticker``syminfo.tickerid`
- 包含柱索引值的变量`n`已重命名为`bar_index`。

重命名上述所有内容的原因是为了构建标准语言工具并使代码处理变得更容易。新名称根据公共前缀下的分配进行分组。例如，如果您在编辑器中键入“颜色”并按 Ctrl + 空格键，您将看到包含所有可用颜色常量的列表。

## 显式变量类型声明

在 Pine Script™ v4 中，不再可能在声明时创建具有未知数据类型的变量。这样做是为了避免变量类型在使用 na 值初始化后发生更改时出现的许多问题。从现在开始，`float`在声明具有 na 值的变量时，您需要使用关键字或类型函数（例如 ）显式指定它们的类型：

```javascript
//@version=4
study("Green Candle Close")
// We expect `src` to hold float values, so we declare in with the `float` keyword
float src = na
if close > open
    src := close
plot(src)
```