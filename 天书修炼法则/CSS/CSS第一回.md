### 关于CSS三栏布局需要注意的部分

> 1. 对于并列的div，如果设置共同的属性，他们之间用逗号隔开，否则就会变成后代选择器。
>
> 2. letterSpacing 用来控制字符之间的间距。
>
> 3. 标准的盒模型中，元素的宽度、高度只是内容的宽高，不包括边框(border)、内边距(padding)、外边距(margin)。
>
> 4. border-collapse 为表格设置合适的边框类型。collapse 会把边框进行合并，默认值separate是分开的。
>
> 5. 媒体查询包含一个可选的媒体类型和零个或或多个css3规范的表达式。一般用作响应式的网页设计。
>
>    ```css
>    @media only screen and {max-width:500px} {
>      body{
>        background-color :lightblue
>      }
>    }
>    ```
>
>    表示当前浏览器屏幕小于500px时，背景颜色为浅蓝色。以上！！
>
>    ```css
>     @media screen and (min-width:600px) {
>      nav {
>        float: left;
>        width: 25%;
>      }
>      section {
>        margin-left: 25%;
>      }
>    }
>    @media screen and (max-width:599px) {
>      nav li {
>        display: inline;
>      }
>    }
>    ```
>
>    当浏览器的宽度小于600px时，把整体布局变成一列。以上！！
>
>    `**6.这一点很重要，我困惑了很长时间**。
>
>    在使用三栏布局时，要求两边固定宽度，中间自适应。考虑使用inline-block。然后中间部分的宽度用calc(100% - Xpx)来解决问题。
>
>    这里面需要注意以下几个问题：
>
>    > 1. width: 100% 会占据父元素的全部宽度，如果要添加内外边距则会伸出边框外。如图：
>    >
>    >    ![QQ截图20170307202110](F:\天书修炼法则\CSS\笔记图片\QQ截图20170307202110.png)
>    >
>    >    width：auto 也会充满整个父元素，但是会减去他自身的border、margin、paddiing。所以如果不是必要就避免使用width: 100%来定义宽度。
>    >
>    > 2. 设置display: inline-block 的元素 之间会自动产生空格符大约5px。如果忽略了这部分的因素在计算calc(100% - Xpx)时会因为少减去部分像素而得不到正确的布局。
>    >
>    >    目前知道两种解决方式，如下：
>    >
>    >    > 1. 设置父元素的font-size: 0; 再设置各个子元素的font-size: 16px; 即可消除各个元素之间的空白符。
>    >    > 2. 引入letter-spacing，它表示字符间距，可以增加或减少字符间的空白。设置父元素的letter-spacing: -5px; 各个子元素的letter-spacing: normal。
>
>    7. 在进行水平垂直居中操作时，设置div为以下样式：
>
>    ```css
>    #grayArea{
>        background-color: #ccc;
>        width:400px;
>        height:200px;
>        position: relative;
>        top:calc(50% - 100px);
>        left:calc(50% - 200px);
>    }
>    ```
>
>    但是只能够水平居中，垂直方向上不起作用。这是由于html、body的height默认值是auto。·也就是说when you use property top on an element, the parent of that element needs to have a static height set. 所以加上以下代码可以解决这一问题：
>
>    ```css
>    html, body{
>        height:100%;
>    }
>    ```
>
>    可以正确的显示水平与垂直方向的居中。
>
>    8. text-indent 用来控制首行文本缩进，可以为负值。当为负值时文本会被缩进到左边。
>    9. 自适应宽度的div含有图片时，可以通过设置图片的最大宽度，来避免因浏览器窗口宽度缩小导致图片伸出到该div边框的外部。
>    10. ​position: fixed 是相对浏览器窗口进行定位，不会随着页面滚动而滚动。例如知乎首页的导航栏的应用。
>