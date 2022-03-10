# 执行模式

 Pine运行时的执行模型与Pine的[时间序列](https://www.tradingview.com/pine-script-docs/en/v5/language/Time_series.html#pagetimeseries)和[类型系统](https://www.tradingview.com/pine-script-docs/en/v5/language/Type_system.html#pagetypesystem)密切相关。了解这三者是充分利用Pine的的关键。

 执行模型决定了你的脚本如何在图表上执行，从而决定了你在脚本中编写的代码如何工作。如果没有Pine的运行时，你的Pine代码将无所作为，它在你的代码编译后启动，并在你的图表上执行，因为其中一个[触发脚本执行的事件](https://www.tradingview.com/pine-script-docs/en/v5/language/Execution_model.html#pageexecutionmodel-events)已经发生。

 当Pine脚本被加载到图表上时，它在每个历史条上执行一次，使用每个条的可用OHLCV（开盘open、最高high、最低low、收盘close、成交量volumn）值。一旦脚本的执行到达数据集的最右边的条形，如果目前交易活跃，那么Pine *指标*将在每次*更新*发生时执行一次，即价格或成交量变化。Pine *策略*默认只在最右边的条形图收盘时执行，但它们也可以被配置为在每次更新时执行，就像指标那样。

 所有的符号/时间框架对都有一个数据集包括有限数量的条形图。当你向左滚动图表以查看数据集的早期条形时，相应的条形会在图表上加载。当该符号/时间框架对没有更多的条形图或您的账户类型允许的最大条形图数量已被加载时，加载过程就会停止[ [1\]](https://www.tradingview.com/pine-script-docs/en/v5/language/Execution_model.html#all-available-bars)。你可以向左滚动图表，直到数据集的第一个条形，它的索引值为0（见[bar_index](https://www.tradingview.com/pine-script-reference/v5/#var_bar_index)）。

 当脚本第一次在图表上运行时，数据集中的所有条形图都是*历史条形图*，除了最右边的条形图，如果交易时段是活跃的。当交易进行时候在最右边的条形图上，它被称为*实时条形图*。当检测到价格或成交量的变化时，实时条就会更新。当实时条形图关闭时，它将成为一个*失效的实时条形图*，并打开一个新的实时条形图。

 ## 基于历史条的计算

 让我们来看看一个简单的脚本，并跟踪它在历史条上的执行情况。

 ```
 //@version=5
 indicator("My Script", overlay = true)
 src = close
 a = ta.sma(src, 5)
 b = ta.sma(src, 50)
 c = ta.cross(a, b)
 plot(a, color = color.blue)
 plot(b, color = color.black)
 plotshape(c, color = color.red)
 ```

 在历史条上，当OHLCV值都是已知的时候，脚本会在相当于条的收盘时执行。在执行脚本之前，内置的变量如 "开盘"、"高点"、"低点"、"收盘"、"成交量 "和 "时间 "都被设置为与该条线相应的值。脚本在每个历史条上执行*一*次。

 我们的例子脚本首先在数据集的第一个条形索引0处执行。每条语句的执行都使用当前条形的数值。因此，在数据集的第一个条形图上，下面的语句：

 ```
 src = close
 ```

 用第一个条形图的 `close `值初始化变量 `src`，然后依次执行下面的每一行。因为该脚本对每个历史条形图只执行一次，所以该脚本总是用特定历史条形图的相同`close`值进行计算。

 脚本中每一行的执行都会产生计算结果，进而产生指标的输出值，然后可以在图表上绘制出来。我们的例子在脚本的最后使用了`plot`和`plotshape`调用来输出一些数值。在策略的情况下，计算的结果可以用来绘制数值或决定要下的订单。

 在第一个条形图上执行和绘制之后，脚本在数据集的第二个条形图上执行，这个条形图的索引是1。 然后这个过程重复进行，直到数据集的所有历史条形图被处理，脚本到达图表的最右边。

 ![./_images/execution_model_calculation_on_history.png](https://www.tradingview.com/pine-script-docs/en/v5/_images/execution_model_calculation_on_history.png)

 ## 基于实时条形图的计算

Pine脚本在实时条上的行为与在历史条上的行为有很大不同。回顾一下，当图表符号上的交易活跃时，实时条是图表上最右边的条。另外，记得策略在实时条上可以有两种不同的行为方式。默认情况下，它们只在实时条形图关闭时执行，但是`strategy`声明语句的`calc_on_every_tick`参数可以设置为true，以修改策略的行为，使其在每次实时条形图更新时执行，就像指标那样。因此这里描述的指标行为只适用于使用`calc_on_every_tick=true`的策略。

脚本在历史条上的执行和在实时条上的执行最重要的区别是，在历史条上只执行一次，而在实时条上每次更新都会执行脚本。这就意味着内置的变量，如 "高"、"低 "和 "收"，在历史条形图上是不会改变的，但在实时条形图上，脚本的每一次迭代都可以改变。脚本计算中使用的内置变量的变化，反过来也会引起这些计算结果的变化。这是脚本跟随实时价格行动所必需的。因此，同一个脚本在实时条形图中每次执行都可能产生不同的结果。

**注意：**在实时条形图中，`close `变量总是代表`当前价格`。同样，`high`和`low`内置变量代表自实时条形图开始以来达到的最高价和最低价。Pine内置变量将只代表实时条形图最后更新时的最终值。

让我们在实时条形图中遵循我们的脚本例子。

当脚本到达实时条形图时，它第一次执行。它使用内置变量的当前值来产生一组结果，并在需要时绘制它们。在下一次更新发生时，在脚本执行另一次之前，它的用户定义的变量被重置到一个已知的状态，对应于上一个条形收盘时的最后一次*commit*的状态。如果没有对变量进行提交，因为它们在每个柱状图上都被初始化了，那么它们将被重新初始化。在这两种情况下，它们最后的计算状态都会丢失。绘图的标签和线条的状态也会被重置。在实时条形图中的脚本的每一次新的迭代之前，对脚本的用户定义的变量和绘图的这种重设被称为*回滚*。它的作用是将脚本重置到与实时条打开时相同的已知状态，所以实时条中的计算总是从一个干净的状态开始执行。

随着实时条形图中价格或成交量的变化，脚本值的不断重新计算会导致这样一种情况：在我们的例子中，变量`c`因为发生了交叉而变成了真，因此脚本的最后一条线所绘制的红色标记会出现在图表上。如果在下一次价格更新时，价格的变化使`close`值不再产生计算，使`c`成为真实，因为不再有交叉，那么之前绘制的标记将消失。

当实时条形图关闭时，脚本会执行最后一次。像往常一样，变量在执行前被回滚。然而，由于这次迭代是实时条形图上的最后一次迭代，当计算完成后，变量将被承诺为条形图的最终值。

总结一下实时条形图的过程。

> - 脚本在实时条形图打开时执行**，然后每次更新时执行一次**。
> - 变量在每次实时更新前**回滚。
> - 变量在收盘时被提交**一次更新。



## [触发执行脚本的事件](https://www.tradingview.com/pine-script-docs/en/v5/language/Execution_model.html#id4)

当下列事件之一发生时，一个脚本将在图表上的全部条形上执行。

> - 在图表上加载一个新的符号或时间框架。
> - 从松树编辑器或图表的 "指标和策略 "对话框中保存或添加一个脚本到图表中。
> - 在脚本的 "设置/输入 "对话框中修改一个数值。
> - 在策略的 "设置/属性 "对话框中修改了一个值。
> - 检测到一个浏览器刷新事件。

当交易活跃时，一个脚本在实时条上被执行，并且。

> - 上述条件之一发生，导致脚本在实时条形图的打开处执行，或
> - 由于检测到价格或成交量的变化，实时条形图被更新。

请注意，当市场处于活跃状态时，如果一个图表没有被触动，一连串已经打开然后关闭的实时条将会跟踪当前的实时条。虽然这些*过期的实时条形图*已经被*确认，因为它们的变量都已经提交，但是脚本还没有在它们的*历史*状态下执行，因为当脚本最后一次在图表的数据集上运行时，它们并不存在。

当一个事件触发了脚本在图表上的执行，并导致它在那些现在已经成为历史条形的条形上运行时，脚本的计算结果有时会与它们在最后一次收盘时的计算结果不同，当时它们还是实时条形。这可能是由于实时条形图收盘时保存的OHLCV值与相同条形图成为历史条形图时从数据馈送中获取的OHLCV值之间的微小差异造成的。这种行为是*重绘*的可能原因之一。

## [更多信息](https://www.tradingview.com/pine-script-docs/en/v5/language/Execution_model.html#id5)

- Pine内置的`barstate.*`变量提供了关于脚本执行的[条形图类型或事件](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Bar_states.html#pagebarstates)的信息。记录这些变量的页面还包含一个脚本，可以让你直观地看到实时和历史条形图之间的差异，例如。
- [策略](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Strategies.html#pagestrategies)页面解释了策略计算的细节，这与指标的计算不尽相同。

## [Pine函数的执行和函数块内的历史背景](https://www.tradingview.com/pine-script-docs/en/v5/language/Execution_model.html#id6)

Pine函数内部使用的系列变量的历史是通过对函数的每一次连续调用而产生的。如果不在脚本运行的每一个柱状图上调用该函数，这将导致在函数的本地块内部和外部的系列的历史值之间出现差异。因此，如果不在每个柱状图上调用该函数，那么在函数内部和外部使用相同索引值的系列将不会指的是历史上的同一个点。

让我们看看这个脚本的例子，`f()'和`f2()'函数每隔一段时间就被调用。

```
//@version=5
indicator("My Script", overlay = true)

//返回2个柱形前最后一次调用函数时的 "a "值。
f(a) => a[1].
// 如预期的那样，返回上一栏的 "close "的值。
f2() => close[1].

oneBarInTwo = bar_index % 2 == 0
plot(oneBarInTwo ? f(close) : na, color = color.maroon, lineewidth = 6, style = plot.style_cross)
plot(oneBarInTwo ? f2() : na, color = color.lime, lineewidth = 6, style = plot.style_circles)
plot(close[2], color = color.maroon)
plot(close[1], color = color.lime)
```

![./_images/Function_historical_context_1.png](https://www.tradingview.com/pine-script-docs/en/v5/_images/Function_historical_context_1.png)

从结果图中可以看出，`a[1]`返回函数上下文中a的前一个值，所以最后一次调用`f()`是在两个柱状体之前--而不是像`f2()`中的`close[1]`那样，是前一个柱状体的收盘价。这导致函数块中的`a[1]`指的是与`close[1]`不同的过去值，尽管它们使用相同的索引1。

### 为什么有这种行为？

之所以需要这种行为，是因为在每个柱形上强制执行函数会导致意想不到的结果，比如在if分支内调用[label.new()](https://www.tradingview.com/pine-script-reference/v5/#fun_label{dot}new)函数，除非[if](https://www.tradingview.com/pine-script-reference/v5/#op_if)条件需要，否则不得执行。

另一方面，这种行为会导致某些内置函数出现意想不到的结果，这些函数需要在每个柱形图上执行以正确计算其结果。如果这些函数被放置在不是每个柱子都要执行的环境中，例如[if](https://www.tradingview.com/pine-script-reference/v5/#op_if)分支，那么它们将不会返回预期的结果。

在这些情况下，解决方案是将这些函数调用放在其上下文之外，这样它们就可以在每个柱状图上执行。

在这个脚本中，[ta.barssince()](https://www.tradingview.com/pine-script-reference/v5/#fun_ta{dot}barssince)不是在每个柱形上都被调用，因为它在一个三元运算符的条件分支中。

```
//@version=5
指标("Barssince", overlay = false)
res = close > close[1] ? ta.barssince(close < close[1]) : -1
plot(res, style = plot.style_histogram, color=res >= 0 ? color.red : color.blue)
```

这导致了不正确的结果，因为[ta.barssince()](https://www.tradingview.com/pine-script-reference/v5/#fun_ta{dot}barssince)不是在每个柱子上执行的。

![./_images/Function_historical_context_2.png](https://www.tradingview.com/pine-script-docs/en/v5/_images/Function_historical_context_2.png)

解决办法是在条件分支之外调用[ta.barssince()](https://www.tradingview.com/pine-script-reference/v5/#fun_ta{dot}barssince)，以强制在每个柱子上执行。

```
//@version=5
indicator("Barssince", overlay = false)
b = ta.barssince(close < close[1])
res = close > close[1] ? b : -1
plot(res, style = plot.style_histogram, color = res >= 0 ? color.red : color.blue)
```

使用这种技术，我们得到了预期的输出。

![./_images/Function_historical_context_3.png](https://www.tradingview.com/pine-script-docs/en/v5/_images/Function_historical_context_3.png)

### Exceptions

并非所有的内置函数都需要每条都执行。这些是不需要的函数，所以不需要特别处理。

```
dayofmonth, dayofweek, hour, linebreak, math.abs, math.acos, math.asin, math.atan, math.ceil,
math.cos, math.exp, math.floor, math.log, math.log10, math.max, math.min, math.pow, math.round,
math.sign, math.sin, math.sqrt, math.tan, minute, month, na, nz, second, str.tostring,
ticker.heikinashi, ticker.kagi, ticker.new, ticker.renko, time, Timestamp, weekofyear, year
```

注意

在[for](https://www.tradingview.com/pine-script-reference/v5/#op_for)循环中调用的函数，在循环的每一次迭代中使用相同的上下文。在下面的例子中，对同一个酒吧的每个[ta.lowest()](https://www.tradingview.com/pine-script-reference/v5/#fun_ta{dot}lowest)调用都使用传递给它的值，即[bar_index](https://www.tradingview.com/pine-script-reference/v5/#var_bar_index)，所以循环中使用的函数调用不需要特殊处理。

```
//@version=5
indicator("My Script")
va = 0.0
for i = 1 to 2 by 1
    如果（i + bar_index）% 2 == 0
        va := ta.lowers(bar_index, 10) //每次调用时都是相同的环境。
plot(va)
```
