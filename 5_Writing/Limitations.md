# 限制

## [介绍](https://www.tradingview.com/pine-script-docs/en/v5/writing/Limitations.html#id1)

正如我们的[欢迎](https://www.tradingview.com/pine-script-docs/en/v5/Introduction.html#pagewelcometopine)页面中提到的：

> *由于每个脚本都使用云中的计算资源，因此我们必须施加限制，以便在用户之间公平地共享这些资源。我们努力设置尽可能少的限制，但当然必须实施尽可能多的限制，以使平台顺利运行。限制适用于从附加符号请求的数据量、执行时间、内存使用和脚本大小。*

如果您使用 Pine Script™ 开发复杂的脚本，迟早您会遇到我们施加的一些限制。本节概述了您可能遇到的限制。目前，Pine Script™ 程序员无法获取有关其脚本消耗的资源的数据。我们希望这种情况将来会改变。

同时，当您考虑大型项目时，最安全的做法是进行概念验证，以评估脚本在项目后期遇到限制的可能性。

下面，我们描述了 Pine Script™ 环境中施加的限制。



## [时间](https://www.tradingview.com/pine-script-docs/en/v5/writing/Limitations.html#id2)



### [脚本编译](https://www.tradingview.com/pine-script-docs/en/v5/writing/Limitations.html#id3)

脚本必须先编译，然后才能在图表上执行。当您从 Pine 编辑器保存脚本或将脚本添加到图表时，会发生编译。编译时间有两分钟的限制，这取决于脚本的大小和复杂性，以及先前编译的缓存版本是否可用。当编译超过两分钟限制时，会发出警告。通过缩短脚本来注意该警告，因为连续三次警告后，将强制执行一小时禁止编译尝试。优化代码首先要考虑的是避免重复，用函数封装常用的段，调用函数而不是重复代码。



### [脚本执行](https://www.tradingview.com/pine-script-docs/en/v5/writing/Limitations.html#id4)

脚本编译完成后就可以执行。有关[触发脚本执行的事件](https://www.tradingview.com/pine-script-docs/en/v5/language/Execution_model.html#pageexecutionmodel-events)列表，请参阅触发脚本执行的事件。分配给脚本在数据集的所有柱上执行的时间因账户类型而异。基本帐户的限制为 20 秒，其他帐户为 40 秒。



### [循环执行](https://www.tradingview.com/pine-script-docs/en/v5/writing/Limitations.html#id5)

任何单个柱上的任何循环的执行时间限制为 500 毫秒。嵌入循环的外层循环算作一个循环，因此会先超时。请记住，即使循环可能在给定柱上的 500 毫秒时间限制内执行，但在所有数据集的柱上执行所需的时间可能会导致您的脚本超出总执行时间限制。例如，总执行时间的限制将使您的脚本无法在 20,000 个柱数据集的每个柱上执行 400 毫秒的循环，因为您的脚本将需要 8000 秒来执行。



## [图表视觉效果](https://www.tradingview.com/pine-script-docs/en/v5/writing/Limitations.html#id6)



### [绘图限制](https://www.tradingview.com/pine-script-docs/en/v5/writing/Limitations.html#id7)

每个脚本最多允许 64 个绘图计数。生成绘图计数的函数是：

- [plot()](https://www.tradingview.com/pine-script-reference/v5/#fun_plot)
- [plotarrow()](https://www.tradingview.com/pine-script-reference/v5/#fun_plotarrow)
- [plotbar()](https://www.tradingview.com/pine-script-reference/v5/#fun_plotbar)
- [plotcandle()](https://www.tradingview.com/pine-script-reference/v5/#fun_plotcandle)
- [plotchar()](https://www.tradingview.com/pine-script-reference/v5/#fun_plotchar)
- [plotshape()](https://www.tradingview.com/pine-script-reference/v5/#fun_plotshape)
- [alertcondition()](https://www.tradingview.com/pine-script-reference/v5/#fun_alertcondition)
- [bgcolor()](https://www.tradingview.com/pine-script-reference/v5/#fun_bgcolor)
- [fill()](https://www.tradingview.com/pine-script-reference/v5/#fun_fill),但前提是它`color`是[series](https://www.tradingview.com/pine-script-reference/v5/#op_series)形式。

以下函数不会生成绘图计数：

- [hline()](https://www.tradingview.com/pine-script-reference/v5/#fun_hline)
- [line.new()](https://www.tradingview.com/pine-script-reference/v5/#fun_line{dot}new)
- [label.new()](https://www.tradingview.com/pine-script-reference/v5/#fun_label{dot}new)
- [table.new()](https://www.tradingview.com/pine-script-reference/v5/#fun_table{dot}new)
- [box.new()](https://www.tradingview.com/pine-script-reference/v5/#fun_box{dot}new)

一次函数调用最多可以生成七个绘图计数，具体取决于函数及其调用方式。当您的脚本超过 64 个绘图计数的最大值时，运行时错误消息将显示脚本生成的绘图计数。到达该点后，您可以通过在脚本中注释掉函数调用来确定函数调用生成的绘图计数。只要您的脚本仍然抛出错误，您就可以看到注释掉一行后实际绘图计数如何减少。

以下示例显示了不同的函数调用以及每个函数调用将生成的绘图计数数：

```javascript
//@version=5
indicator("Plot count example")

bool isUp = close > open
color isUpColor = isUp ? color.green : color.red
bool isDn = not isUp
color isDnColor = isDn ? color.red : color.green

// Uses one plot count each.
p1 = plot(close, color = color.white)
p2 = plot(open, color = na)

// Uses two plot counts for the `close` and `color` series.
plot(close, color = isUpColor)

// Uses one plot count for the `close` series.
plotarrow(close, colorup = color.green, colordown = color.red)

// Uses two plot counts for the `close` and `colorup` series.
plotarrow(close, colorup = isUpColor)

// Uses three plot counts for the `close`, `colorup`, and the `colordown` series.
plotarrow(close - open, colorup = isUpColor, colordown = isDnColor)

// Uses four plot counts for the `open`, `high`, `low`, and `close` series.
plotbar(open, high, low, close, color = color.white)

// Uses five plot counts for the `open`, `high`, `low`, `close`, and `color` series.
plotbar(open, high, low, close, color = isUpColor)

// Uses four plot counts for the `open`, `high`, `low`, and `close` series.
plotcandle(open, high, low, close, color = color.white, wickcolor = color.white, bordercolor = color.purple)

// Uses five plot counts for the `open`, `high`, `low`, `close`, and `color` series.
plotcandle(open, high, low, close, color = isUpColor, wickcolor = color.white, bordercolor = color.purple)

// Uses six plot counts for the `open`, `high`, `low`, `close`, `color`, and `wickcolor` series.
plotcandle(open, high, low, close, color = isUpColor, wickcolor = isUpColor , bordercolor = color.purple)

// Uses seven plot counts for the `open`, `high`, `low`, `close`, `color`, `wickcolor`, and `bordercolor` series.
plotcandle(open, high, low, close, color = isUpColor, wickcolor = isUpColor , bordercolor = isUp ? color.lime : color.maroon)

// Uses one plot count for the `close` series.
plotchar(close, color = color.white, text = "|", textcolor = color.white)

// Uses two plot counts for the `close`` and `color` series.
plotchar(close, color = isUpColor, text = "—", textcolor = color.white)

// Uses three plot counts for the `close`, `color`, and `textcolor` series.
plotchar(close, color = isUpColor, text = "O", textcolor = isUp ? color.yellow : color.white)

// Uses one plot count for the `close` series.
plotshape(close, color = color.white, textcolor = color.white)

// Uses two plot counts for the `close` and `color` series.
plotshape(close, color = isUpColor, textcolor = color.white)

// Uses three plot counts for the `close`, `color`, and `textcolor` series.
plotshape(close, color = isUpColor, textcolor = isUp ? color.yellow : color.white)

// Uses one plot count.
alertcondition(close > open, "close > open", "Up bar alert")

// Uses one plot count.
bgcolor(isUp ? color.yellow : color.white)

// Uses one plot count for the `color` series.
fill(p1, p2, color = isUpColor)
```

此示例生成的绘图计数为 56。如果我们要添加最后一次调用 [plotcandle()](https://www.tradingview.com/pine-script-reference/v5/#fun_plotcandle)的另外两个实例，脚本将抛出一个错误，指出脚本现在使用 70 个绘图计数，因为每次额外调用 [plotcandle()](https://www.tradingview.com/pine-script-reference/v5/#fun_plotcandle) 生成 7 个绘图计数，56 + (7 * 2) 为 70。



### [线、框、折线和标签限制](https://www.tradingview.com/pine-script-docs/en/v5/writing/Limitations.html#id8)

与可覆盖图表的整个数据集的[绘图](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Plots.html#pageplots)相反，脚本默认仅显示 图表上的最后 50[条线](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Lines_and_boxes.html#pagelinesandboxes-lines)、[框](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Lines_and_boxes.html#pagelinesandboxes-boxes)、[折线](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Lines_and_boxes.html#pagelinesandboxes-polylines)和[标签](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Text_and_shapes.html#pagetextandshapes-labels)。可以 通过脚本的 [Indicator()](https://www.tradingview.com/pine-script-reference/v5/#fun_indicator)或 [Strategy()](https://www.tradingview.com/pine-script-reference/v5/#fun_strategy)声明语句的、、和参数来增加每种[绘图类型](https://www.tradingview.com/pine-script-docs/en/v5/language/Type_system.html#pagetypesystem-types-drawingtypes)[的最大数量。 line](https://www.tradingview.com/pine-script-reference/v5/#type_line)、 [box](https://www.tradingview.com/pine-script-reference/v5/#type_box)和 [label](https://www.tradingview.com/pine-script-reference/v5/#type_label) ID的最大数量 为 500，[折线](https://www.tradingview.com/pine-script-reference/v5/#type_polyline)ID的最大数量 为 100。`max_lines_count``max_boxes_count``max_polylines_count``max_labels_count`

在此示例中，我们将图表上显示的最近标签的最大数量设置为 100：

```javascript
//@version=5
indicator("Label limits example", max_labels_count = 100, overlay = true)
label.new(bar_index, high, str.tostring(high, format.mintick))
```

需要注意的是，将绘图对象的任何属性设置为 [na](https://www.tradingview.com/pine-script-reference/v5/#var_na)时，其 ID 仍然存在，从而影响脚本的绘图总数。为了演示此行为，以下脚本在每个柱上绘制“买入”和“卖出” [标签](https://www.tradingview.com/pine-script-reference/v5/#type_label)，其值由和变量`x`确定 。`longCondition``shortCondition`

当柱索引为偶数时，“买入”标签的`x`值为[na](https://www.tradingview.com/pine-script-reference/v5/#var_na) ；当柱索引为奇数时， “卖出”标签的`x`值为[na](https://www.tradingview.com/pine-script-reference/v5/#var_na) 。尽管本示例中的 为 10，但我们可以看到脚本在图表上显示的[标签](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Text_and_shapes.html#pagetextandshapes-labels)`max_labels_count`少于 10 个 ，因为具有[na](https://www.tradingview.com/pine-script-reference/v5/#var_na)值的标签也计入总数：

![../_images/限制-LabelsWithNa-1.png](https://www.tradingview.com/pine-script-docs/en/v5/_images/Limitations-LabelsWithNa-1.png)

```javascript
//@version=5

// Approximate maximum number of label drawings
MAX_LABELS = 10

indicator("labels with na", overlay = false, max_labels_count = MAX_LABELS)

// Add background color for the last MAX_LABELS bars.
bgcolor(bar_index > last_bar_index - MAX_LABELS ? color.new(color.green, 80) : na)

longCondition =  bar_index % 2 != 0
shortCondition = bar_index % 2 == 0

// Add "Buy" and "Sell" labels on each new bar.
label.new(longCondition ? bar_index : na,  0, text = "Buy", color = color.new(color.green, 0), style = label.style_label_up)
label.new(shortCondition ? bar_index : na, 0, text = "Sell", color = color.new(color.red, 0), style = label.style_label_down)

plot(longCondition  ? 1 : 0)
plot(shortCondition ? 1 : 0)
```

要显示所需数量的标签，我们必须消除不想显示的标签绘图，而不是将其属性设置为 [na](https://www.tradingview.com/pine-script-reference/v5/#var_na)。下面的示例使用 [if](https://www.tradingview.com/pine-script-reference/v5/#kw_if)结构有条件地绘制“买入”和“卖出”标签，防止脚本在不必要时创建新的标签 ID：

![../_images/限制-LabelsWithNa-2.png](https://www.tradingview.com/pine-script-docs/en/v5/_images/Limitations-LabelsWithNa-2.png)

```javascript
//@version=5

// Approximate maximum number of label drawings
MAX_LABELS = 10

indicator("conditional labels", overlay = false, max_labels_count = MAX_LABELS)

// Add background color for the last MAX_LABELS bars.
bgcolor(bar_index > last_bar_index - MAX_LABELS ? color.new(color.green, 80) : na)

longCondition =  bar_index % 2 != 0
shortCondition = bar_index % 2 == 0

// Add a "Buy" label when `longCondition` is true.
if longCondition
    label.new(bar_index,  0, text = "Buy", color = color.new(color.green, 0), style = label.style_label_up)
// Add a "Sell" label when `shortCondition` is true.
if shortCondition
    label.new(bar_index, 0, text = "Sell", color = color.new(color.red, 0), style = label.style_label_down)

plot(longCondition  ? 1 : 0)
plot(shortCondition ? 1 : 0)
```



### [表限制](https://www.tradingview.com/pine-script-docs/en/v5/writing/Limitations.html#id9)

脚本最多可以在图表上 显示九个[表格](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Tables.html#pagetables)[，每个表格对应一个可能的位置： position.bottom_center](https://www.tradingview.com/pine-script-reference/v5/#var_position{dot}bottom_center)、 [position.bottom_left](https://www.tradingview.com/pine-script-reference/v5/#var_position{dot}bottom_left)、 [position.bottom_right](https://www.tradingview.com/pine-script-reference/v5/#var_position{dot}bottom_right)、 [position.middle_center](https://www.tradingview.com/pine-script-reference/v5/#var_position{dot}middle_center)、 [position.middle_left](https://www.tradingview.com/pine-script-reference/v5/#var_position{dot}middle_left)、 [position.middle_right](https://www.tradingview.com/pine-script-reference/v5/#var_position{dot}middle_right)、 [position.top_center](https://www.tradingview.com/pine-script-reference/v5/#var_position{dot}top_center)、 [position。 top_left](https://www.tradingview.com/pine-script-reference/v5/#var_position{dot}top_left)和[position.top_right](https://www.tradingview.com/pine-script-reference/v5/#var_position{dot}top_right)。当尝试将两个表放置在同一位置时，图表上只会显示最新的实例。



## [`request.*()` 调用](https://www.tradingview.com/pine-script-docs/en/v5/writing/Limitations.html#id10)



### [调用次数](https://www.tradingview.com/pine-script-docs/en/v5/writing/Limitations.html#id11)

一个脚本不能包含超过 40 个对`request.()`命名空间中函数的调用。这些函数的所有实例都计入此限制，即使包含在 脚本主逻辑未使用的[用户定义函数](https://www.tradingview.com/pine-script-docs/en/v5/language/User-defined_functions.html#pageuserdefinedfunctions)的本地块中也是如此。此限制适用于 [其他时间范围和数据](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Other_timeframes_and_data.html#pageothertimeframesanddata)页面中讨论的所有功能，包括：

- [request.security()](https://www.tradingview.com/pine-script-reference/v5/#fun_request.security)
- [request.security_lower_tf()](https://www.tradingview.com/pine-script-reference/v5/#fun_request.security_lower_tf)
- [request.currency_rate()](https://www.tradingview.com/pine-script-reference/v5/#fun_request.currency_rate)
- [request.dividends()](https://www.tradingview.com/pine-script-reference/v5/#fun_request.dividends)
- [request.splits()](https://www.tradingview.com/pine-script-reference/v5/#fun_request.splits)
- [request.earnings()](https://www.tradingview.com/pine-script-reference/v5/#fun_request.earnings)
- [request.quandl()](https://www.tradingview.com/pine-script-reference/v5/#fun_request.quandl)
- [request.financial()](https://www.tradingview.com/pine-script-reference/v5/#fun_request.financial)
- [request.economic()](https://www.tradingview.com/pine-script-reference/v5/#fun_request.economic)
- [request.seed()](https://www.tradingview.com/pine-script-reference/v5/#fun_request.seed)



### [内栏](https://www.tradingview.com/pine-script-docs/en/v5/writing/Limitations.html#id12)

[脚本可以通过request.security()](https://www.tradingview.com/pine-script-reference/v5/#fun_request.security)或 [request.security_lower_tf()](https://www.tradingview.com/pine-script-reference/v5/#fun_request.security_lower_tf)函数检索最多 100,000 个*内部柱*（较低时间范围柱） 。

图表时间范围内 100,000 个内部柱所覆盖的柱数随每个图表柱所包含的内部柱的数量而变化。例如，在 60 分钟图表上运行脚本时请求 1 分钟时间范围内的数据意味着每个图表条形最多可以包含 60 个内部条形图。在这种情况下，柱内请求覆盖的最小图表柱数为 1,666，即 100,000 / 60 = 1,666.67。但值得注意的是，提供商可能不会在一小时内*每*分钟报告数据。因此，此类请求可能会覆盖更多图表条形，具体取决于可用数据。



### [元组元素限制](https://www.tradingview.com/pine-script-docs/en/v5/writing/Limitations.html#id13)

脚本中的所有`request.*()`函数调用返回的元组元素总数不能超过 127 个。当所有`request.*()`调用的组合元组大小超过 127 个元素时，可以使用 [用户定义类型 (UDT)](https://www.tradingview.com/pine-script-docs/en/v5/language/Type_system.html#pagetypesystem-userdefinedtypes)来请求更多数量的值。

下面的示例概述了此限制以及解决该限制的方法。第一个 [request.security()](https://www.tradingview.com/pine-script-reference/v5/#fun_request.security)调用表示使用包含 128 个元素的元组作为`expression`参数。由于元素数量大于 127，因此会导致错误。

为了避免错误，我们可以使用这些相同的值作为UDT[对象](https://www.tradingview.com/pine-script-docs/en/v5/language/Objects.html#pageobjects)中的 [字段](https://www.tradingview.com/pine-script-docs/en/v5/language/Type_system.html#pagetypesystem-userdefinedtypes)*，*并将其 ID 传递给 ：`expression`

```javascript
//@version=5
indicator("Tuple element limit")

s1 = close
s2 = close * 2
...
s128 = close * 128

// Causes an error.
[v1, v2, v3, ..., v128] = request.security(syminfo.tickerid, "1D", [s1, s2, s3, ..., s128])

// Works fine:
type myType
    float v1
    float v2
    float v3
    ...
    float v128

myObj = request.security(syminfo.tickerid, "1D", myType.new(s1, s2, s3, ..., s128))
```

- 注意：

  [此示例概述了脚本尝试在单个request.security()](https://www.tradingview.com/pine-script-reference/v5/#fun_request.security)调用中评估 128 个元组元素的场景 。如果我们要将元组请求拆分为*多个*调用，则同样的限制也适用。例如，两次[request.security()](https://www.tradingview.com/pine-script-reference/v5/#fun_request.security)调用（每次调用都检索具有 64 个元素的元组）也会导致错误。



## [脚本大小和内存](https://www.tradingview.com/pine-script-docs/en/v5/writing/Limitations.html#id14)



### [编译的令牌](https://www.tradingview.com/pine-script-docs/en/v5/writing/Limitations.html#id15)

在执行脚本之前，编译器会将其翻译为标记化的*中间语言*(IL)。使用 IL 允许 Pine Script™ 通过应用各种内存和性能优化来容纳更大的脚本。编译器根据IL 形式中的*标记数量*来确定脚本的大小，**而不是**Pine 编辑器中可查看的代码中的字符数或行数。

每个指标、策略和库脚本的编译形式仅限于 68,000 个代币。当脚本导入库时，所有导入库的令牌总数不能超过 100 万个。无法检查脚本的编译形式及其 IL 标记计数。因此，只有当编译器达到脚本大小限制时，您才会知道脚本超出了大小限制。

在大多数情况下，脚本的编译大小可能不会达到限制。但是，如果编译的脚本确实达到了令牌限制，那么减少编译令牌的最有效方法是减少重复代码、将冗余调用封装在函数中并尽可能使用[库。](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Libraries.html#pagelibraries)

需要注意的是，编译过程会从最终的 IL 形式中省略任何*未使用的变量、函数、类型等，其中“未使用”指的**是不*影响脚本输出的任何内容。此优化可防止代码中多余的元素影响脚本的 IL 令牌计数。

例如，下面的脚本声明一个[用户定义类型](https://www.tradingview.com/pine-script-docs/en/v5/language/Type_system.html#pagetypesystem-userdefinedtypes)和一个 [用户定义方法](https://www.tradingview.com/pine-script-docs/en/v5/language/Methods.html#pagemethods-userdefinedmethods)，并定义使用它们的调用序列：

```javascript
//@version=5
indicator("My Script")
plot(close)

type myType
    float field = 10.0

method m(array<myType> a, myType v) =>
    a.push(v)

var arr = array.new<myType>()
arr.push(myType.new(25))
arr.m(myType.new())
```

尽管脚本中包含了[array.new()](https://www.tradingview.com/pine-script-reference/v5/#fun_array.new)、 `myType.new()`、 和`arr.m()`调用，但脚本实际**输出**`plot(close)`的唯一内容是。其余代码不影响输出。因此，该脚本的编译形式将具有与以下*相同*数量的标记：

```javascript
//@version=5
indicator("My Script")
plot(close)
```



### [每个作用域的变量](https://www.tradingview.com/pine-script-docs/en/v5/writing/Limitations.html#id16)

脚本的每个作用域中最多可以包含 1,000 个变量。 Pine 脚本始终包含一个全局作用域，由非缩进代码表示，并且它们可能包含零个或多个局部作用域。局部作用域是缩进代码的一部分，表示在[函数](https://www.tradingview.com/pine-script-docs/en/v5/language/User-defined_functions.html#pageuserdefinedfunctions)和 [方法](https://www.tradingview.com/pine-script-docs/en/v5/language/Methods.html#pagemethods-userdefinedmethods)以及 [if](https://www.tradingview.com/pine-script-reference/v5/#kw_if)、 [switch](https://www.tradingview.com/pine-script-reference/v5/#kw_switch)、 [for](https://www.tradingview.com/pine-script-reference/v5/#kw_for)、 [for…in](https://www.tradingview.com/pine-script-reference/v5/#kw_for...in)和 [while](https://www.tradingview.com/pine-script-reference/v5/#kw_while)结构中执行的过程，这些结构允许一个或多个局部块。每个本地块都算作一个本地范围。

使用 [?:](https://www.tradingview.com/pine-script-reference/v5/#op_{question}{colon})三元运算符的条件表达式的分支不算作本地块。



### [范围计数](https://www.tradingview.com/pine-script-docs/en/v5/writing/Limitations.html#id17)

脚本中的作用域总数，包括其全局作用域以及来自[用户定义的函数](https://www.tradingview.com/pine-script-docs/en/v5/language/User-defined_functions.html#pageuserdefinedfunctions)、[方法](https://www.tradingview.com/pine-script-docs/en/v5/language/Methods.html#pagemethods-userdefinedmethods)、 [条件结构](https://www.tradingview.com/pine-script-docs/en/v5/language/Conditional_structures.html#pageconditionalstructures)或它使用的[循环的](https://www.tradingview.com/pine-script-docs/en/v5/language/Loops.html#pageloops)每个局部作用域，不能超过 500。

值得注意的是，[request.security()](https://www.tradingview.com/pine-script-reference/v5/#fun_request.security)、 [request.security_lower_tf()](https://www.tradingview.com/pine-script-reference/v5/#fun_request.security_lower_tf)和 [request.seed()](https://www.tradingview.com/pine-script-reference/v5/#fun_request.seed)函数 *重复了*在另一个上下文中评估其`expression`参数值所需的范围。每次调用这些`request.*()`函数所产生的作用域也会计入脚本的作用域限制。

例如，假设我们创建了一个带有全局变量的脚本，该变量取决于 250 个 [if](https://www.tradingview.com/pine-script-reference/v5/#kw_if)结构的局部范围。该脚本的总作用域计数为 *251*（1 个全局作用域 + 250 个局部作用域）：

```javascript
//@version=5
indicator("Scopes demo")

var x = 0

if close > 0
    x += 0
if close > 1
    x += 1
// ... Repeat this `if close > n` pattern until `n = 249`.
if close > 249
    x += 249

plot(x)
```

由于作用域总数在限制范围内，因此可以编译成功。现在，假设我们调用[request.security()](https://www.tradingview.com/pine-script-reference/v5/#fun_request.security)`x`来评估另一个上下文中 的值并[绘制](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Plots.html#pageplots)它的值。在这种情况下，它实际上会使脚本的作用域计数*加倍*，因为 的值`x`取决于*所有*脚本的作用域：

```javascript
//@version=5
indicator("Scopes demo")

var x = 0

if close > 0
    x += 0
if close > 1
    x += 1
// ... Repeat this `if close > n` pattern until `n = 249`.
if close > 249
    x += 249

plot(x)
plot(request.security(syminfo.tickerid, "1D", x) // Causes compilation error since the scope count is now 502.
```

我们可以通过将[if](https://www.tradingview.com/pine-script-reference/v5/#kw_if)块封装在[用户定义的函数](https://www.tradingview.com/pine-script-docs/en/v5/language/User-defined_functions.html#pageuserdefinedfunctions)中来解决此问题，因为函数的作用域算作一个嵌入作用域：

```javascript
//@version=5
indicator("Scopes demo")

f() =>
    var x = 0

    if close > 0
        x += 0
    if close > 1
        x += 1
    // ... Repeat this `if close > n` pattern until `n = 249`.
    if close > 249
        x += 249

plot(f())
plot(request.security(syminfo.tickerid, "1D", f()) // No compilation error.
```



### [收藏](https://www.tradingview.com/pine-script-docs/en/v5/writing/Limitations.html#id18)

Pine Script™ 集合（[数组](https://www.tradingview.com/pine-script-docs/en/v5/language/Arrays.html#pagearrays)、[矩阵](https://www.tradingview.com/pine-script-docs/en/v5/language/Matrices.html#pagematrices)和[映射](https://www.tradingview.com/pine-script-docs/en/v5/language/Maps.html#pagemaps)）最多可以有 100,000 个元素。映射中的每个键值对包含两个元素，这意味着[映射](https://www.tradingview.com/pine-script-docs/en/v5/language/Maps.html#pagemaps)最多可以包含 50,000 个键值对。



## [其他限制](https://www.tradingview.com/pine-script-docs/en/v5/writing/Limitations.html#id19)



### [最大后退条数](https://www.tradingview.com/pine-script-docs/en/v5/writing/Limitations.html#id20)

[使用[\]](https://www.tradingview.com/pine-script-reference/v5/#op_op_[])历史引用运算符对过去值的引用 取决于 Pine Script™ 运行时维护的历史缓冲区的大小，该缓冲区的最大限制为 5000 个柱。 [此帮助中心页面](https://www.tradingview.com/support/solutions/43000587849) 讨论历史缓冲区以及如何使用`max_bars_back`参数或 [max_bars_back()](https://www.tradingview.com/pine-script-reference/v5/#fun_max_bars_back)函数更改其大小。



### [最大向前柱数](https://www.tradingview.com/pine-script-docs/en/v5/writing/Limitations.html#id21)

使用 定位绘图时`xloc.bar_index`，可以使用大于当前条形索引值的条形索引值作为*x*坐标。未来最多可参考 500 个柱。

此示例展示了我们如何在 [input.int()函数调用中使用](https://www.tradingview.com/pine-script-reference/v5/#fun_input{dot}int)maxval参数 来限制用户定义的柱数，我们绘制一条投影线，使其永远不会超过限制：

```javascript
//@version=5
indicator("Max bars forward example", overlay = true)

// This function draws a `line` using bar index x-coordinates.
drawLine(bar1, y1, bar2, y2) =>
    // Only execute this code on the last bar.
    if barstate.islast
        // Create the line only the first time this function is executed on the last bar.
        var line lin = line.new(bar1, y1, bar2, y2, xloc.bar_index)
        // Change the line's properties on all script executions on the last bar.
        line.set_xy1(lin, bar1, y1)
        line.set_xy2(lin, bar2, y2)

// Input determining how many bars forward we draw the `line`.
int forwardBarsInput = input.int(10, "Forward Bars to Display", minval = 1, maxval = 500)

// Calculate the line's left and right points.
int   leftBar  = bar_index[2]
float leftY    = high[2]
int   rightBar = leftBar + forwardBarsInput
float rightY   = leftY + (ta.change(high)[1] * forwardBarsInput)

// This function call is executed on all bars, but it only draws the `line` on the last bar.
drawLine(leftBar, leftY, rightBar, rightY)
```



### [图表栏](https://www.tradingview.com/pine-script-docs/en/v5/writing/Limitations.html#id22)

图表上显示的条形数量取决于图表符号和时间范围的可用历史数据量以及您持有的账户类型。当所需的历史日期可用时，图表条的最小数量为：

> - 高级计划有 20,000 条。
> - Pro 和 Pro+ 计划有 10,000 个条。
> - 其他计划有 5000 个条。



### [回测中的交易订单](https://www.tradingview.com/pine-script-docs/en/v5/writing/Limitations.html#id23)

回测策略时最多可下单9000单。使用深度回测时，限制为 200,000。