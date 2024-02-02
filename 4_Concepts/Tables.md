# 表格

## [介绍](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Tables.html#id1)

表格是可用于将信息定位在脚本可视空间中特定且固定位置的对象。与 Pine Script™ 中绘制的所有其他绘图或对象相反，表格并不锚定到特定的条形；它们*漂浮*在脚本的空间中，无论是在覆盖模式还是窗格模式下，在研究还是策略中，与正在查看的图表栏或使用的缩放系数无关。

表格包含按列和行排列的单元格，非常类似于电子表格。它们是通过两个不同的步骤创建和填充的：

1. 表的结构和关键属性是使用[table.new()](https://www.tradingview.com/pine-script-reference/v5/#fun_table{dot}new)定义的，它返回一个表 ID，其作用类似于指向表的指针，就像标签、行或数组 ID 一样。 table.new [()](https://www.tradingview.com/pine-script-reference/v5/#fun_table{dot}new)调用将创建表对象但不显示它。
2. 创建后，为了使其显示，必须对每个单元格使用一次[table.cell()](https://www.tradingview.com/pine-script-reference/v5/#fun_table{dot}cell)调用来填充表格。表格单元格可以包含文本，也可以不包含文本。第二步是定义单元格的宽度和高度。

先前创建的表的大多数属性都可以使用`table.set_*()`setter 函数进行更改。可以使用`table.cell_set_*()`函数修改先前填充的单元格的属性。

通过将表格锚定到九个参考之一来将表格定位在指示器的空间中：四个角或中点，包括中心。通过从锚点展开表格来定位表格，因此锚定到 [position.middle_right](https://www.tradingview.com/pine-script-reference/v5/#var_position{dot}middle_right)引用的表格 将通过从该锚点向上、向下和向左展开来绘制。

有两种模式可用于确定表格单元格的宽度/高度：

- 默认自动模式使用其中最宽/最高的文本来计算列/行中单元格的宽度/高度。
- 显式模式允许程序员使用指示器可用 x/y 空间的百分比来定义单元格的宽度/高度。

显示的表内容始终代表表的最后状态，因为它是在数据集的最后一个柱上的脚本上次执行时绘制的。与数据窗口或指标值中显示的值相反，当脚本用户将光标移到特定图表栏上时，表中显示的变量内容不会改变。因此，强烈建议始终将所有`table.*()`调用的执行限制为数据集的第一个或最后一个柱。因此：

- 使用[var](https://www.tradingview.com/pine-script-reference/v5/#op_var)关键字来声明表。
- 将所有其他调用包含在[if ](https://www.tradingview.com/pine-script-reference/v5/#op_if)[barstate.islast](https://www.tradingview.com/pine-script-reference/v5/#var_barstate{dot}islast)块内。

**一个脚本中可以使用多个表，只要它们各自锚定到不同的位置即可。每个表对象都由其自己的 ID 标识。所有表中单元格数量的限制由一个脚本中使用的单元格总数决定。**

## [创建表](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Tables.html#id2)

[使用table.new()](https://www.tradingview.com/pine-script-reference/v5/#fun_table{dot}new)创建表时，三个参数是必需的：表的位置及其列数和行数。其他五个参数是可选的：表格的背景颜色、表格外框的颜色和宽度以及所有单元格周围边框的颜色和宽度（不包括外框）。除了列数和行数之外的所有表格属性都可以使用 setter 函数进行修改： [table.set_position()](https://www.tradingview.com/pine-script-reference/v5/#fun_table{dot}set_position)、 [table.set_bgcolor()](https://www.tradingview.com/pine-script-reference/v5/#fun_table{dot}set_bgcolor)、 [table.set_frame_color()](https://www.tradingview.com/pine-script-reference/v5/#fun_table{dot}set_frame_color)、 [table.set_frame_width()](https://www.tradingview.com/pine-script-reference/v5/#fun_table{dot}set_frame_width)、 [table.set_border_color()](https://www.tradingview.com/pine-script-reference/v5/#fun_table{dot}set_border_color)和 [table.set_border_width ()](https://www.tradingview.com/pine-script-reference/v5/#fun_table{dot}set_border_width)。

可以使用[table.delete()](https://www.tradingview.com/pine-script-reference/v5/#fun_table{dot}delete)删除表，并且可以使用[table.clear()](https://www.tradingview.com/pine-script-reference/v5/#fun_table{dot}clear)有选择地删除表的内容。

使用[table.cell()](https://www.tradingview.com/pine-script-reference/v5/#fun_table{dot}cell)填充单元格时，必须为四个强制参数提供参数：单元格所属的表 ID、使用从零开始的索引的列索引和行索引，以及单元格包含的文本字符串，这可以为空。其他七个参数是可选的：单元格的宽度和高度、文本的属性（颜色、水平和垂直对齐方式、大小）以及单元格的背景颜色。所有单元格属性都可以使用 setter 函数修改： [table.cell_set_text()](https://www.tradingview.com/pine-script-reference/v5/#fun_table{dot}cell_set_text)、 [table.cell_set_width()](https://www.tradingview.com/pine-script-reference/v5/#fun_table{dot}cell_set_width)、 [table.cell_set_height()](https://www.tradingview.com/pine-script-reference/v5/#fun_table{dot}cell_set_height)、 [table.cell_set_text_color()](https://www.tradingview.com/pine-script-reference/v5/#fun_table{dot}cell_set_text_color)、 [table.cell_set_text_halign()](https://www.tradingview.com/pine-script-reference/v5/#fun_table{dot}cell_set_text_halign)、 [table.cell_set_text_valign()](https://www.tradingview.com/pine-script-reference/v5/#fun_table{dot}cell_set_text_valign)、 [table.cell_set_text_size( ）](https://www.tradingview.com/pine-script-reference/v5/#fun_table{dot}cell_set_text_size)和 [table.cell_set_bgcolor()](https://www.tradingview.com/pine-script-reference/v5/#fun_table{dot}cell_set_bgcolor)。

请记住，每次连续调用[table.cell()](https://www.tradingview.com/pine-script-reference/v5/#fun_table{dot}cell) 都会重新定义**所有**单元格的属性，删除先前对 同一单元格调用[table.cell()设置的任何属性。](https://www.tradingview.com/pine-script-reference/v5/#fun_table{dot}cell)

### [将单个值放置在固定位置](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Tables.html#id3)

让我们创建第一个表，它将 ATR 的值放在图表的右上角。我们首先创建一个单单元格表格，然后填充该单元格：

```
Pine Script™
Copied//@version=5
indicator("ATR", "", true)
// We use `var` to only initialize the table on the first bar.
var table atrDisplay = table.new(position.top_right, 1, 1)
// We call `ta.atr()` outside the `if` block so it executes on each bar.
myAtr = ta.atr(14)
if barstate.islast
    // We only populate the table on the last bar.
    table.cell(atrDisplay, 0, 0, str.tostring(myAtr))
```

![../_images/表格-ATR-1.png](https://www.tradingview.com/pine-script-docs/en/v5/_images/Tables-ATR-1.png)

注意：

- [我们在使用table.new()](https://www.tradingview.com/pine-script-reference/v5/#fun_table{dot}new)创建表时 使用[var](https://www.tradingview.com/pine-script-reference/v5/#op_var)关键字。
- 我们使用[table.cell()填充](https://www.tradingview.com/pine-script-reference/v5/#fun_table{dot}cell)[if ](https://www.tradingview.com/pine-script-reference/v5/#op_if)[barstate.islast](https://www.tradingview.com/pine-script-reference/v5/#var_barstate{dot}islast)块内的单元格。
- 填充单元格时，我们不指定`width`或`height`。因此，单元格的宽度和高度将自动调整以适应其包含的文本。
- `ta.atr(14)`我们在进入[if](https://www.tradingview.com/pine-script-reference/v5/#op_if)块之前调用，以便它在每个柱上进行评估。如果我们在[if](https://www.tradingview.com/pine-script-reference/v5/#op_if)`str.tostring(ta.atr(14))`块内使用，该函数将无法正确计算，因为它将在数据集的最后一个柱上调用，而没有根据前一个柱计算出必要的值。

让我们提高脚本的可用性和美观性：

```
Pine Script™
Copied//@version=5
indicator("ATR", "", true)
atrPeriodInput = input.int(14,  "ATR period", minval = 1, tooltip = "Using a period of 1 yields True Range.")

var table atrDisplay = table.new(position.top_right, 1, 1, bgcolor = color.gray, frame_width = 2, frame_color = color.black)
myAtr = ta.atr(atrPeriodInput)
if barstate.islast
    table.cell(atrDisplay, 0, 0, str.tostring(myAtr, format.mintick), text_color = color.white)
```

![../_images/表格-ATR-2.png](https://www.tradingview.com/pine-script-docs/en/v5/_images/Tables-ATR-2.png)

注意：

- 我们使用[table.new()](https://www.tradingview.com/pine-script-reference/v5/#fun_table{dot}new)来定义背景颜色、框架颜色及其宽度。
- [当使用table.cell()](https://www.tradingview.com/pine-script-reference/v5/#fun_table{dot}cell)填充单元格时，我们将文本设置为以白色显示。
- 我们将[format.mintick](https://www.tradingview.com/pine-script-reference/v5/#var_format{dot}mintick) 作为第二个参数传递给[str.tostring()](https://www.tradingview.com/pine-script-reference/v5/#fun_str{dot}tostring) 函数，以将 ATR 的精度限制为图表的刻度精度。
- 我们现在使用输入来允许脚本用户指定 ATR 的周期。输入还包括一个工具提示，当用户将鼠标悬停在脚本的“设置/输入”选项卡中的“i”图标上时可以看到该工具提示。

### [为图表的背景着色](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Tables.html#id4)

此示例使用单单元格表格为 RSI 牛市/熊市状态的图表背景着色：

```
Pine Script™
Copied//@version=5
indicator("Chart background", "", true)
bullColorInput = input.color(color.new(color.green, 95), "Bull", inline = "1")
bearColorInput = input.color(color.new(color.red, 95), "Bear", inline = "1")
// ————— Function colors chart bg on RSI bull/bear state.
colorChartBg(bullColor, bearColor) =>
    var table bgTable = table.new(position.middle_center, 1, 1)
    float r = ta.rsi(close, 20)
    color bgColor = r > 50 ? bullColor : r < 50 ? bearColor : na
    if barstate.islast
        table.cell(bgTable, 0, 0, width = 100, height = 100, bgcolor = bgColor)

colorChartBg(bullColorInput, bearColorInput)
```

注意：

- 我们为用户提供输入，允许他们指定用于背景的牛市/熊市颜色，并将这些输入颜色作为参数发送给我们的`colorChartBg()`函数。
- 我们只创建一个新表一次，使用[var](https://www.tradingview.com/pine-script-reference/v5/#op_var)关键字来声明该表。
- 我们仅在最后一个栏上使用[table.cell()](https://www.tradingview.com/pine-script-reference/v5/#fun_table{dot}cell)来指定单元格的属性。我们将单元格设置为指标空间的宽度和高度，以便它覆盖整个图表。

### [创建显示面板](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Tables.html#id5)

桌子是制作精致展示面板的理想选择。它们不仅使显示面板始终在固定位置可见，而且还提供更灵活的格式设置，因为每个单元格的属性都是单独控制的：背景、文本颜色、大小和对齐方式等。

在这里，我们创建一个基本显示面板，显示用户选择的 MA 值数量。我们在第一列中显示它们的周期，然后用绿色/红色/灰色背景显示它们的值，该值随着价格相对于每个 MA 的位置而变化。当价格高于/低于 MA 时，单元格的背景颜色为牛市/熊市颜色。当 MA 落在当前柱的 [开盘价](https://www.tradingview.com/pine-script-reference/v5/#var_open)和 [收盘价](https://www.tradingview.com/pine-script-reference/v5/#var_close)之间时，单元格的背景为中性色：

![../_images/Tables-DisplayPanel-1.png](https://www.tradingview.com/pine-script-docs/en/v5/_images/Tables-DisplayPanel-1.png)

```
Pine Script™
Copied//@version=5
indicator("Price vs MA", "", true)

var string GP1 = "Moving averages"
int     masQtyInput    = input.int(20, "Quantity", minval = 1, maxval = 40, group = GP1, tooltip = "1-40")
int     masStartInput  = input.int(20, "Periods begin at", minval = 2, maxval = 200, group = GP1, tooltip = "2-200")
int     masStepInput   = input.int(20, "Periods increase by", minval = 1, maxval = 100, group = GP1, tooltip = "1-100")

var string GP2 = "Display"
string  tableYposInput = input.string("top", "Panel position", inline = "11", options = ["top", "middle", "bottom"], group = GP2)
string  tableXposInput = input.string("right", "", inline = "11", options = ["left", "center", "right"], group = GP2)
color   bullColorInput = input.color(color.new(color.green, 30), "Bull", inline = "12", group = GP2)
color   bearColorInput = input.color(color.new(color.red, 30), "Bear", inline = "12", group = GP2)
color   neutColorInput = input.color(color.new(color.gray, 30), "Neutral", inline = "12", group = GP2)

var table panel = table.new(tableYposInput + "_" + tableXposInput, 2, masQtyInput + 1)
if barstate.islast
    // Table header.
    table.cell(panel, 0, 0, "MA", bgcolor = neutColorInput)
    table.cell(panel, 1, 0, "Value", bgcolor = neutColorInput)

int period = masStartInput
for i = 1 to masQtyInput
    // ————— Call MAs on each bar.
    float ma = ta.sma(close, period)
    // ————— Only execute table code on last bar.
    if barstate.islast
        // Period in left column.
        table.cell(panel, 0, i, str.tostring(period), bgcolor = neutColorInput)
        // If MA is between the open and close, use neutral color. If close is lower/higher than MA, use bull/bear color.
        bgColor = close > ma ? open < ma ? neutColorInput : bullColorInput : open > ma ? neutColorInput : bearColorInput
        // MA value in right column.
        table.cell(panel, 1, i, str.tostring(ma, format.mintick), text_color = color.black, bgcolor = bgColor)
    period += masStepInput
```

注意：

- 用户可以从输入中选择表格的位置，以及用于右列单元格背景的牛市/熊市/中性颜色。
- 表的行数由用户选择显示的 MA 数确定。我们为列标题添加一行。
- 即使我们仅填充最后一个柱上的表格单元格，我们也需要在每个柱上执行对 [ta.sma()](https://www.tradingview.com/pine-script-reference/v5/#fun_ta{dot}sma)的调用，以便它们产生正确的结果。可以安全地忽略编译代码时出现的编译器警告。
- 我们使用 将输入分成两个部分`group`，并使用 将相关输入连接到同一行`inline`。我们提供工具提示来记录某些字段的限制`tooltip`。

### [显示热图](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Tables.html#id6)

我们的下一个项目是热图，它将表明当前价格相对于过去价值的牛市/熊市关系。为此，我们将使用位于图表底部的表格。我们将仅显示颜色，因此我们的表格将不包含文本；我们只需为其单元格的背景着色即可生成热图。热图使用用户可选择的回顾期。它循环遍历该时期，以确定价格是否高于/低于过去的每个柱，并随着我们进一步了解过去，显示逐渐变浅的牛市/熊市颜色强度：

![../_images/Tables-Heatmap-1.png](https://www.tradingview.com/pine-script-docs/en/v5/_images/Tables-Heatmap-1.png)

```
Pine Script™
Copied//@version=5
indicator("Price vs Past", "", true)

var int MAX_LOOKBACK = 300

int     lookBackInput  = input.int(150, minval = 1, maxval = MAX_LOOKBACK, step = 10)
color   bullColorInput = input.color(#00FF00ff, "Bull", inline = "11")
color   bearColorInput = input.color(#FF0080ff, "Bear", inline = "11")

// ————— Function draws a heatmap showing the position of the current `_src` relative to its past `_lookBack` values.
drawHeatmap(src, lookBack) =>
    // float src     : evaluated price series.
    // int   lookBack: number of past bars evaluated.
    // Dependency: MAX_LOOKBACK

    // Force historical buffer to a sufficient size.
    max_bars_back(src, MAX_LOOKBACK)
    // Only run table code on last bar.
    if barstate.islast
        var heatmap = table.new(position.bottom_center, lookBack, 1)
        for i = 1 to lookBackInput
            float transp = 100. * i / lookBack
            if src > src[i]
                table.cell(heatmap, lookBack - i, 0, bgcolor = color.new(bullColorInput, transp))
            else
                table.cell(heatmap, lookBack - i, 0, bgcolor = color.new(bearColorInput, transp))

drawHeatmap(high, lookBackInput)
```

注意：

- 我们将最大回溯期定义为`MAX_LOOKBACK`常数。这是一个重要的值，我们将其用于两个目的：指定我们将在单行表中创建的列数，以及指定`_src`函数中参数所需的回溯期，以便我们强制使用 Pine Script™创建历史缓冲区大小，使我们能够在[for](https://www.tradingview.com/pine-script-reference/v5/#op_for)`_src`循环中 引用过去值的所需数量。
- 我们为用户提供了在输入中配置牛市/熊市颜色的可能性，并且我们用来`inline`将颜色选择放在同一行上。
- 在我们的函数中，我们将表创建代码包含在 [if ](https://www.tradingview.com/pine-script-reference/v5/#op_if)[barstate.islast](https://www.tradingview.com/pine-script-reference/v5/#var_barstate{dot}islast) 构造中，以便它仅在图表的最后一个柱上运行。
- 表的初始化是在[if](https://www.tradingview.com/pine-script-reference/v5/#op_if)语句内完成的。因此，以及它使用[var](https://www.tradingview.com/pine-script-reference/v5/#op_var)关键字的事实，初始化仅在脚本第一次在最后一个柱上执行时发生。请注意，此行为与脚本全局范围内的常见[var](https://www.tradingview.com/pine-script-reference/v5/#op_var)声明不同，其中初始化发生在数据集的第一个柱上，即[bar_index](https://www.tradingview.com/pine-script-reference/v5/#var_bar_index)零处。
- 我们没有为[table.cell()](https://www.tradingview.com/pine-script-reference/v5/#fun_table{dot}cell)`text`调用中的参数指定参数，因此使用空字符串。
- 我们计算透明度的方式是，随着历史的深入，颜色的强度会降低。
- 我们使用动态颜色生成根据需要创建不同透明度的基色。
- 与 Pine 脚本中显示的其他对象相反，此热图的单元格不链接到图表栏。配置的回溯期决定热图包含多少个表格单元格，并且当图表水平平移或缩放时，热图不会改变。
- 脚本视觉空间中可以显示的最大单元格数量取决于您的查看设备的分辨率以及图表使用的显示部分。更高分辨率的屏幕和更宽的窗口将允许显示更多的表格单元格。

## [提示](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Tables.html#id7)

- 在策略脚本中创建表时，请记住，除非策略使用，否则[if ](https://www.tradingview.com/pine-script-reference/v5/#op_if)[barstate.islast](https://www.tradingview.com/pine-script-reference/v5/#var_barstate{dot}islast)块中包含的表代码不会在每次实时更新时执行，因此表不会按您的预期显示。`calc_on_every_tick = true`
- 请记住，对[table.cell()的连续调用会覆盖先前](https://www.tradingview.com/pine-script-reference/v5/#fun_table{dot}cell)[table.cell()](https://www.tradingview.com/pine-script-reference/v5/#fun_table{dot}cell)调用指定的单元格属性。使用 setter 函数修改单元格的属性。
- 请记住通过将其限制为仅必要的栏来明智地控制表代码的执行。这可以节省服务器资源，并且您的图表将显示得更快，因此每个人都是赢家。