
[Redux 中文文档](http://cn.redux.js.org/)

#### 安装redux

```
npm install redux react-redux redux-thunk --save-dev  // redux-thunk(中间件)可以放你实现异步action
```

每个页面为一个独立模块，每个模块维护自己的reducer和action


每个页面的结构里都有：

```
index.js       // 创建store 所有的状态都是以一个对象树的形式存储在一个单一的store中
reducer.js     // 通过编写reducer来维护状态，返回新的state,不直接修改原来数据
action.js      // 数据的获取与处理 当你想要改变应用的中的状态时，你就要dispatch一个action,这也是唯一的改变state的方法
constant.js    // use mirror-creator 定义action中操作类型的常量
style.scss
```



## 在react中使用redux

#### Store与视图层的绑定

得用到React-redux中的两个主角:Provider和Connect

##### Provider

Provider的作用类似于提供一个大容器，将组件和Redux进行关联，在这个基础上，connect再进行store的传递
    

```
<Provider store={store}>
    <Router history={history}>
        <Route path="/" component={App}>
            <Route path="foo" component={Foo}/>
            <Route path="bar" component={Bar}/>
        </Route>
    </Router>
</Provider>
```


##### connect([mapStateToProps], [mapDispatchToProps], [mergeProps], [options])

###### mapStateToProps(state, ownProps): 

允许我们将store中的数据作为props绑定到组件中，只要store更新了就会调用mapStateToProps方法，mapStateToProps返回的结果必须是object对象，该对象中的值将会更新到组件中
            
```
const mapStateToProps = (state) => {
    return ({
        count: state.counter.count
    })
}
```

###### mapDispatchToProps(dispatch, [ownProps])：

允许我们将action作为props绑定到组件中，mapDispatchToProps希望你返回包含对应action的object对象
            
```
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        increase: (...args) => dispatch(actions.increase(...args)),
        decrease: (...args) => dispatch(actions.decrease(...args))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(yourComponent)
```

###### mergeProps(stateProps, dispatchProps, ownProps)：
    
该参数非必须，redux默认会帮你把更新维护一个新的props对象，类似调用Object.assign({}, ownProps, stateProps, dispatchProps) 
    
######  options：

是为了更好的定制化设置的一个参数，允许返回5个boolean、function的值

#### react-redux中connect的装饰器用法@connect

普通写法：
        
```
class App extends React.Component{
    render(){
        return <p>hello</p>
    }
}
function mapStateToProps(state){
    return state.main
}
function mapDispatchToProps(dispatch){
    return bindActionCreators(action,dispatch)
}
export default connect(mapStateToProps,mapDispatchToProps)(App)
```

使用装饰器的写法：
        
```
@connect(
    state=>state.main,
    dispatch=>bindActionCreators(action,dispatch)
)
class App extends React.Component{
    render(){
        return <p>hello</p>
     }
}
```

        
        
#### mirror-creator的使用 

**作用：** 简化定义action中操作类型的常量的写法

之前的写法：
        
```
// actionTypes.js
export const SOME_ACTION_TYPE     = 'SOME_ACTION_TYPE';
export const ANOTHER_ACTION_TYPE  = 'ANOTHER_ACTION_TYPE';
export const ONE_MORE_ACTION_TYPE = 'ONE_MORE_ACTION_TYPE';
         
// actionCreator.js
import * as actionTypes from 'actionTypes';
dispatch({ type: actionTypes.SOME_ACTION_TYPE });
```

使用mirror-creator后：
       
```
// actionTypes.js
import mirrorCreator from 'mirror-creator';
export default mirrorCreator([
   'SOME_ACTION_TYPE',
   'ANOTHER_ACTION_TYPE',
   'ONE_MORE_ACTION_TYPE',
]);
        
// actionCreator.js
import actionTypes from 'actionTypes';
dispatch({ type: actionTypes.SOME_ACTION_TYPE });
```
