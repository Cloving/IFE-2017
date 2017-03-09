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
>    表示当前浏览器屏幕小于500px时，背景颜色为浅蓝色。
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
>    当浏览器的宽度小于600px时，把整体布局变成一列。
>