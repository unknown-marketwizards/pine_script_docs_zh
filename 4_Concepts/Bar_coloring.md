# 条形着色

barcolor [()](https://www.tradingview.com/pine-script-reference/v5/#fun_barcolor)函数可让您为图表条形着色。它是唯一允许在窗格中运行的脚本影响图表的 Pine Script™ 功能。

该函数的签名是：

```javascript
barcolor(color, offset, editable, show_last, title) → void
```

着色可以是有条件的，因为`color`参数接受“系列颜色”参数。

以下脚本以不同的颜色呈现*内部*和*外部条形：*

![../_images/BarColoring-1.png](https://www.tradingview.com/pine-script-docs/en/v5/_images/BarColoring-1.png)

```javascript
//@version=5
indicator("barcolor example", overlay = true)
isUp = close > open
isDown = close <= open
isOutsideUp = high > high[1] and low < low[1] and isUp
isOutsideDown = high > high[1] and low < low[1] and isDown
isInside = high < high[1] and low > low[1]
barcolor(isInside ? color.yellow : isOutsideUp ? color.aqua : isOutsideDown ? color.purple : na)
```

注意：

- na[值](https://www.tradingview.com/pine-script-reference/v5/#var_na)使条形保持原样。
- 在[barcolor()](https://www.tradingview.com/pine-script-reference/v5/#fun_barcolor)调用中，我们使用嵌入的[?:](https://www.tradingview.com/pine-script-reference/v5/#op_{question}{colon}) 三元运算符表达式来选择颜色。