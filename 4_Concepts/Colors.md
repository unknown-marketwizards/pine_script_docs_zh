# 颜色

## [介绍](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Colors.html#id1)

脚本视觉效果对于我们在 Pine Script™ 中编写的指标的可用性起着至关重要的作用。精心设计的图表和绘图使指标更易于使用和理解。良好的视觉设计建立了一种视觉层次结构，使更重要的信息脱颖而出，而不太重要的信息则不会受到阻碍。

在 Pine 中使用颜色可以像您想要的那样简单，也可以像您的概念需要的那样复杂。 Pine Script™ 中提供的 4,294,967,296 种可能的颜色和透明度组合可应用于：

- 您可以在指标的视觉空间中绘制或绘制的任何元素，无论是线条、填充、文本还是蜡烛。
- 脚本可视空间的背景，无论脚本是在其自己的窗格中运行，还是在图表上以覆盖模式运行。
- 图表上出现的条形或蜡烛主体的颜色。

脚本只能为它放置在自己的视觉空间中的元素着色。此规则的唯一例外是窗格指示器可以为图表条形图或蜡烛图着色。

Pine Script™ 具有内置颜色（例如[color.green](https://www.tradingview.com/pine-script-reference/v5/#var_color{dot}green) ）以及[color.rgb()](https://www.tradingview.com/pine-script-reference/v5/#fun_color{dot}rgb)等函数，可让您动态生成 RGBA 颜色空间中的任何颜色。

### [透明度](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Colors.html#id2)

Pine Script™ 中的每种颜色均由四个值定义：

- 其红、绿、蓝分量（0-255），遵循[RGB颜色模型](https://en.wikipedia.org/wiki/RGB_color_space)。
- 它的透明度（0-100），通常称为 Pine 之外的 Alpha 通道，如[RGBA 颜色模型](https://en.wikipedia.org/wiki/RGB_color_space)中所定义。尽管透明度以 0-100 范围表示，但在函数中使用时其值可以是“浮点”，这使您可以访问 Alpha 通道的 256 个基础值。

颜色的透明度定义了它的不透明程度：0 表示完全不透明，100 表示颜色（无论它是什么）不可见。在涉及更多的颜色视觉效果或使用背景时，调节透明度至关重要，可以控制哪些颜色占主导地位，以及它们在叠加时如何混合在一起。



### [Z 索引](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Colors.html#id3)

当您将元素放置在脚本的视觉空间中时，它们在*z*轴上具有相对深度；有些会出现在其他之上。 z *-index是表示元素在**z*轴上的位置的值。 z-index 最高的元素显示在顶部。

在 Pine Script™ 中绘制的元素被分为几组。每个组在*z*空间中都有自己的位置，并且**在同一组中**，脚本逻辑中最后创建的元素将出现在同一组中其他元素的顶部。一个组的元素不能放置在属于其组的*z*空间区域之外，因此图永远不会出现在表格的顶部，例如，因为表格具有最高的 z 索引。

此列表包含视觉元素组，按 z 索引递增排序，因此背景颜色始终位于*z*空间的底部，表格始终显示在所有其他元素的顶部：

- 背景颜色
- 填充
- 地块
- 线
- 线条填充
- 线路
- 盒子
- 标签
- 表格

请注意，通过使用indicator [()](https://www.tradingview.com/pine-script-reference/v5/#fun_indicator)或 [strategy()](https://www.tradingview.com/pine-script-reference/v5/#fun_strategy) ，您可以使用脚本中的顺序来控制、 [hline()](https://www.tradingview.com/pine-script-reference/v5/#fun_hline)和 [fill()](https://www.tradingview.com/pine-script-reference/v5/#fun_fill)视觉效果的相对z索引。`explicit_plot_zorder = true``plot*()`



## [恒定颜色](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Colors.html#id4)

Pine Script™ 有 17 种内置颜色。此表列出了它们的名称、十六进制等效值以及作为[color.rgb()](https://www.tradingview.com/pine-script-reference/v5/#fun_color{dot}rgb)参数的 RGB 值：

| 姓名   | 十六进制 | RGB 值                   |
| :----- | :------- | :----------------------- |
| 水色   | #00BCD4  | color.rgb(0, 188, 212)   |
| 黑色   | #363A45  | color.rgb(54, 58, 69)    |
| 蓝色   | #2196F3  | color.rgb(33, 150, 243)  |
| 紫红色 | #E040FB  | color.rgb(224, 64, 251)  |
| 灰色   | #787B86  | color.rgb(120, 123, 134) |
| 绿色   | #4CAF50  | color.rgb(76, 175, 80)   |
| 石灰   | #00E676  | color.rgb(0, 230, 118)   |
| 栗色   | #880E4F  | color.rgb(136, 14, 79)   |
| 海军蓝 | #311B92  | color.rgb(49, 27, 146)   |
| 橄榄色 | #808000  | color.rgb(128, 128, 0)   |
| 橙色   | #FF9800  | color.rgb(255, 152, 0)   |
| 紫色   | #9C27B0  | color.rgb(156, 39, 176)  |
| 红色   | #FF5252  | color.rgb(255, 82, 82)   |
| 银色   | #B2B5BE  | color.rgb(178, 181, 190) |
| 青色   | #00897B  | color.rgb(0, 137, 123)   |
| 白色   | #FFFFFF  | color.rgb(255, 255, 255) |
| 黄色   | #FFEB3B  | color.rgb(255, 235, 59)  |

在下面的脚本中，所有绘图都使用相同的[color.olive](https://www.tradingview.com/pine-script-reference/v5/#var_color{dot}olive) 颜色，透明度为 40，但以不同的方式表示。所有五种方法在功能上都是等效的：

![../_images/颜色-UsingColors-1.png](https://www.tradingview.com/pine-script-docs/en/v5/_images/Colors-UsingColors-1.png)

```javascript
//@version=5
indicator("", "", true)
// ————  Transparency (#99) is included in the hex value.
plot(ta.sma(close, 10), "10", #80800099)
// ————  Transparency is included in the color-generating function's arguments.
plot(ta.sma(close, 30), "30", color.new(color.olive, 40))
plot(ta.sma(close, 50), "50", color.rgb(128, 128, 0, 40))
      // ————  Use `transp` parameter (deprecated and advised against)
plot(ta.sma(close, 70), "70", color.olive, transp = 40)
plot(ta.sma(close, 90), "90", #808000, transp = 40)
```

笔记

最后两个[plot()](https://www.tradingview.com/pine-script-reference/v5/#fun_plot)调用使用参数指定透明度`transp`。应避免这种使用，因为`transp`在 Pine Script™ v5 中已弃用。使用`transp`参数定义透明度不太灵活，因为它需要*输入整数*类型的参数，这意味着必须在执行脚本之前知道它，因此无法动态计算，因为您的脚本执行条到条。此外，如果您使用的`color`参数已经包含透明度信息（如接下来的三个[plot()](https://www.tradingview.com/pine-script-reference/v5/#fun_plot)调用中所做的那样），则用于参数的任何参数`transp`都将无效。对于其他带参数的函数也是如此`transp`。

当脚本逐条执行时，上一个脚本中的颜色不会发生变化。然而，有时，需要在脚本在每个柱上执行时创建颜色，因为它们取决于编译时或脚本在零柱上开始执行时未知的条件。对于这些情况，程序员有两种选择：

1. 使用条件语句从一些预先确定的基色中选择颜色。
2. 例如，通过在脚本逐条执行时计算它们来动态构建新颜色，以实现颜色渐变。



## [条件着色](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Colors.html#id5)

假设您想要根据您定义的某些条件，用不同的颜色对移动平均线进行着色。为此，您可以使用条件语句为每个状态选择不同的颜色。首先，当移动平均线上涨时，将其着色为牛市颜色；当移动平均线未上涨时，将其着色为熊市颜色：

![../_images/颜色-ConditionalColors-1.png](https://www.tradingview.com/pine-script-docs/en/v5/_images/Colors-ConditionalColors-1.png)

```javascript
//@version=5
indicator("Conditional colors", "", true)
int   lengthInput = input.int(20, "Length", minval = 2)
color maBullColorInput = input.color(color.green, "Bull")
color maBearColorInput = input.color(color.maroon, "Bear")
float ma = ta.sma(close, lengthInput)
// Define our states.
bool maRising  = ta.rising(ma, 1)
// Build our color.
color c_ma = maRising ? maBullColorInput : maBearColorInput
plot(ma, "MA", c_ma, 2)
```

注意：

- 我们为脚本用户提供牛市/熊市颜色的选择。
- 我们定义一个`maRising`布尔变量，`true`当当前柱上的移动平均线高于上一个柱上时，该变量将保持不变。
- 我们定义一个`c_ma`颜色变量，根据布尔值分配两种颜色之一`maRising`。我们使用[？ : 三元运算符](https://www.tradingview.com/pine-script-reference/v5/#op_{question}{colon})来编写我们的条件语句。

您还可以使用条件颜色来避免在某些条件下进行绘图。在这里，我们使用一条线绘制高枢轴和低枢轴，但我们不想在新枢轴出现时绘制任何内容，以避免出现枢轴过渡中的关节。为此，我们测试枢轴变化，并在检测到变化时使用[na](https://www.tradingview.com/pine-script-reference/v5/#var_na) 作为颜色值，以便在该条上不绘制线条：

![../_images/颜色-ConditionalColors-2.png](https://www.tradingview.com/pine-script-docs/en/v5/_images/Colors-ConditionalColors-2.png)

```javascript
//@version=5
indicator("Conditional colors", "", true)
int legsInput = input.int(5, "Pivot Legs", minval = 1)
color pHiColorInput = input.color(color.olive, "High pivots")
color pLoColorInput = input.color(color.orange, "Low pivots")
// Intialize the pivot level variables.
var float pHi = na
var float pLo = na
// When a new pivot is detected, save its value.
pHi := nz(ta.pivothigh(legsInput, legsInput), pHi)
pLo := nz(ta.pivotlow( legsInput, legsInput), pLo)
// When a new pivot is detected, do not plot a color.
plot(pHi, "High", ta.change(pHi) ? na : pHiColorInput, 2, plot.style_line)
plot(pLo, "Low",  ta.change(pLo) ? na : pLoColorInput, 2, plot.style_line)
```

要理解这段代码是如何工作的，首先必须知道[ta.pivothigh()](https://www.tradingview.com/pine-script-reference/v5/#fun_ta{dot}pivothigh)和 [ta.pivotlow()](https://www.tradingview.com/pine-script-reference/v5/#fun_ta{dot}pivotlow)在这里使用时不带参数参数`source`，当它们找到 [高](https://www.tradingview.com/pine-script-reference/v5/#var_high)/[低](https://www.tradingview.com/pine-script-reference/v5/#var_low)枢轴时将返回一个值，否则他们回来[了](https://www.tradingview.com/pine-script-reference/v5/#var_na)。

当我们使用[nz()](https://www.tradingview.com/pine-script-reference/v5/#fun_nz)函数测试枢轴函数返回的值是否为[na](https://www.tradingview.com/pine-script-reference/v5/#var_na)时，只有当返回的值不是[na](https://www.tradingview.com/pine-script-reference/v5/#var_na)时，我们才允许将返回值分配给或变量，否则变量的先前值将简单地重新分配给它，这对其价值没有影响。请记住，和的先前值会逐条保留，因为我们在初始化它们时使用 [var](https://www.tradingview.com/pine-script-reference/v5/#op_var)关键字，这会导致初始化仅发生在第一个条上。`pHi``pLo``pHi``pLo`

接下来要做的就是，当我们绘制线条时，插入一个三元条件语句，当主元值更改时，该语句将生成 [na](https://www.tradingview.com/pine-script-reference/v5/#var_na)颜色，或者当主元级别不更改时，在脚本输入中选择的颜色。

## [计算颜色](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Colors.html#id6)

使用[color.new()](https://www.tradingview.com/pine-script-reference/v5/#fun_color{dot}new)、 [color.rgb()](https://www.tradingview.com/pine-script-reference/v5/#fun_color{dot}rgb)和 [color.from_gradient()](https://www.tradingview.com/pine-script-reference/v5/#fun_color{dot}from_gradient)等函数，可以在脚本逐条执行时即时构建颜色。

当您需要从基色生成不同的透明度级别时，[color.new()最有用。](https://www.tradingview.com/pine-script-reference/v5/#fun_color{dot}new)

当您需要从红色、绿色、蓝色或透明组件动态构建颜色时，[color.rgb()](https://www.tradingview.com/pine-script-reference/v5/#fun_color{dot}rgb)非常有用。当[color.rgb()](https://www.tradingview.com/pine-script-reference/v5/#fun_color{dot}rgb)创建颜色时，它的姊妹函数[color.r()](https://www.tradingview.com/pine-script-reference/v5/#fun_color{dot}r)、 [color.g()](https://www.tradingview.com/pine-script-reference/v5/#fun_color{dot}g)、 [color.b()](https://www.tradingview.com/pine-script-reference/v5/#fun_color{dot}b)和 [color.t()](https://www.tradingview.com/pine-script-reference/v5/#fun_color{dot}t) 可用于提取红色、绿色、蓝色或透明度值来自颜色，该颜色又可用于生成变体。

[color.from_gradient()](https://www.tradingview.com/pine-script-reference/v5/#fun_color{dot}from_gradient) 对于在两个基色之间创建线性渐变非常有用。它通过根据最小值和最大值评估源值来确定要使用哪种中间颜色。

### [颜色.new() ](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Colors.html#id7)

让我们使用[color.new(color, transp)](https://www.tradingview.com/pine-script-reference/v5/#fun_color{dot}new) 使用两种牛市/熊市基色之一为成交量列创建不同的透明度：

![../_images/Colors-CalculatedColors-1.png](https://www.tradingview.com/pine-script-docs/en/v5/_images/Colors-CalculatingColors-1.png)

```javascript
//@version=5
indicator("Volume")
// We name our color constants to make them more readable.
var color GOLD_COLOR   = #CCCC00ff
var color VIOLET_COLOR = #AA00FFff
color bullColorInput = input.color(GOLD_COLOR,   "Bull")
color bearColorInput = input.color(VIOLET_COLOR, "Bear")
int levelsInput = input.int(10, "Gradient levels", minval = 1)
// We initialize only once on bar zero with `var`, otherwise the count would reset to zero on each bar.
var float riseFallCnt = 0
// Count the rises/falls, clamping the range to: 1 to `i_levels`.
riseFallCnt := math.max(1, math.min(levelsInput, riseFallCnt + math.sign(volume - nz(volume[1]))))
// Rescale the count on a scale of 80, reverse it and cap transparency to <80 so that colors remains visible.
float transparency = 80 - math.abs(80 * riseFallCnt / levelsInput)
// Build the correct transparency of either the bull or bear color.
color volumeColor = color.new(close > open ? bullColorInput : bearColorInput, transparency)
plot(volume, "Volume", volumeColor, 1, plot.style_columns)
```

注意：

- 在脚本的倒数第二行中，我们通过改变所使用的基色（具体取决于条形向上还是向下）**和**透明度级别（根据交易量的累积上升或下降计算得出）来动态计算列颜色。
- 我们为脚本用户提供不仅可以控制所使用的基本牛市/熊市颜色，还可以控制所使用的亮度级别的数量。我们使用该值来确定我们将跟踪的最大上涨或下跌次数。让用户能够管理该值，使他们能够根据他们使用的时间范围或市场调整指标的视觉效果。
- 我们小心控制所使用的最大透明度级别，使其永远不会高于 80。这确保我们的颜色始终保持一定的可见性。
- 我们还将输入中级别数的最小值设置为 1。当用户选择 1 时，成交量列将采用最大亮度的牛市或熊市颜色，或透明度为零。

### [color.rgb() ](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Colors.html#id8)

在下一个示例中，我们使用[color.rgb(red, green, blue, transp)](https://www.tradingview.com/pine-script-reference/v5/#fun_color{dot}rgb) 从 RGBA 值构建颜色。我们将结果用作送给朋友的节日礼物，这样他们就可以将他们的 TradingView 图表带到聚会上：

![../_images/Colors-CalculateColors-2.png](https://www.tradingview.com/pine-script-docs/en/v5/_images/Colors-CalculatingColors-2.png)

```javascript
//@version=5
indicator("Holiday candles", "", true)
float r = math.random(0, 255)
float g = math.random(0, 255)
float b = math.random(0, 255)
float t = math.random(0, 100)
color holidayColor = color.rgb(r, g, b, t)
plotcandle(open, high, low, close, color = c_holiday, wickcolor = holidayColor, bordercolor = c_holiday)
```

注意：

- 我们为红色、绿色和蓝色通道生成 0 到 255 范围内的值，为透明度生成 0 到 100 范围内的值。另请注意，由于[math.random()](https://www.tradingview.com/pine-script-reference/v5/#fun_math{dot}random)返回浮点值，因此浮点 0.0-100.0 范围提供对底层 Alpha 通道的完整 0-255 透明度值的访问。
- 我们使用[math.random(min, max, seeds)](https://www.tradingview.com/pine-script-reference/v5/#fun_math{dot}random) 函数来生成伪随机值。我们不使用函数的第三个参数的实参：`seed`。当您想要确保函数结果的可重复性时，使用它会很方便。使用相同的种子调用，它将产生相同的值序列。



### [color.from_gradient() ](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Colors.html#id9)

我们最后的颜色计算示例将使用 [color.from_gradient(value, Bottom_value, top_value, Bottom_color, top_color)](https://www.tradingview.com/pine-script-reference/v5/#fun_color{dot}from_gradient)。让我们首先以最简单的形式使用它，为指标版本中的 CCI 信号着色，否则该指标看起来就像内置的：

![../_images/Colors-CalculatedColors-3.png](https://www.tradingview.com/pine-script-docs/en/v5/_images/Colors-CalculatingColors-3.png)

```javascript
//@version=5
indicator(title="CCI line gradient", precision=2, timeframe="")
var color GOLD_COLOR   = #CCCC00
var color VIOLET_COLOR = #AA00FF
var color BEIGE_COLOR  = #9C6E1B
float srcInput = input.source(close, title="Source")
int   lenInput = input.int(20, "Length", minval = 5)
color bullColorInput = input.color(GOLD_COLOR,   "Bull")
color bearColorInput = input.color(BEIGE_COLOR, "Bear")
float signal = ta.cci(srcInput, lenInput)
color signalColor = color.from_gradient(signal, -200, 200, bearColorInput, bullColorInput)
plot(signal, "CCI", signalColor)
bandTopPlotID = hline(100,  "Upper Band", color.silver, hline.style_dashed)
bandBotPlotID = hline(-100, "Lower Band", color.silver, hline.style_dashed)
fill(bandTopPlotID, bandBotPlotID, color.new(BEIGE_COLOR, 90), "Background")
```

注意：

- 要计算渐变，[color.from_gradient()](https://www.tradingview.com/pine-script-reference/v5/#fun_color{dot}from_gradient)`value`需要与用于参数的参数进行比较的 最小值和最大值。事实上，我们想要像 CCI 这样的无界信号的梯度（即没有固定边界，例如 RSI，它总是在 0-100 之间振荡），但这并不意味着我们不能使用[color.from_gradient()](https://www.tradingview.com/pine-script-reference/v5/#fun_color{dot}from_gradient)。在这里，我们通过提供 -200 和 200 值作为参数来解决我们的难题。它们并不代表 CCI 的真实最小值和最大值，但它们处于我们不介意颜色不再变化的水平，因为每当系列超出`bottom_value`和`top_value`限制时，所使用的颜色`bottom_color`和`top_color`将适用。
- [color.from_gradient()](https://www.tradingview.com/pine-script-reference/v5/#fun_color{dot}from_gradient)计算的颜色渐变是线性的。如果该系列的值介于`bottom_value`和`top_value`参数之间，则生成的颜色的 RGBA 分量也将介于`bottom_color`和之间`top_color`。
- 许多常见的指标计算可在 Pine Script™ 中作为内置函数使用。这里我们使用[ta.cci()](https://www.tradingview.com/pine-script-reference/v5/#fun_ta{dot}cci)而不是长期计算它。

[color.from_gradient()](https://www.tradingview.com/pine-script-reference/v5/#fun_color{dot}from_gradient)`value`中使用的参数 不一定是我们正在计算的线的值。只要可以提供和的参数，就可以使用我们想要的任何东西。在这里，由于信号一直高于/低于中心线，我们通过使用条形数量对带进行着色来增强 CCI 指标：`bottom_value``top_value`

![../_images/Colors-CalculatedColors-4.png](https://www.tradingview.com/pine-script-docs/en/v5/_images/Colors-CalculatingColors-4.png)

```javascript
//@version=5
indicator(title="CCI line gradient", precision=2, timeframe="")
var color GOLD_COLOR   = #CCCC00
var color VIOLET_COLOR = #AA00FF
var color GREEN_BG_COLOR = color.new(color.green, 70)
var color RED_BG_COLOR   = color.new(color.maroon, 70)
float srcInput      = input.source(close, "Source")
int   lenInput      = input.int(20, "Length", minval = 5)
int   stepsInput    = input.int(50, "Gradient levels", minval = 1)
color bullColorInput   = input.color(GOLD_COLOR, "Line: Bull", inline = "11")
color bearColorInput   = input.color(VIOLET_COLOR, "Bear", inline = "11")
color bullBgColorInput = input.color(GREEN_BG_COLOR, "Background: Bull", inline = "12")
color bearBgColorInput = input.color(RED_BG_COLOR, "Bear", inline = "12")

// Plot colored signal line.
float signal = ta.cci(srcInput, lenInput)
color signalColor = color.from_gradient(signal, -200, 200, color.new(bearColorInput, 0), color.new(bullColorInput, 0))
plot(signal, "CCI", signalColor, 2)

// Detect crosses of the centerline.
bool signalX = ta.cross(signal, 0)
// Count no of bars since cross. Capping it to the no of steps from inputs.
int gradientStep = math.min(stepsInput, nz(ta.barssince(signalX)))
// Choose bull/bear end color for the gradient.
color endColor = signal > 0 ? bullBgColorInput : bearBgColorInput
// Get color from gradient going from no color to `c_endColor`
color bandColor = color.from_gradient(gradientStep, 0, stepsInput, na, endColor)
bandTopPlotID = hline(100,  "Upper Band", color.silver, hline.style_dashed)
bandBotPlotID = hline(-100, "Lower Band", color.silver, hline.style_dashed)
fill(bandTopPlotID, bandBotPlotID, bandColor, title = "Band")
```

注意：

- 信号图使用与我们之前的示例相同的基色和渐变。然而，我们将线条的宽度从默认的 1 增加到 2。它是我们视觉效果中最重要的组成部分；增加其宽度是使其更加突出的一种方式，并确保用户不会被带子分散注意力，因为带子比原来的扁平米色颜色变得更加繁忙。
- 由于两个原因，填充物必须保持不显眼。首先，它对于视觉效果来说是次要的，因为它提供了补充信息，即信号处于牛市/熊市区域的持续时间。其次，由于填充的 z 索引大于绘图，因此填充将覆盖信号图。由于这些原因，我们将填充的基色设置为相当透明，为 70，这样它们就不会遮盖绘图。用于带的渐变从根本没有颜色开始（请参阅在 [color.from_gradient()](https://www.tradingview.com/pine-script-reference/v5/#fun_color{dot}from_gradient)调用中用作参数的[na](https://www.tradingview.com/pine-script-reference/v5/#var_na)），然后从输入转到基础牛市/熊市颜色，其中条件颜色变量包含。`bottom_color``c_endColor`
- 我们为用户提供不同的牛市/熊市颜色选择。
- 当我们计算`gradientStep`变量时，我们在 [ta.barssince()上使用](https://www.tradingview.com/pine-script-reference/v5/#fun_ta{dot}barssince)[nz()](https://www.tradingview.com/pine-script-reference/v5/#fun_nz)，因为在数据集的早期柱中，当测试的条件尚未发生时，[ta.barssince()](https://www.tradingview.com/pine-script-reference/v5/#fun_ta{dot}barssince) 将返回[na](https://www.tradingview.com/pine-script-reference/v5/#var_na)。因为我们使用[nz()](https://www.tradingview.com/pine-script-reference/v5/#fun_nz)，所以在这些情况下返回的值将替换为零。

## [混合透明胶片](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Colors.html#id10)

在此示例中，我们将 CCI 指标转向另一个方向。我们将使用根据 CCI 计算的唐奇安通道（历史高点/低点）构建动态调整极值区域缓冲区。我们通过将顶部/底部带设为 DC 高度的 1/4 来构建它们。我们将使用动态调整回顾来计算 DC。为了调整回顾，我们将通过保持短期 ATR 与长期 ATR 的比率来计算波动率的简单衡量标准。当该比率高于最后 100 个值中的 50 时，我们认为波动性很高。当波动性高/低时，我们减少/增加回溯。

我们的目标是为指标的用户提供：

- 正如我们在最近的示例中所示，CCI 线使用牛市/熊市梯度着色。
- 唐奇安通道的顶部和底部带的填充方式使得它们的颜色随着历史高点/低点变得越来越旧而变暗。
- 一种了解波动率测量状态的方法，我们将通过用一种颜色绘制背景来实现，当波动率增加时，该颜色的强度会增加。

这是我们的指标使用浅色主题时的样子：

![../_images/Colors-MishingTransparency-1.png](https://www.tradingview.com/pine-script-docs/en/v5/_images/Colors-MixingTransparencies-1.png)

以及黑暗主题：

![../_images/Colors-MishingTransparency-2.png](https://www.tradingview.com/pine-script-docs/en/v5/_images/Colors-MixingTransparencies-2.png)

```javascript
//@version=5
indicator("CCI DC", precision = 6)
color GOLD_COLOR   = #CCCC00ff
color VIOLET_COLOR = #AA00FFff
int lengthInput = input.int(20, "Length", minval = 5)
color bullColorInput = input.color(GOLD_COLOR,   "Bull")
color bearColorInput = input.color(VIOLET_COLOR, "Bear")

// ————— Function clamps `val` between `min` and `max`.
clamp(val, min, max) =>
    math.max(min, math.min(max, val))

// ————— Volatility expressed as 0-100 value.
float v = ta.atr(lengthInput / 5) / ta.atr(lengthInput * 5)
float vPct = ta.percentrank(v, lengthInput * 5)

// ————— Calculate dynamic lookback for DC. It increases/decreases on low/high volatility.
bool highVolatility = vPct > 50
var int lookBackMin = lengthInput * 2
var int lookBackMax = lengthInput * 10
var float lookBack = math.avg(lookBackMin, lookBackMax)
lookBack += highVolatility ? -2 : 2
lookBack := clamp(lookBack, lookBackMin, lookBackMax)

// ————— Dynamic lookback length Donchian channel of signal.
float signal = ta.cci(close, lengthInput)
// `lookBack` is a float; need to cast it to int to be used a length.
float hiTop  = ta.highest(signal, int(lookBack))
float loBot  = ta.lowest( signal, int(lookBack))
// Get margin of 25% of the DC height to build high and low bands.
float margin = (hiTop - loBot) / 4
float hiBot  = hiTop - margin
float loTop  = loBot + margin
// Center of DC.
float center = math.avg(hiTop, loBot)

// ————— Create colors.
color signalColor = color.from_gradient(signal, -200, 200, bearColorInput, bullColorInput)
// Bands: Calculate transparencies so the longer since the hi/lo has changed,
//        the darker the color becomes. Cap highest transparency to 90.
float hiTransp = clamp(100 - (100 * math.max(1, nz(ta.barssince(ta.change(hiTop)) + 1)) / 255), 60, 90)
float loTransp = clamp(100 - (100 * math.max(1, nz(ta.barssince(ta.change(loBot)) + 1)) / 255), 60, 90)
color hiColor = color.new(bullColorInput, hiTransp)
color loColor = color.new(bearColorInput, loTransp)
// Background: Rescale the 0-100 range of `vPct` to 0-25 to create 75-100 transparencies.
color bgColor = color.new(color.gray, 100 - (vPct / 4))

// ————— Plots
// Invisible lines for band fills.
hiTopPlotID = plot(hiTop, color = na)
hiBotPlotID = plot(hiBot, color = na)
loTopPlotID = plot(loTop, color = na)
loBotPlotID = plot(loBot, color = na)
// Plot signal and centerline.
p_signal = plot(signal, "CCI", signalColor, 2)
plot(center, "Centerline", color.silver, 1)

// Fill the bands.
fill(hiTopPlotID, hiBotPlotID, hiColor)
fill(loTopPlotID, loBotPlotID, loColor)

// ————— Background.
bgcolor(bgColor)
```

注意：

- 我们将背景的透明度限制在 100-75 的范围内，这样它就不会压倒一切。我们还使用不会过多分散注意力的中性颜色。背景越暗，我们衡量的波动性就越高。
- 我们还将带填充的透明度值限制在 60 和 90 之间。我们使用 90，以便当找到新的高/低并且渐变重置时，起始透明度使颜色有些可见。我们不使用低于 60 的透明度，因为我们不希望这些波段隐藏信号线。
- 我们使用非常方便的[ta.percentrank()](https://www.tradingview.com/pine-script-reference/v5/#fun_ta{dot}percentrank)函数根据衡量波动性的 ATR 比率生成 0-100 的值。将比例未知的值转换为可用于生成透明度的已知值非常有用。
- 因为我们必须在脚本中对值进行三次钳位，所以我们编写了一个`f_clamp()`函数，而不是对逻辑进行三次显式编码。

## [尖端](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Colors.html#id11)

### [设计可用的配色方案](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Colors.html#id12)

如果您编写供其他交易者使用的脚本，请尽量避免在某些环境中无法正常工作的颜色，无论是用于绘图、标签、表格还是填充。至少，测试您的视觉效果，以确保它们在浅色和深色 TradingView 主题下都能令人满意地运行；它们是最常用的。例如，应避免使用黑色和白色等颜色。

构建适当的输入，为脚本用户提供灵活性，使脚本的视觉效果适应其特定环境。

请注意构建您使用的颜色的视觉层次结构，以匹配脚本视觉组件的相对重要性。优秀的设计师了解如何实现颜色和重量的最佳平衡，因此眼睛自然会被设计中最重要的元素所吸引。当你让一切都脱颖而出时，什么都不会。通过淡化周围的视觉效果，为某些元素腾出空间来脱颖而出。

在输入中提供一系列颜色预设（而不是可以更改的单一颜色）可以帮助有颜色问题的用户。我们的[技术评级](https://www.tradingview.com/script/Jdw7wW2g-Technical-Ratings/)展示了实现这一目标的一种方法。

### [绘制清晰的线条](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Colors.html#id13)

最好使用零透明度来绘制视觉效果中的重要线条，以保持它们清晰。这样，它们将通过填充更精确地显示。请记住，填充的 z-index 高于绘图，因此它们放置在绘图之上。稍微增加线条宽度也可以使其脱颖而出。

如果您希望某个特殊图脱颖而出，您还可以通过在同一条线上使用多个图来赋予其更多重要性。这些是我们调整绘图的连续宽度和透明度以实现此目的的示例：

![../_images/Colors-PlotCrispLines-1.png](https://www.tradingview.com/pine-script-docs/en/v5/_images/Colors-PlotCrispLines-1.png)

```javascript
//@version=5
indicator("")
plot(high, "", color.new(color.orange, 80), 8)
plot(high, "", color.new(color.orange, 60), 4)
plot(high, "", color.new(color.orange, 00), 1)

plot(hl2, "", color.new(color.orange, 60), 4)
plot(hl2, "", color.new(color.orange, 00), 1)

plot(low, "", color.new(color.orange, 0), 1)
```

### [自定义渐变](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Colors.html#id14)

构建渐变时，请使其适应所应用的视觉效果。例如，如果您使用渐变为蜡烛着色，通常最好将渐变的步数限制为十或更少，因为眼睛更难以感知离散对象的强度变化。正如我们在示例中所做的那样，限制最小和最大透明度级别，以便您的视觉元素保持可见，并且在不必要时不会淹没。



### [通过脚本设置选择颜色](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Colors.html#id15)

您在脚本中使用的颜色类型会影响脚本用户如何更改脚本视觉效果的颜色。只要您不使用必须在运行时计算 RGBA 分量的颜色，脚本用户就可以通过转到脚本的“设置/样式”选项卡来修改您使用的颜色。本页上的第一个示例脚本满足该标准，以下屏幕截图显示了我们如何使用脚本的“设置/样式”选项卡来更改第一个移动平均线的颜色：

![../_images/颜色-ColorsSelection-1.png](https://www.tradingview.com/pine-script-docs/en/v5/_images/Colors-ColorsSelection-1.png)

如果您的脚本使用计算的颜色，即一种颜色，其中至少一个 RGBA 分量只能在运行时知道，那么“设置/样式”选项卡将不会为用户提供可用于修改绘图的常用颜色小部件颜色。不使用计算颜色的同一脚本的绘图也会受到影响。例如，在此脚本中，我们的第一个[plot()](https://www.tradingview.com/pine-script-reference/v5/#fun_plot)调用使用计算出的颜色，而第二个则不使用：

```javascript
//@version=5
indicator("Calculated colors", "", true)
float ma = ta.sma(close, 20)
float maHeight = ta.percentrank(ma, 100)
float transparency = math.min(80, 100 - maHeight)
// This plot uses a calculated color.
plot(ma, "MA1", color.rgb(156, 39, 176, transparency), 2)
// This plot does not use a calculated color.
plot(close, "Close", color.blue)
```

第一个图中使用的颜色是计算出的颜色，因为它的透明度只能在运行时知道。它是使用移动平均线相对于其过去 100 个值的相对位置来计算的。过去值低于当前值的百分比越大，0-100 的值`maHeight`就越高。由于我们希望颜色在 100 时最暗`maHeight`，因此我们从中减去 100 以获得零透明度。我们还将计算`transparency`值限制为最大值 80，以便它始终保持可见。

由于我们的脚本中使用了计算出的颜色，因此“设置/样式”选项卡将不会显示任何颜色小部件：

![../_images/颜色-ColorsSelection-2.png](https://www.tradingview.com/pine-script-docs/en/v5/_images/Colors-ColorsSelection-2.png)

使脚本用户能够控制所使用的颜色的解决方案是为他们提供自定义输入，就像我们在这里所做的那样：

![../_images/颜色-ColorsSelection-3.png](https://www.tradingview.com/pine-script-docs/en/v5/_images/Colors-ColorsSelection-3.png)

```javascript
//@version=5
indicator("Calculated colors", "", true)
color maInput = input.color(color.purple, "MA")
color closeInput = input.color(color.blue, "Close")
float ma = ta.sma(close, 20)
float maHeight = ta.percentrank(ma, 100)
float transparency = math.min(80, 100 - maHeight)
// This plot uses a calculated color.
plot(ma, "MA1", color.new(maInput, transparency), 2)
// This plot does not use a calculated color.
plot(close, "Close", closeInput)
```

请注意我们的脚本的“设置”现在如何显示“输入”选项卡，我们在其中创建了两个颜色输入。第一个使用[color.purple](https://www.tradingview.com/pine-script-reference/v5/#var_color{dot}purple)作为默认值。无论脚本用户是否更改该颜色，它都将在[color.new()](https://www.tradingview.com/pine-script-reference/v5/#fun_color{dot}new)调用中使用，以在[plot()](https://www.tradingview.com/pine-script-reference/v5/#fun_plot)调用中生成计算出的透明度。第二个输入使用我们之前在[plot()](https://www.tradingview.com/pine-script-reference/v5/#fun_plot)调用中使用的内置[color.blue](https://www.tradingview.com/pine-script-reference/v5/#var_color{dot}blue)作为默认颜色，并且只需在第二个[plot()](https://www.tradingview.com/pine-script-reference/v5/#fun_plot)调用中使用它即可。