# this和对象原型
## 第一章
#### this
- 对this的错误理解：1）this指向函数自身； 2）this指向函数的作用域。
- this指代什么取决于函数的调用位置。有四种绑定规则帮助我们确定this的绑定对象：
- 1）默认绑定：当在全局作用域中独立调用函数的时候，如 fun(); ,此时this指代的是全局对，即window。 
- 2）隐式绑定：在函数调用时，其存在上下文对象，也就是被某个对象拥有，如：var obj = { fun: fun(); }; ，此时this绑定到这个上下文对象上。 
- 3）显式绑定：调用call(...)或apply(...)进行显式绑定，将函数中的this绑定到指定的对象上，如 fun.call(obj); 或 fun.apply(obj); 。 
- 4）new绑定：调用函数是在函数前使用new关键字，会将函数绑定到此时赋值的对象上，如 var obj = new fun(); 。
- 在上述几种规则中，优先级顺序如下：显式绑定 > new绑定 > 隐式绑定 > 默认绑定。
- 如果想要将数组中的元素当做参数传入函数，则在显式绑定时为apply设置一个null对象，如 fun.apply(null,arr); , 此外还可以使用es6中的 ... , 如 fun(...arr); 。当设置null对象有个不好的地方在于，如果函数中存在this的语句，则此时的this指代的是全局对象。所以为了解决这一问题。我们可以使用如下方法：var o = Object.creat(null); foo.apply(o,arr); 。注：这里的o为DMZ空对象。
- ES6中的箭头函数无法使用上述的this绑定规则，this的指代是根据外层（函数或全局）作用域来决定的。

第二章
- .a语法称为属性访问，["a"]为键访问，两种语法的区别在于属性访问的属性名要求必须是满足标识符的命名规范，而键访问的属性名可以为任意UTF-8/Unicode字符串。
- 继承的实质是将两个对象关联起来，通过一个对象就可以访问到另一个对象的属性和方法。
- Object.creat()可以将连个对象关联起来。var o1 = Object.creat(o2, {a:...;b:...}); 此语句将o1与o2关联起来，并且为o1定义了新的属性a、b等，此时o1就可以访问到o2中的属性与方法了，类似于 o1.prototype = new o2 ();
