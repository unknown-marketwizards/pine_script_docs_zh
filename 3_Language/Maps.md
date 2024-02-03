# 映射Map

提示：

此页面包含高级材料。如果您是一名初级 Pine Script™ 程序员，我们建议您在冒险之前熟悉其他更易于使用的 Pine Script™ 功能。

## [介绍](https://www.tradingview.com/pine-script-docs/en/v5/language/Maps.html#id1)

Pine Script™ 映射是以*键值对形式*存储元素的集合。它们允许脚本收集与唯一标识符（键）关联的多个值引用。

[与数组](https://www.tradingview.com/pine-script-docs/en/v5/language/Arrays.html#pagearrays)和[矩阵](https://www.tradingview.com/pine-script-docs/en/v5/language/Matrices.html#pagematrices)不同，映射被视为*无序*集合。脚本通过引用放入其中的键值对中的键而不是遍历内部索引来快速访问映射的值。

映射的键可以是任何*基本类型*，其值可以是任何内置或 [用户定义的](https://www.tradingview.com/pine-script-docs/en/v5/language/Type_system.html#pagetypesystem-userdefinedtypes)类型。映射不能直接使用其他*集合* （映射、[数组](https://www.tradingview.com/pine-script-docs/en/v5/language/Arrays.html#pagearrays)或[矩阵](https://www.tradingview.com/pine-script-docs/en/v5/language/Matrices.html#pagematrices)）作为值，但它们可以在其字段中保存 包含这些数据结构的[UDT](https://www.tradingview.com/pine-script-docs/en/v5/language/Type_system.html#pagetypesystem-userdefinedtypes)实例。请参阅[本节](https://www.tradingview.com/pine-script-docs/en/v5/language/Maps.html#pagemaps-mapsofothercollections)了解更多信息。

与其他集合一样，映射总共最多可以包含 100,000 个元素。由于映射中的每个键值对都由两个元素（唯一*键*及其关联*值*）组成，因此映射可以容纳的最大键值对数量为 50,000。



## [声明一个映射关系](https://www.tradingview.com/pine-script-docs/en/v5/language/Maps.html#id2)

Pine Script™ 使用以下语法来声明映射：

```javascript
[var/varip ][map<keyType, valueType> ]<identifier> = <expression>
```

映射的[类型模板](https://www.tradingview.com/pine-script-docs/en/v5/language/Type_system.html#pagetypesystem-typetemplates)在哪里，它声明它将包含的键和值的类型，并且返回映射实例或.`<keyType, valueType>``<expression>``na`

在声明分配给 的映射变量时`na`，用户必须包含 [map](https://www.tradingview.com/pine-script-reference/v5/#type_map)关键字，后跟 [类型模板](https://www.tradingview.com/pine-script-docs/en/v5/language/Type_system.html#pagetypesystem-typetemplates)，以告诉编译器该变量可以接受带有`keyType`键和`valueType`值的映射。

例如，这行代码声明一个新`myMap`变量，它可以接受保存 [字符串](https://www.tradingview.com/pine-script-reference/v5/#type_string)键和 [浮点](https://www.tradingview.com/pine-script-reference/v5/#type_float)值对的映射实例：

```javascript
map<string, float> myMap = na
```

当`<expression>`不是时`na`，编译器不需要显式类型声明，因为它将从分配的映射对象推断类型信息。

此行声明一个`myMap`分配给带有 [字符串](https://www.tradingview.com/pine-script-reference/v5/#type_string)键和 [浮点](https://www.tradingview.com/pine-script-reference/v5/#type_float)值的空映射的变量。稍后分配给该变量的任何映射都必须具有相同的键和值类型：

```javascript
myMap = map.new<string, float>()
```



### [使用 `var` 和 `varip` 关键字](https://www.tradingview.com/pine-script-docs/en/v5/language/Maps.html#id3)

用户可以包含[var](https://www.tradingview.com/pine-script-reference/v5/#kw_var)或 [varip](https://www.tradingview.com/pine-script-reference/v5/#kw_varip)关键字来指示其脚本仅在第一个图表栏上声明映射变量。使用这些关键字的变量在每次脚本迭代中都指向相同的映射实例，直到显式重新分配为止。

例如，此脚本声明一个`colorMap`分配给映射的变量，该映射保存 第一个图表栏上的[字符串](https://www.tradingview.com/pine-script-reference/v5/#type_string)键和 [颜色](https://www.tradingview.com/pine-script-reference/v5/#type_color)值对。该脚本在图表上显示，并使用它[放入](https://www.tradingview.com/pine-script-reference/v5/#fun_map.put)第一个条形图上的*值*来`oscillator`为 *所有*条形图上的图着色：`colorMap`

![../_images/Maps-声明-映射-使用-var-and-varip-keywords-1.png](https://www.tradingview.com/pine-script-docs/en/v5/_images/Maps-Declaring-a-map-Using-var-and-varip-keywords-1.png)

```javascript
//@version=5
indicator("var map demo")

//@variable A map associating color values with string keys.
var colorMap = map.new<string, color>()

// Put `<string, color>` pairs into `colorMap` on the first bar.
if bar_index == 0
    colorMap.put("Bull", color.green)
    colorMap.put("Bear", color.red)
    colorMap.put("Neutral", color.gray)

//@variable The 14-bar RSI of `close`.
float oscillator = ta.rsi(close, 14)

//@variable The color of the `oscillator`.
color oscColor = switch
    oscillator > 50 => colorMap.get("Bull")
    oscillator < 50 => colorMap.get("Bear")
    =>                 colorMap.get("Neutral")

// Plot the `oscillator` using the `oscColor` from our `colorMap`.
plot(oscillator, "Histogram", oscColor, 2, plot.style_histogram, histbase = 50)
plot(oscillator, "Line", oscColor, 3)
```

笔记

使用[varip声明的映射变量的行为与在历史数据上使用](https://www.tradingview.com/pine-script-reference/v5/#kw_varip)[var 的](https://www.tradingview.com/pine-script-reference/v5/#kw_var) 行为相同，但它们会在每个新的价格变动时更新实时柱（即自脚本上次编译以来的柱）的键值对。分配给[varip](https://www.tradingview.com/pine-script-reference/v5/#kw_varip) 变量的映射只能保存[int](https://www.tradingview.com/pine-script-reference/v5/#type_int)、 [float](https://www.tradingview.com/pine-script-reference/v5/#type_float)、 [bool](https://www.tradingview.com/pine-script-reference/v5/#type_bool)、 [color](https://www.tradingview.com/pine-script-reference/v5/#type_color)或 [string](https://www.tradingview.com/pine-script-reference/v5/#type_string)类型或 [用户定义类型](https://www.tradingview.com/pine-script-docs/en/v5/language/Type_system.html#pagetypesystem-userdefinedtypes)的值，这些类型在其字段中专门包含这些类型或这些类型的集合（[array](https://www.tradingview.com/pine-script-docs/en/v5/language/Arrays.html#pagearrays)、[matrices](https://www.tradingview.com/pine-script-docs/en/v5/language/Matrices.html#pagematrices)或 Map ）。



## [读写](https://www.tradingview.com/pine-script-docs/en/v5/language/Maps.html#id4)



### [放置和获取键值对](https://www.tradingview.com/pine-script-docs/en/v5/language/Maps.html#id5)

map.put [()](https://www.tradingview.com/pine-script-reference/v5/#fun_map.put)函数是映射用户经常使用的函数，因为它是将新的键值对放入映射的主要方法。它将`key` 参数与`value`调用中的参数相关联，并将该对添加到映射中`id`。

如果[map.put()](https://www.tradingview.com/pine-script-reference/v5/#fun_map.put)`key`调用中的参数已经存在于映射的[keys](https://www.tradingview.com/pine-script-reference/v5/#fun_map.keys)中，则传递到函数中的新对将**替换**现有的对。

`id`要从与给定关联的映射中检索值`key`，请使用 [map.get()](https://www.tradingview.com/pine-script-reference/v5/#fun_map.get)。如果`id`映射[包含](https://www.tradingview.com/pine-script-reference/v5/#fun_map.contains)`key`. _否则，它返回[na](https://www.tradingview.com/pine-script-reference/v5/#var_na)。

以下示例 借助[map.put()](https://www.tradingview.com/pine-script-reference/v5/#fun_map.put) 和[map.get()](https://www.tradingview.com/pine-script-reference/v5/#fun_map.get)方法计算给定值上 一次[收盘](https://www.tradingview.com/pine-script-reference/v5/#var_close)价上涨 和 [下跌时的](https://www.tradingview.com/pine-script-reference/v5/#fun_ta.falling)[bar_index值之间](https://www.tradingview.com/pine-script-reference/v5/#var_bar_index)[的](https://www.tradingview.com/pine-script-reference/v5/#fun_ta.rising)差异。当价格上涨时，脚本将一 对放入映射中； 当价格下跌时，脚本将一对放入映射中。然后，它将包含“上升”和“下降”值之间的“差异”的一对放入映射中，并将其值绘制在图表上：`length``("Rising", bar_index)``data``("Falling", bar_index)`

![../_images/Maps-Reading-and-writing-Putting-and-getting-key-value-pairs-1.png](https://www.tradingview.com/pine-script-docs/en/v5/_images/Maps-Reading-and-writing-Putting-and-getting-key-value-pairs-1.png)

```javascript
//@version=5
indicator("Putting and getting demo")

//@variable The length of the `ta.rising()` and `ta.falling()` calculation.
int length = input.int(2, "Length")

//@variable A map associating `string` keys with `int` values.
var data = map.new<string, int>()

// Put a new ("Rising", `bar_index`) pair into the `data` map when `close` is rising.
if ta.rising(close, length)
    data.put("Rising", bar_index)
// Put a new ("Falling", `bar_index`) pair into the `data` map when `close` is falling.
if ta.falling(close, length)
    data.put("Falling", bar_index)

// Put the "Difference" between current "Rising" and "Falling" values into the `data` map.
data.put("Difference", data.get("Rising") - data.get("Falling"))

//@variable The difference between the last "Rising" and "Falling" `bar_index`.
int index = data.get("Difference")

//@variable Returns `color.green` when `index` is positive, `color.red` when negative, and `color.gray` otherwise.
color indexColor = index > 0 ? color.green : index < 0 ? color.red : color.gray

plot(index, color = indexColor, style = plot.style_columns)
```

- 注意：

  [此脚本替换连续data.put()](https://www.tradingview.com/pine-script-reference/v5/#fun_map.put)调用中与“Rising”、“Falling”和“Difference”键关联的值 ，因为每个键都是唯一的，并且只能在映射中出现一次`data`。替换映射中的对不会更改其键的内部*插入顺序*。我们将在[下一节](https://www.tradingview.com/pine-script-docs/en/v5/language/Maps.html#pagemaps-readingandwriting-inspectingkeysandvalues)中进一步讨论这一点。

与使用其他集合类似，将*特殊类型* （[line](https://www.tradingview.com/pine-script-reference/v5/#type_line)、 [linefill](https://www.tradingview.com/pine-script-reference/v5/#type_linefill)、 [box](https://www.tradingview.com/pine-script-reference/v5/#type_box)、 [polyline](https://www.tradingview.com/pine-script-reference/v5/#type_polyline)、 [label](https://www.tradingview.com/pine-script-reference/v5/#type_label)、 [table](https://www.tradingview.com/pine-script-reference/v5/#type_table)或 [Chart.point](https://www.tradingview.com/pine-script-reference/v5/#type_chart.point)）或 [用户定义类型](https://www.tradingview.com/pine-script-docs/en/v5/language/Type_system.html#pagetypesystem-userdefinedtypes)的值放入映射时，重要的是要注意插入的对的 `value`指向同一个对象而不复制它。修改键值对引用的值也会影响原始对象。

例如，此脚本包含`ChartData`带有`o`、`h`、`l`和`c`字段的自定义类型。在第一个图表栏上，脚本声明一个`myMap`变量并添加对，其中 是初始字段值为 的实例。它通过用户定义的方法在每个柱上添加该对 并更新该对的对象。`("A", myData)``myData``ChartData``na``("B", myData)``myMap``update()`

使用“B”键对对象进行的每次更改都会影响“A”键引用的对象，如“A”对象字段的蜡烛图所示：

![../_images/Maps-Reading-and-writing-Putting-and-getting-key-value-pairs-2.png](https://www.tradingview.com/pine-script-docs/en/v5/_images/Maps-Reading-and-writing-Putting-and-getting-key-value-pairs-2.png)

```javascript
//@version=5
indicator("Putting and getting objects demo")

//@type A custom type to hold OHLC data.
type ChartData
    float o
    float h
    float l
    float c

//@function Updates the fields of a `ChartData` object.
method update(ChartData this) =>
    this.o := open
    this.h := high
    this.l := low
    this.c := close

//@variable A new `ChartData` instance declared on the first bar.
var myData = ChartData.new()
//@variable A map associating `string` keys with `ChartData` instances.
var myMap = map.new<string, ChartData>()

// Put a new pair with the "A" key into `myMap` only on the first bar.
if bar_index == 0
    myMap.put("A", myData)

// Put a pair with the "B" key into `myMap` on every bar.
myMap.put("B", myData)

//@variable The `ChartData` value associated with the "A" key in `myMap`.
ChartData oldest = myMap.get("A")
//@variable The `ChartData` value associated with the "B" key in `myMap`.
ChartData newest = myMap.get("B")

// Update `newest`. Also affects `oldest` and `myData` since they all reference the same `ChartData` object.
newest.update()

// Plot the fields of `oldest` as candles.
plotcandle(oldest.o, oldest.h, oldest.l, oldest.c)
```

- 注意：

  如果该脚本将 的副本传递`myData`到每个 [myMap.put()](https://www.tradingview.com/pine-script-reference/v5/#fun_map.put)调用中，则其行为会有所不同。有关更多信息，请参阅我们的用户手册的[对象](https://www.tradingview.com/pine-script-docs/en/v5/language/Objects.html#pageobjects)页面的[这一](https://www.tradingview.com/pine-script-docs/en/v5/language/Objects.html#pageobjects-copyingobjects)部分。



### [检查键和值](https://www.tradingview.com/pine-script-docs/en/v5/language/Maps.html#id6)



#### [`map.keys()` 和 `map.values()` ](https://www.tradingview.com/pine-script-docs/en/v5/language/Maps.html#id7)

要检索放入映射中的所有键和值，请使用 [map.keys()](https://www.tradingview.com/pine-script-reference/v5/#fun_map.keys)和 [map.values()](https://www.tradingview.com/pine-script-reference/v5/#fun_map.values)。这些函数将映射中的所有键/值引用复制`id`到新的 [数组](https://www.tradingview.com/pine-script-reference/v5/#type_array)对象。修改从这两个函数返回的数组不会影响映射`id`。

尽管映射是*无序*集合，但 Pine Script™ 在内部维护 映射键值对的*插入顺序*。因此， [map.keys()](https://www.tradingview.com/pine-script-reference/v5/#fun_map.keys)和 [map.values()](https://www.tradingview.com/pine-script-reference/v5/#fun_map.values)函数始终返回 [数组](https://www.tradingview.com/pine-script-docs/en/v5/language/Arrays.html#pagearrays)，其元素根据`id`映射的插入顺序进行排序。

下面的脚本通过每 50 个条`m`在标签中 [显示](https://www.tradingview.com/pine-script-reference/v5/#type_label)一次映射中的键和值数组来演示这一点。正如我们在图表中看到的，`m.keys()`和返回的每个数组中元素的顺序`m.values()`与 中键值对的插入顺序一致`m`：

![../_images/Maps-Reading-and-writing-Inspecting-keys-and-values-1.png](https://www.tradingview.com/pine-script-docs/en/v5/_images/Maps-Reading-and-writing-Inspecting-keys-and-values-1.png)

```javascript
//@version=5
indicator("Keys and values demo")

if bar_index % 50 == 0
    //@variable A map containing pairs of `string` keys and `float` values.
    m = map.new<string, float>()

    // Put pairs into `m`. The map will maintain this insertion order.
    m.put("First", math.round(math.random(0, 100)))
    m.put("Second", m.get("First") + 1)
    m.put("Third", m.get("Second") + 1)

    //@variable An array containing the keys of `m` in their insertion order.
    array<string> keys = m.keys()
    //@variable An array containing the values of `m` in their insertion order.
    array<float> values = m.values()

    //@variable A label displaying the `size` of `m` and the `keys` and `values` arrays.
    label debugLabel = label.new(
         bar_index, 0,
         str.format("Pairs: {0}\nKeys: {1}\nValues: {2}", m.size(), keys, values),
         color = color.navy, style = label.style_label_center,
         textcolor = color.white, size = size.huge
     )
```

- 注意：

  “First”键的值是0 到 100 之间的[随机](https://www.tradingview.com/pine-script-reference/v5/#fun_math.random) 整数。“Second”值比“First”大 1，“Third”值比“Second”大 1。

需要注意的是，替换映射的键值对时，映射的内部插入顺序**不会改变。在这种情况下**[，keys()](https://www.tradingview.com/pine-script-reference/v5/#fun_map.keys) 和[values()](https://www.tradingview.com/pine-script-reference/v5/#fun_map.values)数组中新元素的位置将与旧元素相同。唯一的例外是脚本事先完全 [删除了](https://www.tradingview.com/pine-script-docs/en/v5/language/Maps.html#pagemaps-readingandwriting-removingkeyvaluepairs)密钥。

下面，我们添加了一行代码，将带有“Second”键的新值放入映射中[，](https://www.tradingview.com/pine-script-reference/v5/#fun_map.put)`m`覆盖与该键关联的先前值。尽管脚本将这个新对放入带有“第三”键的映射*之后*，但该对的键和值仍然位于`keys`和数组中的第二位，因为该键在更改*之前*`values`已经存在：`m`

![../_images/Maps-Reading-and-writing-Inspecting-keys-and-values-2.png](https://www.tradingview.com/pine-script-docs/en/v5/_images/Maps-Reading-and-writing-Inspecting-keys-and-values-2.png)

```javascript
//@version=5
indicator("Keys and values demo")

if bar_index % 50 == 0
    //@variable A map containing pairs of `string` keys and `float` values.
    m = map.new<string, float>()

    // Put pairs into `m`. The map will maintain this insertion order.
    m.put("First", math.round(math.random(0, 100)))
    m.put("Second", m.get("First") + 1)
    m.put("Third", m.get("Second") + 1)

    // Overwrite the "Second" pair in `m`. This will NOT affect the insertion order.
    // The key and value will still appear second in the `keys` and `values` arrays.
    m.put("Second", -2)

    //@variable An array containing the keys of `m` in their insertion order.
    array<string> keys = m.keys()
    //@variable An array containing the values of `m` in their insertion order.
    array<float> values = m.values()

    //@variable A label displaying the `size` of `m` and the `keys` and `values` arrays.
    label debugLabel = label.new(
         bar_index, 0,
         str.format("Pairs: {0}\nKeys: {1}\nValues: {2}", m.size(), keys, values),
         color = color.navy, style = label.style_label_center,
         textcolor = color.white, size = size.huge
     )
```

笔记

[map.values()](https://www.tradingview.com/pine-script-reference/v5/#fun_map.values)数组中的元素 指向与 map 相同的值`id`。因此，当映射的值是*引用类型*（包括[line](https://www.tradingview.com/pine-script-reference/v5/#type_line)、 [linefill](https://www.tradingview.com/pine-script-reference/v5/#type_linefill)、 [box](https://www.tradingview.com/pine-script-reference/v5/#type_box)、 [polyline](https://www.tradingview.com/pine-script-reference/v5/#type_polyline)、 [label](https://www.tradingview.com/pine-script-reference/v5/#type_label)、 [table](https://www.tradingview.com/pine-script-reference/v5/#type_table)、 [Chart.point](https://www.tradingview.com/pine-script-reference/v5/#type_chart.point)或 [UDTs](https://www.tradingview.com/pine-script-docs/en/v5/language/Type_system.html#pagetypesystem-userdefinedtypes) ）时，修改[map.values()](https://www.tradingview.com/pine-script-reference/v5/#fun_map.values) 数组引用的实例也会影响映射`id`，因为两个集合的内容都指向相同的对象。



#### [`map.contains()` ](https://www.tradingview.com/pine-script-docs/en/v5/language/Maps.html#id8)

`key`要检查map 中是否存在特定内容`id`，请使用 [map.contains()](https://www.tradingview.com/pine-script-reference/v5/#fun_map.contains)。此函数是对从 [map.keys()返回](https://www.tradingview.com/pine-script-reference/v5/#fun_map.keys)[的数组](https://www.tradingview.com/pine-script-reference/v5/#type_array)调用 array.includes [()](https://www.tradingview.com/pine-script-reference/v5/#fun_array.includes)的便捷替代方法。

例如，此脚本检查映射中是否存在各种键，然后在[标签](https://www.tradingview.com/pine-script-reference/v5/#type_label)`m`中显示结果：

![../_images/Maps-Reading-and-writing-Inspecting-keys-and-values-3.png](https://www.tradingview.com/pine-script-docs/en/v5/_images/Maps-Reading-and-writing-Inspecting-keys-and-values-3.png)

```javascript
//@version=5
indicator("Inspecting keys demo")

//@variable A map containing `string` keys and `string` values.
m = map.new<string, string>()

// Put key-value pairs into the map.
m.put("A", "B")
m.put("C", "D")
m.put("E", "F")

//@variable An array of keys to check for in `m`.
array<string> testKeys = array.from("A", "B", "C", "D", "E", "F")

//@variable An array containing all elements from `testKeys` found in the keys of `m`.
array<string> mappedKeys = array.new<string>()

for key in testKeys
    // Add the `key` to `mappedKeys` if `m` contains it.
    if m.contains(key)
        mappedKeys.push(key)

//@variable A string representing the `testKeys` array and the elements found within the keys of `m`.
string testText = str.format("Tested keys: {0}\nKeys found: {1}", testKeys, mappedKeys)

if bar_index == last_bar_index - 1
    //@variable Displays the `testText` in a label at the `bar_index` before the last.
    label debugLabel = label.new(
         bar_index, 0, testText, style = label.style_label_center,
         textcolor = color.white, size = size.huge
     )
```



### [删除键值对](https://www.tradingview.com/pine-script-docs/en/v5/language/Maps.html#id9)

要从映射中删除特定的键值对`id`，请使用 [map.remove()](https://www.tradingview.com/pine-script-reference/v5/#fun_map.remove)。此函数`key`从映射中删除 及其关联值，同时保留其他键值对的插入顺序。如果映射 [包含](https://www.tradingview.com/pine-script-docs/en/v5/language/Maps.html#pagemaps-readingandwriting-inspectingkeysandvalues-mapcontains)`key`.否则，它返回[na](https://www.tradingview.com/pine-script-reference/v5/#var_na)。

`id`要一次 从映射中删除所有键值对，请使用[map.clear()](https://www.tradingview.com/pine-script-reference/v5/#fun_map.clear)。

以下脚本创建一个新`m`映射，[将](https://www.tradingview.com/pine-script-docs/en/v5/language/Maps.html#pagemaps-readingandwriting-puttingandgettingkeyvaluepairs) 键值对放入映射中，在循环中使用[m.remove()](https://www.tradingview.com/pine-script-reference/v5/#fun_map.remove) 删除数组`key`中列出的每个有效键`removeKeys`，然后调用 [m.clear()](https://www.tradingview.com/pine-script-reference/v5/#fun_map.clear)删除所有剩余的键值对。它使用自定义`debugLabel()`方法来显示 每次更改后的[size](https://www.tradingview.com/pine-script-reference/v5/#fun_map.size)、 [keys](https://www.tradingview.com/pine-script-reference/v5/#fun_map.keys)和 [value](https://www.tradingview.com/pine-script-reference/v5/#fun_map.values)`m`：

![../_images/Maps-Reading-and-writing-Removing-key-value-pairs-1.png](https://www.tradingview.com/pine-script-docs/en/v5/_images/Maps-Reading-and-writing-Removing-key-value-pairs-1.png)

```javascript
//@version=5
indicator("Removing key-value pairs demo")

//@function Returns a label to display the keys and values from a map.
method debugLabel(
     map<string, int> this, int barIndex = bar_index,
     color bgColor = color.blue, string note = ""
 ) =>
    //@variable A string representing the size, keys, and values in `this` map.
    string repr = str.format(
         "{0}\nSize: {1}\nKeys: {2}\nValues: {3}",
         note, this.size(), str.tostring(this.keys()), str.tostring(this.values())
     )
    label.new(
         barIndex, 0, repr, color = bgColor, style = label.style_label_center,
         textcolor = color.white, size = size.huge
     )

if bar_index == last_bar_index - 1
    //@variable A map containing `string` keys and `int` values.
    m = map.new<string, int>()

    // Put key-value pairs into `m`.
    for [i, key] in array.from("A", "B", "C", "D", "E")
        m.put(key, i)
    m.debugLabel(bar_index, color.green, "Added pairs")

    //@variable An array of keys to remove from `m`.
    array<string> removeKeys = array.from("B", "B", "D", "F", "a")

    // Remove each `key` in `removeKeys` from `m`.
    for key in removeKeys
        m.remove(key)
    m.debugLabel(bar_index + 10, color.red, "Removed pairs")

    // Remove all remaining keys from `m`.
    m.clear()
    m.debugLabel(bar_index + 20, color.purple, "Cleared the map")
```

- 注意：

  并非数组中的所有字符串都`removeKeys`出现在 的键中`m`。尝试删除不存在的键（本例中的“F”、“a”和第二个“B”）不会影响映射的内容。



### [组合映射](https://www.tradingview.com/pine-script-docs/en/v5/language/Maps.html#id10)

[脚本可以通过map.put_all()](https://www.tradingview.com/pine-script-reference/v5/#fun_map.put_all)组合两个映射。该函数将映射中的*所有*键值`id2`对按照插入顺序放入`id1`映射中。与[map.put()](https://www.tradingview.com/pine-script-reference/v5/#fun_map.put)`id2`一样，如果 中 中也存在任何键`id1`，则此函数**将替换**包含这些键的键值对，而不影响它们的初始插入顺序。

此示例包含一个用户定义的`hexMap()`函数，该函数将十进制 [int](https://www.tradingview.com/pine-script-reference/v5/#type_int)键映射到 其 [十六进制形式的](https://en.wikipedia.org//wiki/Hexadecimal)[字符串](https://www.tradingview.com/pine-script-reference/v5/#type_string)表示形式。该脚本使用此函数创建两个映射 和，然后使用[mapA.put_all(mapB)](https://www.tradingview.com/pine-script-reference/v5/#fun_map.put_all) 将所有键值对放入 中。`mapA``mapB``mapB``mapA`

该脚本使用自定义`debugLabel()`函数来显示显示 和 的[键](https://www.tradingview.com/pine-script-reference/v5/#fun_map.keys)和 [值](https://www.tradingview.com/pine-script-reference/v5/#fun_map.values)的标签，然后在将所有键值对放入其中后显示另一个标签显示 的内容：`mapA``mapB``mapA``mapB`

![../_images/Maps-Reading-and-writing-Combining-maps-1.png](https://www.tradingview.com/pine-script-docs/en/v5/_images/Maps-Reading-and-writing-Combining-maps-1.png)

```javascript
//@version=5
indicator("Combining maps demo", "Hex map")

//@variable An array of string hex digits.
var array<string> hexDigits = str.split("0123456789ABCDEF", "")

//@function Returns a hexadecimal string for the specified `value`.
hex(int value) =>
    //@variable A string representing the hex form of the `value`.
    string result = ""
    //@variable A temporary value for digit calculation.
    int tempValue = value
    while tempValue > 0
        //@variable The next integer digit.
        int digit = tempValue % 16
        // Add the hex form of the `digit` to the `result`.
        result := hexDigits.get(digit) + result
        // Divide the `tempValue` by the base.
        tempValue := int(tempValue / 16)
    result

//@function Returns a map holding the `numbers` as keys and their `hex` strings as values.
hexMap(array<int> numbers) =>
    //@variable A map associating `int` keys with `string` values.
    result = map.new<int, string>()
    for number in numbers
        // Put a pair containing the `number` and its `hex()` representation into the `result`.
        result.put(number, hex(number))
    result

//@function Returns a label to display the keys and values of a hex map.
debugLabel(
     map<int, string> this, int barIndex = bar_index, color bgColor = color.blue,
     string style = label.style_label_center, string note = ""
 ) =>
    string repr = str.format(
         "{0}\nDecimal: {1}\nHex: {2}",
         note, str.tostring(this.keys()), str.tostring(this.values())
     )
    label.new(
         barIndex, 0, repr, color = bgColor, style = style,
         textcolor = color.white, size = size.huge
     )

if bar_index == last_bar_index - 1
    //@variable A map with decimal `int` keys and hexadecimal `string` values.
    map<int, string> mapA = hexMap(array.from(101, 202, 303, 404))
    debugLabel(mapA, bar_index, color.navy, label.style_label_down, "A")

    //@variable A map containing key-value pairs to add to `mapA`.
    map<int, string> mapB = hexMap(array.from(303, 404, 505, 606, 707, 808))
    debugLabel(mapB, bar_index, color.maroon, label.style_label_up, "B")

    // Put all pairs from `mapB` into `mapA`.
    mapA.put_all(mapB)
    debugLabel(mapA, bar_index + 10, color.purple, note = "Merge B into A")
```



## [循环遍历映射](https://www.tradingview.com/pine-script-docs/en/v5/language/Maps.html#id11)

脚本可以通过多种方式迭代访问映射中的键和值。例如，可以循环遍历映射的 [keys()](https://www.tradingview.com/pine-script-reference/v5/#fun_map.keys)数组并 [get()](https://www.tradingview.com/pine-script-reference/v5/#fun_map.get)每个 的值`key`，如下所示：

```javascript
for key in thisMap.keys()
    value = thisMap.get(key)
```

但是，我们建议`for...in`直接在映射上使用循环，因为它按插入顺序迭代映射的键值对，并在每次迭代时返回包含下一对的键和值的元组。

例如，这行代码从放入其中的第一个键值对开始循环遍历 every`key`和`value`in ：`thisMap`

```javascript
for [key, value] in thisMap
```

[让我们使用此结构编写一个脚本，在表](https://www.tradingview.com/pine-script-reference/v5/#type_table)中显示映射的键值对 。在下面的示例中，我们定义了一个自定义`toTable()`方法来创建 [table](https://www.tradingview.com/pine-script-reference/v5/#type_table)，然后使用`for...in` 循环迭代映射的键值对并填充表的单元格。该脚本使用此方法来可视化包含价格和交易量数据的`length`-bar的映射`averages`：

![../_images/Maps-Looping-through-a-map-1.png](https://www.tradingview.com/pine-script-docs/en/v5/_images/Maps-Looping-through-a-map-1.png)

```javascript
//@version=5
indicator("Looping through a map demo", "Table of averages")

//@variable The length of the moving average.
int length = input.int(20, "Length")
//@variable The size of the table text.
string txtSize = input.string(
     size.huge, "Text size",
     options = [size.auto, size.tiny, size.small, size.normal, size.large, size.huge]
 )

//@function Displays the pairs of `this` map within a table.
//@param    this A map with `string` keys and `float` values.
//@param    position The position of the table on the chart.
//@param    header The string to display on the top row of the table.
//@param    textSize The size of the text in the table.
//@returns  A new `table` object with cells displaying each pair in `this`.
method toTable(
     map<string, float> this, string position = position.middle_center, string header = na,
     string textSize = size.huge
 ) =>
    // Color variables
    borderColor = #000000
    headerColor = color.rgb(1, 88, 80)
    pairColor   = color.maroon
    textColor   = color.white

    //@variable A table that displays the key-value pairs of `this` map.
    table result = table.new(
         position, this.size() + 1, 3, border_width = 2, border_color = borderColor
     )
    // Initialize top and side header cells.
    result.cell(1, 0, header, bgcolor = headerColor, text_color = textColor, text_size = textSize)
    result.merge_cells(1, 0, this.size(), 0)
    result.cell(0, 1, "Key", bgcolor = headerColor, text_color = textColor, text_size = textSize)
    result.cell(0, 2, "Value", bgcolor = headerColor, text_color = textColor, text_size = textSize)

    //@variable The column index of the table. Updates on each loop iteration.
    int col = 1

    // Loop over each `key` and `value` from `this` map in the insertion order.
    for [key, value] in this
        // Initialize a `key` cell in the `result` table on row 1.
        result.cell(
             col, 1, str.tostring(key), bgcolor = color.maroon,
             text_color = color.white, text_size = textSize
         )
        // Initialize a `value` cell in the `result` table on row 2.
        result.cell(
             col, 2, str.tostring(value), bgcolor = color.maroon,
             text_color = color.white, text_size = textSize
         )
        // Move to the next column index.
        col += 1
    result // Return the `result` table.

//@variable A map with `string` keys and `float` values to hold `length`-bar averages.
averages = map.new<string, float>()

// Put key-value pairs into the `averages` map.
averages.put("Open", ta.sma(open, length))
averages.put("High", ta.sma(high, length))
averages.put("Low", ta.sma(low, length))
averages.put("Close", ta.sma(close, length))
averages.put("Volume", ta.sma(volume, length))

//@variable The text to display at the top of the table.
string headerText = str.format("{0} {1}-bar averages", "'" + syminfo.tickerid + "'", length)
// Display the `averages` map in a `table` with the `headerText`.
averages.toTable(header = headerText, textSize = txtSize)
```



## [复制映射](https://www.tradingview.com/pine-script-docs/en/v5/language/Maps.html#id12)



### [浅拷贝](https://www.tradingview.com/pine-script-docs/en/v5/language/Maps.html#id13)

脚本可以使用 [map.copy()](https://www.tradingview.com/pine-script-reference/v5/#fun_map.copy)函数制作映射的*浅表副本*。对浅拷贝的修改不会影响原始映射或其内部插入顺序。`id``id`

例如，此脚本构建一个`m`映射，其中将键“A”、“B”、“C”和“D”分配给 0 到 10 之间的四个[随机](https://www.tradingview.com/pine-script-reference/v5/#fun_math.random)`mCopy`值。然后，它创建一个映射作为 的浅表副本`m`并更新与其键关联的值。该脚本使用我们的自定义方法在图表中`m`和`mCopy`图表上显示键值对`debugLabel()`：

![../_images/Maps-复制-a-map-Shallow-copies-1.png](https://www.tradingview.com/pine-script-docs/en/v5/_images/Maps-Copying-a-map-Shallow-copies-1.png)

```javascript
//@version=5
indicator("Shallow copy demo")

//@function Displays the key-value pairs of `this` map in a label.
method debugLabel(
     map<string, float> this, int barIndex = bar_index, color bgColor = color.blue,
     color textColor = color.white, string note = ""
 ) =>
    //@variable The text to display in the label.
    labelText = note + "\n{"
    for [key, value] in this
        labelText += str.format("{0}: {1}, ", key, value)
    labelText := str.replace(labelText, ", ", "}", this.size() - 1)

    if barstate.ishistory
        label result = label.new(
             barIndex, 0, labelText, color = bgColor, style = label.style_label_center,
             textcolor = textColor, size = size.huge
         )

if bar_index == last_bar_index - 1
    //@variable A map of `string` keys and random `float` values.
    m = map.new<string, float>()

    // Assign random values to an array of keys in `m`.
    for key in array.from("A", "B", "C", "D")
        m.put(key, math.random(0, 10))

    //@variable A shallow copy of `m`.
    mCopy = m.copy()

    // Assign the insertion order value `i` to each `key` in `mCopy`.
    for [i, key] in mCopy.keys()
        mCopy.put(key, i)

    // Display the labels.
    m.debugLabel(bar_index, note = "Original")
    mCopy.debugLabel(bar_index + 10, color.purple, note = "Copied and changed")
```



### [深拷贝](https://www.tradingview.com/pine-script-docs/en/v5/language/Maps.html#id14)

虽然在复制具有 *基本类型值的映射时*[浅复制](https://www.tradingview.com/pine-script-docs/en/v5/language/Maps.html#pagemaps-copyingamap-shallowcopies)就足够了，但请务必记住，保存引用类型*值* （[line](https://www.tradingview.com/pine-script-reference/v5/#type_line)、 [linefill](https://www.tradingview.com/pine-script-reference/v5/#type_linefill)、 [box](https://www.tradingview.com/pine-script-reference/v5/#type_box)、 [polyline](https://www.tradingview.com/pine-script-reference/v5/#type_polyline)、 [label](https://www.tradingview.com/pine-script-reference/v5/#type_label)、 [table](https://www.tradingview.com/pine-script-reference/v5/#type_table)、 [Chart.point](https://www.tradingview.com/pine-script-reference/v5/#type_chart.point) 或UDT [）](https://www.tradingview.com/pine-script-docs/en/v5/language/Type_system.html#pagetypesystem-userdefinedtypes)指向与原始对象相同的对象。修改浅拷贝引用的对象将影响原始映射引用的实例，反之亦然。

为了确保对复制映射引用的对象所做的更改不会影响其他位置引用的实例，可以通过创建一个新映射来进行*深层复制*，该新映射的键值对包含原始映射中每个值的副本。

此示例创建[字符串](https://www.tradingview.com/pine-script-reference/v5/#type_string) 键和[标签](https://www.tradingview.com/pine-script-reference/v5/#type_label)值 `original`的映射，[并将](https://www.tradingview.com/pine-script-reference/v5/#fun_map.put)键值对放入其中。该脚本通过内置的[copy()](https://www.tradingview.com/pine-script-reference/v5/#fun_map.copy)方法将映射复制到变量 ，然后使用自定义方法复制到变量。`shallow``deep``deepCopy()`

正如我们从图表中看到的，对从副本中检索到的标签的更改`shallow`也会影响映射引用的实例`original`，但对副本中的标签的更改`deep`不会：

![../_images/Maps-复制-a-map-Deep-copies-1.png](https://www.tradingview.com/pine-script-docs/en/v5/_images/Maps-Copying-a-map-Deep-copies-1.png)

```javascript
//@version=5
indicator("Deep copy demo")

//@function Returns a deep copy of `this` map.
method deepCopy(map<string, label> this) =>
    //@variable A deep copy of `this` map.
    result = map.new<string, label>()
    // Add key-value pairs with copies of each `value` to the `result`.
    for [key, value] in this
        result.put(key, value.copy())
    result //Return the `result`.

//@variable A map containing `string` keys and `label` values.
var original = map.new<string, label>()

if bar_index == last_bar_index - 1
    // Put a new key-value pair into the `original` map.
    map.put(
         original, "Test",
         label.new(bar_index, 0, "Original", textcolor = color.white, size = size.huge)
     )

    //@variable A shallow copy of the `original` map.
    map<string, label> shallow = original.copy()
    //@variable A deep copy of the `original` map.
    map<string, label> deep = original.deepCopy()

    //@variable The "Test" label from the `shallow` copy.
    label shallowLabel = shallow.get("Test")
    //@variable The "Test" label from the `deep` copy.
    label deepLabel = deep.get("Test")

    // Modify the "Test" label's `y` attribute in the `original` map.
    // This also affects the `shallowLabel`.
    original.get("Test").set_y(label.all.size())

    // Modify the `shallowLabel`. Also modifies the "Test" label in the `original` map.
    shallowLabel.set_text("Shallow copy")
    shallowLabel.set_color(color.red)
    shallowLabel.set_style(label.style_label_up)

    // Modify the `deepLabel`. Does not modify any other label instance.
    deepLabel.set_text("Deep copy")
    deepLabel.set_color(color.navy)
    deepLabel.set_style(label.style_label_left)
    deepLabel.set_x(bar_index + 5)
```

- 注意：

  该`deepCopy()`方法循环遍历`original`映射，复制每个映射`value`并将 [包含](https://www.tradingview.com/pine-script-docs/en/v5/language/Maps.html#pagemaps-readingandwriting-puttingandgettingkeyvaluepairs)副本的键值对放入[新的](https://www.tradingview.com/pine-script-reference/v5/#fun_map.new) 映射实例中。



## [范围和历史](https://www.tradingview.com/pine-script-docs/en/v5/language/Maps.html#id15)

[与 Pine 中的其他集合一样，映射变量在每个条上留下历史轨迹，允许脚本使用历史引用运算符[\]](https://www.tradingview.com/pine-script-reference/v5/#op_[])访问分配给变量的过去映射实例。脚本还可以将映射分配给全局变量，并在[函数](https://www.tradingview.com/pine-script-docs/en/v5/language/User-defined_functions.html#pageuserdefinedfunctions)、[方法](https://www.tradingview.com/pine-script-docs/en/v5/language/Methods.html#pagemethods)和 [条件结构的](https://www.tradingview.com/pine-script-docs/en/v5/language/Conditional_structures.html#pageconditionalstructures)范围内与它们交互 。

例如，此脚本使用全局映射及其历史记录来计算 [EMA](https://www.tradingview.com/support/solutions/43000592270/)的聚合集。它声明了一个[int](https://www.tradingview.com/pine-script-reference/v5/#type_int)键和 [float](https://www.tradingview.com/pine-script-reference/v5/#type_float)`globalData`值 的映射，其中映射中的每个键对应于每个 EMA 计算的长度。用户定义的函数通过将分配给的映射中 的值与当前值混合来计算每个-length EMA 。`update()``key``previous``globalData``source`

该脚本绘制全局映射的 [value()数组中的](https://www.tradingview.com/pine-script-reference/v5/#fun_map.values)[最大值](https://www.tradingview.com/pine-script-reference/v5/#fun_array.max)和 [最小值](https://www.tradingview.com/pine-script-reference/v5/#fun_array.min)以及来自（即 50 条 EMA）的值 ：`globalData.get(50)`

![../_images/Maps-Scope-and-history-1.png](https://www.tradingview.com/pine-script-docs/en/v5/_images/Maps-Scope-and-history-1.png)

```javascript
//@version=5
indicator("Scope and history demo", overlay = true)

//@variable The source value for EMA calculation.
float source = input.source(close, "Source")

//@variable A map containing global key-value pairs.
globalData = map.new<int, float>()

//@function Calculates a set of EMAs and updates the key-value pairs in `globalData`.
update() =>
    //@variable The previous map instance assigned to `globalData`.
    map<int, float> previous = globalData[1]

    // Put key-value pairs with keys 10-200 into `globalData` if `previous` is `na`.
    if na(previous)
        for i = 10 to 200
            globalData.put(i, source)
    else
        // Iterate each `key` and `value` in the `previous` map.
        for [key, value] in previous
            //@variable The smoothing parameter for the `key`-length EMA.
            float alpha = 2.0 / (key + 1.0)
            //@variable The `key`-length EMA value.
            float ema = (1.0 - alpha) * value + alpha * source
            // Put the `key`-length `ema` into the `globalData` map.
            globalData.put(key, ema)

// Update the `globalData` map.
update()

//@variable The array of values from `globalData` in their insertion order.
array<float> values = globalData.values()

// Plot the max EMA, min EMA, and 50-bar EMA values.
plot(values.max(), "Max EMA", color.green, 2)
plot(values.min(), "Min EMA", color.red, 2)
plot(globalData.get(50), "50-bar EMA", color.orange, 3)
```



## [其他集合的映射](https://www.tradingview.com/pine-script-docs/en/v5/language/Maps.html#id16)

映射不能直接使用其他映射、[数组](https://www.tradingview.com/pine-script-docs/en/v5/language/Arrays.html#pagearrays)或[矩阵](https://www.tradingview.com/pine-script-docs/en/v5/language/Matrices.html#pagematrices)作为值，但它们可以保存 在其字段中包含集合的[用户定义类型](https://www.tradingview.com/pine-script-docs/en/v5/language/Type_system.html#pagetypesystem-userdefinedtypes) 的值。

例如，假设我们要创建一个“2D”映射，它使用 [字符串](https://www.tradingview.com/pine-script-reference/v5/#type_string)键来访问 包含 [字符串](https://www.tradingview.com/pine-script-reference/v5/#type_string)键和 [浮点值对的](https://www.tradingview.com/pine-script-reference/v5/#type_float)*嵌套映射*。由于映射不能使用其他集合作为值，因此我们首先创建一个*包装类型*，其中包含一个字段来保存实例，如下所示：`map<string, float>`

```javascript
//@type A wrapper type for maps with `string` keys and `float` values.
type Wrapper
    map<string, float> data
```

定义类型后`Wrapper`，我们可以创建 [字符串](https://www.tradingview.com/pine-script-reference/v5/#type_string)键和 `Wrapper`值的映射，其中`data`映射中每个值的字段都指向一个实例：`map<string, float>`

```javascript
mapOfMaps = map.new<string, Wrapper>()
```

下面的脚本使用此概念构建一个映射，其中包含保存多个代码请求的 OHLCV 数据的映射。用户定义的`requestData()`函数从股票代码请求价格和交易量数据，创建映射， [将](https://www.tradingview.com/pine-script-reference/v5/#fun_map.put)数据放入其中，然后返回 包含新映射的实例。`<string, float>``Wrapper`

该脚本[将](https://www.tradingview.com/pine-script-reference/v5/#fun_map.put)每次调用的结果 `requestData()`放入 中`mapOfMaps`，然后 使用用户定义的方法创建嵌套映射的[字符串](https://www.tradingview.com/pine-script-reference/v5/#type_string)`toString()`表示形式，并将其显示在图表上的 label [中](https://www.tradingview.com/pine-script-reference/v5/#type_label)：

![../_images/Maps-Maps-of-other-collections-1.png](https://www.tradingview.com/pine-script-docs/en/v5/_images/Maps-Maps-of-other-collections-1.png)

```javascript
//@version=5
indicator("Nested map demo")

//@variable The timeframe of the requested data.
string tf = input.timeframe("D", "Timeframe")
// Symbol inputs.
string symbol1 = input.symbol("EURUSD", "Symbol 1")
string symbol2 = input.symbol("GBPUSD", "Symbol 2")
string symbol3 = input.symbol("EURGBP", "Symbol 3")

//@type A wrapper type for maps with `string` keys and `float` values.
type Wrapper
    map<string, float> data

//@function Returns a wrapped map containing OHLCV data from the `tickerID` at the `timeframe`.
requestData(string tickerID, string timeframe) =>
    // Request a tuple of OHLCV values from the specified ticker and timeframe.
    [o, h, l, c, v] = request.security(
         tickerID, timeframe,
         [open, high, low, close, volume]
     )
    //@variable A map containing requested OHLCV data.
    result = map.new<string, float>()
    // Put key-value pairs into the `result`.
    result.put("Open", o)
    result.put("High", h)
    result.put("Low", l)
    result.put("Close", c)
    result.put("Volume", v)
    //Return the wrapped `result`.
    Wrapper.new(result)

//@function Returns a string representing `this` map of `string` keys and `Wrapper` values.
method toString(map<string, Wrapper> this) =>
    //@variable A string representation of `this` map.
    string result = "{"

    // Iterate over each `key1` and associated `wrapper` in `this`.
    for [key1, wrapper] in this
        // Add `key1` to the `result`.
        result += key1

        //@variable A string representation of the `wrapper.data` map.
        string innerStr = ": {"
        // Iterate over each `key2` and associated `value` in the wrapped map.
        for [key2, value] in wrapper.data
            // Add the key-value pair's representation to `innerStr`.
            innerStr += str.format("{0}: {1}, ", key2, str.tostring(value))

        // Replace the end of `innerStr` with "}" and add to `result`.
        result += str.replace(innerStr, ", ", "},\n", wrapper.data.size() - 1)

    // Replace the blank line at the end of `result` with "}".
    result := str.replace(result, ",\n", "}", this.size() - 1)
    result

//@variable A map of wrapped maps containing OHLCV data from multiple tickers.
var mapOfMaps = map.new<string, Wrapper>()

//@variable A label showing the contents of the `mapOfMaps`.
var debugLabel = label.new(
     bar_index, 0, color = color.navy, textcolor = color.white, size = size.huge,
     style = label.style_label_center, text_font_family = font.family_monospace
 )

// Put wrapped maps into `mapOfMaps`.
mapOfMaps.put(symbol1, requestData(symbol1, tf))
mapOfMaps.put(symbol2, requestData(symbol2, tf))
mapOfMaps.put(symbol3, requestData(symbol3, tf))

// Update the label.
debugLabel.set_text(mapOfMaps.toString())
debugLabel.set_x(bar_index)
```