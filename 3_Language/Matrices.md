# 矩阵

提示：

此页面包含高级材料。如果您是一名初级 Pine Script™ 程序员，我们建议您在冒险之前熟悉其他更易于使用的 Pine Script™ 功能。

## [介绍](https://www.tradingview.com/pine-script-docs/en/v5/language/Matrices.html#id1)

Pine Script™ 矩阵是以矩形格式存储值引用的集合。它们本质上相当于二维数组 [对象](https://www.tradingview.com/pine-script-reference/v5/#op_array)，具有用于检查、修改和专门计算的函数和方法。与[数组](https://www.tradingview.com/pine-script-docs/en/v5/language/Arrays.html#pagearrays)一样，所有矩阵元素必须具有相同[类型](https://www.tradingview.com/pine-script-docs/en/v5/language/Type_system.html#pagetypesystem-types)，可以是 [内置类型](https://www.tradingview.com/pine-script-docs/en/v5/language/Type_system.html#id2)或 [用户定义类型](https://www.tradingview.com/pine-script-docs/en/v5/language/Type_system.html#pagetypesystem-userdefinedtypes)。

矩阵使用两个索引引用其元素：一个索引用于行，另一个索引用于列。每个索引从 0 开始，并扩展到矩阵中的行/列数减一。 Pine 中的矩阵可以具有随条形变化的动态行数和列数。矩阵内的[元素总数](https://www.tradingview.com/pine-script-reference/v5/#fun_matrix.elements_count)是[行数](https://www.tradingview.com/pine-script-reference/v5/#fun_matrix.rows)和 [列数](https://www.tradingview.com/pine-script-reference/v5/#fun_matrix.columns) 的乘积 （例如，5x5 矩阵共有 25 个元素）。与[数组](https://www.tradingview.com/pine-script-docs/en/v5/language/Arrays.html#pagearrays)一样，矩阵中的元素总数不能超过 100,000。



## [声明一个矩阵](https://www.tradingview.com/pine-script-docs/en/v5/language/Matrices.html#id2)

Pine Script™ 使用以下语法进行矩阵声明：

```
Pine Script™
Copied[var/varip ][matrix<type> ]<identifier> = <expression>
```

其中`<type>`是矩阵的[类型模板](https://www.tradingview.com/pine-script-docs/en/v5/language/Type_system.html#pagetypesystem-typetemplates)，声明它将包含的值的类型，并且`<expression>`返回类型 或 的矩阵实例`na`。

将矩阵变量声明为 时，用户必须通过在[类型模板](https://www.tradingview.com/pine-script-docs/en/v5/language/Type_system.html#pagetypesystem-typetemplates)后包含[矩阵](https://www.tradingview.com/pine-script-reference/v5/#op_matrix)`na`关键字来指定标识符将引用特定类型的矩阵。

该行声明了一个`myMatrix`值为 的新变量`na`。它将变量显式声明为 `matrix<float>`，这告诉编译器该变量只能接受 包含[浮点值的](https://www.tradingview.com/pine-script-reference/v5/#op_float)[矩阵](https://www.tradingview.com/pine-script-reference/v5/#op_matrix)对象 ：

```
Pine Script™
Copiedmatrix<float> myMatrix = na
```

当矩阵变量未分配给 时`na`，[矩阵](https://www.tradingview.com/pine-script-reference/v5/#op_matrix) 关键字及其类型模板是可选的，因为编译器将使用变量引用的对象中的类型信息。

在这里，我们声明一个`myMatrix`变量引用一个`matrix<float>`具有两行、两列和`initial_value`0 的新实例。在这种情况下，该变量从新对象获取其类型信息，因此不需要显式类型声明：

```
Pine Script™
CopiedmyMatrix = matrix.new<float>(2, 2, 0.0)
```



### [使用 `var` 和 `varip` 关键字](https://www.tradingview.com/pine-script-docs/en/v5/language/Matrices.html#id3)

与其他变量一样，用户可以包含[var](https://www.tradingview.com/pine-script-reference/v5/#op_var) 或[varip](https://www.tradingview.com/pine-script-reference/v5/#op_varip)关键字来指示脚本仅声明一次矩阵变量，而不是在每个柱上声明一次。使用此关键字声明的矩阵变量将在整个图表范围内指向同一实例，除非脚本显式为其分配另一个矩阵，从而允许矩阵及其元素引用在脚本迭代之间保留。

此脚本 使用[var](https://www.tradingview.com/pine-script-reference/v5/#op_var)`m`关键字声明一个分配给矩阵的变量，该矩阵保存单行两个 [int](https://www.tradingview.com/pine-script-reference/v5/#op_int)元素 。在每 20 个柱上，脚本将 1 添加到矩阵第一行的第一个元素。 plot [()](https://www.tradingview.com/pine-script-reference/v5/#fun_plot)调用在图表上显示该元素。正如我们从图中看到的， [m.get(0, 0)](https://www.tradingview.com/pine-script-reference/v5/#fun_matrix.get)的值在柱之间持续存在，永远不会返回到初始值 0：`m`

![../_images/Matrices-声明-矩阵-使用-var-and-varip-keywords-1.png](https://www.tradingview.com/pine-script-docs/en/v5/_images/Matrices-Declaring-a-matrix-Using-var-and-varip-keywords-1.png)

```
Pine Script™
Copied//@version=5
indicator("var matrix demo")

//@variable A 1x2 rectangular matrix declared only at `bar_index == 0`, i.e., the first bar.
var m = matrix.new<int>(1, 2, 0)

//@variable Is `true` on every 20th bar.
bool update = bar_index % 20 == 0

if update
    int currentValue = m.get(0, 0) // Get the current value of the first row and column.
    m.set(0, 0, currentValue + 1)  // Set the first row and column element value to `currentValue + 1`.

plot(m.get(0, 0), linewidth = 3) // Plot the value from the first row and column.
```

笔记

[使用varip](https://www.tradingview.com/pine-script-reference/v5/#kw_varip)声明的矩阵变量的行为与在历史数据上使用[var 的](https://www.tradingview.com/pine-script-reference/v5/#kw_var) 行为相同，但它们会在每个新的价格变动时更新实时柱（即自脚本上次编译以来的柱）的值。分配给[varip](https://www.tradingview.com/pine-script-reference/v5/#kw_varip) 变量的矩阵只能保存[int](https://www.tradingview.com/pine-script-reference/v5/#type_int)、 [float](https://www.tradingview.com/pine-script-reference/v5/#type_float)、 [bool](https://www.tradingview.com/pine-script-reference/v5/#type_bool)、 [color](https://www.tradingview.com/pine-script-reference/v5/#type_color)或 [string](https://www.tradingview.com/pine-script-reference/v5/#type_string)类型或 [用户定义类型](https://www.tradingview.com/pine-script-docs/en/v5/language/Type_system.html#pagetypesystem-userdefinedtypes)，这些类型在其字段中专门包含这些类型或这些类型的集合（[arrays](https://www.tradingview.com/pine-script-docs/en/v5/language/Arrays.html#pagearrays)、 matrices 或[maps](https://www.tradingview.com/pine-script-docs/en/v5/language/Maps.html#pagemaps)）。



## [读写矩阵元素](https://www.tradingview.com/pine-script-docs/en/v5/language/Matrices.html#id4)



### [`matrix.get()` 和 `matrix.set()` ](https://www.tradingview.com/pine-script-docs/en/v5/language/Matrices.html#id5)

`row`要从指定索引处的矩阵中检索值`column`，请使用 [matrix.get()](https://www.tradingview.com/pine-script-reference/v5/#fun_matrix.get)。该函数查找指定的矩阵元素并返回其值。类似地，要覆盖特定元素的值，请使用 [matrix.set()](https://www.tradingview.com/pine-script-reference/v5/#fun_matrix.set) 将指定的元素分配`row`给`column`新的`value`。

下面的示例定义了一个`m`具有两行和两列的方阵，并且`initial_value` 第一个条上的所有元素的值为 0。该脚本使用[m.get()](https://www.tradingview.com/pine-script-reference/v5/#fun_matrix.get) 和[m.set()](https://www.tradingview.com/pine-script-reference/v5/#fun_matrix.set)方法将不同柱上每个元素的值加 1 。它每 11 个柱更新一次第一行的第一个值，每 7 个柱更新一次第一行的第二个值，每 5 个柱更新一次第二行的第一个值，每 3 个柱更新一次第二行的第二个值。该脚本在图表上绘制每个元素的值：

![../_images/Matrices-Read-and-writing-matrix-elements-1.png](https://www.tradingview.com/pine-script-docs/en/v5/_images/Matrices-Reading-and-writing-matrix-elements-1.png)

```
Pine Script™
Copied//@version=5
indicator("Reading and writing elements demo")

//@variable A 2x2 square matrix of `float` values.
var m = matrix.new<float>(2, 2, 0.0)

switch
    bar_index % 11 == 0 => m.set(0, 0, m.get(0, 0) + 1.0) // Adds 1 to the value at row 0, column 0 every 11th bar.
    bar_index % 7  == 0 => m.set(0, 1, m.get(0, 1) + 1.0) // Adds 1 to the value at row 0, column 1 every 7th bar.
    bar_index % 5  == 0 => m.set(1, 0, m.get(1, 0) + 1.0) // Adds 1 to the value at row 1, column 0 every 5th bar.
    bar_index % 3  == 0 => m.set(1, 1, m.get(1, 1) + 1.0) // Adds 1 to the value at row 1, column 1 every 3rd bar.

plot(m.get(0, 0), "Row 0, Column 0 Value", color.red, 2)
plot(m.get(0, 1), "Row 0, Column 1 Value", color.orange, 2)
plot(m.get(1, 0), "Row 1, Column 0 Value", color.green, 2)
plot(m.get(1, 1), "Row 1, Column 1 Value", color.blue, 2)
```



### [`matrix.fill()` ](https://www.tradingview.com/pine-script-docs/en/v5/language/Matrices.html#id6)

要使用特定值覆盖所有矩阵元素，请使用 [matrix.fill()](https://www.tradingview.com/pine-script-reference/v5/#fun_matrix.fill)。该函数将整个矩阵中或索引范围内的所有项目`from_row/column`指向 `to_row/column`调用`value`中指定的。例如，此代码片段声明一个 4x4 方阵，然后用 [随机](https://www.tradingview.com/pine-script-reference/v5/#fun_math.random)值填充其元素：

```
Pine Script™
CopiedmyMatrix = matrix.new<float>(4, 4)
myMatrix.fill(math.random())
```

请注意，当 对包含特殊类型（[line](https://www.tradingview.com/pine-script-reference/v5/#type_line)、 [linefill](https://www.tradingview.com/pine-script-reference/v5/#type_linefill)、 [box](https://www.tradingview.com/pine-script-reference/v5/#type_box)、 [polyline](https://www.tradingview.com/pine-script-reference/v5/#type_polyline)、 [label](https://www.tradingview.com/pine-script-reference/v5/#type_label)、 [table](https://www.tradingview.com/pine-script-reference/v5/#type_table)或 [chart.point](https://www.tradingview.com/pine-script-reference/v5/#type_chart.point)）或[UDT的](https://www.tradingview.com/pine-script-docs/en/v5/language/Type_system.html#pagetypesystem-userdefinedtypes)[矩阵使用matrix.fill()](https://www.tradingview.com/pine-script-reference/v5/#fun_matrix.fill)时，所有替换元素将指向函数调用中传递的同一对象。

此脚本声明一个包含四行四列[标签](https://www.tradingview.com/pine-script-reference/v5/#op_label)引用的矩阵，并在第一个栏上 填充新的[标签](https://www.tradingview.com/pine-script-reference/v5/#op_label)对象。在每个柱上，脚本将`x`第 0 行第 0 列引用的标签属性设置为 [bar_index](https://www.tradingview.com/pine-script-reference/v5/#var_bar_index)，并将`text`第 3 行第 3 列引用的标签属性设置为图表上的标签数量。尽管矩阵可以引用 16 (4x4) 个标签，但每个元素都指向 *同一个*实例，导致图表上只有一个标签更新每个条形上的`x`和属性：`text`

![../_images/Matrices-Read-and-writing-matrix-elements-2.png](https://www.tradingview.com/pine-script-docs/en/v5/_images/Matrices-Reading-and-writing-matrix-elements-2.png)

```
Pine Script™
Copied//@version=5
indicator("Object matrix fill demo")

//@variable A 4x4 label matrix.
var matrix<label> m = matrix.new<label>(4, 4)

// Fill `m` with a new label object on the first bar.
if bar_index == 0
    m.fill(label.new(0, 0, textcolor = color.white, size = size.huge))

//@variable The number of label objects on the chart.
int numLabels = label.all.size()

// Set the `x` of the label from the first row and column to `bar_index`.
m.get(0, 0).set_x(bar_index)
// Set the `text` of the label at the last row and column to the number of labels.
m.get(3, 3).set_text(str.format("Total labels on the chart: {0}", numLabels))
```



## [行和列](https://www.tradingview.com/pine-script-docs/en/v5/language/Matrices.html#id7)



### [检索](https://www.tradingview.com/pine-script-docs/en/v5/language/Matrices.html#id8)

[矩阵有助于通过matrix.row()](https://www.tradingview.com/pine-script-reference/v5/#fun_matrix.row) 和[matrix.col()](https://www.tradingview.com/pine-script-reference/v5/#fun_matrix.col)函数检索特定行或列中的所有值 。这些函数将值作为 [数组](https://www.tradingview.com/pine-script-reference/v5/#op_array)对象返回，该数组对象的大小根据矩阵的其他维度进行调整，即， [matrix.row()](https://www.tradingview.com/pine-script-reference/v5/#fun_matrix.row)数组的大小等于[列数， ](https://www.tradingview.com/pine-script-reference/v5/#fun_matrix.columns)[matrix.col()](https://www.tradingview.com/pine-script-reference/v5/#fun_matrix.col)数组 的大小 等于列[数行数](https://www.tradingview.com/pine-script-reference/v5/#fun_matrix.rows)。

下面的脚本使用`m`第一个图表栏上的值 1 - 6 填充 3x2 矩阵。它调用[m.row()](https://www.tradingview.com/pine-script-reference/v5/#fun_matrix.row) 和 [m.col()](https://www.tradingview.com/pine-script-reference/v5/#fun_matrix.col)方法来访问矩阵中的第一行和第一列数组，并将它们与数组大小一起显示在图表上的标签中：

![../_images/矩阵-行和列-Retriving-1.png](https://www.tradingview.com/pine-script-docs/en/v5/_images/Matrices-Rows-and-columns-Retrieving-1.png)

```
Pine Script™
Copied//@version=5
indicator("Retrieving rows and columns demo")

//@variable A 3x2 rectangular matrix.
var matrix<float> m = matrix.new<float>(3, 2)

if bar_index == 0
    m.set(0, 0, 1.0) // Set row 0, column 0 value to 1.
    m.set(0, 1, 2.0) // Set row 0, column 1 value to 2.
    m.set(1, 0, 3.0) // Set row 1, column 0 value to 3.
    m.set(1, 1, 4.0) // Set row 1, column 1 value to 4.
    m.set(2, 0, 5.0) // Set row 1, column 0 value to 5.
    m.set(2, 1, 6.0) // Set row 1, column 1 value to 6.

//@variable The first row of the matrix.
array<float> row0 = m.row(0)
//@variable The first column of the matrix.
array<float> column0 = m.col(0)

//@variable Displays the first row and column of the matrix and their sizes in a label.
var label debugLabel = label.new(0, 0, color = color.blue, textcolor = color.white, size = size.huge)
debugLabel.set_x(bar_index)
debugLabel.set_text(str.format("Row 0: {0}, Size: {1}\nCol 0: {2}, Size: {3}", row0, m.columns(), column0, m.rows()))
```

- 注意：

  为了获取标签中显示的数组的大小，我们使用 [rows()](https://www.tradingview.com/pine-script-reference/v5/#fun_matrix.rows) 和[columns()](https://www.tradingview.com/pine-script-reference/v5/#fun_matrix.columns)方法而不是[array.size()](https://www.tradingview.com/pine-script-reference/v5/#fun_array.size) 来演示`row0`数组的大小等于列数，并且数组的大小 `column0`等于行数。

[matrix.row()](https://www.tradingview.com/pine-script-reference/v5/#fun_matrix.row)和 [matrix.col()](https://www.tradingview.com/pine-script-reference/v5/#fun_matrix.col)将行/列中的引用复制到新的[数组](https://www.tradingview.com/pine-script-reference/v5/#op_array)中。对这些函数返回的[数组](https://www.tradingview.com/pine-script-docs/en/v5/language/Arrays.html#pagearrays)的修改不会直接影响矩阵的元素或形状。

在这里，我们修改了之前的脚本，在显示标签之前通过[array.set()](https://www.tradingview.com/pine-script-reference/v5/#fun_array.set)方法将第一个元素设置`row0`为 10 。该脚本还绘制了第 0 行、第 0 列的值。正如我们所见，标签显示数组的第一个元素 是 10。但是，该[图](https://www.tradingview.com/pine-script-reference/v5/#fun_plot)显示相应的矩阵元素的值仍然为 1：`row0`

![../_images/矩阵-行和列-检索-2.png](https://www.tradingview.com/pine-script-docs/en/v5/_images/Matrices-Rows-and-columns-Retrieving-2.png)

```
Pine Script™
Copied//@version=5
indicator("Retrieving rows and columns demo")

//@variable A 3x2 rectangular matrix.
var matrix<float> m = matrix.new<float>(3, 2)

if bar_index == 0
    m.set(0, 0, 1.0) // Set row 0, column 0 value to 1.
    m.set(0, 1, 2.0) // Set row 0, column 1 value to 2.
    m.set(1, 0, 3.0) // Set row 1, column 0 value to 3.
    m.set(1, 1, 4.0) // Set row 1, column 1 value to 4.
    m.set(2, 0, 5.0) // Set row 1, column 0 value to 5.
    m.set(2, 1, 6.0) // Set row 1, column 1 value to 6.

//@variable The first row of the matrix.
array<float> row0 = m.row(0)
//@variable The first column of the matrix.
array<float> column0 = m.col(0)

// Set the first `row` element to 10.
row0.set(0, 10)

//@variable Displays the first row and column of the matrix and their sizes in a label.
var label debugLabel = label.new(0, m.get(0, 0), color = color.blue, textcolor = color.white, size = size.huge)
debugLabel.set_x(bar_index)
debugLabel.set_text(str.format("Row 0: {0}, Size: {1}\nCol 0: {2}, Size: {3}", row0, m.columns(), column0, m.rows()))

// Plot the first element of `m`.
plot(m.get(0, 0), linewidth = 3)
```

虽然对 [array.row()](https://www.tradingview.com/pine-script-reference/v5/#fun_matrix.row)或 [matrix.col()返回的](https://www.tradingview.com/pine-script-reference/v5/#fun_matrix.col)[数组](https://www.tradingview.com/pine-script-reference/v5/#op_array)进行更改不会直接影响父矩阵，但请务必注意包含 [UDT](https://www.tradingview.com/pine-script-docs/en/v5/language/Type_system.html#pagetypesystem-userdefinedtypes)或特殊类型（包括 [line](https://www.tradingview.com/pine-script-reference/v5/#type_line)、 [linefill](https://www.tradingview.com/pine-script-reference/v5/#type_linefill)、 [box](https://www.tradingview.com/pine-script-reference/v5/#type_box)、 [polyline ）](https://www.tradingview.com/pine-script-reference/v5/#type_polyline)的矩阵所生成的数组、 [label](https://www.tradingview.com/pine-script-reference/v5/#type_label)、 [table](https://www.tradingview.com/pine-script-reference/v5/#type_table)或 [Chart.point](https://www.tradingview.com/pine-script-reference/v5/#type_chart.point)，表现为行/列的*浅表副本* ，即从这些函数返回的数组中的元素指向与相应矩阵元素相同的对象。

此脚本包含一个自定义`myUDT`类型，其中包含`value`一个初始值为 0 的字段。它声明一个 1x1`m`矩阵来保存`myUDT`第一个柱上的单个实例，然后调用`m.row(0)`将矩阵的第一行复制为[array](https://www.tradingview.com/pine-script-reference/v5/#op_array)。在每个图表条上，脚本将 1 添加到`value`第一个`row`数组元素的字段。在这种情况下，`value`矩阵元素的字段也会在每个条上增加，因为两个元素引用相同的对象：

```
Pine Script™
Copied//@version=5
indicator("Row with reference types demo")

//@type A custom type that holds a float value.
type myUDT
    float value = 0.0

//@variable A 1x1 matrix of `myUDT` type.
var matrix<myUDT> m = matrix.new<myUDT>(1, 1, myUDT.new())
//@variable A shallow copy of the first row of `m`.
array<myUDT> row = m.row(0)
//@variable The first element of the `row`.
myUDT firstElement = row.get(0)

firstElement.value += 1.0 // Add 1 to the `value` field of `firstElement`. Also affects the element in the matrix.

plot(m.get(0, 0).value, linewidth = 3) // Plot the `value` of the `myUDT` object from the first row and column of `m`.
```



### [插入](https://www.tradingview.com/pine-script-docs/en/v5/language/Matrices.html#id9)

[脚本可以通过matrix.add_row()](https://www.tradingview.com/pine-script-reference/v5/#fun_matrix.add_row) 和[matrix.add_col()](https://www.tradingview.com/pine-script-reference/v5/#fun_matrix.add_col)向矩阵添加新的行和列 。这些函数将[数组](https://www.tradingview.com/pine-script-reference/v5/#op_array)中的值引用插入 到矩阵的指定索引处`row/column`。如果`id`矩阵为空（没有行或列），则`array_id` 调用中的 可以是任意大小。如果指定索引处存在行/列，则矩阵会将现有行/列及其后所有行/列的索引值加 1。

下面的脚本声明一个空矩阵并使用[m.add_row()](https://www.tradingview.com/pine-script-reference/v5/#fun_matrix.add_row)和 [m.add_col()](https://www.tradingview.com/pine-script-reference/v5/#fun_matrix.add_col)`m`方法插入行和列 。它首先在第 0 行插入一个包含三个元素的数组，将其变为1x3 矩阵，然后在第 1 行插入另一个数组，将形状更改为 2x3。之后，脚本在第 0 行插入另一个数组，这会将 的形状更改为 3x3，并将之前所有行的索引移动到索引 0 及更高位置。它在最后一列索引处插入另一个数组，将形状更改为 3x4。最后，它在末尾行索引处添加一个包含四个值的数组。`m``m`

生成的矩阵有四行四列，包含按升序排列的值 1-16。该脚本`m`使用用户定义的函数显示每行/列插入后的行`debugLabel()`以可视化该过程：

![../_images/矩阵-行和列-插入-1.png](https://www.tradingview.com/pine-script-docs/en/v5/_images/Matrices-Rows-and-columns-Inserting-1.png)

```
Pine Script™
Copied//@version=5
indicator("Rows and columns demo")

//@function Displays the rows of a matrix in a label with a note.
//@param    this The matrix to display.
//@param    barIndex The `bar_index` to display the label at.
//@param    bgColor The background color of the label.
//@param    textColor The color of the label's text.
//@param    note The text to display above the rows.
method debugLabel(
     matrix<float> this, int barIndex = bar_index, color bgColor = color.blue,
     color textColor = color.white, string note = ""
 ) =>
    labelText = note + "\n" + str.tostring(this)
    if barstate.ishistory
        label.new(
             barIndex, 0, labelText, color = bgColor, style = label.style_label_center,
             textcolor = textColor, size = size.huge
         )

//Create an empty matrix.
var m = matrix.new<float>()

if bar_index == last_bar_index - 1
    debugLabel(m, bar_index - 30, note = "Empty matrix")

    // Insert an array at row 0. `m` will now have 1 row and 3 columns.
    m.add_row(0, array.from(5, 6, 7))
    debugLabel(m, bar_index - 20, note = "New row at\nindex 0")

    // Insert an array at row 1. `m` will now have 2 rows and 3 columns.
    m.add_row(1, array.from(9, 10, 11))
    debugLabel(m, bar_index - 10, note = "New row at\nindex 1")

    // Insert another array at row 0. `m` will now have 3 rows and 3 columns.
    // The values previously on row 0 will now be on row 1, and the values from row 1 will be on row 2.
    m.add_row(0, array.from(1, 2, 3))
    debugLabel(m, bar_index, note = "New row at\nindex 0")

    // Insert an array at column 3. `m` will now have 3 rows and 4 columns.
    m.add_col(3, array.from(4, 8, 12))
    debugLabel(m, bar_index + 10, note = "New column at\nindex 3")

    // Insert an array at row 3. `m` will now have 4 rows and 4 columns.
    m.add_row(3, array.from(13, 14, 15, 16))
    debugLabel(m, bar_index + 20, note = "New row at\nindex 3")
```

笔记

正如从 [line](https://www.tradingview.com/pine-script-reference/v5/#type_line)、 [linefill](https://www.tradingview.com/pine-script-reference/v5/#type_linefill)、 [box](https://www.tradingview.com/pine-script-reference/v5/#type_box)、 [polyline](https://www.tradingview.com/pine-script-reference/v5/#type_polyline)、 [label](https://www.tradingview.com/pine-script-reference/v5/#type_label)、 [table](https://www.tradingview.com/pine-script-reference/v5/#type_table)、 [Chart.point](https://www.tradingview.com/pine-script-reference/v5/#type_chart.point)或 [UDT实例的矩阵中](https://www.tradingview.com/pine-script-docs/en/v5/language/Type_system.html#pagetypesystem-userdefinedtypes)[检索的行或列数组表现为浅拷贝一样，包含此类类型的矩阵元素引用与](https://www.tradingview.com/pine-script-docs/en/v5/language/Matrices.html#pagematrices-rowsandcolumns-retrieving)[数组](https://www.tradingview.com/pine-script-docs/en/v5/language/Arrays.html#pagearrays)相同的对象 插入其中。在这种情况下，对任一对象中元素值的修改都会影响另一个对象。



### [删除](https://www.tradingview.com/pine-script-docs/en/v5/language/Matrices.html#id10)

要从矩阵中删除特定的行或列，请使用 [matrix.remove_row()](https://www.tradingview.com/pine-script-reference/v5/#fun_matrix.remove_row)和 [matrix.remove_col()](https://www.tradingview.com/pine-script-reference/v5/#fun_matrix.remove_col)。这些函数删除指定的行/列，并将其之后的所有行/列的索引值减 1。

对于此示例，我们将这些代码行添加到 [上面部分](https://www.tradingview.com/pine-script-docs/en/v5/language/Matrices.html#pagematrices-rowsandcolumns-inserting)中的“行和列演示”脚本中：

```
Pine Script™
Copied// Removing example

    // Remove the first row and last column from the matrix. `m` will now have 3 rows and 3 columns.
    m.remove_row(0)
    m.remove_col(3)
    debugLabel(m, bar_index + 30, color.red, note = "Removed row 0\nand column 3")
m`此代码使用 [m.remove_row()](https://www.tradingview.com/pine-script-reference/v5/#fun_matrix.remove_row)和 [m.remove_col()](https://www.tradingview.com/pine-script-reference/v5/#fun_matrix.remove_col)方法删除矩阵的第一行和最后一列，并在 处的标签中显示行。正如我们所看到的，执行此块后形状为 3x3，并且所有现有行的索引值均减 1：`bar_index + 30``m
```

![../_images/矩阵-行和列-删除-1.png](https://www.tradingview.com/pine-script-docs/en/v5/_images/Matrices-Rows-and-columns-Removing-1.png)



### [交换](https://www.tradingview.com/pine-script-docs/en/v5/language/Matrices.html#id11)

要交换矩阵的行和列而不改变其维度，请使用 [matrix.swap_rows()](https://www.tradingview.com/pine-script-reference/v5/#fun_matrix.swap_rows) 和[matrix.swap_columns()](https://www.tradingview.com/pine-script-reference/v5/#fun_matrix.swap_columns)。这些函数交换`row1/column1`和索引处元素的位置`row2/column2`。

让我们将以下行添加到[前面的示例](https://www.tradingview.com/pine-script-docs/en/v5/language/Matrices.html#pagematrices-rowsandcolumns-removing)中，这些行交换 的第一行和最后一行`m`并在标签中显示更改：`bar_index + 40`

```
Pine Script™
Copied// Swapping example

    // Swap the first and last row. `m` retains the same dimensions.
    m.swap_rows(0, 2)
    debugLabel(m, bar_index + 40, color.purple, note = "Swapped rows 0\nand 2")
```

在新标签中，我们看到矩阵的行数与之前相同，并且第一行和最后一行交换了位置：

![../_images/矩阵-行和列-Swapping-1.png](https://www.tradingview.com/pine-script-docs/en/v5/_images/Matrices-Rows-and-columns-Swapping-1.png)



### [替换](https://www.tradingview.com/pine-script-docs/en/v5/language/Matrices.html#id12)

在某些情况下，可能需要完全*替换*矩阵中的行或列。为此， 请在所需位置[插入](https://www.tradingview.com/pine-script-docs/en/v5/language/Matrices.html#pagematrices-rowsandcolumns-inserting)新数组`row/column` ，并[删除](https://www.tradingview.com/pine-script-docs/en/v5/language/Matrices.html#pagematrices-rowsandcolumns-removing)该索引处先前的旧元素。

在下面的代码中，我们定义了一个`replaceRow()`方法，该方法使用 [add_row()](https://www.tradingview.com/pine-script-reference/v5/#fun_matrix.add_row)`values`方法在索引处插入新行`row`，并使用 [remove_row()](https://www.tradingview.com/pine-script-reference/v5/#fun_matrix.remove_row)方法删除移动到索引的旧行。此脚本使用该方法用数字 1-9 填充 3x3 矩阵的行。它在使用自定义方法替换行之前和之后在图表上绘制标签：`row + 1``replaceRow()``debugLabel()`

![../_images/矩阵-行和列-Replacing-1.png](https://www.tradingview.com/pine-script-docs/en/v5/_images/Matrices-Rows-and-columns-Replacing-1.png)

```
Pine Script™
Copied//@version=5
indicator("Replacing rows demo")

//@function Displays the rows of a matrix in a label with a note.
//@param    this The matrix to display.
//@param    barIndex The `bar_index` to display the label at.
//@param    bgColor The background color of the label.
//@param    textColor The color of the label's text.
//@param    note The text to display above the rows.
method debugLabel(
     matrix<float> this, int barIndex = bar_index, color bgColor = color.blue,
     color textColor = color.white, string note = ""
 ) =>
    labelText = note + "\n" + str.tostring(this)
    if barstate.ishistory
        label.new(
             barIndex, 0, labelText, color = bgColor, style = label.style_label_center,
             textcolor = textColor, size = size.huge
         )

//@function Replaces the `row` of `this` matrix with a new array of `values`.
//@param    row The row index to replace.
//@param    values The array of values to insert.
method replaceRow(matrix<float> this, int row, array<float> values) =>
    this.add_row(row, values) // Inserts a copy of the `values` array at the `row`.
    this.remove_row(row + 1)  // Removes the old elements previously at the `row`.

//@variable A 3x3 matrix.
var matrix<float> m = matrix.new<float>(3, 3, 0.0)

if bar_index == last_bar_index - 1
    m.debugLabel(note = "Original")
    // Replace each row of `m`.
    m.replaceRow(0, array.from(1.0, 2.0, 3.0))
    m.replaceRow(1, array.from(4.0, 5.0, 6.0))
    m.replaceRow(2, array.from(7.0, 8.0, 9.0))
    m.debugLabel(bar_index + 10, note = "Replaced rows")
```



## [循环矩阵](https://www.tradingview.com/pine-script-docs/en/v5/language/Matrices.html#id13)



### [`为了](https://www.tradingview.com/pine-script-docs/en/v5/language/Matrices.html#id14)

当脚本只需要迭代矩阵中的行/列索引时，最常见的方法是使用 [for](https://www.tradingview.com/pine-script-reference/v5/#op_for)循环。例如，此行创建一个循环，`row`其值从 0 开始并增加 1，直到达到比矩阵中的行数`m`（即最后一行索引）少 1 为止：

```
Pine Script™
Copiedfor row = 0 to m.rows() - 1
```

要迭代`m`矩阵中的所有索引值，我们可以创建一个*嵌套*循环，迭代每个值`column`的每个索引`row`：

```
Pine Script™
Copiedfor row = 0 to m.rows() - 1
    for column = 0 to m.columns() - 1
```

让我们使用这个嵌套结构来创建一个可视化矩阵元素的[方法](https://www.tradingview.com/pine-script-docs/en/v5/language/Methods.html#pagemethods)。在下面的脚本中，我们定义了一个在[表](https://www.tradingview.com/pine-script-reference/v5/#op_table)`toTable()`对象中显示矩阵元素的方法 。它迭代每个 索引以及每个上的每个索引。在循环内，它将每个元素转换为字符串[以](https://www.tradingview.com/pine-script-reference/v5/#op_string)显示在相应的表格单元格中。`row``column``row`

在第一个栏上，脚本创建一个空`m`矩阵，用行填充它，并调用`m.toTable()`以显示其元素：

![../_images/Matrices-Looping-through-a-matrix-For-1.png](https://www.tradingview.com/pine-script-docs/en/v5/_images/Matrices-Looping-through-a-matrix-For-1.png)

```
Pine Script™
Copied//@version=5
indicator("for loop demo", "Matrix to table")

//@function Displays the elements of `this` matrix in a table.
//@param    this The matrix to display.
//@param    position The position of the table on the chart.
//@param    bgColor The background color of the table.
//@param    textColor The color of the text in each cell.
//@param    note A note string to display on the bottom row of the table.
//@returns  A new `table` object with cells corresponding to each element of `this` matrix.
method toTable(
     matrix<float> this, string position = position.middle_center,
     color bgColor = color.blue, color textColor = color.white,
     string note = na
 ) =>
    //@variable The number of rows in `this` matrix.
    int rows = this.rows()
    //@variable The number of columns in `this` matrix.
    int columns = this.columns()
    //@variable A table that displays the elements of `this` matrix with an optional `note` cell.
    table result = table.new(position, columns, rows + 1, bgColor)

    // Iterate over each row index of `this` matrix.
    for row = 0 to rows - 1
        // Iterate over each column index of `this` matrix on each `row`.
        for col = 0 to columns - 1
            //@variable The element from `this` matrix at the `row` and `col` index.
            float element = this.get(row, col)
            // Initialize the corresponding `result` cell with the `element` value.
            result.cell(col, row, str.tostring(element), text_color = textColor, text_size = size.huge)

    // Initialize a merged cell on the bottom row if a `note` is provided.
    if not na(note)
        result.cell(0, rows, note, text_color = textColor, text_size = size.huge)
        result.merge_cells(0, rows, columns - 1, rows)

    result // Return the `result` table.

//@variable A 3x4 matrix of values.
var m = matrix.new<float>()

if bar_index == 0
    // Add rows to `m`.
    m.add_row(0, array.from(1, 2, 3))
    m.add_row(1, array.from(5, 6, 7))
    m.add_row(2, array.from(9, 10, 11))
    // Add a column to `m`.
    m.add_col(3, array.from(4, 8, 12))
    // Display the elements of `m` in a table.
    m.toTable()
```



### [`对于…在](https://www.tradingview.com/pine-script-docs/en/v5/language/Matrices.html#id15)

当脚本需要迭代并检索矩阵的行时，使用 [for...in](https://www.tradingview.com/pine-script-reference/v5/#op_for{dot}{dot}{dot}in) 结构通常优于标准`for`循环。此结构直接引用矩阵中的行[数组](https://www.tradingview.com/pine-script-docs/en/v5/language/Arrays.html#pagearrays)，使其成为此类用例的更方便的选择。例如，此行创建一个循环，`row`为矩阵中的每一行返回一个数组`m`：

```
Pine Script™
Copiedfor row in m
```

以下指标通过输入计算 OHLC 数据的移动平均值，`length`并将值显示在图表上。自定义`rowWiseAvg()`方法使用结构体循环遍历矩阵的行，以生成包含每个 的[array.avg()](https://www.tradingview.com/pine-script-reference/v5/#fun_array.avg)的`for...in`数组。`row`

在第一个图表条上，脚本创建一个`m`具有四行和四列的新矩阵，通过每个后续条上的[m.add_col()](https://www.tradingview.com/pine-script-reference/v5/#fun_matrix.add_col)和 [m.remove_col()](https://www.tradingview.com/pine-script-reference/v5/#fun_matrix.remove_col)`length`方法将新的 OHLC 数据列排队到该矩阵中。它用于计算 row-wise 数组，然后在图表上绘制元素值：`m.rowWiseAvg()``averages`

![../_images/Matrices-Looping-through-a-matrix-For-in-1.png](https://www.tradingview.com/pine-script-docs/en/v5/_images/Matrices-Looping-through-a-matrix-For-in-1.png)

```
Pine Script™
Copied//@version=5
indicator("for...in loop demo", "Average OHLC", overlay = true)

//@variable The number of terms in the average.
int length = input.int(20, "Length", minval = 1)

//@function Calculates the average of each matrix row.
method rowWiseAvg(matrix<float> this) =>
    //@variable An array with elements corresponding to each row's average.
    array<float> result = array.new<float>()
    // Iterate over each `row` of `this` matrix.
    for row in this
        // Push the average of each `row` into the `result`.
        result.push(row.avg())
    result // Return the resulting array.

//@variable A 4x`length` matrix of values.
var matrix<float> m = matrix.new<float>(4, length)

// Add a new column containing OHLC values to the matrix.
m.add_col(m.columns(), array.from(open, high, low, close))
// Remove the first column.
m.remove_col(0)

//@variable An array containing averages of `open`, `high`, `low`, and `close` over `length` bars.
array<float> averages = m.rowWiseAvg()

plot(averages.get(0), "Average Open",  color.blue,   2)
plot(averages.get(1), "Average High",  color.green,  2)
plot(averages.get(2), "Average Low",   color.red,    2)
plot(averages.get(3), "Average Close", color.orange, 2)
```

- 注意：

  `for...in`循环还可以引用每行的索引值。例如， 在每次循环迭代时创建一个包含行索引和矩阵中相应数组的元组。`for [i, row] in m``i``row``m`



## [复制矩阵](https://www.tradingview.com/pine-script-docs/en/v5/language/Matrices.html#id16)



### [浅拷贝](https://www.tradingview.com/pine-script-docs/en/v5/language/Matrices.html#id17)

Pine脚本可以通过[matrix.copy()](https://www.tradingview.com/pine-script-reference/v5/#fun_matrix.copy)复制矩阵。此函数返回矩阵的*浅表副本*，该副本不会影响原始矩阵或其引用的形状。

例如，此脚本将一个新矩阵分配给`myMatrix`变量并添加两列。它使用[myMatrix.copy()](https://www.tradingview.com/pine-script-reference/v5/#fun_matrix.copy)方法创建一个新`myCopy` 矩阵 ，然后添加一个新行。它通过用户定义的函数在标签中显示两个矩阵的行：`myMatrix``debugLabel()`

![../_images/Matrices-复制-a-matrix-Shallow-copies-1.png](https://www.tradingview.com/pine-script-docs/en/v5/_images/Matrices-Copying-a-matrix-Shallow-copies-1.png)

```
Pine Script™
Copied//@version=5
indicator("Shallow copy demo")

//@function Displays the rows of a matrix in a label with a note.
//@param    this The matrix to display.
//@param    barIndex The `bar_index` to display the label at.
//@param    bgColor The background color of the label.
//@param    textColor The color of the label's text.
//@param    note The text to display above the rows.
method debugLabel(
     matrix<float> this, int barIndex = bar_index, color bgColor = color.blue,
     color textColor = color.white, string note = ""
 ) =>
    labelText = note + "\n" + str.tostring(this)
    if barstate.ishistory
        label.new(
             barIndex, 0, labelText, color = bgColor, style = label.style_label_center,
             textcolor = textColor, size = size.huge
         )

//@variable A 2x2 `float` matrix.
matrix<float> myMatrix = matrix.new<float>()
myMatrix.add_col(0, array.from(1.0, 3.0))
myMatrix.add_col(1, array.from(2.0, 4.0))

//@variable A shallow copy of `myMatrix`.
matrix<float> myCopy = myMatrix.copy()
// Add a row to the last index of `myCopy`.
myCopy.add_row(myCopy.rows(), array.from(5.0, 6.0))

if bar_index == last_bar_index - 1
    // Display the rows of both matrices in separate labels.
    myMatrix.debugLabel(note = "Original")
    myCopy.debugLabel(bar_index + 10, color.green, note = "Shallow Copy")
```

值得注意的是，矩阵浅拷贝中的元素指向与原始矩阵相同的值。当矩阵包含特殊类型（[line](https://www.tradingview.com/pine-script-reference/v5/#type_line)、 [linefill](https://www.tradingview.com/pine-script-reference/v5/#type_linefill)、 [box](https://www.tradingview.com/pine-script-reference/v5/#type_box)、 [polyline](https://www.tradingview.com/pine-script-reference/v5/#type_polyline)、 [label](https://www.tradingview.com/pine-script-reference/v5/#type_label)、 [table](https://www.tradingview.com/pine-script-reference/v5/#type_table)或 [chart.point](https://www.tradingview.com/pine-script-reference/v5/#type_chart.point)）或[用户定义类型](https://www.tradingview.com/pine-script-docs/en/v5/language/Type_system.html#pagetypesystem-userdefinedtypes)时，浅表副本的元素引用与原始对象相同的对象。

该脚本声明一个`myMatrix`以 a`newLabel`作为初始值的变量。然后它 通过[myMatrix.copy()](https://www.tradingview.com/pine-script-reference/v5/#fun_matrix.copy)`myMatrix`复制到变量 并绘制标签数量。如下所示， 图表上只有一个[标签](https://www.tradingview.com/pine-script-reference/v5/#op_label)，因为 中的元素与 中的元素引用相同的对象。因此，元素值的更改会影响两个矩阵中的值：`myCopy``myCopy``myMatrix``myCopy`

![../_images/Matrices-复制-a-matrix-Shallow-copies-2.png](https://www.tradingview.com/pine-script-docs/en/v5/_images/Matrices-Copying-a-matrix-Shallow-copies-2.png)

```
Pine Script™
Copied//@version=5
indicator("Shallow copy demo")

//@variable Initial value of the original matrix elements.
var label newLabel = label.new(
     bar_index, 1, "Original", color = color.blue, textcolor = color.white, size = size.huge
 )

//@variable A 1x1 matrix containing a new `label` instance.
var matrix<label> myMatrix = matrix.new<label>(1, 1, newLabel)
//@variable A shallow copy of `myMatrix`.
var matrix<label> myCopy = myMatrix.copy()

//@variable The first label from the `myCopy` matrix.
label testLabel = myCopy.get(0, 0)

// Change the `text`, `style`, and `x` values of `testLabel`. Also affects the `newLabel`.
testLabel.set_text("Copy")
testLabel.set_style(label.style_label_up)
testLabel.set_x(bar_index)

// Plot the total number of labels.
plot(label.all.size(), linewidth = 3)
```



### [深拷贝](https://www.tradingview.com/pine-script-docs/en/v5/language/Matrices.html#id18)

通过显式复制矩阵引用的每个对象，可以生成矩阵的*深层副本*（即，其元素指向原始值的副本的矩阵）。

在这里，我们`deepCopy()`在之前的脚本中添加了一个用户定义的方法。该方法创建一个新矩阵并使用[嵌套 for 循环](https://www.tradingview.com/pine-script-docs/en/v5/language/Matrices.html#pagematrices-loopingthroughamatrix-for)将所有元素分配给原始矩阵的副本。当脚本调用此方法而不是内置的 [copy()](https://www.tradingview.com/pine-script-reference/v5/#fun_matrix.copy)时，我们看到图表上现在有两个标签，并且对标签 from 的任何更改都`myCopy`不会影响 from 标签`myMatrix`：

![../_images/Matrices-复制-a-matrix-Deep-copies-1.png](https://www.tradingview.com/pine-script-docs/en/v5/_images/Matrices-Copying-a-matrix-Deep-copies-1.png)

```
Pine Script™
Copied//@version=5
indicator("Deep copy demo")

//@function Returns a deep copy of a label matrix.
method deepCopy(matrix<label> this) =>
    //@variable A deep copy of `this` matrix.
    matrix<label> that = this.copy()
    for row = 0 to that.rows() - 1
        for column = 0 to that.columns() - 1
            // Assign the element at each `row` and `column` of `that` matrix to a copy of the retrieved label.
            that.set(row, column, that.get(row, column).copy())
    that

//@variable Initial value of the original matrix.
var label newLabel = label.new(
     bar_index, 2, "Original", color = color.blue, textcolor = color.white, size = size.huge
 )

//@variable A 1x1 matrix containing a new `label` instance.
var matrix<label> myMatrix = matrix.new<label>(1, 1, newLabel)
//@variable A deep copy of `myMatrix`.
var matrix<label> myCopy = myMatrix.deepCopy()

//@variable The first label from the `myCopy` matrix.
label testLabel = myCopy.get(0, 0)

// Change the `text`, `style`, and `x` values of `testLabel`. Does not affect the `newLabel`.
testLabel.set_text("Copy")
testLabel.set_style(label.style_label_up)
testLabel.set_x(bar_index)

// Change the `x` value of `newLabel`.
newLabel.set_x(bar_index)

// Plot the total number of labels.
plot(label.all.size(), linewidth = 3)
```



### [子矩阵](https://www.tradingview.com/pine-script-docs/en/v5/language/Matrices.html#id19)

在 Pine 中，子*矩阵*是现有矩阵的[浅表副本](https://www.tradingview.com/pine-script-docs/en/v5/language/Matrices.html#pagematrices-copyingamatrix-shallowcopies)`from_row/column`，仅包含和参数指定的行和列`to_row/column`。本质上，它是矩阵的切片副本。

例如，下面的脚本通过 [m.submatrix()](https://www.tradingview.com/pine-script-reference/v5/#fun_matrix.submatrix)`mSub`方法从矩阵创建一个矩阵，然后调用我们的用户定义函数在标签中显示两个矩阵的行：`m``debugLabel()`

![../_images/Matrices-复制-a-matrix-Submatrices-1.png](https://www.tradingview.com/pine-script-docs/en/v5/_images/Matrices-Copying-a-matrix-Submatrices-1.png)

```
Pine Script™
Copied//@version=5
indicator("Submatrix demo")

//@function Displays the rows of a matrix in a label with a note.
//@param    this The matrix to display.
//@param    barIndex The `bar_index` to display the label at.
//@param    bgColor The background color of the label.
//@param    textColor The color of the label's text.
//@param    note The text to display above the rows.
method debugLabel(
     matrix<float> this, int barIndex = bar_index, color bgColor = color.blue,
     color textColor = color.white, string note = ""
 ) =>
    labelText = note + "\n" + str.tostring(this)
    if barstate.ishistory
        label.new(
             barIndex, 0, labelText, color = bgColor, style = label.style_label_center,
             textcolor = textColor, size = size.huge
         )

//@variable A 3x3 matrix of values.
var m = matrix.new<float>()

if bar_index == last_bar_index - 1
    // Add columns to `m`.
    m.add_col(0, array.from(9, 6, 3))
    m.add_col(1, array.from(8, 5, 2))
    m.add_col(2, array.from(7, 4, 1))
    // Display the rows of `m`.
    m.debugLabel(note = "Original Matrix")

    //@variable A 2x2 submatrix of `m` containing the first two rows and columns.
    matrix<float> mSub = m.submatrix(from_row = 0, to_row = 2, from_column = 0, to_column = 2)
    // Display the rows of `mSub`
    debugLabel(mSub, bar_index + 10, bgColor = color.green, note = "Submatrix")
```



## [范围和历史](https://www.tradingview.com/pine-script-docs/en/v5/language/Matrices.html#id20)

矩阵变量在每个柱上留下历史轨迹，允许脚本使用历史引用运算符 [[\]](https://www.tradingview.com/pine-script-reference/v5/#op_[])与先前分配给变量的过去矩阵实例进行交互。此外，脚本可以在[函数](https://www.tradingview.com/pine-script-docs/en/v5/language/User-defined_functions.html#pageuserdefinedfunctions)、[方法](https://www.tradingview.com/pine-script-docs/en/v5/language/Methods.html#pagemethods)和[条件结构](https://www.tradingview.com/pine-script-docs/en/v5/language/Conditional_structures.html#pageconditionalstructures)的范围内修改分配给全局变量的矩阵。

该脚本计算实体和烛线距离相对于柱上柱范围的平均比率`length`。它`length`在表格中显示数据以及柱之前的值。用户定义的`addData()`函数将当前和历史比率的列添加到`globalMatrix`，并且该`calcAvg()`函数`previous` 引用分配给`globalMatrix`使用[[\]](https://www.tradingview.com/pine-script-reference/v5/#op_[]) 运算符的矩阵来计算平均值矩阵：

![../_images/Matrices-Scope-and-history-1.png](https://www.tradingview.com/pine-script-docs/en/v5/_images/Matrices-Scope-and-history-1.png)

```
Pine Script™
Copied//@version=5
indicator("Scope and history demo", "Bar ratio comparison")

int length = input.int(10, "Length", 1)

//@variable A global matrix.
matrix<float> globalMatrix = matrix.new<float>()

//@function Calculates the ratio of body range to candle range.
bodyRatio() =>
    math.abs(close - open) / (high - low)

//@function Calculates the ratio of upper wick range to candle range.
upperWickRatio() =>
    (high - math.max(open, close)) / (high - low)

//@function Calculates the ratio of lower wick range to candle range.
lowerWickRatio() =>
    (math.min(open, close) - low) / (high - low)

//@function Adds data to the `globalMatrix`.
addData() =>
    // Add a new column of data at `column` 0.
    globalMatrix.add_col(0, array.from(bodyRatio(), upperWickRatio(), lowerWickRatio()))
    //@variable The column of `globalMatrix` from index 0 `length` bars ago.
    array<float> pastValues = globalMatrix.col(0)[length]
    // Add `pastValues` to the `globalMatrix`, or an array of `na` if `pastValues` is `na`.
    if na(pastValues)
        globalMatrix.add_col(1, array.new<float>(3))
    else
        globalMatrix.add_col(1, pastValues)

//@function Returns the `length`-bar average of matrices assigned to `globalMatrix` on historical bars.
calcAvg() =>
    //@variable The sum historical `globalMatrix` matrices.
    matrix<float> sums = matrix.new<float>(globalMatrix.rows(), globalMatrix.columns(), 0.0)
    for i = 0 to length - 1
        //@variable The `globalMatrix` matrix `i` bars before the current bar.
        matrix<float> previous = globalMatrix[i]
        // Break the loop if `previous` is `na`.
        if na(previous)
            sums.fill(na)
            break
        // Assign the sum of `sums` and `previous` to `sums`.
        sums := matrix.sum(sums, previous)
    // Divide the `sums` matrix by the `length`.
    result = sums.mult(1.0 / length)

// Add data to the `globalMatrix`.
addData()

//@variable The historical average of the `globalMatrix` matrices.
globalAvg = calcAvg()

//@variable A `table` displaying information from the `globalMatrix`.
var table infoTable = table.new(
     position.middle_center, globalMatrix.columns() + 1, globalMatrix.rows() + 1, bgcolor = color.navy
 )

// Define value cells.
for [i, row] in globalAvg
    for [j, value] in row
        color textColor = value > 0.333 ? color.orange : color.gray
        infoTable.cell(j + 1, i + 1, str.tostring(value), text_color = textColor, text_size = size.huge)

// Define header cells.
infoTable.cell(0, 1, "Body ratio", text_color = color.white, text_size = size.huge)
infoTable.cell(0, 2, "Upper wick ratio", text_color = color.white, text_size = size.huge)
infoTable.cell(0, 3, "Lower wick ratio", text_color = color.white, text_size = size.huge)
infoTable.cell(1, 0, "Current average", text_color = color.white, text_size = size.huge)
infoTable.cell(2, 0, str.format("{0} bars ago", length), text_color = color.white, text_size = size.huge)
```

- 注意：

  和函数没有参数，因为它们直接与 外部作用域中声明的 和 变量`addData()`交互。`calcAvg()``globalMatrix``length``calcAvg()`[通过使用matrix.sum()](https://www.tradingview.com/pine-script-reference/v5/#fun_matrix.sum)`previous`将矩阵 相加并使用[matrix.mult()](https://www.tradingview.com/pine-script-reference/v5/#fun_matrix.mult)将所有元素相乘来计算平均值。我们在下面的[矩阵计算](https://www.tradingview.com/pine-script-docs/en/v5/language/Matrices.html#pagematrices-matrixcalculations)部分讨论这些和其他专用函数。`1 / length`



## [检查矩阵](https://www.tradingview.com/pine-script-docs/en/v5/language/Matrices.html#id21)

检查矩阵的形状及其元素内的模式的能力至关重要，因为它有助于揭示有关矩阵的重要信息及其与各种计算和转换的兼容性。 Pine Script™ 包含多个用于矩阵检查的内置函数，包括 [matrix.is_square()](https://www.tradingview.com/pine-script-reference/v5/#fun_matrix.is_square)、 [matrix.is_identity()](https://www.tradingview.com/pine-script-reference/v5/#fun_matrix.is_identity)、 [matrix.is_diagonal()](https://www.tradingview.com/pine-script-reference/v5/#fun_matrix.is_diagonal)、 [matrix.is_antidiagonal()](https://www.tradingview.com/pine-script-reference/v5/#fun_matrix.is_antidiagonal)、 [matrix.is_symmetry()](https://www.tradingview.com/pine-script-reference/v5/#fun_matrix.is_symmetric)、 [matrix.is_antisymmetry()](https://www.tradingview.com/pine-script-reference/v5/#fun_matrix.is_antisymmetric)、 [matrix .is_triangle()](https://www.tradingview.com/pine-script-reference/v5/#fun_matrix.is_triangular)、 [matrix.is_stochastic()](https://www.tradingview.com/pine-script-reference/v5/#fun_matrix.is_stochastic)、 [matrix.is_binary()](https://www.tradingview.com/pine-script-reference/v5/#fun_matrix.is_binary)和[matrix.is_zero()](https://www.tradingview.com/pine-script-reference/v5/#fun_matrix.is_zero)。

为了演示这些功能，此示例包含一个自定义`inspect()`方法，该方法使用带有 `matrix.is_*()`函数的条件块来返回有关矩阵的信息。它显示矩阵的字符串表示形式以及从图表上的标签`m` 返回的描述：`m.inspect()`

![../_images/Matrices-Inspecting-a-matrix-1.png](https://www.tradingview.com/pine-script-docs/en/v5/_images/Matrices-Inspecting-a-matrix-1.png)

```
Pine Script™
Copied//@version=5
indicator("Matrix inspection demo")

//@function Inspects a matrix using `matrix.is_*()` functions and returns a `string` describing some of its features.
method inspect(matrix<int> this)=>
    //@variable A string describing `this` matrix.
    string result = "This matrix:\n"
    if this.is_square()
        result += "- Has an equal number of rows and columns.\n"
    if this.is_binary()
        result += "- Contains only 1s and 0s.\n"
    if this.is_zero()
        result += "- Is filled with 0s.\n"
    if this.is_triangular()
        result += "- Contains only 0s above and/or below its main diagonal.\n"
    if this.is_diagonal()
        result += "- Only has nonzero values in its main diagonal.\n"
    if this.is_antidiagonal()
        result += "- Only has nonzero values in its main antidiagonal.\n"
    if this.is_symmetric()
        result += "- Equals its transpose.\n"
    if this.is_antisymmetric()
        result += "- Equals the negative of its transpose.\n"
    if this.is_identity()
        result += "- Is the identity matrix.\n"
    result

//@variable A 4x4 identity matrix.
matrix<int> m = matrix.new<int>()

// Add rows to the matrix.
m.add_row(0, array.from(1, 0, 0, 0))
m.add_row(1, array.from(0, 1, 0, 0))
m.add_row(2, array.from(0, 0, 1, 0))
m.add_row(3, array.from(0, 0, 0, 1))

if bar_index == last_bar_index - 1
    // Display the `m` matrix in a blue label.
    label.new(
         bar_index, 0, str.tostring(m), color = color.blue, style = label.style_label_right,
         textcolor = color.white, size = size.huge
     )
    // Display the result of `m.inspect()` in a purple label.
    label.new(
         bar_index, 0, m.inspect(), color = color.purple, style = label.style_label_left,
         textcolor = color.white, size = size.huge
     )
```



## [操作矩阵](https://www.tradingview.com/pine-script-docs/en/v5/language/Matrices.html#id22)



### [重塑](https://www.tradingview.com/pine-script-docs/en/v5/language/Matrices.html#id23)

矩阵的形状可以决定其与各种矩阵运算的兼容性。在某些情况下，有必要在不影响元素数量或它们引用的值的情况下更改矩阵的维度，也称为*重塑*。要在 Pine 中重塑矩阵，请使用 [matrix.reshape()](https://www.tradingview.com/pine-script-reference/v5/#fun_matrix.reshape)函数。

此示例演示了对矩阵进行多次整形操作的结果。初始`m`矩阵具有 1x8 形状（一行八列）。通过连续调用[m.reshape()](https://www.tradingview.com/pine-script-reference/v5/#fun_matrix.reshape) 方法，脚本将形状更改`m`为 2x4、4x2 和 8x1。它使用自定义方法在图表上的标签中显示每个重塑矩阵`debugLabel()`：

![../_images/Matrices-Manipulated-a-matrix-Reshaping-1.png](https://www.tradingview.com/pine-script-docs/en/v5/_images/Matrices-Manipulating-a-matrix-Reshaping-1.png)

```
Pine Script™
Copied//@version=5
indicator("Reshaping example")

//@function Displays the rows of a matrix in a label with a note.
//@param    this The matrix to display.
//@param    barIndex The `bar_index` to display the label at.
//@param    bgColor The background color of the label.
//@param    textColor The color of the label's text.
//@param    note The text to display above the rows.
method debugLabel(
     matrix<float> this, int barIndex = bar_index, color bgColor = color.blue,
     color textColor = color.white, string note = ""
 ) =>
    labelText = note + "\n" + str.tostring(this)
    if barstate.ishistory
        label.new(
             barIndex, 0, labelText, color = bgColor, style = label.style_label_center,
             textcolor = textColor, size = size.huge
         )

//@variable A matrix containing the values 1-8.
matrix<int> m = matrix.new<int>()

if bar_index == last_bar_index - 1
    // Add the initial vector of values.
    m.add_row(0, array.from(1, 2, 3, 4, 5, 6, 7, 8))
    m.debugLabel(note = "Initial 1x8 matrix")

    // Reshape. `m` now has 2 rows and 4 columns.
    m.reshape(2, 4)
    m.debugLabel(bar_index + 10, note = "Reshaped to 2x4")

    // Reshape. `m` now has 4 rows and 2 columns.
    m.reshape(4, 2)
    m.debugLabel(bar_index + 20, note = "Reshaped to 4x2")

    // Reshape. `m` now has 8 rows and 1 column.
    m.reshape(8, 1)
    m.debugLabel(bar_index + 30, note = "Reshaped to 8x1")
```

- 注意：

  每次调用时元素的顺序`m`不会改变`m.reshape()`。`rows`重塑矩阵时，和参数的乘积`columns`必须等于 [matrix.elements_count()](https://www.tradingview.com/pine-script-reference/v5/#fun_matrix.elements_count) 值，因为[matrix.reshape()](https://www.tradingview.com/pine-script-reference/v5/#fun_matrix.reshape) 无法更改矩阵中的元素数量。



### [反转](https://www.tradingview.com/pine-script-docs/en/v5/language/Matrices.html#id24)

[可以使用matrix.reverse()](https://www.tradingview.com/pine-script-reference/v5/#fun_matrix.reverse)反转矩阵中所有元素的顺序 。该函数将 m×n 矩阵`id`的第 i 行第 j 列的引用移动到第 m - 1 - i 行和 n - 1 - j 列。

例如，此脚本创建一个 3x3 矩阵，其中包含按升序排列的值 1-9，然后使用[reverse()](https://www.tradingview.com/pine-script-reference/v5/#fun_matrix.reverse) 方法反转其内容。它通过以下方式在图表上的标签中显示矩阵的原始版本和修改版本`m.debugLabel()`：

![../_images/Matrices-Manipulated-a-matrix-Reversing-1.png](https://www.tradingview.com/pine-script-docs/en/v5/_images/Matrices-Manipulating-a-matrix-Reversing-1.png)

```
Pine Script™
Copied//@version=5
indicator("Reversing demo")

//@function Displays the rows of a matrix in a label with a note.
//@param    this The matrix to display.
//@param    barIndex The `bar_index` to display the label at.
//@param    bgColor The background color of the label.
//@param    textColor The color of the label's text.
//@param    note The text to display above the rows.
method debugLabel(
     matrix<float> this, int barIndex = bar_index, color bgColor = color.blue,
     color textColor = color.white, string note = ""
 ) =>
    labelText = note + "\n" + str.tostring(this)
    if barstate.ishistory
        label.new(
             barIndex, 0, labelText, color = bgColor, style = label.style_label_center,
             textcolor = textColor, size = size.huge
         )

//@variable A 3x3 matrix.
matrix<float> m = matrix.new<float>()

// Add rows to `m`.
m.add_row(0, array.from(1, 2, 3))
m.add_row(1, array.from(4, 5, 6))
m.add_row(2, array.from(7, 8, 9))

if bar_index == last_bar_index - 1
    // Display the contents of `m`.
    m.debugLabel(note = "Original")
    // Reverse `m`, then display its contents.
    m.reverse()
    m.debugLabel(bar_index + 10, color.red, note = "Reversed")
```



### [转置](https://www.tradingview.com/pine-script-docs/en/v5/language/Matrices.html#id25)

转置矩阵是一项基本操作，它围绕 *主对角线*（行索引等于列索引的所有值的对角向量）翻转矩阵中的所有行和列。此过程会产生一个具有相反行和列维度的新矩阵，称为*转置*。脚本可以使用[matrix.transpose()](https://www.tradingview.com/pine-script-reference/v5/#fun_matrix.transpose)计算矩阵的转置 。

[对于任何 m 行、n 列的矩阵，从matrix.transpose()](https://www.tradingview.com/pine-script-reference/v5/#fun_matrix.transpose)返回的矩阵 将具有 n 行和 m 列。矩阵中第 i 行第 j 列的所有元素对应于其转置中第 j 行第 i 列的元素。

此示例声明一个 2x4`m`矩阵，使用 [m.transpose()](https://www.tradingview.com/pine-script-reference/v5/#fun_matrix.transpose)方法计算其转置，并使用我们的自定义方法在图表上显示两个矩阵`debugLabel()`。如下所示，转置矩阵的形状为 4x2，转置后的行与原始矩阵的列相匹配：

![../_images/矩阵-操作-a-矩阵-转置-1.png](https://www.tradingview.com/pine-script-docs/en/v5/_images/Matrices-Manipulating-a-matrix-Transposing-1.png)

```
Pine Script™
Copied//@version=5
indicator("Transpose example")

//@function Displays the rows of a matrix in a label with a note.
//@param    this The matrix to display.
//@param    barIndex The `bar_index` to display the label at.
//@param    bgColor The background color of the label.
//@param    textColor The color of the label's text.
//@param    note The text to display above the rows.
method debugLabel(
     matrix<float> this, int barIndex = bar_index, color bgColor = color.blue,
     color textColor = color.white, string note = ""
 ) =>
    labelText = note + "\n" + str.tostring(this)
    if barstate.ishistory
        label.new(
             barIndex, 0, labelText, color = bgColor, style = label.style_label_center,
             textcolor = textColor, size = size.huge
         )

//@variable A 2x4 matrix.
matrix<int> m = matrix.new<int>()

// Add columns to `m`.
m.add_col(0, array.from(1, 5))
m.add_col(1, array.from(2, 6))
m.add_col(2, array.from(3, 7))
m.add_col(3, array.from(4, 8))

//@variable The transpose of `m`. Has a 4x2 shape.
matrix<int> mt = m.transpose()

if bar_index == last_bar_index - 1
    m.debugLabel(note = "Original")
    mt.debugLabel(bar_index + 10, note = "Transpose")
```



### [排序](https://www.tradingview.com/pine-script-docs/en/v5/language/Matrices.html#id26)

[脚本可以通过matrix.sort()](https://www.tradingview.com/pine-script-reference/v5/#fun_matrix.sort)对矩阵的内容进行排序 。与对*元素进行排序的*[array.sort()](https://www.tradingview.com/pine-script-reference/v5/#fun_array.sort)不同，此函数根据指定的值按指定的顺序 （默认为[order.ascending](https://www.tradingview.com/pine-script-reference/v5/#var_order.ascending) ）组织矩阵中的所有*行*。`order``column`

此脚本声明一个 3x3矩阵，根据第一列对副本的行进行升序排序，然后`m`根据第二列对副本的行进行降序排序。它使用我们的方法显示原始矩阵和标签中的排序副本：`m1``m2``debugLabel()`

![../_images/Matrices-Manipulated-a-matrix-Sorting-1.png](https://www.tradingview.com/pine-script-docs/en/v5/_images/Matrices-Manipulating-a-matrix-Sorting-1.png)

```
Pine Script™
Copied//@version=5
indicator("Sorting rows example")

//@function Displays the rows of a matrix in a label with a note.
//@param    this The matrix to display.
//@param    barIndex The `bar_index` to display the label at.
//@param    bgColor The background color of the label.
//@param    textColor The color of the label's text.
//@param    note The text to display above the rows.
method debugLabel(
     matrix<float> this, int barIndex = bar_index, color bgColor = color.blue,
     color textColor = color.white, string note = ""
 ) =>
    labelText = note + "\n" + str.tostring(this)
    if barstate.ishistory
        label.new(
             barIndex, 0, labelText, color = bgColor, style = label.style_label_center,
             textcolor = textColor, size = size.huge
         )

//@variable A 3x3 matrix.
matrix<int> m = matrix.new<int>()

if bar_index == last_bar_index - 1
    // Add rows to `m`.
    m.add_row(0, array.from(3, 2, 4))
    m.add_row(1, array.from(1, 9, 6))
    m.add_row(2, array.from(7, 8, 9))
    m.debugLabel(note = "Original")

    // Copy `m` and sort rows in ascending order based on the first column (default).
    matrix<int> m1 = m.copy()
    m1.sort()
    m1.debugLabel(bar_index + 10, color.green, note = "Sorted using col 0\n(Ascending)")

    // Copy `m` and sort rows in descending order based on the second column.
    matrix<int> m2 = m.copy()
    m2.sort(1, order.descending)
    m2.debugLabel(bar_index + 20, color.red, note = "Sorted using col 1\n(Descending)")
```

需要注意的是，[matrix.sort()](https://www.tradingview.com/pine-script-reference/v5/#fun_matrix.sort) 不会对矩阵的列进行排序。然而，我们*可以使用这个函数在*[matrix.transpose()](https://www.tradingview.com/pine-script-reference/v5/#fun_matrix.transpose)的帮助下对矩阵列进行排序 。

例如，此脚本包含一个`sortColumns()`方法，该方法使用 [sort()](https://www.tradingview.com/pine-script-reference/v5/#fun_matrix.sort) 方法使用与原始矩阵 对应的列对矩阵的[转置](https://www.tradingview.com/pine-script-reference/v5/#fun_matrix.transpose)进行排序。该脚本使用此方法根据第一行的内容对矩阵`row`进行排序：`m`

![../_images/Matrices-Manipulated-a-matrix-Sorting-2.png](https://www.tradingview.com/pine-script-docs/en/v5/_images/Matrices-Manipulating-a-matrix-Sorting-2.png)

```
Pine Script™
Copied//@version=5
indicator("Sorting columns example")

//@function Displays the rows of a matrix in a label with a note.
//@param    this The matrix to display.
//@param    barIndex The `bar_index` to display the label at.
//@param    bgColor The background color of the label.
//@param    textColor The color of the label's text.
//@param    note The text to display above the rows.
method debugLabel(
     matrix<float> this, int barIndex = bar_index, color bgColor = color.blue,
     color textColor = color.white, string note = ""
 ) =>
    labelText = note + "\n" + str.tostring(this)
    if barstate.ishistory
        label.new(
             barIndex, 0, labelText, color = bgColor, style = label.style_label_center,
             textcolor = textColor, size = size.huge
         )

//@function Sorts the columns of `this` matrix based on the values in the specified `row`.
method sortColumns(matrix<int> this, int row = 0, bool ascending = true) =>
    //@variable The transpose of `this` matrix.
    matrix<int> thisT = this.transpose()
    //@variable Is `order.ascending` when `ascending` is `true`, `order.descending` otherwise.
    order = ascending ? order.ascending : order.descending
    // Sort the rows of `thisT` using the `row` column.
    thisT.sort(row, order)
    //@variable A copy of `this` matrix with sorted columns.
    result = thisT.transpose()

//@variable A 3x3 matrix.
matrix<int> m = matrix.new<int>()

if bar_index == last_bar_index - 1
    // Add rows to `m`.
    m.add_row(0, array.from(3, 2, 4))
    m.add_row(1, array.from(1, 9, 6))
    m.add_row(2, array.from(7, 8, 9))
    m.debugLabel(note = "Original")

    // Sort the columns of `m` based on the first row and display the result.
    m.sortColumns(0).debugLabel(bar_index + 10, note = "Sorted using row 0\n(Ascending)")
```



### [连接](https://www.tradingview.com/pine-script-docs/en/v5/language/Matrices.html#id27)

脚本可以使用[matrix.concat()](https://www.tradingview.com/pine-script-reference/v5/#fun_matrix.concat)*连接*两个矩阵。此函数将矩阵的行附加到具有相同列数的矩阵的末尾。`id2``id1`

要创建一个矩阵，其中的元素表示附加到另一个矩阵的 *列，*[请转置](https://www.tradingview.com/pine-script-docs/en/v5/language/Matrices.html#pagematrices-manipulatingamatrix-transposing)两个矩阵， 对转置后的矩阵使用[matrix.concat() ，然后](https://www.tradingview.com/pine-script-reference/v5/#fun_matrix.concat)[转置()](https://www.tradingview.com/pine-script-reference/v5/#fun_matrix.transpose)结果。

例如，此脚本将矩阵的行附加`m2`到矩阵，并使用矩阵的*转置副本*`m1`附加其列。它使用自定义方法在标签中连接行和列后显示和矩阵以及结果：`m1``m2``debugLabel()`

![../_images/Matrices-Manipulated-a-matrix-Concatenating-1.png](https://www.tradingview.com/pine-script-docs/en/v5/_images/Matrices-Manipulating-a-matrix-Concatenating-1.png)

```
Pine Script™
Copied//@version=5
indicator("Concatenation demo")

//@function Displays the rows of a matrix in a label with a note.
//@param    this The matrix to display.
//@param    barIndex The `bar_index` to display the label at.
//@param    bgColor The background color of the label.
//@param    textColor The color of the label's text.
//@param    note The text to display above the rows.
method debugLabel(
     matrix<float> this, int barIndex = bar_index, color bgColor = color.blue,
     color textColor = color.white, string note = ""
 ) =>
    labelText = note + "\n" + str.tostring(this)
    if barstate.ishistory
        label.new(
             barIndex, 0, labelText, color = bgColor, style = label.style_label_center,
             textcolor = textColor, size = size.huge
         )

//@variable A 2x3 matrix filled with 1s.
matrix<int> m1 = matrix.new<int>(2, 3, 1)
//@variable A 2x3 matrix filled with 2s.
matrix<int> m2 = matrix.new<int>(2, 3, 2)

//@variable The transpose of `m1`.
t1 = m1.transpose()
//@variable The transpose of `m2`.
t2 = m2.transpose()

if bar_index == last_bar_index - 1
    // Display the original matrices.
    m1.debugLabel(note = "Matrix 1")
    m2.debugLabel(bar_index + 10, note = "Matrix 2")
    // Append the rows of `m2` to the end of `m1` and display `m1`.
    m1.concat(m2)
    m1.debugLabel(bar_index + 20, color.blue, note = "Appended rows")
    // Append the rows of `t2` to the end of `t1`, then display the transpose of `t1.
    t1.concat(t2)
    t1.transpose().debugLabel(bar_index + 30, color.purple, note = "Appended columns")
```



## [矩阵计算](https://www.tradingview.com/pine-script-docs/en/v5/language/Matrices.html#id28)



### [逐元素计算](https://www.tradingview.com/pine-script-docs/en/v5/language/Matrices.html#id29)

Pine脚本可以通过 [matrix.avg()](https://www.tradingview.com/pine-script-reference/v5/#fun_matrix.avg)、 [matrix.min()](https://www.tradingview.com/pine-script-reference/v5/#fun_matrix.min)、 [matrix.max()](https://www.tradingview.com/pine-script-reference/v5/#fun_matrix.max)和[matrix.mode()](https://www.tradingview.com/pine-script-reference/v5/#fun_matrix.mode)计算矩阵中所有元素的*平均值*、*最小值*、*最大值*和*众数*。这些函数的操作与其等效函数相同，允许用户 使用相同的语法对矩阵、其子[矩阵](https://www.tradingview.com/pine-script-docs/en/v5/language/Matrices.html#pagematrices-copyingamatrix-submatrices)及其[行和列](https://www.tradingview.com/pine-script-docs/en/v5/language/Matrices.html#pagematrices-rowsandcolumns)运行逐元素计算。例如，在具有值 1-9 的 3x3 矩阵和 具有相同九个元素的[数组](https://www.tradingview.com/pine-script-reference/v5/#op_array)上调用的内置函数都将返回值 5。`array.*``*.avg()`

下面的脚本使用`*.avg()`、`*.max()`和`*.min()`方法来计算一段时间内 OHLC 数据的发展平均值和极值。无论何时，它都会在矩阵末尾添加一列新的[开盘价](https://www.tradingview.com/pine-script-reference/v5/#var_open)、 [最高价](https://www.tradingview.com/pine-script-reference/v5/#var_high)、 [最低价](https://www.tradingview.com/pine-script-reference/v5/#var_low)和 [收盘](https://www.tradingview.com/pine-script-reference/v5/#var_close)价。当 时，脚本使用 [get()](https://www.tradingview.com/pine-script-reference/v5/#fun_matrix.get)和 [set()](https://www.tradingview.com/pine-script-reference/v5/#fun_matrix.set)矩阵方法调整最后一列中的元素，以得出当前周期的 HLC 值。它使用矩阵、 [submatrix()](https://www.tradingview.com/pine-script-reference/v5/#fun_matrix.submatrix)、 [row()](https://www.tradingview.com/pine-script-reference/v5/#fun_matrix.row)和 [col()](https://www.tradingview.com/pine-script-reference/v5/#fun_matrix.col)数组来计算一段时间内发展中的 OHLC4 和 HL2 平均值、一段时间内的最大高点和最小低点，以及当前时期的发展中 OHLC4 价格：`ohlcData``queueColumn``true``false``ohlcData``length``length`

![../_images/Matrices-Matrix-calculations-Element-wise-calculations-1.png](https://www.tradingview.com/pine-script-docs/en/v5/_images/Matrices-Matrix-calculations-Element-wise-calculations-1.png)

```
Pine Script™
Copied//@version=5
indicator("Element-wise calculations example", "Developing values", overlay = true)

//@variable The number of data points in the averages.
int length = input.int(3, "Length", 1)
//@variable The timeframe of each reset period.
string timeframe = input.timeframe("D", "Reset Timeframe")

//@variable A 4x`length` matrix of OHLC values.
var matrix<float> ohlcData = matrix.new<float>(4, length)

//@variable Is `true` at the start of a new bar at the `timeframe`.
bool queueColumn = timeframe.change(timeframe)

if queueColumn
    // Add new values to the end column of `ohlcData`.
    ohlcData.add_col(length, array.from(open, high, low, close))
    // Remove the oldest column from `ohlcData`.
    ohlcData.remove_col(0)
else
    // Adjust the last element of column 1 for new highs.
    if high > ohlcData.get(1, length - 1)
        ohlcData.set(1, length - 1, high)
    // Adjust the last element of column 2 for new lows.
    if low < ohlcData.get(2, length - 1)
        ohlcData.set(2, length - 1, low)
    // Adjust the last element of column 3 for the new closing price.
    ohlcData.set(3, length - 1, close)

//@variable The `matrix.avg()` of all elements in `ohlcData`.
avgOHLC4 = ohlcData.avg()
//@variable The `matrix.avg()` of all elements in rows 1 and 2, i.e., the average of all `high` and `low` values.
avgHL2   = ohlcData.submatrix(from_row = 1, to_row = 3).avg()
//@variable The `matrix.max()` of all values in `ohlcData`. Equivalent to `ohlcData.row(1).max()`.
maxHigh = ohlcData.max()
//@variable The `array.min()` of all `low` values in `ohlcData`. Equivalent to `ohlcData.min()`.
minLow = ohlcData.row(2).min()
//@variable The `array.avg()` of the last column in `ohlcData`, i.e., the current OHLC4.
ohlc4Value = ohlcData.col(length - 1).avg()

plot(avgOHLC4, "Average OHLC4", color.purple, 2)
plot(avgHL2, "Average HL2", color.navy, 2)
plot(maxHigh, "Max High", color.green)
plot(minLow, "Min Low", color.red)
plot(ohlc4Value, "Current OHLC4", color.blue)
```

- 注意：

  在此示例中，我们交替使用[array.*()](https://www.tradingview.com/pine-script-reference/v5/#op_array)和 [matrix.*()](https://www.tradingview.com/pine-script-reference/v5/#op_matrix)方法来演示它们在语法和行为上的相似性。用户可以通过将matrix.avg()乘以 [matrix.elements_count( ](https://www.tradingview.com/pine-script-reference/v5/#fun_matrix.elements_count)[)来计算](https://www.tradingview.com/pine-script-reference/v5/#fun_matrix.avg)[array.sum()](https://www.tradingview.com/pine-script-reference/v5/#fun_array.sum)的等价矩阵。



### [特殊计算](https://www.tradingview.com/pine-script-docs/en/v5/language/Matrices.html#id30)

Pine Script™ 具有多个用于执行基本矩阵算术和线性代数运算的内置函数，包括[matrix.sum()](https://www.tradingview.com/pine-script-reference/v5/#fun_matrix.sum)、 [matrix.diff()](https://www.tradingview.com/pine-script-reference/v5/#fun_matrix.diff)、 [matrix.mult()](https://www.tradingview.com/pine-script-reference/v5/#fun_matrix.mult)、 [matrix.pow()](https://www.tradingview.com/pine-script-reference/v5/#fun_matrix.pow)、 [matrix.det()](https://www.tradingview.com/pine-script-reference/v5/#fun_matrix.det)、 [矩阵.inv()](https://www.tradingview.com/pine-script-reference/v5/#fun_matrix.inv)、 [矩阵.pinv()](https://www.tradingview.com/pine-script-reference/v5/#fun_matrix.pinv)、 [矩阵.rank()](https://www.tradingview.com/pine-script-reference/v5/#fun_matrix.rank)、 [矩阵.trace()](https://www.tradingview.com/pine-script-reference/v5/#fun_matrix.trace)、 [矩阵.特征值()](https://www.tradingview.com/pine-script-reference/v5/#fun_matrix.eigenvalues)、 [矩阵.特征向量()](https://www.tradingview.com/pine-script-reference/v5/#fun_matrix.eigenvectors)和[矩阵.kron()](https://www.tradingview.com/pine-script-reference/v5/#fun_matrix.kron)。这些函数是高级功能，可促进各种矩阵计算和转换。

下面，我们通过一些基本示例来解释一些基本功能。



#### [`matrix.sum()` 和 `matrix.diff()` ](https://www.tradingview.com/pine-script-docs/en/v5/language/Matrices.html#id31)

[脚本可以使用matrix.sum()](https://www.tradingview.com/pine-script-reference/v5/#fun_matrix.sum)和 [matrix.diff()](https://www.tradingview.com/pine-script-reference/v5/#fun_matrix.diff)函数对具有相同形状的两个矩阵或一个矩阵和一个标量值执行加法和减法。这些函数使用矩阵或标量中的值`id2`来添加或减去 中的元素`id1`。

该脚本演示了 Pine 中矩阵加法和减法的简单示例。它创建一个3x3矩阵，计算其[转置](https://www.tradingview.com/pine-script-docs/en/v5/language/Matrices.html#pagematrices-manipulatingamatrix-transposing)，然后计算 两个矩阵的[matrix.sum()](https://www.tradingview.com/pine-script-reference/v5/#fun_matrix.sum)和 [matrix.diff()](https://www.tradingview.com/pine-script-reference/v5/#fun_matrix.diff) 。此示例在图表上的标签中显示原始矩阵、其 [转置](https://www.tradingview.com/pine-script-reference/v5/#fun_matrix.transpose)以及生成的和矩阵和差矩阵：

![../_images/Matrices-Matrix-calculations-Special-calculations-1.png](https://www.tradingview.com/pine-script-docs/en/v5/_images/Matrices-Matrix-calculations-Special-calculations-1.png)

```
Pine Script™
Copied//@version=5
indicator("Matrix sum and diff example")

//@function Displays the rows of a matrix in a label with a note.
//@param    this The matrix to display.
//@param    barIndex The `bar_index` to display the label at.
//@param    bgColor The background color of the label.
//@param    textColor The color of the label's text.
//@param    note The text to display above the rows.
method debugLabel(
     matrix<float> this, int barIndex = bar_index, color bgColor = color.blue,
     color textColor = color.white, string note = ""
 ) =>
    labelText = note + "\n" + str.tostring(this)
    if barstate.ishistory
        label.new(
             barIndex, 0, labelText, color = bgColor, style = label.style_label_center,
             textcolor = textColor, size = size.huge
         )

//@variable A 3x3 matrix.
m = matrix.new<float>()

// Add rows to `m`.
m.add_row(0, array.from(0.5, 1.0, 1.5))
m.add_row(1, array.from(2.0, 2.5, 3.0))
m.add_row(2, array.from(3.5, 4.0, 4.5))

if bar_index == last_bar_index - 1
    // Display `m`.
    m.debugLabel(note = "A")
    // Get and display the transpose of `m`.
    matrix<float> t = m.transpose()
    t.debugLabel(bar_index + 10, note = "Aᵀ")
    // Calculate the sum of the two matrices. The resulting matrix is symmetric.
    matrix.sum(m, t).debugLabel(bar_index + 20, color.green, note = "A + Aᵀ")
    // Calculate the difference between the two matrices. The resulting matrix is antisymmetric.
    matrix.diff(m, t).debugLabel(bar_index + 30, color.red, note = "A - Aᵀ")
```

- 注意：

  在此示例中，我们将原始矩阵标记为“A”，将转置矩阵标记为“A T ”。将“A”和“ AT ”相加生成[对称](https://www.tradingview.com/pine-script-reference/v5/#fun_matrix.is_symmetric) 矩阵，将它们相减生成[反对称](https://www.tradingview.com/pine-script-reference/v5/#fun_matrix.is_antisymmetric)矩阵。



#### [`matrix.mult()` ](https://www.tradingview.com/pine-script-docs/en/v5/language/Matrices.html#id32)

[脚本可以通过matrix.mult()](https://www.tradingview.com/pine-script-reference/v5/#fun_matrix.mult)函数将两个矩阵相乘 。此函数还有助于矩阵与[数组](https://www.tradingview.com/pine-script-reference/v5/#op_array)或标量值的乘法 。

在将两个矩阵相乘的情况下，与加法和减法不同，矩阵乘法不需要两个矩阵共享相同的形状。但是，第一个矩阵中的列数必须等于第二个矩阵中的行数。[matrix.mult()](https://www.tradingview.com/pine-script-reference/v5/#fun_matrix.mult)返回的结果矩阵 将包含与 相同的行数`id1`和相同的列数`id2`。例如，2x3 矩阵乘以 3x4 矩阵将产生一个两行四列的矩阵，如下所示。生成的矩阵中的每个值都是 中相应行和列的[点积](https://en.wikipedia.org/wiki/Dot_product)：`id1``id2`

![../_images/Matrices-Matrix-calculations-Special-calculations-2.png](https://www.tradingview.com/pine-script-docs/en/v5/_images/Matrices-Matrix-calculations-Special-calculations-2.png)

```
Pine Script™
Copied//@version=5
indicator("Matrix mult example")

//@function Displays the rows of a matrix in a label with a note.
//@param    this The matrix to display.
//@param    barIndex The `bar_index` to display the label at.
//@param    bgColor The background color of the label.
//@param    textColor The color of the label's text.
//@param    note The text to display above the rows.
method debugLabel(
     matrix<float> this, int barIndex = bar_index, color bgColor = color.blue,
     color textColor = color.white, string note = ""
 ) =>
    labelText = note + "\n" + str.tostring(this)
    if barstate.ishistory
        label.new(
             barIndex, 0, labelText, color = bgColor, style = label.style_label_center,
             textcolor = textColor, size = size.huge
         )

//@variable A 2x3 matrix.
a = matrix.new<float>()
//@variable A 3x4 matrix.
b = matrix.new<float>()

// Add rows to `a`.
a.add_row(0, array.from(1, 2, 3))
a.add_row(1, array.from(4, 5, 6))

// Add rows to `b`.
b.add_row(0, array.from(0.5, 1.0, 1.5, 2.0))
b.add_row(1, array.from(2.5, 3.0, 3.5, 4.0))
b.add_row(0, array.from(4.5, 5.0, 5.5, 6.0))

if bar_index == last_bar_index - 1
    //@variable The result of `a` * `b`.
    matrix<float> ab = a.mult(b)
    // Display `a`, `b`, and `ab` matrices.
    debugLabel(a, note = "A")
    debugLabel(b, bar_index + 10, note = "B")
    debugLabel(ab, bar_index + 20, color.green, note = "A * B")
```

- 注意：

  与标量乘法相反，矩阵乘法是*不可交换的*，即 不一定产生与 相同的结果。在我们的示例中，后者将引发运行时错误，因为 中的列数不等于 中的行数。`matrix.mult(a, b)``matrix.mult(b, a)``b``a`

当矩阵和[数组](https://www.tradingview.com/pine-script-reference/v5/#op_array)`id1`相乘时，该函数将运算视为与单列矩阵 相乘，但它返回一个[数组](https://www.tradingview.com/pine-script-reference/v5/#op_array)，其元素数与 中的行数相同`id1`。当[matrix.mult()](https://www.tradingview.com/pine-script-reference/v5/#fun_matrix.mult)传递一个标量作为其`id2`值时，该函数返回一个新矩阵，其元素是 in 中的元素`id1`乘以该`id2`值。



#### [`matrix.det()` ](https://www.tradingview.com/pine-script-docs/en/v5/language/Matrices.html#id33)

行列式是与*方阵*相关的标量值，描述了[方阵](https://www.tradingview.com/pine-script-reference/v5/#fun_matrix.is_square) 的一些特征，即其可逆性。如果矩阵有 [逆矩阵](https://www.tradingview.com/pine-script-reference/v5/#fun_matrix.inv)，则其行列式非零。否则，矩阵是 *奇异的*（不可逆的）。脚本可以通过[matrix.det()](https://www.tradingview.com/pine-script-reference/v5/#fun_matrix.det)计算矩阵的行列式 。

程序员可以使用行列式来检测矩阵之间的相似性、识别*满秩矩阵*和*缺秩*矩阵、求解线性方程组等应用。

例如，此脚本利用行列式通过 [克莱默规则](https://en.wikipedia.org/wiki/Cramer's_rule)求解具有匹配数量的未知值的线性方程组。用户定义`solve()`函数返回一个 [数组](https://www.tradingview.com/pine-script-reference/v5/#op_array)，其中包含系统中每个未知值的解，其中数组的第 n 个元素是系数矩阵的行列式，第 n 列替换为常量列除以行列式的原始系数。

在此脚本中，我们定义了`m`保存这三个方程的系数和常数的矩阵：

```
Pine Script™
Copied3 * x0 + 4 * x1 - 1 * x2 = 8
5 * x0 - 2 * x1 + 1 * x2 = 4
2 * x0 - 2 * x1 + 1 * x2 = 1
```

该系统的解决方案是.该脚本通过via计算这些值并将它们绘制在图表上：`(x0 = 1, x1 = 2, x2 = 3)``m``m.solve()`

![../_images/Matrices-Matrix-calculations-Special-calculations-3.png](https://www.tradingview.com/pine-script-docs/en/v5/_images/Matrices-Matrix-calculations-Special-calculations-3.png)

```
Pine Script™
Copied//@version=5
indicator("Determinants example", "Cramer's Rule")

//@function Solves a system of linear equations with a matching number of unknowns using Cramer's rule.
//@param    this An augmented matrix containing the coefficients for each unknown and the results of
//          the equations. For example, a row containing the values 2, -1, and 3 represents the equation
//          `2 * x0 + (-1) * x1 = 3`, where `x0` and `x1` are the unknown values in the system.
//@returns  An array containing solutions for each variable in the system.
solve(matrix<float> this) =>
    //@variable The coefficient matrix for the system of equations.
    matrix<float> coefficients = this.submatrix(from_column = 0, to_column = this.columns() - 1)
    //@variable The array of resulting constants for each equation.
    array<float> constants = this.col(this.columns() - 1)
    //@variable An array containing solutions for each unknown in the system.
    array<float> result = array.new<float>()

    //@variable The determinant value of the coefficient matrix.
    float baseDet = coefficients.det()
    matrix<float> modified = na
    for col = 0 to coefficients.columns() - 1
        modified := coefficients.copy()
        modified.add_col(col, constants)
        modified.remove_col(col + 1)

        // Calculate the solution for the column's unknown by dividing the determinant of `modified` by the `baseDet`.
        result.push(modified.det() / baseDet)

    result

//@variable A 3x4 matrix containing coefficients and results for a system of three equations.
m = matrix.new<float>()

// Add rows for the following equations:
// Equation 1: 3 * x0 + 4 * x1 - 1 * x2 = 8
// Equation 2: 5 * x0 - 2 * x1 + 1 * x2 = 4
// Equation 3: 2 * x0 - 2 * x1 + 1 * x2 = 1
m.add_row(0, array.from(3.0, 4.0, -1.0, 8.0))
m.add_row(1, array.from(5.0, -2.0, 1.0, 4.0))
m.add_row(2, array.from(2.0, -2.0, 1.0, 1.0))

//@variable An array of solutions to the unknowns in the system of equations represented by `m`.
solutions = solve(m)

plot(solutions.get(0), "x0", color.red, 3)   // Plots 1.
plot(solutions.get(1), "x1", color.green, 3) // Plots 2.
plot(solutions.get(2), "x2", color.blue, 3)  // Plots 3.
```

- 注意：

  求解方程组对于*回归分析*特别有用，例如线性回归和多项式回归。克莱默规则适用于小型方程组。然而，在较大的系统上，它的计算效率很低。对于此类用例，通常首选其他方法，例如[高斯消除法。](https://en.wikipedia.org/wiki/Gaussian_elimination)



#### [`matrix.inv()` 和 `matrix.pinv()` ](https://www.tradingview.com/pine-script-docs/en/v5/language/Matrices.html#id34)

对于任何非奇异[方阵](https://www.tradingview.com/pine-script-reference/v5/#fun_matrix.is_square)，都有一个逆矩阵，当[乘以](https://www.tradingview.com/pine-script-docs/en/v5/language/Matrices.html#pagematrices-matrixcalculations-specialcalculations-matrixmult)原始矩阵时会产生[单位](https://www.tradingview.com/pine-script-reference/v5/#fun_matrix.is_identity)矩阵 。逆矩阵在各种矩阵变换和求解方程组中都有用处。**当矩阵存在时，**脚本可以通过 [matrix.inv()](https://www.tradingview.com/pine-script-reference/v5/#fun_matrix.inv)函数计算矩阵的逆。

对于奇异（不可逆）矩阵，无论矩阵是方阵还是具有非零[行列式](https://en.wikipedia.org/wiki/Moore–Penrose_inverse)，都可以通过 [matrix.pinv()](https://www.tradingview.com/pine-script-reference/v5/#fun_matrix.pinv)函数计算广义逆（伪逆）。请记住，与真逆不同，伪逆与原始矩阵的乘积不一定等于单位矩阵，除非原始矩阵*是可逆的*。

以下示例`m`根据用户输入形成 2x2 矩阵，然后使用 [m.inv()](https://www.tradingview.com/pine-script-reference/v5/#fun_matrix.inv)和 [m.pinv()](https://www.tradingview.com/pine-script-reference/v5/#fun_matrix.pinv)方法计算 的逆或伪逆`m`。该脚本在图表上的标签中显示原始矩阵、其逆矩阵或伪逆矩阵及其乘积：

![../_images/Matrices-Matrix-calculations-Special-calculations-4.png](https://www.tradingview.com/pine-script-docs/en/v5/_images/Matrices-Matrix-calculations-Special-calculations-4.png)

```
Pine Script™
Copied//@version=5
indicator("Inverse example")

// Element inputs for the 2x2 matrix.
float r0c0 = input.float(4.0, "Row 0, Col 0")
float r0c1 = input.float(3.0, "Row 0, Col 1")
float r1c0 = input.float(2.0, "Row 1, Col 0")
float r1c1 = input.float(1.0, "Row 1, Col 1")

//@function Displays the rows of a matrix in a label with a note.
//@param    this The matrix to display.
//@param    barIndex The `bar_index` to display the label at.
//@param    bgColor The background color of the label.
//@param    textColor The color of the label's text.
//@param    note The text to display above the rows.
method debugLabel(
     matrix<float> this, int barIndex = bar_index, color bgColor = color.blue,
     color textColor = color.white, string note = ""
 ) =>
    labelText = note + "\n" + str.tostring(this)
    if barstate.ishistory
        label.new(
             barIndex, 0, labelText, color = bgColor, style = label.style_label_center,
             textcolor = textColor, size = size.huge
         )

//@variable A 2x2 matrix of input values.
m = matrix.new<float>()

// Add input values to `m`.
m.add_row(0, array.from(r0c0, r0c1))
m.add_row(1, array.from(r1c0, r1c1))

//@variable Is `true` if `m` is square with a nonzero determinant, indicating invertibility.
bool isInvertible = m.is_square() and m.det()

//@variable The inverse or pseudoinverse of `m`.
mInverse = isInvertible ? m.inv() : m.pinv()

//@variable The product of `m` and `mInverse`. Returns the identity matrix when `isInvertible` is `true`.
matrix<float> product = m.mult(mInverse)

if bar_index == last_bar_index - 1
    // Display `m`, `mInverse`, and their `product`.
    m.debugLabel(note = "Original")
    mInverse.debugLabel(bar_index + 10, color.purple, note = isInvertible ? "Inverse" : "Pseudoinverse")
    product.debugLabel(bar_index + 20, color.green, note = "Product")
```

- 注意：

  该脚本仅在为 时调用[m.inv()](https://www.tradingview.com/pine-script-reference/v5/#fun_matrix.inv)，即当为 [平方且](https://www.tradingview.com/pine-script-reference/v5/#fun_matrix.is_square)[行列式](https://www.tradingview.com/pine-script-reference/v5/#fun_matrix.det)为非零时 。否则，它使用 [m.pinv()](https://www.tradingview.com/pine-script-reference/v5/#fun_matrix.pinv)计算广义逆。`isInvertible``true``m`



#### [`matrix.rank()` ](https://www.tradingview.com/pine-script-docs/en/v5/language/Matrices.html#id35)

*矩阵的秩*表示它包含的线性无关向量（行或列）的数量。本质上，矩阵秩衡量的是无法表达为其他向量的线性组合的向量的数量，或者换句话说，是包含**唯一**信息的向量的数量。脚本可以通过[matrix.rank()](https://www.tradingview.com/pine-script-reference/v5/#fun_matrix.rank)计算矩阵的秩 。

`m1`此脚本识别两个 3x3 矩阵 (和)中线性无关向量的数量`m2`，并在单独的窗格中绘制这些值。正如我们在图表中看到的，[m1.rank()](https://www.tradingview.com/pine-script-reference/v5/#fun_matrix.rank) 值为 3，因为每个向量都是唯一的。另一方面，m2.rank() 值为 1，因为它只有一个唯一向量[：](https://www.tradingview.com/pine-script-reference/v5/#fun_matrix.rank)

![../_images/Matrices-Matrix-calculations-Special-calculations-5.png](https://www.tradingview.com/pine-script-docs/en/v5/_images/Matrices-Matrix-calculations-Special-calculations-5.png)

```
Pine Script™
Copied//@version=5
indicator("Matrix rank example")

//@variable A 3x3 full-rank matrix.
m1 = matrix.new<float>()
//@variable A 3x3 rank-deficient matrix.
m2 = matrix.new<float>()

// Add linearly independent vectors to `m1`.
m1.add_row(0, array.from(3, 2, 3))
m1.add_row(1, array.from(4, 6, 6))
m1.add_row(2, array.from(7, 4, 9))

// Add linearly dependent vectors to `m2`.
m2.add_row(0, array.from(1, 2, 3))
m2.add_row(1, array.from(2, 4, 6))
m2.add_row(2, array.from(3, 6, 9))

// Plot `matrix.rank()` values.
plot(m1.rank(), color = color.green, linewidth = 3)
plot(m2.rank(), color = color.red, linewidth = 3)
```

- 注意：

  矩阵可以具有的最高等级值是其行数和列数中的最小值。具有最大可能秩的矩阵称为*满秩*矩阵，任何没有满秩的矩阵称为*缺秩*矩阵。满秩方阵的行列式非零，并且此类矩阵具有[逆](https://www.tradingview.com/pine-script-docs/en/v5/language/Matrices.html#pagematrices-matrixcalculations-specialcalculations-matrixdet)[矩阵](https://www.tradingview.com/pine-script-docs/en/v5/language/Matrices.html#pagematrices-matrixcalculations-specialcalculations-matrixinvandmatrixpinv)。相反，秩亏矩阵的行列式始终为 0 [。](https://www.tradingview.com/pine-script-reference/v5/#fun_matrix.det)对于每个元素只包含相同值的任何矩阵（例如，用 0 填充的矩阵），秩始终为 0，因为没有向量保存唯一信息。对于具有不同值的任何其他矩阵，最小可能的秩为 1。



## [错误处理](https://www.tradingview.com/pine-script-docs/en/v5/language/Matrices.html#id36)

除了在脚本编译期间由于语法不正确而发生的常见**编译器**错误之外，使用矩阵的脚本还可能在执行期间引发特定的**运行**时错误。当脚本引发运行时错误时，它会在脚本标题旁边显示一个红色感叹号。用户可以通过单击该图标来查看错误消息。

在本节中，我们讨论用户在脚本中使用矩阵时可能遇到的运行时错误。



### [行/列索引 (xx) 越界，行/列大小为 (yy)。](https://www.tradingview.com/pine-script-docs/en/v5/language/Matrices.html#id37)

当尝试使用包含[math.get()](https://www.tradingview.com/pine-script-reference/v5/#fun_matrix.get)、 [math.set()](https://www.tradingview.com/pine-script-reference/v5/#fun_matrix.set)、 [math.fill()](https://www.tradingview.com/pine-script-reference/v5/#fun_matrix.fill)和[math.submatrix() 的](https://www.tradingview.com/pine-script-reference/v5/#fun_matrix.submatrix)函数以及一些与矩阵的行[和列。](https://www.tradingview.com/pine-script-docs/en/v5/language/Matrices.html#pagematrices-rowsandcolumns)

例如，此代码包含两行将产生此运行时错误。 m.set [()](https://www.tradingview.com/pine-script-reference/v5/#fun_matrix.set)方法引用了`row` 不存在的索引 (2)。 m.submatrix [()](https://www.tradingview.com/pine-script-reference/v5/#fun_matrix.submatrix) 方法引用直到 的所有列索引。值4 会导致运行时错误，因为引用的最后一个列索引 (3) 不存在于：`to_column - 1``to_column``m`

```
Pine Script™
Copied//@version=5
indicator("Out of bounds demo")

//@variable A 2x3 matrix with a max row index of 1 and max column index of 2.
matrix<float> m = matrix.new<float>(2, 3, 0.0)

m.set(row = 2, column = 0, value = 1.0)     // The `row` index is out of bounds on this line. The max value is 1.
m.submatrix(from_column = 1, to_column = 4) // The `to_column` index is invalid on this line. The max value is 3.

if bar_index == last_bar_index - 1
    label.new(bar_index, 0, str.tostring(m), color = color.navy, textcolor = color.white, size = size.huge)
```

用户可以通过确保其函数调用不引用大于或等于行/列数的索引来避免脚本中的此错误。



### [数组大小与矩阵中的行/列数不匹配。](https://www.tradingview.com/pine-script-docs/en/v5/language/Matrices.html#id38)

当使用[matrix.add_row()](https://www.tradingview.com/pine-script-reference/v5/#fun_matrix.add_row) 和[matrix.add_col()](https://www.tradingview.com/pine-script-reference/v5/#fun_matrix.add_col)函数将 行和列[插入](https://www.tradingview.com/pine-script-docs/en/v5/language/Matrices.html#pagematrices-rowsandcolumns-inserting)非空矩阵时，插入数组的大小必须与矩阵维度对齐。插入的行的大小必须与列的数量匹配，并且插入的列的大小必须与行的数量匹配。否则，脚本将引发此运行时错误。例如：

```
Pine Script™
Copied//@version=5
indicator("Invalid array size demo")

// Declare an empty matrix.
m = matrix.new<float>()

m.add_col(0, array.from(1, 2))    // Add a column. Changes the shape of `m` to 2x1.
m.add_col(1, array.from(1, 2, 3)) // Raises a runtime error because `m` has 2 rows, not 3.

plot(m.col(0).get(1))
```

- 注意：

  当`m`为空时，可以插入*任意*大小的行或列数组，如第一`m.add_col()`行所示。



### [当矩阵的 ID 为“na”时，无法调用矩阵方法。](https://www.tradingview.com/pine-script-docs/en/v5/language/Matrices.html#id39)

当矩阵变量被分配给 时`na`，意味着该变量不引用现有对象。因此，不能使用内置`matrix.*()`函数和方法。例如：

```
Pine Script™
Copied//@version=5
indicator("na matrix methods demo")

//@variable A `matrix` variable assigned to `na`.
matrix<float> m = na

mCopy = m.copy() // Raises a runtime error. You can't copy a matrix that doesn't exist.

if bar_index == last_bar_index - 1
    label.new(bar_index, 0, str.tostring(mCopy), color = color.navy, textcolor = color.white, size = size.huge)
```

要解决此错误，请`m`在使用函数之前分配给有效的矩阵实例`matrix.*()`。



### [矩阵太大。矩阵的最大大小为 100,000 个元素。](https://www.tradingview.com/pine-script-docs/en/v5/language/Matrices.html#id40)

[矩阵 ( matrix.elements_count()](https://www.tradingview.com/pine-script-reference/v5/#fun_matrix.elements_count) )中的元素总数不能超过**100,000**，无论其形状如何。例如，此脚本将引发错误，因为它将 包含 101 个元素的 1000 行[插入](https://www.tradingview.com/pine-script-docs/en/v5/language/Matrices.html#pagematrices-rowsandcolumns-inserting)`m`到矩阵中：

```
Pine Script™
Copied//@version=5
indicator("Matrix too large demo")

var matrix<float> m = matrix.new<float>()

if bar_index == 0
    for i = 1 to 1000
        // This raises an error because the script adds 101 elements on each iteration.
        // 1000 rows * 101 elements per row = 101000 total elements. This is too large.
        m.add_row(m.rows(), array.new<float>(101, i))

plot(m.get(0, 0))
```



### [行/列索引必须为 0 <= from_row/column < to_row/column。](https://www.tradingview.com/pine-script-docs/en/v5/language/Matrices.html#id41)

当使用带有和索引的`matrix.*()`函数时，这些 值必须小于相应的值，最小可能值为 0。否则，脚本将引发运行时错误。`from_row/column``to_row/column``from_*``to_*`

例如，此脚本显示尝试 从 4x4矩阵声明一个值为 2 和值为 2 的[子矩阵](https://www.tradingview.com/pine-script-docs/en/v5/language/Matrices.html#pagematrices-copyingamatrix-submatrices)，这将导致错误：`m``from_row``to_row`

```
Pine Script™
Copied//@version=5
indicator("Invalid from_row, to_row demo")

//@variable A 4x4 matrix filled with a random value.
matrix<float> m = matrix.new<float>(4, 4, math.random())

matrix<float> mSub = m.submatrix(from_row = 2, to_row = 2) // Raises an error. `from_row` can't equal `to_row`.

plot(mSub.get(0, 0))
```



### [矩阵“id1”和“id2”必须具有相同数量的要添加的行和列。](https://www.tradingview.com/pine-script-docs/en/v5/language/Matrices.html#id42)

使用[matrix.sum() 和matrix.diff()](https://www.tradingview.com/pine-script-docs/en/v5/language/Matrices.html#pagematrices-matrixcalculations-specialcalculations-matrixsumandmatrixdiff) 函数时，`id1`和`id2`矩阵必须具有相同的行数和相同的列数。尝试对两个维度不匹配的矩阵进行相加或相减将会引发错误，如以下代码所示：

```
Pine Script™
Copied//@version=5
indicator("Invalid sum dimensions demo")

//@variable A 2x3 matrix.
matrix<float> m1 = matrix.new<float>(2, 3, 1)
//@variable A 3x4 matrix.
matrix<float> m2 = matrix.new<float>(3, 4, 2)

mSum = matrix.sum(m1, m2) // Raises an error. `m1` and `m2` don't have matching dimensions.

plot(mSum.get(0, 0))
```



### [“id1”矩阵中的列数必须等于“id2”矩阵中的行数（或数组中的元素数）。](https://www.tradingview.com/pine-script-docs/en/v5/language/Matrices.html#id43)

当使用[matrix.mult()](https://www.tradingview.com/pine-script-docs/en/v5/language/Matrices.html#pagematrices-matrixcalculations-specialcalculations-matrixmult)`id1`将矩阵乘以`id2`矩阵或数组时，matrix.rows [()](https://www.tradingview.com/pine-script-reference/v5/#fun_matrix.rows)或 [array.size()](https://www.tradingview.com/pine-script-reference/v5/#fun_array.size)必须`id2`等于 [matrix.columns()](https://www.tradingview.com/pine-script-reference/v5/#fun_matrix.columns)`id1`。如果它们不对齐，脚本将引发此错误。

例如，此脚本尝试将两个 2x3 矩阵相乘。虽然可以将这些矩阵*相加*，但不能将它们*相乘：*

```
Pine Script™
Copied//@version=5
indicator("Invalid mult dimensions demo")

//@variable A 2x3 matrix.
matrix<float> m1 = matrix.new<float>(2, 3, 1)
//@variable A 2x3 matrix.
matrix<float> m2 = matrix.new<float>(2, 3, 2)

mSum = matrix.mult(m1, m2) // Raises an error. The number of columns in `m1` and rows in `m2` aren't equal.

plot(mSum.get(0, 0))
```



### [运算不适用于非方阵。](https://www.tradingview.com/pine-script-docs/en/v5/language/Matrices.html#id44)

一些矩阵运算，包括[matrix.inv()](https://www.tradingview.com/pine-script-reference/v5/#fun_matrix.inv)、 [matrix.det()](https://www.tradingview.com/pine-script-reference/v5/#fun_matrix.det)、 [matrix.eigenvalues()](https://www.tradingview.com/pine-script-reference/v5/#fun_matrix.eigenvalues)和[matrix.eigenvectors()](https://www.tradingview.com/pine-script-reference/v5/#fun_matrix.inv) 仅适用于**方阵**，即具有相同行数和列数的矩阵。当尝试在非方阵上执行此类函数时，脚本将引发错误，指出该操作不可用或无法计算矩阵的结果`id`。例如：

```
Pine Script™
Copied//@version=5
indicator("Non-square demo")

//@variable A 3x5 matrix.
matrix<float> m = matrix.new<float>(3, 5, 1)

plot(m.det()) // Raises a runtime error. You can't calculate the determinant of a 3x5 matrix.
```