[从发布-订阅模式到Vue响应系统](https://segmentfault.com/a/1190000013338801)

发布者：
    subscribers:{type:[subscriberFn,...]}   对象（包含订阅的类型及其相关订阅者）
    subscribe(newSubscriberFn,type)   函数（添加新的订阅者到订阅者数组中）
    unsubscribe(subscriberFn,type) 函数（从数组中移除指定订阅者）
    publish(type)     函数（当发布者的某一状态改变是，通知所有的订阅者，即遍历订阅者提供的方法）
    


优点：
    实现时间上的解耦(组件,模块之间的异步通讯)
    对象之间的解耦,交由发布订阅的对象管理对象之间的耦合关系.
缺点：
    创建订阅者本身会消耗内存,订阅消息后,也许,永远也不会有发布,而订阅者始终存在内存中.
    对象之间解耦的同时,他们的关系也会被深埋在代码背后,这会造成一定的维护成本.