# 对象

提示：

此页面包含高级材料。如果您是一名初级 Pine Script™ 程序员，我们建议您在冒险之前熟悉其他更易于使用的 Pine Script™ 功能。

## [介绍](https://www.tradingview.com/pine-script-docs/en/v5/language/Objects.html#id1)

Pine Script™ 对象是*用户定义类型*(UDT) 的实例。它们相当于包含称为*fields*的部分的变量，每个变量都能够保存各种类型的独立值。

有经验的程序员可以将 UDT 视为无方法类。它们允许用户创建自定义类型，在一个逻辑实体下组织不同的值。



## [创建对象](https://www.tradingview.com/pine-script-docs/en/v5/language/Objects.html#id2)

在创建对象之前，必须定义其类型。[类型系统](https://www.tradingview.com/pine-script-docs/en/v5/language/Type_system.html#pagetypesystem)页面的用户[定义类型](https://www.tradingview.com/pine-script-docs/en/v5/language/Type_system.html#pagetypesystem-userdefinedtypes)部分 解释了如何执行此操作。

让我们定义一个`pivotPoint`类型来保存枢轴信息：

```javascript
type pivotPoint
    int x
    float y
    string xloc = xloc.bar_time
```

注意：

- 我们使用[type](https://www.tradingview.com/pine-script-reference/v5/#op_type)关键字来声明 UDT 的创建。
- 我们将新的 UDT 命名为`pivotPoint`。
- 在第一行之后，我们创建一个包含每个字段的类型和名称的本地块。
- 该`x`字段将保存枢轴的 x 坐标。它被声明为“int”，因为它将保存“int”类型的时间戳或条形索引。
- `y`是一个“浮动”，因为它将保持枢轴的价格。
- `xloc``x`是一个字段，用于指定xloc.bar_index 或 [xloc.bar_time](https://www.tradingview.com/pine-script-reference/v5/#var_xloc{dot}bar_time)[的](https://www.tradingview.com/pine-script-reference/v5/#var_xloc{dot}bar_index)单位。我们 使用运算符将其默认值设置为[xloc.bar_time](https://www.tradingview.com/pine-script-reference/v5/#var_xloc{dot}bar_time)。当从该 UDT 创建对象时，其字段将设置为该值。`=``xloc`

现在我们的`pivotPoint`UDT 已定义，我们可以继续从中创建对象。我们使用 UDT 的`new()`内置方法创建对象。要从 UDT 创建新`foundPoint`对象`pivotPoint`，我们使用：

```javascript
foundPoint = pivotPoint.new()
```

我们还可以使用以下命令为创建的对象指定字段值：

```javascript
foundPoint = pivotPoint.new(time, high)
```

或者等价的：

```javascript
foundPoint = pivotPoint.new(x = time, y = high)
```

此时，该`foundPoint`对象的字段将包含创建时内置的 [时间](https://www.tradingview.com/pine-script-reference/v5/#var_time)`x`值 ，将包含[high](https://www.tradingview.com/pine-script-reference/v5/#var_high)值 ，并且该字段将包含其默认值 [xloc.bar_time](https://www.tradingview.com/pine-script-reference/v5/#var_xloc{dot}bar_time) ，因为创建时没有为其定义值。目的。`y``xloc`

还可以通过使用以下内容声明对象名称[来](https://www.tradingview.com/pine-script-reference/v5/#var_na)创建对象占位符 ：

```javascript
pivotPoint foundPoint = na
```

此示例显示检测到高枢轴的标签。枢轴`legsInput`在出现后会被检测到，因此我们必须绘制过去的标签，以便它出现在枢轴上：

```javascript
//@version=5
indicator("Pivot labels", overlay = true)
int legsInput = input(10)

// Define the `pivotPoint` UDT.
type pivotPoint
    int x
    float y
    string xloc = xloc.bar_time

// Detect high pivots.
pivotHighPrice = ta.pivothigh(legsInput, legsInput)
if not na(pivotHighPrice)
    // A new high pivot was found; display a label where it occurred `legsInput` bars back.
    foundPoint = pivotPoint.new(time[legsInput], pivotHighPrice)
    label.new(
      foundPoint.x,
      foundPoint.y,
      str.tostring(foundPoint.y, format.mintick),
      foundPoint.xloc,
      textcolor = color.white)
```

请注意上面示例中的这一行：

```javascript
foundPoint = pivotPoint.new(time[legsInput], pivotHighPrice)
```

也可以使用以下形式编写：

```javascript
pivotPoint foundPoint = na
foundPoint := pivotPoint.new(time[legsInput], pivotHighPrice)
```

[当使用var](https://www.tradingview.com/pine-script-reference/v5/#op_var)或 [varip](https://www.tradingview.com/pine-script-reference/v5/#op_varip)创建对象时，这些关键字适用于该对象的所有字段：

```javascript
//@version=5
indicator("")
type barInfo
    int i = bar_index
    int t = time
    float c = close

// Created on bar zero.
var firstBar = barInfo.new()
// Created on every bar.
currentBar = barInfo.new()

plot(firstBar.i)
plot(currentBar.i)
```



## [更改字段值](https://www.tradingview.com/pine-script-docs/en/v5/language/Objects.html#id3)

[可以使用:=](https://www.tradingview.com/pine-script-docs/en/v5/language/Operators.html#pageoperators-reassignmentoperator)重新赋值运算符更改对象字段的值 。

我们前面的例子中的这一行：

```javascript
foundPoint = pivotPoint.new(time[legsInput], pivotHighPrice)
```

可以使用以下方式编写：

```javascript
foundPoint = pivotPoint.new()
foundPoint.x := time[legsInput]
foundPoint.y := pivotHighPrice
```



## [收集对象](https://www.tradingview.com/pine-script-docs/en/v5/language/Objects.html#id4)

Pine Script™ 集合（[数组](https://www.tradingview.com/pine-script-docs/en/v5/language/Arrays.html#pagearrays)、[矩阵](https://www.tradingview.com/pine-script-docs/en/v5/language/Matrices.html#pagematrices)和[映射](https://www.tradingview.com/pine-script-docs/en/v5/language/Maps.html#pagemaps)）可以包含对象，允许用户向其数据结构添加虚拟维度。要声明对象集合，请将 UDT 名称传递到其[类型模板](https://www.tradingview.com/pine-script-docs/en/v5/language/Type_system.html#pagetypesystem-typetemplates)中。

此示例声明一个空[数组](https://www.tradingview.com/pine-script-reference/v5/#type_array)，该数组将保存`pivotPoint`用户定义类型的对象：

```javascript
pivotHighArray = array.new<pivotPoint>()
```

要将变量的类型显式声明为[用户定义类型](https://www.tradingview.com/pine-script-docs/en/v5/language/Type_system.html#pagetypesystem-userdefinedtypes)的[数组](https://www.tradingview.com/pine-script-reference/v5/#type_array)、 [矩阵](https://www.tradingview.com/pine-script-reference/v5/#type_matrix)或 [映射](https://www.tradingview.com/pine-script-reference/v5/#type_map)，请使用集合的 type 关键字，后跟其[类型模板](https://www.tradingview.com/pine-script-docs/en/v5/language/Type_system.html#pagetypesystem-typetemplates)。例如：

```javascript
var array<pivotPoint> pivotHighArray = na
pivotHighArray := array.new<pivotPoint>()
```

让我们利用所学到的知识来创建一个检测高枢轴点的脚本。该脚本首先将历史数据透视表信息收集到一个 [数组](https://www.tradingview.com/pine-script-reference/v5/#type_array)中。然后，它循环遍历最后一个历史柱上的数组，为每个枢轴创建一个标签，并用线连接枢轴：

![../_images/Objects-CollectingObjects-1.png](https://www.tradingview.com/pine-script-docs/en/v5/_images/Objects-CollectingObjects-1.png)

```javascript
//@version=5
indicator("Pivot Points High", overlay = true)

int legsInput = input(10)

// Define the `pivotPoint` UDT containing the time and price of pivots.
type pivotPoint
    int openTime
    float level

// Create an empty `pivotPoint` array.
var pivotHighArray = array.new<pivotPoint>()

// Detect new pivots (`na` is returned when no pivot is found).
pivotHighPrice = ta.pivothigh(legsInput, legsInput)

// Add a new `pivotPoint` object to the end of the array for each detected pivot.
if not na(pivotHighPrice)
    // A new pivot is found; create a new object of `pivotPoint` type, setting its `openTime` and `level` fields.
    newPivot = pivotPoint.new(time[legsInput], pivotHighPrice)
    // Add the new pivot object to the array.
    array.push(pivotHighArray, newPivot)

// On the last historical bar, draw pivot labels and connecting lines.
if barstate.islastconfirmedhistory
    var pivotPoint previousPoint = na
    for eachPivot in pivotHighArray
        // Display a label at the pivot point.
        label.new(eachPivot.openTime, eachPivot.level, str.tostring(eachPivot.level, format.mintick), xloc.bar_time, textcolor = color.white)
        // Create a line between pivots.
        if not na(previousPoint)
            // Only create a line starting at the loop's second iteration because lines connect two pivots.
            line.new(previousPoint.openTime, previousPoint.level, eachPivot.openTime, eachPivot.level, xloc = xloc.bar_time)
        // Save the pivot for use in the next iteration.
        previousPoint := eachPivot
```



## [复制对象](https://www.tradingview.com/pine-script-docs/en/v5/language/Objects.html#id5)

在 Pine 中，对象是通过引用分配的。当现有对象分配给新变量时，两者都指向同一个对象。

在下面的示例中，我们创建一个`pivot1`对象并将其`x`字段设置为 1000。然后，我们声明一个`pivot2`包含对该`pivot1`对象的引用的变量，因此两者都指向同一个实例。因此，更改`pivot2.x`也会更改`pivot1.x`，因为两者都引用`x`同一对象的字段：

```javascript
//@version=5
indicator("")
type pivotPoint
    int x
    float y
pivot1 = pivotPoint.new()
pivot1.x := 1000
pivot2 = pivot1
pivot2.x := 2000
// Both plot the value 2000.
plot(pivot1.x)
plot(pivot2.x)
```

要创建独立于原始对象的副本，在这种情况下我们可以使用内置`copy()`方法。

在此示例中，我们声明`pivot2`引用`pivot1`对象的复制实例的变量。现在，改变`pivot2.x`不会改变`pivot1.x`，因为它指的是`x`一个单独对象的字段：

```javascript
//@version=5
indicator("")
type pivotPoint
    int x
    float y
pivot1 = pivotPoint.new()
pivot1.x := 1000
pivot2 = pivotPoint.copy(pivot1)
pivot2.x := 2000
// Plots 1000 and 2000.
plot(pivot1.x)
plot(pivot2.x)
```

需要注意的是，内置`copy()`方法会生成对象的*浅表副本*。如果对象具有*特殊类型的*字段 （[array](https://www.tradingview.com/pine-script-reference/v5/#type_array)、 [matrix](https://www.tradingview.com/pine-script-reference/v5/#type_matrix)、 [map](https://www.tradingview.com/pine-script-reference/v5/#type_map)、 [line](https://www.tradingview.com/pine-script-reference/v5/#type_line)、 [linefill](https://www.tradingview.com/pine-script-reference/v5/#type_linefill)、 [box](https://www.tradingview.com/pine-script-reference/v5/#type_box)、 [polyline](https://www.tradingview.com/pine-script-reference/v5/#type_polyline)、 [label](https://www.tradingview.com/pine-script-reference/v5/#type_label)、 [table](https://www.tradingview.com/pine-script-reference/v5/#type_table)或 [Chart.point](https://www.tradingview.com/pine-script-reference/v5/#type_chart.point)），则该对象的浅拷贝中的这些字段将指向与该对象相同的实例。原来的。

在下面的示例中，我们定义了一个`InfoLabel`类型，其中一个字段为标签。该脚本实例化对象`shallow`的副本`parent`，然后调用用户定义的 `set()` [方法](https://www.tradingview.com/pine-script-docs/en/v5/language/Methods.html#pagemethods)来更新每个对象的`info`和`lbl`字段。由于`lbl`两个对象的字段都指向同一标签实例，因此任一对象中此字段的更改都会影响另一个对象：

```javascript
//@version=5
indicator("Shallow Copy")

type InfoLabel
    string info
    label  lbl

method set(InfoLabel this, int x = na, int y = na, string info = na) =>
    if not na(x)
        this.lbl.set_x(x)
    if not na(y)
        this.lbl.set_y(y)
    if not na(info)
        this.info := info
        this.lbl.set_text(this.info)

var parent  = InfoLabel.new("", label.new(0, 0))
var shallow = parent.copy()

parent.set(bar_index, 0, "Parent")
shallow.set(bar_index, 1, "Shallow Copy")
```

要生成对象的*深层副本*，并使其所有特殊类型字段都指向独立实例，我们还必须显式复制这些字段。

在这个例子中，我们定义了一个`deepCopy()`方法来实例化一个新`InfoLabel`对象，其`lbl`字段指向原始字段的副本。对`deep`副本字段的更改`lbl` 不会影响该`parent`对象，因为它指向一个单独的实例：

```javascript
//@version=5
indicator("Deep Copy")

type InfoLabel
    string info
    label  lbl

method set(InfoLabel this, int x = na, int y = na, string info = na) =>
    if not na(x)
        this.lbl.set_x(x)
    if not na(y)
        this.lbl.set_y(y)
    if not na(info)
        this.info := info
        this.lbl.set_text(this.info)

method deepCopy(InfoLabel this) =>
    InfoLabel.new(this.info, this.lbl.copy())

var parent = InfoLabel.new("", label.new(0, 0))
var deep   = parent.deepCopy()

parent.set(bar_index, 0, "Parent")
deep.set(bar_index, 1, "Deep Copy")
```



## [提示](https://www.tradingview.com/pine-script-docs/en/v5/language/Objects.html#id6)

避免未来添加到 Pine Script™ 的命名空间与现有脚本中的 UDT 或对象名称发生冲突的潜在冲突；通常，UDT 和对象名称会影响语言的命名空间。例如，UDT 或对象可以使用内置类型的名称，例如 [line](https://www.tradingview.com/pine-script-reference/v5/#op_line)或 [table](https://www.tradingview.com/pine-script-reference/v5/#op_table)。

只有该语言的五种基本类型不能用于命名 UDT 或对象： [int](https://www.tradingview.com/pine-script-reference/v5/#op_int)、 [float](https://www.tradingview.com/pine-script-reference/v5/#op_float)、 [string](https://www.tradingview.com/pine-script-reference/v5/#op_string)、 [bool](https://www.tradingview.com/pine-script-reference/v5/#op_bool)和 [color](https://www.tradingview.com/pine-script-reference/v5/#op_color)。