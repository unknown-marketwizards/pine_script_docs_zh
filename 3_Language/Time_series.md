# 时间序列

Pine的许多功能源于这样一个事实，即它被设计用来有效地处理*时间序列*。时间序列不是一种形式或类型；它们是Pine用来存储一个变量在一段时间内的连续值的基本结构，其中每个值都与一个时间点相联系。由于图表是由条形图组成的，每个条形图代表一个特定的时间点，因此时间序列是处理可能随时间变化的数值的理想数据结构。

时间序列的概念与Pine的[执行模型](https://www.tradingview.com/pine-script-docs/en/v5/language/Execution_model.html#pageexecutionmodel)和[类型系统](https://www.tradingview.com/pine-script-docs/en/v5/language/Type_system.html#pagetypesystem)概念紧密相连。理解所有这三个概念是充分利用Pine的力量的关键。

以内置的[open](https://www.tradingview.com/pine-script-reference/v5/#var_open)变量为例，它包含了数据集中每个条形的 "open "价格，*数据集*是任何特定图表上的所有条形。如果你的脚本是在5分钟的图表上运行，那么[open](https://www.tradingview.com/pine-script-reference/v5/#var_open)时间序列中的每个值都是连续5分钟图表中的 "开盘 "价格。当你的脚本提到[open](https://www.tradingview.com/pine-script-reference/v5/#var_open)时，它指的是脚本正在执行的条形图的 "开盘 "价格。为了引用时间序列中的过去值，我们使用[[\]](https://www.tradingview.com/pine-script-reference/v5/#op_[])历史引用操作符。当一个脚本在一个给定的条上执行时，`open[1]`指的是前一个条上的[open](https://www.tradingview.com/pine-script-reference/v5/#var_open)时间序列的值。

虽然时间序列可能会让程序员想起数组，但它们是完全不同的。Pine确实使用了一个数组数据结构，但它与时间序列是完全不同的概念。

Pine中的时间序列，结合其特殊类型的运行时引擎和内置函数，才使得计算[close](https://www.tradingview.com/pine-script-reference/v5/#var_close)值的累积总数变得容易，不需要使用[for](https://www.tradingview.com/pine-script-reference/v5/#op_for)循环，只需要`ta.cum(close)`。这是可能的，因为尽管`ta.cum(close)`在脚本中看起来相当静态，但事实上它是在每个柱子上执行的，所以它的值会随着每个新柱子的[close](https://www.tradingview.com/pine-script-reference/v5/#var_close)值被添加到其中而变得越来越大。当脚本到达图表的最右边时，`ta.cum(close)`返回图表中所有条形的[close](https://www.tradingview.com/pine-script-reference/v5/#var_close)值的总和。

同样，过去14个[高](https://www.tradingview.com/pine-script-reference/v5/#var_high)和[低](https://www.tradingview.com/pine-script-reference/v5/#var_low)值之间的差值的平均值可以表示为`ta.sma(high - low, 14)`，或者表示自上次图表连续出现五个高点以来的条形距离为`barssince(rise(high, 5)`。即使是在连续的条形图上调用函数的结果，也会在时间序列中留下数值的痕迹，可以使用[[[[[https://www.tradingview.com/pine-script-reference/v5/#op_[]]]]历史参考操作符来引用。这可能很有用，例如，当测试当前条形图的[close](https://www.tradingview.com/pine-script-reference/v5/#var_close)是否突破了过去10个条形图中的最高[high](https://www.tradingview.com/pine-script-reference/v5/#var_high)，但不包括当前条形图，我们可以写成`breach = close > highest(close, 10)[1]`。同样的语句也可以写成`突破=收盘>最高（收盘[1]，10）`。

同样的循环逻辑也适用于诸如`plot(open)`这样的函数调用，它将在每个柱子上重复，在图表上连续绘制出每个柱子的[open](https://www.tradingview.com/pine-script-reference/v5/#var_high)的值。

不要将 "时间序列 "与 "序列 "形式混淆。*时间序列*的概念解释了变量的连续值是如何存储在Pine中的；"系列 "形式表示其值可以逐条变化的变量。例如，考虑[timeframe.period](https://www.tradingview.com/pine-script-reference/v5/#var_timeframe{dot}period)内置变量，它的形式是 "simple"，类型是 "string"，所以是 "simple string"。简单 "的形式意味着该变量的值在第0条（脚本执行的第一个条）就已经知道，并且在脚本执行过程中不会在图表的所有条上发生变化。变量的值是以字符串格式表示的图表的时间框架，例如，对于一个1D图表来说，就是 "D"。尽管它的值在脚本中不能改变，但在Pine中使用`timeframe.period[10]`来指代10个条形前的值在语法上是正确的（尽管不是很有用）。这是有可能的，因为每个柱子的[timeframe.period](https://www.tradingview.com/pine-script-reference/v5/#var_timeframe{dot}period)的连续值被存储在一个时间序列中，尽管该特定时间序列中的所有值都是相似的。然而，请注意，当[]操作符被用来访问一个变量的过去值时，它产生的结果是 "系列 "形式，即使没有偏移的变量是另一种形式，比如在[timeframe.period](https://www.tradingview.com/pine-script-reference/v5/#var_timeframe{dot}period)的情况下是 "简单"。

当你掌握了如何使用Pine的语法和它的[执行模型](https://www.tradingview.com/pine-script-docs/en/v5/language/Execution_model.html#pageexecutionmodel)有效地处理时间序列时，你可以用很少的代码来定义复杂的计算。
