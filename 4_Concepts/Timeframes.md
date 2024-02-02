# 时间框架

## [介绍](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Timeframes.html#id1)

图表的时间*范围*有时也称为其*间隔*或*分辨率*。它是图表上用一根柱表示的时间单位。所有标准图表类型都使用时间范围：“条形”、“蜡烛”、“空心蜡烛”、“线”、“面积”和“基线”。一种非标准图表类型也使用时间范围：“Heikin Ashi”。

对访问多个时间范围内的数据感兴趣的程序员需要熟悉时间范围在 Pine Script™ 中的表达方式以及如何使用它们。

**时间范围字符串**在不同的上下文中发挥作用：

- 当从另一个交易品种和/或时间范围请求数据时，必须在[request.security()](https://www.tradingview.com/pine-script-reference/v5/#fun_request{dot}security)中使用它们。请参阅[其他时间范围和数据](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Other_timeframes_and_data.html#pageothertimeframesanddata)页面以探索[request.security()](https://www.tradingview.com/pine-script-reference/v5/#fun_request{dot}security)的使用 。
- 它们可以用作[time()](https://www.tradingview.com/pine-script-reference/v5/#fun_time)和 [time_close()](https://www.tradingview.com/pine-script-reference/v5/#fun_time_close) 函数的参数，以返回较高时间范围柱的时间。反过来，这可以用于检测图表时间范围内较高时间范围的变化，而无需使用[request.security()](https://www.tradingview.com/pine-script-reference/v5/#fun_request{dot}security)。请参阅[测试较高时间范围内的更改](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Time.html#pagetime-testingforchangesinhighertimeframes)部分以了解如何执行此操作。
- input.timeframe [()](https://www.tradingview.com/pine-script-reference/v5/#fun_input{dot}session)函数提供了一种允许脚本用户通过脚本的“输入”选项卡定义时间范围的方法（有关更多信息，请参阅[时间范围输入](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Inputs.html#pageinputs-timeframeinput)部分）。
- Indicator [()](https://www.tradingview.com/pine-script-reference/v5/#fun_indicator) 声明语句有一个可选`timeframe`参数，可用于为简单脚本提供多时间范围功能，而无需使用 [request.security()](https://www.tradingview.com/pine-script-reference/v5/#fun_request{dot}security)。
- 许多内置变量提供有关脚本运行所在图表所使用的时间范围的信息。有关它们的更多信息，请参阅[图表时间范围](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Chart_information.html#pagechartinformation-charttimeframe)[部分，包括timeframe.period](https://www.tradingview.com/pine-script-reference/v5/#var_timeframe{dot}period) ，它返回 Pine Script™ 时间范围规范格式的字符串。



## [时间范围字符串规范](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Timeframes.html#id2)

时间范围字符串遵循以下规则：

- 它们由乘数和时间单位组成，例如“1S”、“30”（30 分钟）、“1D”（一天）、“3M”（三个月）。

- 单位由单个字母表示，分钟不使用字母：“S”表示秒，“D”表示天，“W”表示周，“M”表示月。

- 当不使用乘数时，假设为1：“S”相当于“1S”，“D”相当于“1D”等。如果仅使用“1”，则被解释为“1min”，因为没有单位字母标识符使用几分钟。

- 没有“小时”单位； “1H”**无效**。一小时的正确格式是“60”（记住没有为分钟指定单位字母）。

- 每个时间范围单位的有效乘数有所不同：

  > - 对于秒，只有离散的 1、5、10、15 和 30 乘法器有效。
  > - 分钟为 1 到 1440。
  > - 天数为 1 到 365。
  > - 周数为 1 到 52。
  > - 月份为 1 至 12。



## [比较时间范围](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Timeframes.html#id3)

比较不同的时间范围字符串可能很有用，例如，可以确定图表上使用的时间范围是否低于脚本中使用的较高时间范围。

将时间范围字符串转换为以小数分钟为单位的表示形式提供了一种使用通用单位来比较它们的方法。此脚本使用[timeframe.in_seconds()](https://www.tradingview.com/pine-script-reference/v5/#fun_timeframe{dot}in_seconds) 函数将时间范围转换为浮点数秒，然后将结果转换为分钟：

```
Pine Script™
Copied//@version=5
indicator("Timeframe in minutes example", "", true)
string tfInput = input.timeframe(defval = "", title = "Input TF")

float chartTFInMinutes = timeframe.in_seconds() / 60
float inputTFInMinutes = timeframe.in_seconds(tfInput) / 60

var table t = table.new(position.top_right, 1, 1)
string txt = "Chart TF: "    + str.tostring(chartTFInMinutes, "#.##### minutes") +
"\nInput TF: " + str.tostring(inputTFInMinutes, "#.##### minutes")
if barstate.isfirst
    table.cell(t, 0, 0, txt, bgcolor = color.yellow)
else if barstate.islast
    table.cell_set_text(t, 0, 0, txt)

if chartTFInMinutes > inputTFInMinutes
    runtime.error("The chart's timeframe must not be higher than the input's timeframe.")
```

注意：

- 我们使用内置的[timeframe.in_seconds()](https://www.tradingview.com/pine-script-reference/v5/#fun_timeframe{dot}in_seconds)函数将图表和[input.timeframe()](https://www.tradingview.com/pine-script-reference/v5/#fun_input{dot}session) 函数转换为秒，然后除以 60 转换为分钟。
- 我们在和变量 的初始化中使用了两次对[timeframe.in_seconds()](https://www.tradingview.com/pine-script-reference/v5/#fun_timeframe{dot}in_seconds)函数的调用。在第一个实例中，我们不为其参数提供参数，因此该函数返回图表的时间范围（以秒为单位）。在第二次调用中，我们通过调用[input.timeframe()](https://www.tradingview.com/pine-script-reference/v5/#fun_input{dot}session)提供脚本用户选择的时间范围 。`chartTFInMinutes``inputTFInMinutes``timeframe`
- 接下来，我们验证时间范围以确保输入时间范围等于或高于图表的时间范围。如果不是，我们会生成一个运行时错误。
- 我们最终打印转换为分钟的两个时间范围值。