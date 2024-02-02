# 条形图状态

## [介绍](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Bar_states.html#id1)

命名空间中的一组内置变量`barstate`允许您的脚本检测当前正在执行脚本的栏的不同属性。

这些状态可用于将代码的执行或逻辑限制到特定的栏。

一些内置函数返回当前柱所属交易时段的信息。它们在[会话状态](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Sessions.html#pagesessions-sessionstates)部分进行了解释。

## [条形状态内置变量](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Bar_states.html#id2)

请注意，虽然指标和库实时运行所有价格或交易量更新，但不使用的策略则`calc_on_every_tick`不会；它们只会在实时栏关闭时执行。这将影响该类型脚本中条形状态的检测。例如，在开放市场上，此代码在实时关闭之前不会显示背景，因为那是策略运行的时间：

```
Pine Script™
Copied//@version=5
strategy("S")
bgcolor(barstate.islast ? color.silver : na)
```

### [`barstate.isfirst` ](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Bar_states.html#id3)

[barstate.isfirst](https://www.tradingview.com/pine-script-reference/v5/#var_barstate{dot}isfirst) 仅`true`位于数据集的第一个柱上，即当[bar_index](https://www.tradingview.com/pine-script-reference/v5/#var_bar_index)为零时。

仅初始化第一个柱上的变量可能很有用，例如：

```
Pine Script™
Copied// Declare array and set its values on the first bar only.
FILL_COLOR = color.green
var fillColors = array.new_color(0)
if barstate.isfirst
    // Initialize the array elements with progressively lighter shades of the fill color.
    array.push(fillColors, color.new(FILL_COLOR, 70))
    array.push(fillColors, color.new(FILL_COLOR, 75))
    array.push(fillColors, color.new(FILL_COLOR, 80))
    array.push(fillColors, color.new(FILL_COLOR, 85))
    array.push(fillColors, color.new(FILL_COLOR, 90))
```

### [`barstate.islast` ](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Bar_states.html#id4)

[barstate.islast](https://www.tradingview.com/pine-script-reference/v5/#var_barstate{dot}islast) 表示`true`当前柱是否为图表上的最后一个，无论该柱是否为实时柱。

它可用于将代码的执行限制在图表的最后一个柱，这在绘制线条、标签或表格时通常很有用。在这里，我们用它来确定何时更新我们只想出现在最后一个栏上的标签。我们只创建标签一次，然后使用`label.set_*()`函数更新其属性，因为它更有效：

```
Pine Script™
Copied//@version=5
indicator("", "", true)
// Create label on the first bar only.
var label hiLabel = label.new(na, na, "")
// Update the label's position and text on the last bar,
// including on all realtime bar updates.
if barstate.islast
    label.set_xy(hiLabel, bar_index, high)
    label.set_text(hiLabel, str.tostring(high, format.mintick))
```

### [`barstate.ishistory` ](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Bar_states.html#id5)

[barstate.ishistory](https://www.tradingview.com/pine-script-reference/v5/#var_barstate{dot}ishistory) 存在`true`于所有历史酒吧中。当[barstate.isrealtime](https://www.tradingview.com/pine-script-reference/v5/#var_barstate{dot}isrealtime)也为 时，它永远不会出现`true`在柱上 ，并且当[barstate.isconfirmed](https://www.tradingview.com/pine-script-reference/v5/#var_barstate{dot}isconfirmed)变为时，它不会出现在实时柱的收盘更新上 。在封闭市场上，它可以位于[barstate.islast](https://www.tradingview.com/pine-script-reference/v5/#var_barstate{dot}islast) 所在的同一柱上。`true``true``true``true``true`

### [`barstate.isrealtime` ](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Bar_states.html#id6)

[barstate.isrealtime](https://www.tradingview.com/pine-script-reference/v5/#var_barstate{dot}isrealtime) 表示`true`当前数据更新是否是实时柱更新，`false`否则（因此是历史数据）。请注意，[barstate.islast](https://www.tradingview.com/pine-script-reference/v5/#var_barstate{dot}islast)也出现`true`在所有实时柱上。

### [`barstate.isnew` ](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Bar_states.html#id7)

[barstate.isnew](https://www.tradingview.com/pine-script-reference/v5/#var_barstate{dot}isnew) 出现`true`在所有历史柱和实时柱的第一次（开盘）更新上。

所有历史柱都被视为*新*柱，因为 Pine Script™ 运行时在每个柱上按顺序执行脚本，从图表的第一个柱到最后一个柱。因此，您的脚本在执行时会逐条*发现每个历史柱。*

[barstate.isnew](https://www.tradingview.com/pine-script-reference/v5/#var_barstate{dot}isnew) 可用于在新的实时柱出现时重置[varip](https://www.tradingview.com/pine-script-reference/v5/#op_varip)`updateNo`变量。以下代码将在所有历史柱上以及每个实时柱的开头重置为 1。它计算每个实时柱期间实时更新的数量：

```
Pine Script™
Copied//@version=5
indicator("")
updateNo() =>
    varip int updateNo = na
    if barstate.isnew
        updateNo := 1
    else
        updateNo += 1
plot(updateNo())
```

### [`barstate.isconfirmed` ](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Bar_states.html#id8)

[barstate.isconfirmed](https://www.tradingview.com/pine-script-reference/v5/#var_barstate{dot}isconfirmed) 位于`true`所有历史柱和实时柱的最后（收盘）更新上。

通过要求在条件变为 之前关闭实时栏来避免重新绘制可能很有用`true`。我们在这里使用它来保存 RSI 的绘图，直到实时柱关闭并成为经过的实时柱。它将绘制在历史柱上，因为[barstate.isconfirmed](https://www.tradingview.com/pine-script-reference/v5/#var_barstate{dot}isconfirmed) 始终`true`位于历史柱上：

```
Pine Script™
Copied//@version=5
indicator("")
myRSI = ta.rsi(close, 20)
plot(barstate.isconfirmed ? myRSI : na)
```

[barstate.isconfirmed在](https://www.tradingview.com/pine-script-reference/v5/#var_barstate{dot}isconfirmed)[request.security()](https://www.tradingview.com/pine-script-reference/v5/#fun_request{dot}security)调用 中使用时将不起作用。

### [`barstate.islastconfirmedhistory` ](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Bar_states.html#id9)

[barstate.islastconfirmedhistory](https://www.tradingview.com/pine-script-reference/v5/#var_barstate{dot}islastconfirmedhistory) 是`true`指脚本是否在市场收盘时在数据集的最后一个柱上执行，或者在市场开盘时在实时柱之前的柱上执行。

它可用于检测第一个实时柱`barstate.islastconfirmedhistory[1]`，或将服务器密集型计算推迟到最后一个历史柱，否则在公开市场上将无法检测到。

## [例子](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Bar_states.html#id10)

以下是使用变量的脚本示例`barstate.*`：

```
Pine Script™
Copied//@version=5
indicator("Bar States", overlay = true, max_labels_count = 500)

stateText() =>
    string txt = ""
    txt += barstate.isfirst     ? "isfirst\n"     : ""
    txt += barstate.islast      ? "islast\n"      : ""
    txt += barstate.ishistory   ? "ishistory\n"   : ""
    txt += barstate.isrealtime  ? "isrealtime\n"  : ""
    txt += barstate.isnew       ? "isnew\n"       : ""
    txt += barstate.isconfirmed ? "isconfirmed\n" : ""
    txt += barstate.islastconfirmedhistory ? "islastconfirmedhistory\n" : ""

labelColor = switch
    barstate.isfirst                => color.fuchsia
    barstate.islastconfirmedhistory => color.gray
    barstate.ishistory              => color.silver
    barstate.isconfirmed            => color.orange
    barstate.isnew                  => color.red
    => color.yellow

label.new(bar_index, na, stateText(), yloc = yloc.abovebar, color = labelColor)
```

注意：

- 当 为 时，每个州的名称将出现在标签文本中`true`。
- 标签的背景有五种可能的颜色：
  - 第一个栏上紫红色
  - 历史金条上的白银
  - 最后确认的历史柱呈灰色
  - 当实时条被确认时（当它关闭并成为经过的实时条时）为橙色
  - 实时栏第一次执行时呈红色
  - 黄色表示实时栏的其他执行

我们首先将指标添加到公开市场的图表中，但在收到任何实时更新之前。请注意#1 中如何识别最后一个已确认的历史柱，以及如何将最后一个柱识别为最后一个，但仍被视为历史柱，因为尚未收到实时更新。

![../_images/BarStates-Example-01.png](https://www.tradingview.com/pine-script-docs/en/v5/_images/BarStates-Example-01.png)

让我们看看当实时更新开始出现时会发生什么：

![../_images/BarStates-Example-02.png](https://www.tradingview.com/pine-script-docs/en/v5/_images/BarStates-Example-02.png)

注意：

- 实时条是红色的，因为它是第一次执行，因为`barstate.isnew`是`true`并且`barstate.ishistory`不再是`true`，所以我们的 [开关](https://www.tradingview.com/pine-script-reference/v5/#op_switch)结构确定我们的颜色使用分支。这通常不会持续很长时间，因为在下一次更新时将不再如此 ，因此标签的颜色将变成黄色。`barstate.isnew => color.red``barstate.isnew``true`
- 经过的实时柱的标签是橙色，因为这些柱在关闭时不是历史柱。因此，[switch](https://www.tradingview.com/pine-script-reference/v5/#op_switch)结构中的分支 没有被执行，但下一个分支被执行。`barstate.ishistory => color.silver``barstate.isconfirmed => color.orange`

最后一个示例显示了实时栏的标签在栏上第一次执行后如何变成黄色。这是标签通常出现在实时栏上的方式：

![../_images/BarStates-Example-03.png](https://www.tradingview.com/pine-script-docs/en/v5/_images/BarStates-Example-03.png)