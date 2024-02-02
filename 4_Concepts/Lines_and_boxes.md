# 线条和方框

# [介绍](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Lines_and_boxes.html#id1)

Pine Script™ 有助于使用 line 、 box 和 [polyline](https://www.tradingview.com/pine-script-reference/v5/#type_line)[类型](https://www.tradingview.com/pine-script-reference/v5/#type_box)从 [代码](https://www.tradingview.com/pine-script-reference/v5/#type_polyline)中绘制线、 框和其他几何形状。这些类型提供了以编程方式在图表上绘制支撑位和阻力位、趋势线、价格范围和其他自定义形态的实用程序。

[与绘图](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Plots.html#pageplots)不同，这些类型的灵活性使它们特别适合在图表上几乎任何可用点可视化当前计算的数据，而不管脚本在哪个图表条上执行。

[线](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Lines_and_boxes.html#pagelinesandboxes-lines)、[框](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Lines_and_boxes.html#pagelinesandboxes-boxes)和 [折线](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Lines_and_boxes.html#pagelinesandboxes-polylines)都是*对象*，就像[标签](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Text_and_shapes.html#pagetextandshapes-labels)、 [表格](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Tables.html#pagetables)和其他*特殊类型*一样。脚本使用 ID 引用这些类型的对象，其作用类似于*指针*。与其他对象一样， [line](https://www.tradingview.com/pine-script-reference/v5/#type_line)、 [box](https://www.tradingview.com/pine-script-reference/v5/#type_box)和[polyline](https://www.tradingview.com/pine-script-reference/v5/#type_polyline) ID 被限定为“系列”值，并且管理这些对象的所有函数都接受“系列”参数。

笔记：

*使用我们在本页讨论的 类型通常涉及[数组](https://www.tradingview.com/pine-script-docs/en/v5/language/Arrays.html#pagearrays)，特别是在使用[折线](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Lines_and_boxes.html#pagelinesandboxes-polylines)时，它需要一个 [图表点实例](https://www.tradingview.com/pine-script-reference/v5/#type_chart.point)[数组](https://www.tradingview.com/pine-script-reference/v5/#type_array)。因此，我们建议您熟悉[数组](https://www.tradingview.com/pine-script-docs/en/v5/language/Arrays.html#pagearrays)，以便在脚本中充分利用这些绘图类型。*



脚本绘制的线条可以是垂直的、水平的或有角度的。盒子总是长方形的。折线顺序连接多个垂直、水平、有角度或曲线的线段。尽管所有这些绘图类型都有不同的特征，但它们确实有一些共同点：

- [Lines](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Lines_and_boxes.html#pagelinesandboxes-lines)、[ Box](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Lines_and_boxes.html#pagelinesandboxes-boxes)和[Polyline](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Lines_and_boxes.html#pagelinesandboxes-polylines) 可以在图表上的任何可用位置具有坐标，包括最后一个图表栏之外的未来时间的坐标。
- 这些类型的对象可以使用[Chart.point](https://www.tradingview.com/pine-script-reference/v5/#type_chart.point) 实例来设置它们的坐标。
- 每个对象的 x 坐标可以是条形索引或时间值，具体取决于其指定的`xloc`属性。
- 每个对象可以具有多种预定义线条样式之一。
- [脚本可以在循环](https://www.tradingview.com/pine-script-docs/en/v5/language/Loops.html#pageloops)和 [条件结构](https://www.tradingview.com/pine-script-docs/en/v5/language/Conditional_structures.html#pageconditionalstructures)的范围内调用管理这些对象的函数，从而允许对其绘图进行迭代和条件控制。
- 脚本可以引用并在图表上显示的这些对象的数量是有限制的。单个脚本实例最多可以显示 500 条线、500 个框和 100 条折线。用户可以通过脚本的 [indicator()](https://www.tradingview.com/pine-script-reference/v5/#fun_indicator)或 [strategy()](https://www.tradingview.com/pine-script-reference/v5/#fun_strategy)声明语句的`max_lines_count`、`max_boxes_count`、 和参数指定每种类型允许的最大数量 。如果未指定，默认值为 ~50。与[标签](https://www.tradingview.com/pine-script-reference/v5/#type_label) 和[表格](https://www.tradingview.com/pine-script-reference/v5/#type_table)类型一样，线条、方框和折线利用 *垃圾收集*机制，当绘图总数超过脚本限制时，该机制会删除图表上最旧的对象。`max_polylines_count`

笔记

在 TradingView 图表上，一整套*绘图工具*允许用户使用鼠标操作创建和修改绘图。虽然它们有时可能类似于使用 Pine Script™ 代码创建的绘图对象，但它们是**不相关的**实体。 Pine 脚本无法与图表用户界面中的绘图工具交互，并且鼠标操作不会直接影响 Pine 绘图对象。



## [线路](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Lines_and_boxes.html#id2)

命名空间中的内置函数控制[线](https://www.tradingview.com/pine-script-reference/v5/#type_line)`line.*`对象的创建和管理 ：

- line.new [()](https://www.tradingview.com/pine-script-reference/v5/#fun_line.new)函数创建一个新行。
- 这些`line.set_*()`函数修改线属性。
- 这些`line.get_*()`函数从线路实例中检索值。
- line.copy [()](https://www.tradingview.com/pine-script-reference/v5/#fun_line.copy)函数克隆一个线实例。
- line.delete [()](https://www.tradingview.com/pine-script-reference/v5/#fun_line.delete)函数删除现有的线路实例。
- line.all变量引用一个只读 [数组，](https://www.tradingview.com/pine-script-reference/v5/#type_array)[其中](https://www.tradingview.com/pine-script-reference/v5/#var_line.all)包含脚本显示的所有行的 ID。数组的[大小](https://www.tradingview.com/pine-script-reference/v5/#fun_array.size)取决于indicator [()](https://www.tradingview.com/pine-script-reference/v5/#fun_indicator)或 [strategy()](https://www.tradingview.com/pine-script-reference/v5/#fun_strategy)声明语句的大小以及脚本绘制的行数。`max_lines_count`

脚本可以将`line.set_*()`、`line.get_*()`、 [line.copy()](https://www.tradingview.com/pine-script-reference/v5/#fun_line.copy)和[line.delete()](https://www.tradingview.com/pine-script-reference/v5/#fun_line.delete) 内置函数作为函数或[方法](https://www.tradingview.com/pine-script-docs/en/v5/language/Methods.html#pagemethods)调用。



### [创建线条](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Lines_and_boxes.html#id3)

line.new [()](https://www.tradingview.com/pine-script-reference/v5/#fun_line.new)函数创建一个新的 [线条](https://www.tradingview.com/pine-script-reference/v5/#type_line)实例以显示在图表上。它有以下签名：

```
Pine Script™
Copiedline.new(first_point, second_point, xloc, extend, color, style, width) → series line

line.new(x1, y1, x2, y2, xloc, extend, color, style, width) → series line
```

该函数的第一个重载包含`first_point`和`second_point`参数。是 代表线条起点的图表点， 是`first_point`代表[线条](https://www.tradingview.com/pine-script-reference/v5/#type_chart.point)`second_point`终点 的[图表点。该函数从这些](https://www.tradingview.com/pine-script-reference/v5/#type_chart.point)[图表点](https://www.tradingview.com/pine-script-docs/en/v5/language/Type_system.html#pagetypesystem-types-chartpoints)复制信息 以确定线条的坐标。是否使用 和中的`index`或字段作为 x 坐标取决于函数的值。`time``first_point``second_point``xloc`

第二个重载独立指定`x1`、`y1`、`x2`和`y2`值，其中`x1`和`x2` 是表示线的起始和结束 x 坐标的[int](https://www.tradingview.com/pine-script-reference/v5/#type_int)`y1`值，和`y2`是 表示 y 坐标的[浮点](https://www.tradingview.com/pine-script-reference/v5/#type_float)值。该行是否将这些`x`值视为柱索引或时间戳取决于`xloc`函数调用中的值。

两个重载共享相同的附加参数：

- `xloc`

  控制新线的 x 坐标是否使用柱索引或时间值。它的默认值为[xloc.bar_index](https://www.tradingview.com/pine-script-reference/v5/#var_xloc.bar_index)。当调用第一个重载时，使用[xloc.bar_index](https://www.tradingview.com/pine-script-reference/v5/#var_xloc.bar_index)`xloc`的值 告诉函数使用和的字段，并且[xloc.bar_time](https://www.tradingview.com/pine-script-reference/v5/#var_xloc.bar_time)的值 告诉函数使用点的字段。`index``first_point``second_point``time`调用第二个重载时，[xloc.bar_index](https://www.tradingview.com/pine-script-reference/v5/#var_xloc.bar_index)`xloc`的值 会提示函数将和参数视为条形索引值。当使用 [xloc.bar_time 时](https://www.tradingview.com/pine-script-reference/v5/#var_xloc.bar_time)，该函数会将 和视为时间值。`x1``x2``x1``x2`当指定的 x 坐标表示*柱索引*值时，请务必注意允许的最小 x 坐标为 。对于较大的偏移量，可以使用[xloc.bar_time](https://www.tradingview.com/pine-script-reference/v5/#var_xloc.bar_time)。`bar_index - 9999`

- `extend`

  确定绘制的线是否无限延伸超出其定义的起点和终点坐标。它接受以下值之一： [extend.left](https://www.tradingview.com/pine-script-reference/v5/#var_extend.left)、 [extend.right](https://www.tradingview.com/pine-script-reference/v5/#var_extend.right)、 [extend.both](https://www.tradingview.com/pine-script-reference/v5/#var_extend.both)或[extend.none](https://www.tradingview.com/pine-script-reference/v5/#var_extend.none)（默认）。

- `color`

  指定线条图的颜色。默认为 [color.blue](https://www.tradingview.com/pine-script-reference/v5/#var_color.blue)。

- `style`

  [指定线条的样式，可以是本页的线条样式](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Lines_and_boxes.html#pagelinesandboxes-lines-linestyles)部分中列出的任何选项 。默认值为 [line.style_solid](https://www.tradingview.com/pine-script-reference/v5/#var_line.style_solid)。

- `width`

  控制线的宽度（以像素为单位）。默认值为 1。

下面的示例演示了如何以最简单的形式绘制线条。此脚本在每个图表条的水平中心绘制一条连接 [开盘价](https://www.tradingview.com/pine-script-reference/v5/#var_open)和 [收盘价的新垂直线：](https://www.tradingview.com/pine-script-reference/v5/#var_close)

![../_images/Lines-and-boxes-Lines-Creating-lines-1.png](https://www.tradingview.com/pine-script-docs/en/v5/_images/Lines-and-boxes-Lines-Creating-lines-1.png)

```
Pine Script™
Copied//@version=5
indicator("Creating lines demo", overlay = true)

//@variable The `chart.point` for the start of the line. Contains `index` and `time` information.
firstPoint = chart.point.now(open)
//@variable The `chart.point` for the end of the line. Contains `index` and `time` information.
secondPoint = chart.point.now(close)

// Draw a basic line with a `width` of 5 connecting the `firstPoint` to the `secondPoint`.
// This line uses the `index` field from each point for its x-coordinates.
line.new(firstPoint, secondPoint, width = 5)

// Color the background on the unconfirmed bar.
bgcolor(barstate.isconfirmed ? na : color.new(color.orange, 70), title = "Unconfirmed bar highlight")
```

- 注意：

  如果`firstPoint`和`secondPoint`引用相同的坐标，脚本将*不会*显示一条线，因为它们之间没有要绘制的距离。但是，线路 ID 仍然存在。该脚本将仅显示图表上大约最后 50 条线，因为它没有 `max_lines_count`在[Indicator()](https://www.tradingview.com/pine-script-reference/v5/#fun_indicator)函数调用中指定。线条图一直保留在图表上，直到使用[line.delete()](https://www.tradingview.com/pine-script-reference/v5/#fun_line.delete)删除 或被垃圾收集器删除。该脚本会在打开的图表栏（即带有橙色背景突出显示的栏）上*重新绘制*线条，直到其关闭。栏关闭后，将不再更新绘图。

让我们看一个更复杂的例子。该脚本使用前一个柱的 [hl2](https://www.tradingview.com/pine-script-reference/v5/#var_hl2)价格和当前柱的[最高](https://www.tradingview.com/pine-script-reference/v5/#var_high)价 和[最低价](https://www.tradingview.com/pine-script-reference/v5/#var_low)来绘制一个扇形，并用用户指定的线条数来投影下一个图表柱的假设价格值范围。它在 [for](https://www.tradingview.com/pine-script-docs/en/v5/language/Loops.html#pageloops-for)循环中调用[line.new()](https://www.tradingview.com/pine-script-reference/v5/#fun_line.new)在每个柱上创建线条：`linesPerBar`

![../_images/Lines-and-boxes-Lines-Creating-lines-2.png](https://www.tradingview.com/pine-script-docs/en/v5/_images/Lines-and-boxes-Lines-Creating-lines-2.png)

```
Pine Script™
Copied//@version=5
indicator("Creating lines demo", "Simple projection fan", true, max_lines_count = 500)

//@variable The number of fan lines drawn on each chart bar.
int linesPerBar = input.int(20, "Line drawings per bar", 2, 100)

//@variable The distance between each y point on the current bar.
float step = (high - low) / (linesPerBar - 1)

//@variable The `chart.point` for the start of each line. Does not contain `time` information.
firstPoint = chart.point.from_index(bar_index - 1, hl2[1])
//@variable The `chart.point` for the end of each line. Does not contain `time` information.
secondPoint = chart.point.from_index(bar_index + 1, float(na))

//@variable The stepped y value on the current bar for `secondPoint.price` calculation, starting from the `low`.
float barValue = low
// Loop to draw the fan.
for i = 1 to linesPerBar
    // Update the `price` of the `secondPoint` using the difference between the `barValue` and `firstPoint.price`.
    secondPoint.price := 2.0 * barValue - firstPoint.price
    //@variable Is `color.aqua` when the line's slope is positive, `color.fuchsia` otherwise.
    color lineColor = secondPoint.price > firstPoint.price ? color.aqua : color.fuchsia
    // Draw a new `lineColor` line connecting the `firstPoint` and `secondPoint` coordinates.
    // This line uses the `index` field from each point for its x-coordinates.
    line.new(firstPoint, secondPoint, color = lineColor)
    // Add the `step` to the `barValue`.
    barValue += step

// Color the background on the unconfirmed bar.
bgcolor(barstate.isconfirmed ? na : color.new(color.orange, 70), title = "Unconfirmed bar highlight")
```

- 注意：

  我们已包含在[Indicator()](https://www.tradingview.com/pine-script-reference/v5/#fun_indicator) 函数调用中，这意味着脚本在图表上最多保留 500 条线。`max_lines_count = 500`每个[line.new()](https://www.tradingview.com/pine-script-reference/v5/#fun_line.new)调用都会从和变量引用的 [Chart.point](https://www.tradingview.com/pine-script-reference/v5/#type_chart.point)*复制*信息 。因此，脚本可以在每次循环迭代时更改的字段 ，而不会影响其他行中的 y 坐标。`firstPoint``secondPoint``price``secondPoint`



### [修改行](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Lines_and_boxes.html#id4)

命名`line.*`空间包含多个修改[线](https://www.tradingview.com/pine-script-reference/v5/#type_line)实例属性的*setter*函数：

- [line.set_first_point()](https://www.tradingview.com/pine-script-reference/v5/#fun_line.set_first_point)和 [line.set_second_point()](https://www.tradingview.com/pine-script-reference/v5/#fun_line.set_second_point)`id`分别使用指定的信息 更新线的起点和终点`point`。
- [line.set_x1()](https://www.tradingview.com/pine-script-reference/v5/#fun_line.set_x1)和 [line.set_x2()](https://www.tradingview.com/pine-script-reference/v5/#fun_line.set_x2)将线的 x 坐标之一设置`id`为新`x`值，该值可以表示柱索引或时间值，具体取决于线的`xloc`属性。
- [line.set_y1()](https://www.tradingview.com/pine-script-reference/v5/#fun_line.set_y1)和 [line.set_y2()](https://www.tradingview.com/pine-script-reference/v5/#fun_line.set_y2)将线的 y 坐标之一设置`id`为新`y`值。
- [line.set_xy1()](https://www.tradingview.com/pine-script-reference/v5/#fun_line.set_xy1)和 [line.set_xy2()](https://www.tradingview.com/pine-script-reference/v5/#fun_line.set_xy2)`id`用新的`x`和值更新线的点之一 `y`。
- [line.set_xloc()](https://www.tradingview.com/pine-script-reference/v5/#fun_line.set_xloc)设置线`xloc` 的并用新值和值`id`更新其 x 坐标。`x1``x2`
- [line.set_extend()](https://www.tradingview.com/pine-script-reference/v5/#fun_line.set_extend)设置 线`extend`的属性`id`。
- [line.set_color()](https://www.tradingview.com/pine-script-reference/v5/#fun_line.set_color)更新 `id`线条的`color`值。
- [line.set_style()](https://www.tradingview.com/pine-script-reference/v5/#fun_line.set_style)更改 线条`style`的样式`id`。
- [line.set_width()](https://www.tradingview.com/pine-script-reference/v5/#fun_line.set_width)设置 线`width`的宽度`id`。

所有 setter 函数都直接修改`id`传递到调用中的行，并且不返回任何值。每个 setter 函数都接受“系列”参数，因为脚本可以在整个执行过程中更改行的属性。

以下示例绘制了将 a 的开盘价`timeframe`与其收盘价连接起来的线。该脚本使用[var](https://www.tradingview.com/pine-script-reference/v5/#kw_var)关键字声明和仅在*第一个图表栏上引用*[Chart.point](https://www.tradingview.com/pine-script-reference/v5/#type_chart.point) 值 (和)`periodLine` 的变量，并在执行过程中为这些变量分配新值。检测到 上的 [更改](https://www.tradingview.com/pine-script-reference/v5/#fun_timeframe.change)后，它使用 [line.set_color()](https://www.tradingview.com/pine-script-reference/v5/#fun_line.set_color)设置现有的，使用[Chart.point.now()](https://www.tradingview.com/pine-script-reference/v5/#fun_chart.point.now)为 和 创建新值，然后使用这些点将[新线](https://www.tradingview.com/pine-script-reference/v5/#fun_line.new)分配给。`openPoint``closePoint``timeframe``color``periodLine``openPoint``closePoint``periodLine`

`periodLine`在值不是[na](https://www.tradingview.com/pine-script-reference/v5/#var_na)的其他柱上，脚本将新的[Chart.point](https://www.tradingview.com/pine-script-reference/v5/#type_chart.point)分配给`closePoint`，然后使用 [line.set_second_point()](https://www.tradingview.com/pine-script-reference/v5/#fun_line.set_second_point) 和[line.set_color()](https://www.tradingview.com/pine-script-reference/v5/#fun_line.set_color)作为 更新线条属性的[方法：](https://www.tradingview.com/pine-script-docs/en/v5/language/Methods.html#pagemethods)

![../_images/Lines-and-boxes-Lines-Modifying-lines-1.png](https://www.tradingview.com/pine-script-docs/en/v5/_images/Lines-and-boxes-Lines-Modifying-lines-1.png)

```
Pine Script™
Copied//@version=5
indicator("Modifying lines demo", overlay = true)

//@variable The size of each period.
string timeframe = input.timeframe("D", "Timeframe")

//@variable A line connecting the period's opening and closing prices.
var line periodLine = na

//@variable The first point of the line. Contains `time` and `index` information.
var chart.point openPoint = chart.point.now(open)
//@variable The closing point of the line. Contains `time` and `index` information.
var chart.point closePoint = chart.point.now(close)

if timeframe.change(timeframe)
    //@variable The final color of the `periodLine`.
    color finalColor = switch
        closePoint.price > openPoint.price => color.green
        closePoint.price < openPoint.price => color.red
        =>                                    color.gray

    // Update the color of the current `periodLine` to the `finalColor`.
    line.set_color(periodLine, finalColor)

    // Assign new points to the `openPoint` and `closePoint`.
    openPoint  := chart.point.now(open)
    closePoint := chart.point.now(close)
    // Assign a new line to the `periodLine`. Uses `time` fields from the `openPoint` and `closePoint` as x-coordinates.
    periodLine := line.new(openPoint, closePoint, xloc.bar_time, style = line.style_arrow_right, width = 3)

else if not na(periodLine)
    // Assign a new point to the `closePoint`.
    closePoint := chart.point.now(close)

    //@variable The color of the developing `periodLine`.
    color developingColor = switch
        closePoint.price > openPoint.price => color.aqua
        closePoint.price < openPoint.price => color.fuchsia
        =>                                    color.gray

    // Update the coordinates of the line's second point using the new `closePoint`.
    // It uses the `time` field from the point for its new x-coordinate.
    periodLine.set_second_point(closePoint)
    // Update the color of the line using the `developingColor`.
    periodLine.set_color(developingColor)
```

- 注意：

  此示例中的每个线条图都使用 [line.style_arrow_right](https://www.tradingview.com/pine-script-reference/v5/#var_line.style_arrow_right)样式。有关所有可用样式设置的概述，请参阅下面的[线条样式部分。](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Lines_and_boxes.html#pagelinesandboxes-lines-linestyles)



### [线条样式](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Lines_and_boxes.html#id5)

`style`用户可以通过在[line.new()](https://www.tradingview.com/pine-script-reference/v5/#fun_line.new)或 [line.set_style()](https://www.tradingview.com/pine-script-reference/v5/#fun_line.set_style)函数调用中传递以下变量之一作为参数来控制脚本线条图的样式 ：

| 争论                | 线                                                           |      | 争论                     | 线                                                           |
| :------------------ | :----------------------------------------------------------- | :--- | :----------------------- | :----------------------------------------------------------- |
| `line.style_solid`  | ![线型实体](https://www.tradingview.com/pine-script-docs/en/v5/_images/LinesAndBoxes-LineStyles-solid.png) |      | `line.style_arrow_left`  | ![左线样式箭头](https://www.tradingview.com/pine-script-docs/en/v5/_images/LinesAndBoxes-LineStyles-arrow_left.png) |
| `line.style_dotted` | ![线样式点](https://www.tradingview.com/pine-script-docs/en/v5/_images/LinesAndBoxes-LineStyles-dotted.png) |      | `line.style_arrow_right` | ![右线样式箭头](https://www.tradingview.com/pine-script-docs/en/v5/_images/LinesAndBoxes-LineStyles-arrow_right.png) |
| `line.style_dashed` | ![线型虚线](https://www.tradingview.com/pine-script-docs/en/v5/_images/LinesAndBoxes-LineStyles-dashed.png) |      | `line.style_arrow_both`  | ![线条样式箭头两者](https://www.tradingview.com/pine-script-docs/en/v5/_images/LinesAndBoxes-LineStyles-arrow_both.png) |

- 注意：

  *多段线*还可以使用这些变量中的任何一个作为其`line_style`值。请参阅本页的[创建折线部分。](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Lines_and_boxes.html#pagelinesandboxes-polylines-creatingpolylines)



### [读取行值](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Lines_and_boxes.html#id6)

命名空间`line.*`包括*getter函数，它允许脚本从*[行](https://www.tradingview.com/pine-script-reference/v5/#type_line)对象中检索值 以供进一步使用：

- [line.get_x1()](https://www.tradingview.com/pine-script-reference/v5/#fun_line.get_x1)和 [line.get_x2()](https://www.tradingview.com/pine-script-reference/v5/#fun_line.get_x2)分别获取该行的第一个和第二个 x 坐标`id`。返回的值是否表示柱索引或时间值取决于线的`xloc`属性。
- [line.get_y1()](https://www.tradingview.com/pine-script-reference/v5/#fun_line.get_y1)和 [line.get_y2()](https://www.tradingview.com/pine-script-reference/v5/#fun_line.get_y2)分别获取该`id`行的第一个和第二个 y 坐标。
- [line.get_price()](https://www.tradingview.com/pine-script-reference/v5/#fun_line.get_price)`id`检索指定值处的线的价格（y 坐标）`x`，包括线起点和终点之外的柱索引处的价格。此函数仅与使用 [xloc.bar_index](https://www.tradingview.com/pine-script-reference/v5/#var_xloc.bar_index)作为`xloc`值的行兼容。

下面的脚本在柱形上形成[上涨](https://www.tradingview.com/pine-script-reference/v5/#fun_ta.rising) 或[下跌](https://www.tradingview.com/pine-script-reference/v5/#fun_ta.falling)价格模式时绘制一条新线`length`。它使用[var](https://www.tradingview.com/pine-script-reference/v5/#kw_var)`directionLine`关键字在第一个图表栏上声明变量。分配给 的 ID`directionLine`在后续柱中持续存在，直到`newDirection`条件发生，在这种情况下，脚本会为变量分配新行。

在每个柱上，脚本调用[line.get_y2()](https://www.tradingview.com/pine-script-reference/v5/#fun_line.get_y2)、 [line.get_y1()](https://www.tradingview.com/pine-script-reference/v5/#fun_line.get_y1)、 [line.get_x2()](https://www.tradingview.com/pine-script-reference/v5/#fun_line.get_x2)和 [line.get_x1()](https://www.tradingview.com/pine-script-reference/v5/#fun_line.get_x1) getter 作为 从当前值检索值并计算其 的[方法](https://www.tradingview.com/pine-script-docs/en/v5/language/Methods.html#pagemethods)，用于确定每幅图画和情节的颜色。它使用[line.get_price()](https://www.tradingview.com/pine-script-reference/v5/#fun_line.get_price)从第二个点 *之外*检索 的扩展值，并将 它们[绘制](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Plots.html#pageplots)在图表上：`directionLine``slope``directionLine`

![../_images/Lines-and-boxes-Lines-Reading-line-values-1.png](https://www.tradingview.com/pine-script-docs/en/v5/_images/Lines-and-boxes-Lines-Reading-line-values-1.png)

```
Pine Script™
Copied//@version=5
indicator("Reading line values demo", overlay = true)

//@variable The number of bars for rising and falling calculations.
int length = input.int(2, "Length", 2)

//@variable A line that's drawn whenever `hlc3` starts rising or falling over `length` bars.
var line directionLine = na

//@variable Is `true` when `hlc3` is rising over `length` bars, `false` otherwise.
bool rising = ta.rising(hlc3, length)
//@variable Is `true` when `hlc3` is falling over `length` bars, `false` otherwise.
bool falling = ta.falling(hlc3, length)
//@variable Is `true` when a rising or falling pattern begins, `false` otherwise.
bool newDirection = (rising and not rising[1]) or (falling and not falling[1])

// Update the `directionLine` when `newDirection` is `true`. The line uses the default `xloc.bar_index`.
if newDirection
    directionLine := line.new(bar_index - length, hlc3[length], bar_index, hlc3, width = 3)

//@variable The slope of the `directionLine`.
float slope = (directionLine.get_y2() - directionLine.get_y1()) / (directionLine.get_x2() - directionLine.get_x1())
//@variable The value extrapolated from the `directionLine` at the `bar_index`.
float lineValue = line.get_price(directionLine, bar_index)

//@variable Is `color.green` when the `slope` is positive, `color.red` otherwise.
color slopeColor = slope > 0 ? color.green : color.red

// Update the color of the `directionLine`.
directionLine.set_color(slopeColor)
// Plot the `lineValue`.
plot(lineValue, "Extrapolated value", slopeColor, 3, plot.style_circles)
```

- 注意：

  [此示例调用line.new()](https://www.tradingview.com/pine-script-reference/v5/#fun_line.new)函数的第二个重载 ，该函数使用`x1`、`y1`、`x2`和`y2`参数来定义线条的起点和终点。该 `x1`值是`length`当前[bar_index](https://www.tradingview.com/pine-script-reference/v5/#var_bar_index)后面的柱，并且该`y1`值是该索引处的[hlc3](https://www.tradingview.com/pine-script-reference/v5/#var_hlc3)值。函数调用中的`x2`and使用当前柱的[bar_index](https://www.tradingview.com/pine-script-reference/v5/#var_bar_index) 和[hlc3](https://www.tradingview.com/pine-script-reference/v5/#var_hlc3)值。`y2`line.get_price [()](https://www.tradingview.com/pine-script-reference/v5/#fun_line.get_price)函数调用将 `directionLine`视为无限扩展，无论其`extend`属性如何。该脚本仅显示图表上大约最后 50 条线，但 推断值的[绘图](https://www.tradingview.com/pine-script-reference/v5/#fun_plot)跨越整个图表的历史记录。



### [克隆系](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Lines_and_boxes.html#id7)

[脚本可以使用line.copy()](https://www.tradingview.com/pine-script-reference/v5/#fun_line.copy)函数克隆一行`id`及其所有属性 。对复制的线实例进行的任何更改都不会影响原始线实例。

例如，此脚本在 每个 柱的[开盘价](https://www.tradingview.com/pine-script-reference/v5/#var_open)`length`处创建一条水平线，并将其分配给一个`mainLine`变量。在所有其他栏上，它`copiedLine`使用[line.copy()](https://www.tradingview.com/pine-script-reference/v5/#fun_line.copy)创建一个 并调用`line.set_*()`函数来修改其属性。如下所示，更改`copiedLine`不会`mainLine`以任何方式影响 ：

![../_images/Lines-and-boxes-Lines-Cloning-lines-1.png](https://www.tradingview.com/pine-script-docs/en/v5/_images/Lines-and-boxes-Lines-Cloning-lines-1.png)

```
Pine Script™
Copied//@version=5
indicator("Cloning lines demo", overlay = true, max_lines_count = 500)

//@variable The number of bars between each new mainLine assignment.
int length = input.int(20, "Length", 2, 500)

//@variable The first `chart.point` used by the `mainLine`. Contains `index` and `time` information.
firstPoint = chart.point.now(open)
//@variable The second `chart.point` used by the `mainLine`. Does not contain `time` information.
secondPoint = chart.point.from_index(bar_index + length, open)

//@variable A horizontal line drawn at the `open` price once every `length` bars.
var line mainLine = na

if bar_index % length == 0
    // Assign a new line to the `mainLine` that connects the `firstPoint` to the `secondPoint`.
    // This line uses the `index` fields from both points as x-coordinates.
    mainLine := line.new(firstPoint, secondPoint, color = color.purple, width = 2)

//@variable A copy of the `mainLine`. Changes to this line do not affect the original.
line copiedLine = line.copy(mainLine)

// Update the color, style, and second point of the `copiedLine`.
line.set_color(copiedLine, color.orange)
line.set_style(copiedLine, line.style_dotted)
line.set_second_point(copiedLine, chart.point.now(close))
```

- 注意：

  `index`的字段是`secondPoint`超出`length`当前 [bar_index 的](https://www.tradingview.com/pine-script-reference/v5/#var_bar_index)柱。由于[xloc.bar_index](https://www.tradingview.com/pine-script-reference/v5/#var_xloc.bar_index)允许的最大 x 坐标 为，因此我们将输入的设为 500。`bar_index + 500``maxval``length`



### [删除行](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Lines_and_boxes.html#id8)

`id`要删除脚本绘制的 线条，请使用[line.delete()](https://www.tradingview.com/pine-script-reference/v5/#fun_line.delete)函数。此函数从脚本中删除线条实例及其在图表上的绘制。

当人们只想在任何给定时间在图表上保留特定数量的线条或随着图表的进展有条件地删除图形时，删除线条实例通常很方便。

例如，每当[RSI](https://www.tradingview.com/pine-script-reference/v5/#fun_ta.rsi) 穿过其[EMA时，此脚本就会使用](https://www.tradingview.com/pine-script-reference/v5/#fun_ta.ema)[extend.right](https://www.tradingview.com/pine-script-reference/v5/#var_extend.right)属性绘制一条水平线 。

该脚本将所有行 ID 存储在一个`lines`数组中，该 [数组用作队列](https://www.tradingview.com/pine-script-docs/en/v5/language/Arrays.html#pagearrays-insertingandremovingarrayelements-usinganarrayasaqueue)`numberOfLines`，仅在图表上 显示最后一个。当 [数组](https://www.tradingview.com/pine-script-reference/v5/#type_array)的 [大小](https://www.tradingview.com/pine-script-reference/v5/#fun_array.size)超过指定的 值时，脚本会使用[array.shift()](https://www.tradingview.com/pine-script-reference/v5/#fun_array.shift)删除数组中最旧的行 ID ，并使用[line.delete()](https://www.tradingview.com/pine-script-reference/v5/#fun_line.delete) 删除它：`numberOfLines`

![../_images/Lines-and-boxes-Lines-Deleting-lines-1.png](https://www.tradingview.com/pine-script-docs/en/v5/_images/Lines-and-boxes-Lines-Deleting-lines-1.png)

```
Pine Script™
Copied//@version=5

//@variable The maximum number of lines allowed on the chart.
const int MAX_LINES_COUNT = 500

indicator("Deleting lines demo", "RSI cross levels", max_lines_count = MAX_LINES_COUNT)

//@variable The length of the RSI.
int rsiLength = input.int(14, "RSI length", 2)
//@variable The length of the RSI's EMA.
int emaLength = input.int(28, "RSI average length", 2)
//@variable The maximum number of lines to keep on the chart.
int numberOfLines = input.int(20, "Lines on the chart", 0, MAX_LINES_COUNT)

//@variable An array containing the IDs of lines on the chart.
var array<line> lines = array.new<line>()

//@variable An `rsiLength` RSI of `close`.
float rsi = ta.rsi(close, rsiLength)
//@variable A `maLength` EMA of the `rsi`.
float rsiMA = ta.ema(rsi, emaLength)

if ta.cross(rsi, rsiMA)
    //@variable The color of the horizontal line.
    color lineColor = rsi > rsiMA ? color.green : color.red
    // Draw a new horizontal line. Uses the default `xloc.bar_index`.
    newLine = line.new(bar_index, rsiMA, bar_index + 1, rsiMA, extend = extend.right, color = lineColor, width = 2)
    // Push the `newLine` into the `lines` array.
    lines.push(newLine)
    // Delete the oldest line when the size of the array exceeds the specified `numberOfLines`.
    if array.size(lines) > numberOfLines
        line.delete(lines.shift())

// Plot the `rsi` and `rsiMA`.
plot(rsi, "RSI", color.new(color.blue, 40))
plot(rsiMA, "EMA of RSI", color.new(color.gray, 30))
```

- 注意：

  我们声明了一个`MAX_LINES_COUNT`具有“const int”*限定类型的*变量，脚本将其用作[indicator()](https://www.tradingview.com/pine-script-reference/v5/#fun_indicator)`max_lines_count`函数中 的 和 分配给该变量的[input.int()](https://www.tradingview.com/pine-script-reference/v5/#fun_input.int)的。`maxval``numberOfLines`[此示例使用line.new()](https://www.tradingview.com/pine-script-reference/v5/#fun_line.new)函数的第二个重载 ，该函数独立指定`x1`、`y1`、`x2`和`y2`坐标。



## [盒子](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Lines_and_boxes.html#id9)

命名空间中的内置函数`box.*`创建和管理 [盒子](https://www.tradingview.com/pine-script-reference/v5/#type_box)对象：

- box.new [()](https://www.tradingview.com/pine-script-reference/v5/#fun_box.new)函数创建一个新盒子。
- 这些`box.set_*()`函数修改框属性。
- 这些`box.get_*()`函数从盒子实例中检索值。
- box.copy [()](https://www.tradingview.com/pine-script-reference/v5/#fun_box.copy)函数克隆一个盒子实例。
- box.delete [()](https://www.tradingview.com/pine-script-reference/v5/#fun_box.delete)函数删除一个盒子实例。
- box.all变量引用一个只读 [数组，](https://www.tradingview.com/pine-script-reference/v5/#type_array)[其中](https://www.tradingview.com/pine-script-reference/v5/#var_box.all)包含脚本显示的所有框的 ID。数组的[大小](https://www.tradingview.com/pine-script-reference/v5/#fun_array.size)取决于indicator [()](https://www.tradingview.com/pine-script-reference/v5/#fun_indicator)或 [strategy()](https://www.tradingview.com/pine-script-reference/v5/#fun_strategy)声明语句的大小以及脚本绘制的框的数量。`max_boxes_count`

与[lines](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Lines_and_boxes.html#pagelinesandboxes-lines)一样，用户可以调用`box.set_*()`、、`box.get_*()`box.copy [()](https://www.tradingview.com/pine-script-reference/v5/#fun_box.copy)和 [box.delete()](https://www.tradingview.com/pine-script-reference/v5/#fun_box.delete)内置函数或[方法](https://www.tradingview.com/pine-script-docs/en/v5/language/Methods.html#pagemethods)。



### [创建盒子](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Lines_and_boxes.html#id10)

box.new [()](https://www.tradingview.com/pine-script-reference/v5/#fun_box.new)函数创建一个新的 [框](https://www.tradingview.com/pine-script-reference/v5/#type_box)对象以显示在图表上。它有以下签名：

```
Pine Script™
Copiedbox.new(top_left, bottom_right, border_color, border_width, border_style, extend, xloc, bgcolor, text, text_size, text_color, text_halign, text_valign, text_wrap, text_font_family) → series box

box.new(left, top, right, bottom, border_color, border_width, border_style, extend, xloc, bgcolor, text, text_size, text_color, text_halign, text_valign, text_wrap, text_font_family) → series box
```

该函数的第一个重载包括`top_left`和`bottom_right`参数，它们接受分别代表框的左上角和右下角的[Chart.point对象。该函数从这些](https://www.tradingview.com/pine-script-reference/v5/#type_chart.point)[图表点](https://www.tradingview.com/pine-script-docs/en/v5/language/Type_system.html#pagetypesystem-types-chartpoints)复制信息来设置框角的坐标。是否使用和点的`index`或字段作为 x 坐标取决于函数的值。`time``top_left``bottom_right``xloc`

第二个重载指定框的`left`、`top`、`right`和边缘。`bottom`和 参数接受指定框的左、右 x 坐标的[int](https://www.tradingview.com/pine-script-reference/v5/#type_int)`left`值，该值可以是条形索引或时间值，具体取决于函数调用中的值。和参数接受 代表框顶部和底部 y 坐标的浮点[值。](https://www.tradingview.com/pine-script-reference/v5/#type_float)`right``xloc``top``bottom`

该函数的附加参数在两个重载中是相同的：

- `border_color`

  指定所有四个框边框的颜色。默认为 [color.blue](https://www.tradingview.com/pine-script-reference/v5/#var_color.blue)。

- `border_width`

  指定边框的宽度（以像素为单位）。其默认值为 1。

- `border_style`

  指定边框的样式，可以是本页[“框样式”](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Lines_and_boxes.html#pagelinesandboxes-boxes-boxstyles)部分中的任何选项 。

- `extend`

  确定框的边框是否无限延伸超出左或右 x 坐标。它接受以下值之一： [extend.left](https://www.tradingview.com/pine-script-reference/v5/#var_extend.left)、 [extend.right](https://www.tradingview.com/pine-script-reference/v5/#var_extend.right)、 [extend.both](https://www.tradingview.com/pine-script-reference/v5/#var_extend.both)或[extend.none](https://www.tradingview.com/pine-script-reference/v5/#var_extend.none)（默认）。

- `xloc`

  确定框的左边缘和右边缘是否使用条形索引或时间值作为 x 坐标。默认为[xloc.bar_index](https://www.tradingview.com/pine-script-reference/v5/#var_xloc.bar_index)。在第一个重载中，[xloc.bar_index](https://www.tradingview.com/pine-script-reference/v5/#var_xloc.bar_index)`xloc`的值 意味着该函数将使用和图表点的字段，[xloc.bar_time](https://www.tradingview.com/pine-script-reference/v5/#var_xloc.bar_time)的值 意味着它将使用它们的字段。`index``top_left``bottom_right``xloc``time`在第二个重载中，使用[xloc.bar_index](https://www.tradingview.com/pine-script-reference/v5/#var_xloc.bar_index)`xloc`值 意味着该函数将和值视为柱索引，而 [xloc.bar_time](https://www.tradingview.com/pine-script-reference/v5/#var_xloc.bar_time)意味着它将将它们视为时间戳。`left``right`当指定的 x 坐标表示*柱索引*值时，请务必注意允许的最小 x 坐标为 。对于较大的偏移量，可以使用[xloc.bar_time](https://www.tradingview.com/pine-script-reference/v5/#var_xloc.bar_time)。`bar_index - 9999`

- `bgcolor`

  指定框内空间的背景颜色。默认值为[color.blue](https://www.tradingview.com/pine-script-reference/v5/#var_color.blue)。

- `text`

  要在框中显示的文本。默认情况下，其值为空字符串。

- `text_size`

  指定框中文本的大小。它接受以下值之一： [size.tiny](https://www.tradingview.com/pine-script-reference/v5/#var_size.tiny)、 [size.small](https://www.tradingview.com/pine-script-reference/v5/#var_size.small)、 [size.normal](https://www.tradingview.com/pine-script-reference/v5/#var_size.normal)、 [size.large](https://www.tradingview.com/pine-script-reference/v5/#var_size.large)、 [size.huge](https://www.tradingview.com/pine-script-reference/v5/#var_size.huge)或[size.auto](https://www.tradingview.com/pine-script-reference/v5/#var_size.auto)（默认）。

- `text_color`

  控制文本的颜色。它的默认值是 [color.black](https://www.tradingview.com/pine-script-reference/v5/#var_color.black)。

- `text_halign`

  指定文本在框边界内的水平对齐方式。它接受以下其中一项： [text.align_left](https://www.tradingview.com/pine-script-reference/v5/#var_text.align_left)、 [text.align_right](https://www.tradingview.com/pine-script-reference/v5/#var_text.align_right)或[text.align_center](https://www.tradingview.com/pine-script-reference/v5/#var_text.align_center)（默认）。

- `text_valign`

  指定文本在框边界内的垂直对齐方式。它接受以下其中一项： [text.align_top](https://www.tradingview.com/pine-script-reference/v5/#var_text.align_top)、 [text.align_bottom](https://www.tradingview.com/pine-script-reference/v5/#var_text.align_bottom)或[text.align_center](https://www.tradingview.com/pine-script-reference/v5/#var_text.align_center)（默认）。

- `text_wrap`

  确定框是否将文本包裹在其中。如果其值为 [text.wrap_auto](https://www.tradingview.com/pine-script-reference/v5/#var_text.wrap_auto)，则该框将包裹文本以确保它不会超出其垂直边框。当包裹的文本延伸超过底部时，它还会剪辑它。如果值为 [text.wrap_none](https://www.tradingview.com/pine-script-reference/v5/#var_text.wrap_none)，则该框将文本显示在可以超出其边框的单行上。默认为[text.wrap_none](https://www.tradingview.com/pine-script-reference/v5/#var_text.wrap_none)。

- `text_font_family`

  定义框文本的字体系列。使用 [font.family_default](https://www.tradingview.com/pine-script-reference/v5/#var_font.family_default) 以系统默认字体显示框的文本。 font.family_monospace 以等宽格式[显示](https://www.tradingview.com/pine-script-reference/v5/#var_font.family_monospace) 文本。默认值为 [font.family_default](https://www.tradingview.com/pine-script-reference/v5/#var_font.family_default)。

让我们编写一个简单的脚本来在图表上显示方框。下面的示例绘制一个框，将每个条形的 [最高](https://www.tradingview.com/pine-script-reference/v5/#var_high)值和 [最低](https://www.tradingview.com/pine-script-reference/v5/#var_low)值从当前条形的水平中心投影到下一个可用条形的中心。

在每个柱上，脚本通过[Chart.point.now()](https://www.tradingview.com/pine-script-reference/v5/#fun_chart.point.now)和 [Chart.point_from_index()](https://www.tradingview.com/pine-script-reference/v5/#fun_chart.point.from_index)`topLeft`创建并`bottomRight`指向 ，然后调用[box.new()](https://www.tradingview.com/pine-script-reference/v5/#fun_box.new)构造一个新框并将其显示在图表上。它还使用[bgcolor()](https://www.tradingview.com/pine-script-reference/v5/#fun_bgcolor)突出显示未经确认的图表栏上的背景 ，以指示它重新绘制该框，直到该栏的最后一次更新：

![../_images/Lines-and-boxes-Boxes-Creating-boxes-1.png](https://www.tradingview.com/pine-script-docs/en/v5/_images/Lines-and-boxes-Boxes-Creating-boxes-1.png)

```
Pine Script™
Copied//@version=5
indicator("Creating boxes demo", overlay = true)

//@variable The `chart.point` for the top-left corner of the box. Contains `index` and `time` information.
topLeft = chart.point.now(high)
//@variable The `chart.point` for the bottom-right corner of the box. Does not contain `time` information.
bottomRight = chart.point.from_index(bar_index + 1, low)

// Draw a box using the `topLeft` and `bottomRight` corner points. Uses the `index` fields as x-coordinates.
box.new(topLeft, bottomRight, color.purple, 2, bgcolor = color.new(color.gray, 70))

// Color the background on the unconfirmed bar.
bgcolor(barstate.isconfirmed ? na : color.new(color.orange, 70), title = "Unconfirmed bar highlight")
```

- 注意：

  该`bottomRight`点的场比中的`index`场大一格。如果角的 x 坐标相等，脚本将在每个条的水平中心绘制一条垂直线，类似于本页的[创建线](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Lines_and_boxes.html#pagelinesandboxes-lines-creatinglines)部分中的示例。`index``topLeft`[与lines](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Lines_and_boxes.html#pagelinesandboxes-lines)类似，如果`topLeft`and`bottomRight`包含相同的坐标，则该框不会显示在图表上，因为它们之间没有空间可供绘制。然而，它的 ID 仍然存在。该脚本仅显示图表上大约最后 50 个框，因为我们没有`max_boxes_count` 在[Indicator()](https://www.tradingview.com/pine-script-reference/v5/#fun_indicator)函数调用中指定 a。



### [修改框](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Lines_and_boxes.html#id11)

命名空间中存在多个*setter函数，允许脚本修改*[盒子](https://www.tradingview.com/pine-script-reference/v5/#type_box)`box.*`对象的属性：

- [box.set_top_left_point()](https://www.tradingview.com/pine-script-reference/v5/#fun_box.set_top_left_point)和 [box.set_bottom_right_point()](https://www.tradingview.com/pine-script-reference/v5/#fun_box.set_bottom_right_point)`id`分别使用指定的信息更新框 的左上角和右下角坐标`point`。
- [box.set_left()](https://www.tradingview.com/pine-script-reference/v5/#fun_box.set_left)和 [box.set_right()](https://www.tradingview.com/pine-script-reference/v5/#fun_box.set_right)将框的左或右 x 坐标设置`id`为新`left/right`值，该值可以是条形索引或时间值，具体取决于框的 `xloc`属性。
- [box.set_top()](https://www.tradingview.com/pine-script-reference/v5/#fun_box.set_top)和 [box.set_bottom()](https://www.tradingview.com/pine-script-reference/v5/#fun_box.set_bottom)将框的顶部或底部 y 坐标设置`id`为新`top/bottom`值。
- [box.set_lefttop()](https://www.tradingview.com/pine-script-reference/v5/#fun_box.set_lefttop)设置框的`left`和`top` 坐标`id`，[box.set_rightbottom()](https://www.tradingview.com/pine-script-reference/v5/#fun_box.set_rightbottom) 设置框的`right`和`bottom`坐标。
- [box.set_border_color()](https://www.tradingview.com/pine-script-reference/v5/#fun_box.set_border_color)、 [box.set_border_width()](https://www.tradingview.com/pine-script-reference/v5/#fun_box.set_border_width)和 [box.set_border_style()](https://www.tradingview.com/pine-script-reference/v5/#fun_box.set_border_style)分别更新框边框的`color`、`width`、 和。`style``id`
- [box.set_extend()](https://www.tradingview.com/pine-script-reference/v5/#fun_box.set_extend)`extend`设置盒子 的水平属性`id`。
- [box.set_bgcolor()](https://www.tradingview.com/pine-script-reference/v5/#fun_box.set_bgcolor)将框内空间的颜色设置`id`为新的`color`。
- [box.set_text()](https://www.tradingview.com/pine-script-reference/v5/#fun_box.set_text)、 [box.set_text_size()](https://www.tradingview.com/pine-script-reference/v5/#fun_box.set_text_size)、 [box.set_text_color()](https://www.tradingview.com/pine-script-reference/v5/#fun_box.set_text_color)、 [box.set_text_halign()](https://www.tradingview.com/pine-script-reference/v5/#fun_box.set_text_halign)、 [box.set_text_valign()](https://www.tradingview.com/pine-script-reference/v5/#fun_box.set_text_valign)、 [box.set_text_wrap()](https://www.tradingview.com/pine-script-reference/v5/#fun_box.set_text_wrap)和 [box.set_text_font_family()](https://www.tradingview.com/pine-script-reference/v5/#fun_box.set_text_font_family) 更新`id`框的文本相关属性。

与`line.*`命名空间中的 setter 函数一样，所有框 setter 都直接修改`id`框而不返回值，并且每个 setter 函数都接受“系列”参数。

请注意，与[lines](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Lines_and_boxes.html#pagelinesandboxes-lines)不同，`box.*`命名空间不包含用于修改框的setter函数`xloc`。用户必须针对此类情况[创建](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Lines_and_boxes.html#pagelinesandboxes-boxes-creatingboxes)一个具有所需设置的新框。`xloc`

此示例使用框来可视化用户定义的最高 [交易量](https://www.tradingview.com/pine-script-reference/v5/#var_volume)`timeframe`的向上和向下柱的范围。当脚本检测 到 中的[更改](https://www.tradingview.com/pine-script-reference/v5/#fun_timeframe.change)`timeframe`时，它会 为其和变量分配[新框](https://www.tradingview.com/pine-script-reference/v5/#fun_box.new)，重置其和值，并突出显示图表背景。`upBox``downBox``upVolume``downVolume`

当向上或向下柱的[交易量](https://www.tradingview.com/pine-script-reference/v5/#var_volume) 超过`upVolume`或时`downVolume`，脚本会更新交易量跟踪变量并调用 [box.set_top_left_point()](https://www.tradingview.com/pine-script-reference/v5/#fun_box.set_top_left_point)和 [box.set_bottom_right_point()](https://www.tradingview.com/pine-script-reference/v5/#fun_box.set_bottom_right_point)来更新 `upBox`或`downBox`坐标。设置器使用使用[Chart.point.now()](https://www.tradingview.com/pine-script-reference/v5/#fun_chart.point.now)和 [Chart.point.from_time()](https://www.tradingview.com/pine-script-reference/v5/#fun_chart.point.from_time) 创建的[图表点](https://www.tradingview.com/pine-script-docs/en/v5/language/Type_system.html#pagetypesystem-types-chartpoints)的信息来投影该柱 从当前时间到 [收盘时间](https://www.tradingview.com/pine-script-reference/v5/#fun_time_close)的[最高](https://www.tradingview.com/pine-script-reference/v5/#var_high)值和 [最低](https://www.tradingview.com/pine-script-reference/v5/#var_low)值：`timeframe`

![../_images/Lines-and-boxes-Boxes-Modifying-boxes-1.png](https://www.tradingview.com/pine-script-docs/en/v5/_images/Lines-and-boxes-Boxes-Modifying-boxes-1.png)

```
Pine Script™
Copied//@version=5
indicator("Modifying boxes demo", "High volume boxes", true, max_boxes_count = 100)

//@variable The timeframe of the calculation.
string timeframe = input.timeframe("D", "Timeframe")

//@variable A box projecting the range of the upward bar with the highest `volume` over the `timeframe`.
var box upBox = na
//@variable A box projecting the range of the downward bar with the lowest `volume` over the `timeframe`.
var box downBox = na
//@variable The highest volume of upward bars over the `timeframe`.
var float upVolume = na
//@variable The highest volume of downward bars over the `timeframe`.
var float downVolume = na

// Color variables.
var color upBorder   = color.teal
var color upFill     = color.new(color.teal, 90)
var color downBorder = color.maroon
var color downFill   = color.new(color.maroon, 90)

//@variable The closing time of the `timeframe`.
int closeTime = time_close(timeframe)
//@variable Is `true` when a new bar starts on the `timeframe`.
bool changeTF = timeframe.change(timeframe)

//@variable The `chart.point` for the top-left corner of the boxes. Contains `index` and `time` information.
topLeft = chart.point.now(high)
//@variable The `chart.point` for the bottom-right corner of the boxes. Does not contain `index` information.
bottomRight = chart.point.from_time(closeTime, low)

if changeTF and not na(volume)
    if close > open
        // Update `upVolume` and `downVolume` values.
        upVolume   := volume
        downVolume := 0.0
        // Draw a new `upBox` using `time` and `price` info from the `topLeft` and `bottomRight` points.
        upBox := box.new(topLeft, bottomRight, upBorder, 3, xloc = xloc.bar_time, bgcolor = upFill)
        // Draw a new `downBox` with `na` coordinates.
        downBox := box.new(na, na, na, na, downBorder, 3, xloc = xloc.bar_time, bgcolor = downFill)
    else
        // Update `upVolume` and `downVolume` values.
        upVolume   := 0.0
        downVolume := volume
        // Draw a new `upBox` with `na` coordinates.
        upBox := box.new(na, na, na, na, upBorder, 3, xloc = xloc.bar_time, bgcolor = upFill)
        // Draw a new `downBox` using `time` and `price` info from the `topLeft` and `bottomRight` points.
        downBox := box.new(topLeft, bottomRight, downBorder, 3, xloc = xloc.bar_time, bgcolor = downFill)
// Update the ``upVolume`` and change the ``upBox`` coordinates when volume increases on an upward bar.
else if close > open and volume > upVolume
    upVolume := volume
    box.set_top_left_point(upBox, topLeft)
    box.set_bottom_right_point(upBox, bottomRight)
// Update the ``downVolume`` and change the ``downBox`` coordinates when volume increases on a downward bar.
else if close <= open and volume > downVolume
    downVolume := volume
    box.set_top_left_point(downBox, topLeft)
    box.set_bottom_right_point(downBox, bottomRight)

// Highlight the background when a new `timeframe` bar starts.
bgcolor(changeTF ? color.new(color.orange, 70) : na, title = "Timeframe change highlight")
```

- 注意：

  Indicator [()](https://www.tradingview.com/pine-script-reference/v5/#fun_indicator)函数调用包含，这意味着脚本将保留图表上的最后 100 个框。`max_boxes_count = 100`在此示例中，我们使用了[box.new()](https://www.tradingview.com/pine-script-reference/v5/#fun_box.new)的*两个重载*。在 的第一个柱上，当柱上升时，脚本调用第一个重载，当柱下降时，脚本调用该重载。它使用第二个重载将具有[na](https://www.tradingview.com/pine-script-reference/v5/#var_na)值的新框分配 给该条上的另一个框变量。`timeframe``upBox``downBox`



### [盒子样式](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Lines_and_boxes.html#id12)

`line.style_*`用户可以在 [box.new()](https://www.tradingview.com/pine-script-reference/v5/#fun_box.new)或 [box.set_border_style()](https://www.tradingview.com/pine-script-reference/v5/#fun_box.set_border_style)函数调用中包含以下变量之一 ，以设置脚本绘制的框的边框样式：

| 争论                | 盒子                                                         |
| :------------------ | :----------------------------------------------------------- |
| `line.style_solid`  | ![盒子样式实体](https://www.tradingview.com/pine-script-docs/en/v5/_images/LinesAndBoxes-BoxStyles-solid.png) |
| `line.style_dotted` | ![框样式点](https://www.tradingview.com/pine-script-docs/en/v5/_images/LinesAndBoxes-BoxStyles-dotted.png) |
| `line.style_dashed` | ![框样式虚线](https://www.tradingview.com/pine-script-docs/en/v5/_images/LinesAndBoxes-BoxStyles-dashed.png) |



### [读取框值](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Lines_and_boxes.html#id13)

命名`box.*`空间具有*getter*函数，允许脚本从盒子实例检索坐标值：

- [box.get_left()](https://www.tradingview.com/pine-script-reference/v5/#fun_box.get_left)和 [box.get_right()](https://www.tradingview.com/pine-script-reference/v5/#fun_box.get_right)分别获取盒子左边缘和右边缘的x坐标`id`。返回的值是否表示柱索引或时间值取决于框的`xloc`属性。
- [box.get_top()](https://www.tradingview.com/pine-script-reference/v5/#fun_box.get_top)和 [box.get_bottom()](https://www.tradingview.com/pine-script-reference/v5/#fun_box.get_bottom)分别获取盒子的顶部和底部 y 坐标`id`。

下面的示例绘制了方框来可视化一段时间内的假设价格范围`length`。在每个新周期开始时，它使用平均蜡烛范围乘以输入来计算以[hl2](https://www.tradingview.com/pine-script-reference/v5/#var_hl2) 价格为中心且具有一定高度`scaleFactor`的盒子的角点。绘制第一个框后，它会在[for](https://www.tradingview.com/pine-script-reference/v5/#kw_for)循环内创建新框 。`initialRange``numberOfBoxes - 1`

在每次循环迭代中，脚本通过从只读 [box.all数组中检索](https://www.tradingview.com/pine-script-reference/v5/#var_box.all)[最后一个](https://www.tradingview.com/pine-script-reference/v5/#fun_array.last)`lastBoxDrawn`元素来获取 ，然后调用 [box.get_top()](https://www.tradingview.com/pine-script-reference/v5/#fun_box.get_top)和 [box.get_bottom()](https://www.tradingview.com/pine-script-reference/v5/#fun_box.get_bottom)来获取其 y 坐标。它使用这些值来计算比以前高一倍的新框的坐标：`scaleFactor`

![../_images/Lines-and-boxes-Boxes-Reading-box-values-1.png](https://www.tradingview.com/pine-script-docs/en/v5/_images/Lines-and-boxes-Boxes-Reading-box-values-1.png)

```
Pine Script™
Copied//@version=5
indicator("Reading box values demo", "Nested boxes", overlay = true, max_boxes_count = 500)

//@variable The number of bars in the range calculation.
int length = input.int(10, "Length", 2, 500)
//@variable The number of nested boxes drawn on each period.
int numberOfBoxes = input.int(5, "Nested box count", 1)
//@variable The scale factor applied to each box.
float scaleFactor = input.float(1.6, "Scale factor", 1)

//@variable The initial box range.
float initialRange = scaleFactor * ta.sma(high - low, length)

if bar_index % length == 0
    //@variable The top-left `chart.point` for the initial box. Does not contain `time` information.
    topLeft = chart.point.from_index(bar_index, hl2 + initialRange / 2)
    //@variable The bottom-right `chart.point` for the initial box. Does not contain `time` information.
    bottomRight = chart.point.from_index(bar_index + length, hl2 - initialRange / 2)

    // Calculate border and fill colors of the boxes.
    borderColor = color.rgb(math.random(100, 255), math.random(0, 100), math.random(100, 255))
    bgColor = color.new(borderColor, math.max(100 * (1 - 1/numberOfBoxes), 90))

    // Draw a new box using the `topLeft` and `bottomRight` points. Uses their `index` fields as x-coordinates.
    box.new(topLeft, bottomRight, borderColor, 2, bgcolor = bgColor)

    if numberOfBoxes > 1
        // Loop to create additional boxes.
        for i = 1 to numberOfBoxes - 1
            //@variable The last box drawn by the script.
            box lastBoxDrawn = box.all.last()

            //@variable The top price of the last box.
            float top = box.get_top(lastBoxDrawn)
            //@variable The bottom price of the last box.
            float bottom = box.get_bottom(lastBoxDrawn)

            //@variable The scaled range of the new box.
            float newRange = scaleFactor * (top - bottom) * 0.5
            //@variable The midpoint between the `bottom` and `top`.
            float middle = 0.5 * (top + bottom)

            // Update the `price` fields of the `topLeft` and `bottomRight` points.
            // This does not affect the coordinates of previous boxes.
            topLeft.price     := hl2 + newRange
            bottomRight.price := hl2 - newRange

            // Draw a new box using the updated `topLeft` and `bottomRight` points.
            box.new(topLeft, bottomRight, borderColor, 2, bgcolor = bgColor)
```

- 注意：

  Indicator [()](https://www.tradingview.com/pine-script-reference/v5/#fun_indicator)函数调用使用 ，这意味着脚本可以在图表上显示最多 500 个框。`max_boxes_count = 500`每张图在索引之外都有一个`right`索引`length`条`left`。由于这些绘图的 x 坐标未来最多可达 500 个柱，因此我们将输入`maxval`的 值设置`length`为 500。在每个新周期，脚本使用随机的[color.rgb()](https://www.tradingview.com/pine-script-reference/v5/#fun_color.rgb) 值作为框的`border_color`和。`bgcolor`每个[box.new()](https://www.tradingview.com/pine-script-reference/v5/#fun_box.new)调用都会从分配给 和变量的[Chart.point](https://www.tradingview.com/pine-script-reference/v5/#type_chart.point)对象中复制坐标 ，这就是为什么脚本可以在每次循环迭代中修改它们的字段而不影响其他框。`topLeft``bottomRight``price`



### [克隆盒](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Lines_and_boxes.html#id14)

要克隆特定的 box `id`，请使用[box.copy()](https://www.tradingview.com/pine-script-reference/v5/#fun_box.copy)。此函数复制框及其属性。对复制框的任何更改都不会影响原始框。

例如，此脚本`originalBox`在第一个柱上声明一个变量，并 为每个柱分配一个[新框](https://www.tradingview.com/pine-script-reference/v5/#fun_box.new)`length`。在其他栏上，它使用[box.copy()](https://www.tradingview.com/pine-script-reference/v5/#fun_box.copy)创建`copiedBox`并调用`box.set_*()`函数来[修改](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Lines_and_boxes.html#pagelinesandboxes-boxes-modifyingboxes)其属性。如下图所示，这些更改不会修改`originalBox`：

![../_images/Lines-and-boxes-Boxes-Cloning-boxes-1.png](https://www.tradingview.com/pine-script-docs/en/v5/_images/Lines-and-boxes-Boxes-Cloning-boxes-1.png)

```
Pine Script™
Copied//@version=5
indicator("Cloning boxes demo", overlay = true, max_boxes_count = 500)

//@variable The number of bars between each new mainLine assignment.
int length = input.int(20, "Length", 2)

//@variable The `chart.point` for the top-left of the `originalBox`. Contains `time` and `index` information.
topLeft = chart.point.now(high)
//@variable The `chart.point` for the bottom-right of the `originalBox`. Does not contain `time` information.
bottomRight = chart.point.from_index(bar_index + 1, low)

//@variable A new box with `topLeft` and `bottomRight` corners on every `length` bars.
var box originalBox = na

//@variable Is teal when the bar is rising, maroon when it's falling.
color originalColor = close > open ? color.teal : color.maroon

if bar_index % length == 0
    // Assign a new box using the `topLeft` and `bottomRight` info to the `originalBox`.
    // This box uses the `index` fields from the points as x-coordinates.
    originalBox := box.new(topLeft, bottomRight, originalColor, 2, bgcolor = color.new(originalColor, 60))
else
    //@variable A clone of the `originalBox`.
    box copiedBox = box.copy(originalBox)
    // Modify the `copiedBox`. These changes do not affect the `originalBox`.
    box.set_top(copiedBox, high)
    box.set_bottom_right_point(copiedBox, bottomRight)
    box.set_border_color(copiedBox, color.gray)
    box.set_border_width(copiedBox, 1)
    box.set_bgcolor(copiedBox, na)
```



### [删除框](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Lines_and_boxes.html#id15)

要删除脚本绘制的框，请使用[box.delete()](https://www.tradingview.com/pine-script-reference/v5/#fun_box.delete)。与`*.delete()`其他绘图命名空间中的函数一样，此函数可以方便地有条件地删除框或维护图表上特定数量的框。

此示例显示表示周期性累积体积值的框。该脚本 [创建](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Lines_and_boxes.html#pagelinesandboxes-boxes-creatingboxes)一个新的盒子 ID，并将其存储在`boxes` 数组中`length`。如果[数组的大小](https://www.tradingview.com/pine-script-reference/v5/#fun_array.size) 超过指定的值，脚本将使用[array.shift()](https://www.tradingview.com/pine-script-reference/v5/#fun_array.shift)`numberOfBoxes`从数组中删除最旧的框 ，并使用[box.delete()](https://www.tradingview.com/pine-script-reference/v5/#fun_box.delete)删除它。

在其他柱上，它 通过[修改](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Lines_and_boxes.html#pagelinesandboxes-boxes-modifyingboxes)数组中最后一个框的 来累积[每个周期的](https://www.tradingview.com/pine-script-reference/v5/#fun_array.last)[交易量](https://www.tradingview.com/pine-script-reference/v5/#var_volume)。然后，该脚本使用[for 循环](https://www.tradingview.com/pine-script-docs/en/v5/language/Loops.html#pageloops-for)查找所有数组框的 ，并 根据相对于 的[box.get_top()](https://www.tradingview.com/pine-script-reference/v5/#fun_box.get_top) 值设置每个框的[渐变颜色](https://www.tradingview.com/pine-script-reference/v5/#fun_color.from_gradient)：`top``boxes``highestTop``bgcolor``highestTop`

![../_images/Lines-and-boxes-Boxes-Deleting-boxes-1.png](https://www.tradingview.com/pine-script-docs/en/v5/_images/Lines-and-boxes-Boxes-Deleting-boxes-1.png)

```
Pine Script™
Copied//@version=5

//@variable The maximum number of boxes to show on the chart.
const int MAX_BOXES_COUNT = 500

indicator("Deleting boxes demo", "Cumulative volume boxes", format = format.volume, max_boxes_count = MAX_BOXES_COUNT)

//@variable The number of bars in each period.
int length = input.int(20, "Length", 1)
//@variable The maximum number of volume boxes in the calculation.
int numberOfBoxes = input.int(10, "Number of boxes", 1, MAX_BOXES_COUNT)

//@variable An array containing the ID of each box displayed by the script.
var boxes = array.new<box>()

if bar_index % length == 0
    // Push a new box into the `boxes` array. The box has the default `xloc.bar_index` property.
    boxes.push(box.new(bar_index, 0, bar_index + 1, 0, #000000, 2, text_color = #000000))
    // Shift the oldest box out of the array and delete it when the array's size exceeds the `numberOfBoxes`.
    if boxes.size() > numberOfBoxes
        box.delete(boxes.shift())

//@variable The last box drawn by the script as of the current chart bar.
box lastBox = boxes.last()
// Add the current bar's volume to the top of the `lastBox` and update the `right` index.
lastBox.set_top(lastBox.get_top() + volume)
lastBox.set_right(bar_index + 1)
// Display the top of the `lastBox` as volume-formatted text.
lastBox.set_text(str.tostring(lastBox.get_top(), format.volume))

//@variable The highest `top` of all boxes in the `boxes` array.
float highestTop = 0.0
for id in boxes
    highestTop := math.max(id.get_top(), highestTop)

// Set the `bgcolor` of each `id` in `boxes` with a gradient based on the ratio of its `top` to the `highestTop`.
for id in boxes
    id.set_bgcolor(color.from_gradient(id.get_top() / highestTop, 0, 1, color.purple, color.orange))
```

- 注意：

  在代码的顶部，我们声明了一个`MAX_BOXES_COUNT`具有“const int”*限定类型的*变量。我们使用这个值作为[indicator()](https://www.tradingview.com/pine-script-reference/v5/#fun_indicator)`max_boxes_count`函数中的 和输入的最大可能值。`numberOfBoxes`[此脚本使用box.new()](https://www.tradingview.com/pine-script-reference/v5/#fun_box.new)函数的第二个重载，该函数分别指定框的`left`、`top`、`right`和`bottom`坐标。我们已将[format.volume](https://www.tradingview.com/pine-script-reference/v5/#var_format.volume) 作为`format`参数包含在[indicator()](https://www.tradingview.com/pine-script-reference/v5/#fun_indicator) 调用中，它告诉脚本图表窗格的y 轴代表*交易*量值。每个框还将其 [最高](https://www.tradingview.com/pine-script-reference/v5/#fun_box.get_top)值显示为 [体积格式的](https://www.tradingview.com/pine-script-reference/v5/#var_format.volume)文本。



## [折线](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Lines_and_boxes.html#id16)

Pine Script™ 多段线是**高级**绘图，它 使用直线或*曲线段按顺序连接*[图表.点实例](https://www.tradingview.com/pine-script-reference/v5/#type_chart.point)[数组](https://www.tradingview.com/pine-script-reference/v5/#type_array)中 的坐标。

这些功能强大的绘图可以在图表上的任何可用位置连接多达 10,000 个点，从而允许脚本绘制自定义系列、多边形和其他复杂的几何结构，否则使用 [线条](https://www.tradingview.com/pine-script-reference/v5/#type_line)或 [框](https://www.tradingview.com/pine-script-reference/v5/#type_box)对象很难或不可能绘制这些几何结构。

该`polyline.*`命名空间具有以下用于创建和管理 [折线](https://www.tradingview.com/pine-script-reference/v5/#type_polyline)对象的内置函数：

- polyline.new [()](https://www.tradingview.com/pine-script-reference/v5/#fun_polyline.new) 函数创建一个新的折线实例。
- polyline.delete [()](https://www.tradingview.com/pine-script-reference/v5/#fun_polyline.delete) 函数删除现有的折线实例。
- polyline.all变量引用一个只读[数组，其中包含脚本显示的](https://www.tradingview.com/pine-script-reference/v5/#type_array)[所有](https://www.tradingview.com/pine-script-reference/v5/#var_polyline.all)折线的 ID。数组的 [大小](https://www.tradingview.com/pine-script-reference/v5/#fun_array.size)取决于 indicator [()](https://www.tradingview.com/pine-script-reference/v5/#fun_indicator)或 [strategy()](https://www.tradingview.com/pine-script-reference/v5/#fun_strategy)声明语句的大小以及脚本绘制的折线数。`max_polylines_count`

[与lines](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Lines_and_boxes.html#pagelinesandboxes-lines)或[box](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Lines_and_boxes.html#pagelinesandboxes-boxes)不同，polyline没有修改或读取其属性的功能。要在图表上重绘多段线，可以*删除*现有实例并*创建*一条具有所需更改的新多段线。



### [创建折线](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Lines_and_boxes.html#id17)

polyline.new [()](https://www.tradingview.com/pine-script-reference/v5/#fun_polyline.new) 函数创建一个新的[折线](https://www.tradingview.com/pine-script-reference/v5/#type_polyline) 实例以显示在图表上。它具有以下签名：

```
Pine Script™
Copiedpolyline.new(points, curved, closed, xloc, line_color, fill_color, line_style, line_width) → series polyline
```

以下八个参数影响折线绘制的行为：

- `points`

  接受一个[Chart.point](https://www.tradingview.com/pine-script-reference/v5/#type_chart.point)对象 [数组](https://www.tradingview.com/pine-script-reference/v5/#type_array) ，这些对象确定折线中每个点的坐标。该图 从*第一个开始，按顺序连接*[数组](https://www.tradingview.com/pine-script-reference/v5/#type_array)中每个元素的坐标。折线是否使用每个[图表点](https://www.tradingview.com/pine-script-docs/en/v5/language/Type_system.html#pagetypesystem-types-chartpoints)的或 字段 作为其 x 坐标取决于函数调用中的值。`index``time``xloc`

- `curved`

  指定绘图是否使用曲线段来连接 数组中的每个[图表点](https://www.tradingview.com/pine-script-reference/v5/#type_chart.point)`points`。默认值为`false`，表示它使用直线段。

- `closed`

  控制折线是否将 数组中的最后一个[图表点](https://www.tradingview.com/pine-script-reference/v5/#type_chart.point)`points`连接到第一个图表点，形成*闭合折线*。默认值为`false`。

- `xloc`

  指定折线使用数组中每个[图表点](https://www.tradingview.com/pine-script-reference/v5/#type_chart.point)的哪个字段`points`作为其 x 坐标。当其值为 [xloc.bar_index](https://www.tradingview.com/pine-script-reference/v5/#var_xloc.bar_index)时，该函数使用这些`index`字段来创建折线。当其值为 [xloc.bar_time](https://www.tradingview.com/pine-script-reference/v5/#var_xloc.bar_time)时，该函数使用这些`time`字段。默认值为 [xloc.bar_index](https://www.tradingview.com/pine-script-reference/v5/#var_xloc.bar_index)。

- `line_color`

  指定多段线绘图中所有线段的颜色。默认为`color.blue`.

- `fill_color`

  控制由折线图填充的封闭空间的颜色。它的默认值为 [na](https://www.tradingview.com/pine-script-reference/v5/#var_na)。

- `line_style`

  指定多段线的样式，可以是 此页面的[线条样式](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Lines_and_boxes.html#pagelinesandboxes-lines-linestyles)部分中的任何可用选项。默认为[line.style_solid](https://www.tradingview.com/pine-script-reference/v5/#var_line.style_solid)。

- `line_width`

  指定折线的宽度（以像素为单位）。默认值为 1。

此脚本演示了在图表上绘制折线的简单示例。它将具有交替值的新 [图表点](https://www.tradingview.com/pine-script-reference/v5/#type_chart.point)[推](https://www.tradingview.com/pine-script-reference/v5/#fun_array.push)送到数组中，并在每条柱上使用[bgcolor()](https://www.tradingview.com/pine-script-reference/v5/#fun_bgcolor)为背景着色 。`price``points``length`

在[最后一个确认的历史柱上，脚本在](https://www.tradingview.com/pine-script-reference/v5/#var_barstate.islastconfirmedhistory)[图表](https://www.tradingview.com/pine-script-reference/v5/#type_array)上绘制一条新的折线，从第一个开始连接 数组中每个[图表点的](https://www.tradingview.com/pine-script-docs/en/v5/language/Type_system.html#pagetypesystem-types-chartpoints)坐标：

![../_images/Lines-and-boxes-Polylines-Creating-polylines-1.png](https://www.tradingview.com/pine-script-docs/en/v5/_images/Lines-and-boxes-Polylines-Creating-polylines-1.png)

```
Pine Script™
Copied//@version=5
indicator("Creating polylines demo", "Oscillating polyline")

//@variable The number of bars between each point in the drawing.
int length = input.int(20, "Length between points", 2)

//@variable An array of `chart.point` objects to sequentially connect with a polyline.
var points = array.new<chart.point>()

//@variable The y-coordinate of each point in the `points`. Alternates between 1 and -1 on each `newPoint`.
var int yValue = 1

//@variable Is `true` once every `length` bars, `false` otherwise.
bool newPoint = bar_index % length == 0

if newPoint
    // Push a new `chart.point` into the `points`. The new point contains `time` and `index` info.
    points.push(chart.point.now(yValue))
    // Change the sign of the `yValue`.
    yValue *= -1

// Draw a new `polyline` on the last confirmed historical chart bar.
// The polyline uses the `time` field from each `chart.point` in the `points` array as x-coordinates.
if barstate.islastconfirmedhistory
    polyline.new(points, xloc = xloc.bar_time, line_color = #9151A6, line_width = 3)

// Highlight the chart background on every `newPoint` condition.
bgcolor(newPoint ? color.new(color.gray, 70) : na, title = "New point highlight")
```

- 注意：

  该脚本仅使用*一条折线将*[数组](https://www.tradingview.com/pine-script-reference/v5/#type_array)中的 每个[图表点](https://www.tradingview.com/pine-script-docs/en/v5/language/Type_system.html#pagetypesystem-types-chartpoints)与直线段连接起来，并且该绘图从第一个条形图开始跨越整个可用图表数据。[虽然使用lines](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Lines_and_boxes.html#pagelinesandboxes-lines)可以达到类似的效果，但这样做需要在每次出现条件时都需要一个新的 [线](https://www.tradingview.com/pine-script-reference/v5/#type_line)`newPoint`实例 ，并且这样的绘图最多只能有500条线段。另一方面，该单个未闭合折线图最多可以包含 9,999 条线段。



#### [曲线图](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Lines_and_boxes.html#id18)

折线可以绘制用[直线](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Lines_and_boxes.html#pagelinesandboxes-lines) 或[方框](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Lines_and_boxes.html#pagelinesandboxes-boxes)无法绘制的*曲线*。启用[polyline.new()](https://www.tradingview.com/pine-script-reference/v5/#fun_polyline.new)函数的参数 时，生成的折线会在其 [数组](https://www.tradingview.com/pine-script-reference/v5/#type_array)中每个[图表点](https://www.tradingview.com/pine-script-reference/v5/#type_chart.point)的坐标之间 插入*非线性*值，以生成曲线效果。`curved``points`

例如，我们前面示例中的“振荡折线”脚本使用*直线*段来生成类似于三角波的图形，这意味着波形在波峰和波谷之间呈锯齿形。如果我们将该 示例中的[polyline.new()](https://www.tradingview.com/pine-script-reference/v5/#fun_polyline.new) 调用`curved`中的参数设置为 ，则生成的绘图将使用*曲线*段连接点，产生类似于正弦波的平滑非线性形状：`true`

![../_images/Lines-and-boxes-Polylines-Creating-polylines-Curved-drawings-1.png](https://www.tradingview.com/pine-script-docs/en/v5/_images/Lines-and-boxes-Polylines-Creating-polylines-Curved-drawings-1.png)

```
Pine Script™
Copied//@version=5
indicator("Curved drawings demo", "Smooth oscillating polyline")

//@variable The number of bars between each point in the drawing.
int length = input.int(20, "Length between points", 2)

//@variable An array of `chart.point` objects to sequentially connect with a polyline.
var points = array.new<chart.point>()

//@variable The y-coordinate of each point in the `points`. Alternates between 1 and -1 on each `newPoint`.
var int yValue = 1

//@variable Is `true` once every `length` bars, `false` otherwise.
bool newPoint = bar_index % length == 0

if newPoint
    // Push a new `chart.point` into the `points`. The new point contains `time` and `index` info.
    points.push(chart.point.now(yValue))
    // Change the sign of the `yValue`.
    yValue *= -1

// Draw a new curved `polyline` on the last confirmed historical chart bar.
// The polyline uses the `time` field from each `chart.point` in the `points` array as x-coordinates.
if barstate.islastconfirmedhistory
    polyline.new(points, curved = true, xloc = xloc.bar_time, line_color = #9151A6, line_width = 3)

// Highlight the chart background on every `newPoint` condition.
bgcolor(newPoint ? color.new(color.gray, 70) : na, title = "New point highlight")
```

请注意，在此示例中，平滑曲线具有相对一致的行为，并且绘图的任何部分都不会超出其定义的坐标，但绘制弯曲多段线时情况并非总是如此。用于构造折线的数据严重影响其在点之间插值的平滑分段函数。在某些情况下，插值曲线*可能*超出其实际坐标。

让我们向示例数组中的[图表点](https://www.tradingview.com/pine-script-docs/en/v5/language/Type_system.html#pagetypesystem-types-chartpoints)`points`添加一些变化来演示此行为。在下面的版本中，脚本将`yValue`与 [图表.point.now()](https://www.tradingview.com/pine-script-reference/v5/#fun_chart.point.now)调用中的 [随机](https://www.tradingview.com/pine-script-reference/v5/#fun_math.random)值相乘。

为了可视化该行为，此脚本还在数组 中每个[图表点的](https://www.tradingview.com/pine-script-reference/v5/#type_chart.point)值 处创建一条[水平线](https://www.tradingview.com/pine-script-reference/v5/#type_line)，并显示另一条用直线段连接相同点的折线。正如我们在图表上看到的，两条折线都经过数组中的所有坐标。然而，弯曲折线有时会*超出*[水平线](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Lines_and_boxes.html#pagelinesandboxes-lines)指示的垂直边界，而使用直线段绘制的折线则不会：`price``points``points`

![../_images/Lines-and-boxes-Polylines-Creating-polylines-Curved-drawings-2.png](https://www.tradingview.com/pine-script-docs/en/v5/_images/Lines-and-boxes-Polylines-Creating-polylines-Curved-drawings-2.png)

```
Pine Script™
Copied//@version=5
indicator("Curved drawings demo", "Random oscillating polylines")

//@variable The number of bars between each point in the drawing.
int length = input.int(20, "Length between points", 2)

//@variable An array of `chart.point` objects to sequentially connect with a polyline.
var points = array.new<chart.point>()

//@variable The sign of each `price` in the `points`. Alternates between 1 and -1 on each `newPoint`.
var int yValue = 1

//@variable Is `true` once every `length` bars.
bool newPoint = bar_index % length == 0

if newPoint
    // Push a new `chart.point` with a randomized `price` into the `points`.
    // The new point contains `time` and `index` info.
    points.push(chart.point.now(yValue * math.random()))
    // Change the sign of the `yValue`.
    yValue *= -1

    //@variable The newest `chart.point`.
    lastPoint = points.last()
    // Draw a horizontal line at the `lastPoint.price`. This line uses the default `xloc.bar_index`.
    line.new(lastPoint.index - length, lastPoint.price, lastPoint.index + length, lastPoint.price, color = color.red)

// Draw two `polyline` instances on the last confirmed chart bar.
// Both polylines use the `time` field from each `chart.point` in the `points` array as x-coordinates.
if barstate.islastconfirmedhistory
    polyline.new(points, curved = false, xloc = xloc.bar_time, line_color = #EB8A3B, line_width = 2)
    polyline.new(points, curved = true, xloc = xloc.bar_time, line_color = #9151A6, line_width = 3)

// Highlight the chart background on every `newPoint` condition.
bgcolor(newPoint ? color.new(color.gray, 70) : na, title = "New point highlight")
```



#### [闭合形状](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Lines_and_boxes.html#id19)

由于一条多段线可以包含许多直线或曲线段，并且该`closed`参数允许绘图连接其 数组中 [第](https://www.tradingview.com/pine-script-reference/v5/#type_array)一个和最后一个[图表点的](https://www.tradingview.com/pine-script-reference/v5/#type_chart.point)坐标，因此我们可以使用多段线来绘制许多不同类型的闭合多边形形状。`points`

让我们在 Pine 中绘制一些多边形。以下脚本定期绘制以 [hl2](https://www.tradingview.com/pine-script-reference/v5/#var_hl2)价格值为中心的随机多边形。

每次出现该`newPolygon`条件时，它[都会清除](https://www.tradingview.com/pine-script-reference/v5/#fun_array.clear) 数组`points`，根据 [math.random()](https://www.tradingview.com/pine-script-reference/v5/#fun_math.random)值 计算新多边形绘图的`numberOfSides`和，然后使用[for 循环](https://www.tradingview.com/pine-script-docs/en/v5/language/Loops.html#pageloops-for)将新[图表点](https://www.tradingview.com/pine-script-docs/en/v5/language/Type_system.html#pagetypesystem-types-chartpoints)推入 包含来自椭圆路径的步进坐标的[数组](https://www.tradingview.com/pine-script-reference/v5/#type_array)中带和半轴。该脚本通过使用带有直线段的*闭合折线*连接数组 中的每个[图表.点](https://www.tradingview.com/pine-script-reference/v5/#type_chart.point)来绘制多边形 ：`rotationOffset``numberOfSides``xScale``yScale``points`

![../_images/Lines-and-boxes-Polylines-Creating-polylines-Closed-shapes-1.png](https://www.tradingview.com/pine-script-docs/en/v5/_images/Lines-and-boxes-Polylines-Creating-polylines-Closed-shapes-1.png)

```
Pine Script™
Copied//@version=5
indicator("Closed shapes demo", "N-sided polygons", true)

//@variable The size of the horizontal semi-axis.
float xScale = input.float(3.0, "X scale", 1.0)
//@variable The size of the vertical semi-axis.
float yScale = input.float(1.0, "Y scale") * ta.atr(2)

//@variable An array of `chart.point` objects containing vertex coordinates.
var points = array.new<chart.point>()

//@variable The condition that triggers a new polygon drawing. Based on the horizontal axis to prevent overlaps.
bool newPolygon = bar_index % int(math.round(2 * xScale)) == 0 and barstate.isconfirmed

if newPolygon
    // Clear the `points` array.
    points.clear()

    //@variable The number of sides and vertices in the new polygon.
    int numberOfSides = int(math.random(3, 7))
    //@variable A random rotation offset applied to the new polygon, in radians.
    float rotationOffset = math.random(0.0, 2.0) * math.pi
    //@variable The size of the angle between each vertex, in radians.
    float step = 2 * math.pi / numberOfSides

    //@variable The counter-clockwise rotation angle of each vertex.
    float angle = rotationOffset

    for i = 1 to numberOfSides
        //@variable The approximate x-coordinate from an ellipse at the `angle`, rounded to the nearest integer.
        int xValue = int(math.round(xScale * math.cos(angle))) + bar_index
        //@variable The y-coordinate from an ellipse at the `angle`.
        float yValue = yScale * math.sin(angle) + hl2

        // Push a new `chart.point` containing the `xValue` and `yValue` into the `points` array.
        // The new point does not contain `time` information.
        points.push(chart.point.from_index(xValue, yValue))
        // Add the `step` to the `angle`.
        angle += step

    // Draw a closed polyline connecting the `points`.
    // The polyline uses the `index` field from each `chart.point` in the `points` array.
    polyline.new(
         points, closed = true, line_color = color.navy, fill_color = color.new(color.orange, 50), line_width = 3
     )
```

- 注意：

  此示例显示了图表上最后约 50 条折线，因为我们没有`max_polylines_count` 在[Indicator()](https://www.tradingview.com/pine-script-reference/v5/#fun_indicator)函数调用中指定值。该`yScale`计算将[input.float()](https://www.tradingview.com/pine-script-reference/v5/#fun_input.float) 乘以[ta.atr(2)](https://www.tradingview.com/pine-script-reference/v5/#fun_ta.atr)以使绘图的垂直比例适应最近的价格范围。生成的多边形的最大宽度是水平半轴 ( ) 的两倍，四舍五入到最接近的整数。该条件使用该值来防止多边形绘图重叠。`2 * xScale``newPolygon`该脚本将计算四舍五入`xValue`为最接近的整数，因为[图表](https://www.tradingview.com/pine-script-reference/v5/#type_chart.point)`index`的 x 轴不包括小数条形索引，所以图表的字段仅接受 [int值。](https://www.tradingview.com/pine-script-reference/v5/#type_int)



### [删除折线](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Lines_and_boxes.html#id20)

要删除特定的折线`id`，请使用 [polyline.delete()](https://www.tradingview.com/pine-script-reference/v5/#fun_polyline.delete)。此函数从脚本中删除[折线](https://www.tradingview.com/pine-script-reference/v5/#type_polyline) 对象及其在图表上的绘制。

与其他绘图对象一样，我们可以使用 [polyline.delete()](https://www.tradingview.com/pine-script-reference/v5/#fun_polyline.delete) 来维护特定数量的折线绘图或有条件地从图表中删除绘图。

例如，下面的脚本定期绘制近似算术螺旋并将其折线 ID 存储在数组中[，](https://www.tradingview.com/pine-script-reference/v5/#type_array)该 [数组用作队列](https://www.tradingview.com/pine-script-docs/en/v5/language/Arrays.html#pagearrays-insertingandremovingarrayelements-usinganarrayasaqueue)来管理其显示的绘图数量。

当`newSpiral`条件发生时，脚本会创建一个`points`数组并 在[for 循环](https://www.tradingview.com/pine-script-docs/en/v5/language/Loops.html#pageloops-for)中添加[图表点](https://www.tradingview.com/pine-script-docs/en/v5/language/Type_system.html#pagetypesystem-types-chartpoints)。在每次循环迭代中，它调用[用户定义的函数](https://www.tradingview.com/pine-script-docs/en/v5/language/User-defined_functions.html#pageuserdefinedfunctions) 来创建一个新的[Chart.point](https://www.tradingview.com/pine-script-reference/v5/#type_chart.point)，其中包含来自相对于 增长的椭圆路径的步进值。然后，该脚本创建一条随机颜色的*弯曲多段线*，连接来自 的坐标，并将 其 ID 推入[数组](https://www.tradingview.com/pine-script-reference/v5/#fun_array.push)。`spiralPoint()` `angle``points``polylines`

当数组的[大小](https://www.tradingview.com/pine-script-reference/v5/#fun_array.size) 超过指定的值时`numberOfSpirals`，脚本使用 [array.shift()删除最旧的折线，并使用](https://www.tradingview.com/pine-script-reference/v5/#fun_array.shift)[polyline.delete()](https://www.tradingview.com/pine-script-reference/v5/#fun_polyline.delete)删除对象：

![../_images/Lines-and-boxes-Polylines-Deleting-polylines-1.png](https://www.tradingview.com/pine-script-docs/en/v5/_images/Lines-and-boxes-Polylines-Deleting-polylines-1.png)

```
Pine Script™
Copied//@version=5

//@variable The maximum number of polylines allowed on the chart.
const int MAX_POLYLINES_COUNT = 100

indicator("Deleting polylines example", "Spirals", true, max_polylines_count = MAX_POLYLINES_COUNT)

//@variable The number of spiral drawings on the chart.
int numberOfSpirals = input.int(10, "Spirals shown", 1, MAX_POLYLINES_COUNT)
//@variable The number of full spiral rotations to draw.
int rotations = input.int(5, "Rotations", 1)
//@variable The scale of the horizontal semi-axis.
float xScale = input.float(1.0, "X scale")
//@variable The scale of the vertical semi-axis.
float yScale = input.float(0.2, "Y scale") * ta.atr(2)

//@function Calculates an approximate point from an elliptically-scaled arithmetic spiral.
//@returns  A `chart.point` with `index` and `price` information.
spiralPoint(float angle, int xOffset, float yOffset) =>
    result = chart.point.from_index(
         int(math.round(angle * xScale * math.cos(angle))) + xOffset,
         angle * yScale * math.sin(angle) + yOffset
     )

//@variable An array of polylines.
var polylines = array.new<polyline>()

//@variable The condition to create a new spiral.
bool newSpiral = bar_index % int(math.round(4 * math.pi * rotations * xScale)) == 0

if newSpiral
    //@variable An array of `chart.point` objects for the `spiral` drawing.
    points = array.new<chart.point>()
    //@variable The counter-clockwise angle between calculated points, in radians.
    float step = math.pi / 2
    //@variable The rotation angle of each calculated point on the spiral, in radians.
    float theta = 0.0
    // Loop to create the spiral's points. Creates 4 points per full rotation.
    for i = 0 to rotations * 4
        //@variable A new point on the calculated spiral.
        chart.point newPoint = spiralPoint(theta, bar_index, ohlc4)
        // Add the `newPoint` to the `points` array.
        points.push(newPoint)
        // Add the `step` to the `theta` angle.
        theta += step

    //@variable A random color for the new `spiral` drawing.
    color spiralColor = color.rgb(math.random(150, 255), math.random(0, 100), math.random(150, 255))
    //@variable A new polyline connecting the spiral points. Uses the `index` field from each point as x-coordinates.
    polyline spiral = polyline.new(points, true, line_color = spiralColor, line_width = 3)

    // Push the new `spiral` into the `polylines` array.
    polylines.push(spiral)
    // Shift the first polyline out of the array and delete it when the array's size exceeds the `numberOfSpirals`.
    if polylines.size() > numberOfSpirals
        polyline.delete(polylines.shift())

// Highlight the background when `newSpiral` is `true`.
bgcolor(newSpiral ? color.new(color.blue, 70) : na, title = "New drawing highlight")
```

- 注意：

  我们声明了一个`MAX_POLYLINES_COUNT`常量值为 100 的全局变量。脚本使用该常量作为[Indicator()](https://www.tradingview.com/pine-script-reference/v5/#fun_indicator)`max_polylines_count`函数中的值 和输入的值。`maxval``numberOfSpirals`[与上一节](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Lines_and_boxes.html#pagelinesandboxes-polylines-creatingpolylines-closedshapes)中的“N 边多边形”示例一样，我们将 x 坐标的计算四舍五入为最接近的整数，因为[Chart.point](https://www.tradingview.com/pine-script-reference/v5/#type_chart.point)`index`的字段 只能接受 [int](https://www.tradingview.com/pine-script-reference/v5/#type_int)值。尽管绘图外观平滑，但每个折线的`points`数组每次螺旋旋转仅包含*四个* [图表点](https://www.tradingview.com/pine-script-reference/v5/#type_chart.point)对象。由于[polyline.new()](https://www.tradingview.com/pine-script-reference/v5/#fun_polyline.new)调用包含，因此每条折线都使用*平滑曲线*来连接它们，从而产生螺旋实际曲率的视觉近似值。`curved = true``points`每个螺旋的宽度约为，四舍五入到最接近的整数。我们在条件中使用该值来间隔每个绘图并防止重叠。`4 * math.pi * rotations * xScale``newSpiral`



### [重画折线](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Lines_and_boxes.html#id21)

在某些情况下，可能需要在脚本执行过程中更改多段线绘制。虽然`polyline.*`命名空间不包含内置的 setter 函数，但我们可以通过*删除*现有折线并分配具有所需更改的*新实例**来重新绘制变量或*[集合引用的](https://www.tradingview.com/pine-script-docs/en/v5/language/Type_system.html#pagetypesystem-types-collections)折线。

以下示例使用[polyline.delete()](https://www.tradingview.com/pine-script-reference/v5/#fun_polyline.delete) 和[polyline.new()](https://www.tradingview.com/pine-script-reference/v5/#fun_polyline.new)调用来更新折线变量的值。

该脚本绘制闭合多段线，连接包含`length`柱线的周期的开盘点、最高点、最低点和收盘点。它在第一个条上创建一个 `currentDrawing`变量，并在每个图表条上为其分配一个折线 ID。它使用`openPoint`、 `highPoint`、`lowPoint`和`closePoint`变量来参考[图表点](https://www.tradingview.com/pine-script-docs/en/v5/language/Type_system.html#pagetypesystem-types-chartpoints) ，以跟踪该时期发展中的 OHLC 值。当新值出现时，脚本将新的 [Chart.point](https://www.tradingview.com/pine-script-reference/v5/#type_chart.point)对象分配给变量，使用 [array.from将它们收集在](https://www.tradingview.com/pine-script-reference/v5/#fun_array.from)[数组](https://www.tradingview.com/pine-script-reference/v5/#type_array)中，然后创建一条 连接数组点坐标的[新折线](https://www.tradingview.com/pine-script-reference/v5/#fun_polyline.new)并将其分配给.`currentDrawing`

当`newPeriod`条件为`false`（即当前周期未完成）时，脚本 [将删除](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Lines_and_boxes.html#pagelinesandboxes-polylines-deletingpolylines)`currentDrawing`before [创建新的折线](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Lines_and_boxes.html#pagelinesandboxes-polylines-creatingpolylines)所引用的折线，从而生成随开发周期变化的动态绘图：

![../_images/Lines-and-boxes-Polylines-Redrawing-polylines-1.png](https://www.tradingview.com/pine-script-docs/en/v5/_images/Lines-and-boxes-Polylines-Redrawing-polylines-1.png)

```
Pine Script™
Copied//@version=5
indicator("Redrawing polylines demo", "OHLC polygons", true, max_polylines_count = 100)

//@variable The length of the period.
int length = input.int(100, "Length", 1)

//@variable A `chart.point` representing the start of each period.
var chart.point openPoint = na
//@variable A `chart.point` representing the highest point of each period.
var chart.point highPoint = na
//@variable A `chart.point` representing the lowest point of each period.
var chart.point lowPoint = na
//@variable A `chart.point` representing the current bar's closing point.
closePoint = chart.point.now(close)

//@variable The current period's polyline drawing.
var polyline currentDrawing = na

//@variable Is `true` once every `length` bars.
bool newPeriod = bar_index % length == 0

if newPeriod
    // Assign new chart points to the `openPoint`, `highPoint`, and `closePoint`.
    openPoint := chart.point.now(open)
    highPoint := chart.point.now(high)
    lowPoint  := chart.point.now(low)
else
    // Assign a new `chart.point` to the `highPoint` when the `high` is greater than its `price`.
    if high > highPoint.price
        highPoint := chart.point.now(high)
    // Assign a new `chart.point` to the `lowPoint` when the `low` is less than its `price`.
    if low < lowPoint.price
        lowPoint := chart.point.now(low)

//@variable Is teal when the `closePoint.price` is greater than the `openPoint.price`, maroon otherwise.
color drawingColor = closePoint.price > openPoint.price ? color.teal : color.maroon

// Delete the polyline assigned to the `currentDrawing` if it's not a `newPeriod`.
if not newPeriod
    polyline.delete(currentDrawing)
// Assign a new polyline to the `currentDrawing`.
// Uses the `index` field from each `chart.point` in its array as x-coordinates.
currentDrawing := polyline.new(
     array.from(openPoint, highPoint, closePoint, lowPoint), closed = true,
     line_color = drawingColor, fill_color = color.new(drawingColor, 60)
 )
```



## [实时行为](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Lines_and_boxes.html#id22)

[Lines](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Lines_and_boxes.html#pagelinesandboxes-lines)、[ Box](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Lines_and_boxes.html#pagelinesandboxes-boxes)和[Polylines](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Lines_and_boxes.html#pagelinesandboxes-polylines) 都会受到*提交*和*回滚*操作的影响，这会影响脚本在实时栏上执行时的行为。[请参阅有关 Pine Script™执行模型](https://www.tradingview.com/pine-script-docs/en/v5/language/Execution_model.html#pageexecutionmodel)的页面。

*此脚本演示了在实时、未确认的*图表条上执行时回滚的效果：

![../_images/Lines-and-boxes-Realtime-behavior-1.png](https://www.tradingview.com/pine-script-docs/en/v5/_images/Lines-and-boxes-Realtime-behavior-1.png)

```
Pine Script™
Copied//@version=5
indicator("Realtime behavior demo", overlay = true)

//@variable Is orange when the `line` is subject to rollback and gray after the `line` is committed.
color lineColor = barstate.isconfirmed ? color.gray : color.orange

line.new(bar_index, hl2, bar_index + 1, hl2, color = lineColor, width = 4)
```

当未确认柱上的值发生变化时，本示例中的 line.new() 调用会在每次迭代中创建[一个](https://www.tradingview.com/pine-script-reference/v5/#fun_line.new)新的 [线条](https://www.tradingview.com/pine-script-reference/v5/#type_line)ID。由于每次迭代之前的*回滚*，脚本会自动删除在该栏中每次更改时创建的对象 。它仅*提交*在柱关闭之前创建的最后一行，并且该 [行](https://www.tradingview.com/pine-script-reference/v5/#type_line)实例是在已确认的柱上持续存在的实例。



## [限制](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Lines_and_boxes.html#id23)



### [对象总数](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Lines_and_boxes.html#id24)

[Lines](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Lines_and_boxes.html#pagelinesandboxes-lines)、[ Box](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Lines_and_boxes.html#pagelinesandboxes-boxes)和[Polylines](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Lines_and_boxes.html#pagelinesandboxes-polylines) 会消耗服务器资源，这就是每个脚本的绘图总数受到限制的原因。当脚本创建的绘图对象多于允许的限制时，Pine Script™ 运行时会在称为*垃圾收集的*过程中自动删除最旧的绘图对象。

单个脚本最多可以包含 500 条线、500 个框和 100 条折线。用户可以通过在脚本的 [indicator()](https://www.tradingview.com/pine-script-reference/v5/#fun_indicator)或 [strategy()](https://www.tradingview.com/pine-script-reference/v5/#fun_strategy)声明语句中指定`max_lines_count`、`max_boxes_count`和值来控制垃圾收集限制。`max_polylines_count`

该脚本演示了 Pine 中垃圾收集的工作原理。它在每个图表栏上创建新的线条、框和折线。我们没有在[Indicator()](https://www.tradingview.com/pine-script-reference/v5/#fun_indicator)`max_lines_count`函数调用中指定、`max_boxes_count`或`max_polylines_count`参数的 值，因此脚本将维护图表上最近的约 50 条线、框和折线，因为这是每个参数的默认设置：

![../_images/Lines-and-boxes-Limitations-Total-number-of-objects-1.png](https://www.tradingview.com/pine-script-docs/en/v5/_images/Lines-and-boxes-Limitations-Total-number-of-objects-1.png)

```
Pine Script™
Copied//@version=5
indicator("Garbage collection demo", overlay = true)

//@variable A new `chart.point` at the current `bar_index` and `high`.
firstPoint = chart.point.now(high)
//@variable A new `chart.point` one bar into the future at the current `low`.
secondPoint = chart.point.from_index(bar_index + 1, low)
//@variable A new `chart.point` one bar into the future at the current `high`.
thirdPoint = chart.point.from_index(bar_index + 1, high)

// Draw a new `line` connecting the `firstPoint` to the `secondPoint`.
line.new(firstPoint, secondPoint, color = color.red, width = 2)
// Draw a new `box` with the `firstPoint` top-left corner and `secondPoint` bottom-right corner.
box.new(firstPoint, secondPoint, color.purple, 2, bgcolor = na)
// Draw a new `polyline` connecting the `firstPoint`, `secondPoint`, and `thirdPoint` sequentially.
polyline.new(array.from(firstPoint, secondPoint, thirdPoint), true, line_width = 2)
```

- 注意：

  我们使用 TradingView 的“Measure”绘图工具来测量脚本绘图对象覆盖的柱形数量。



### [未来对 `xloc.bar_index` 的引用](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Lines_and_boxes.html#id25)

使用[xloc.bar_index](https://www.tradingview.com/pine-script-reference/v5/#var_xloc.bar_index)定位的对象 可以包含未来不超过 500 个柱的 x 坐标。



### [其他上下文](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Lines_and_boxes.html#id26)

脚本不能在函数中使用[lines](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Lines_and_boxes.html#pagelinesandboxes-lines)、[boxes](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Lines_and_boxes.html#pagelinesandboxes-boxes)或多 [段](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Lines_and_boxes.html#pagelinesandboxes-polylines)`request.*()`线。这些类型的实例可以使用调用中的值`request.*()`，但脚本只能在图表的上下文中创建和绘制它们。

`timeframe`此限制也是为什么在 [indicator()](https://www.tradingview.com/pine-script-reference/v5/#fun_indicator)声明语句中使用参数时绘图对象无法工作的原因。



### [历史缓冲区和 `max_bars_back` ](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Lines_and_boxes.html#id27)

将[barstate.isrealtime](https://www.tradingview.com/pine-script-reference/v5/#var_barstate.isrealtime) 与绘图结合使用有时可能会产生意想不到的结果。例如，此脚本的目的是忽略所有历史柱并在*实时*柱上绘制跨越 300 个柱的水平线：

```
Pine Script™
Copied//@version=5
indicator("Historical buffer demo", overlay = true)

//@variable A `chart.point` at the `bar_index` from 300 bars ago and current `close`.
firstPoint = chart.point.from_index(bar_index[300], close)
//@variable The current bar's `chart.point` containing the current `close`.
secondPoint = chart.point.now(close)

// Draw a new line on realtime bars.
if barstate.isrealtime
    line.new(firstPoint, secondPoint)
```

但是，它会在运行时失败并引发错误。该脚本失败，因为它无法确定基础[时间](https://www.tradingview.com/pine-script-reference/v5/#var_time)序列历史值的缓冲区大小 。尽管代码不包含内置[时间](https://www.tradingview.com/pine-script-reference/v5/#var_time) 变量，但内置[bar_index](https://www.tradingview.com/pine-script-reference/v5/#var_bar_index)在其内部工作中使用 [时间](https://www.tradingview.com/pine-script-reference/v5/#var_time)序列。因此，要访问300 个柱之前的[bar_index](https://www.tradingview.com/pine-script-reference/v5/#var_bar_index)值，需要[时间](https://www.tradingview.com/pine-script-reference/v5/#var_time)序列的历史缓冲区至少为 300 个柱。

Pine Script™ 包含一种在大多数情况下自动检测所需历史缓冲区大小的机制。它的工作原理是让脚本在有限的时间内访问任意数量的柱的历史值。在此脚本的情况下，使用[barstate.isrealtime](https://www.tradingview.com/pine-script-reference/v5/#var_barstate.isrealtime)控制线条的绘制会阻止其访问历史系列，因此无法推断所需的历史缓冲区大小，并且脚本失败。

解决此问题的简单方法是在评估[条件结构](https://www.tradingview.com/pine-script-docs/en/v5/language/Conditional_structures.html#pageconditionalstructures)之前使用[max_bars_back()](https://www.tradingview.com/pine-script-reference/v5/#fun_max_bars_back) 函数*显式定义*[时间](https://www.tradingview.com/pine-script-reference/v5/#var_time)序列的历史缓冲区：

```
Pine Script™
Copied//@version=5
indicator("Historical buffer demo", overlay = true)

//@variable A `chart.point` at the `bar_index` from 300 bars ago and current `close.
firstPoint = chart.point.from_index(bar_index[300], close)
//@variable The current bar's `chart.point` containing the current `close`.
secondPoint = chart.point.now(close)

// Explicitly set the historical buffer of the `time` series to 300 bars.
max_bars_back(time, 300)

// Draw a new line on realtime bars.
if barstate.isrealtime
    line.new(firstPoint, secondPoint)
```

此类问题可能会令人困惑，但非常罕见。 Pine Script™ 团队希望随着时间的推移消除它们。