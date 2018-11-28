
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



#### 实例：[源码传送门](https://github.com/Erindcl/blog-react-app)
src/pages/global/reducer.js

```
import { globalType } from './constant';

const initialState = {
  startNum: [14,5,18,6,9]
};

const globalReducer = (state = initialState, action) => {
  const { type, plyload } = action;
  switch (type) {
    case globalType.SET_START_NUM:
      return Object.assign({}, state, {
        startNum: plyload
      });
    default: 
      return state;
  }
}

export default globalReducer;
```

src/pages/global/action.js

```
import { globalType } from './constant';

export const startNum = (data) => ({
  type: globalType.SET_START_NUM,
  payload: data
})
```

src/pages/global/constant.js

```
import mirror from 'mirror-creator';
export const globalType= mirror([
  'SET_START_NUM'
],'global/')
```

src/pages/global/index.js

```
import global from './reducer';

const appReducer = {
  global
};
	
export default appReducer;
```

src/store/index.js

```
import { createStore } from 'redux';
import globalReducer from '../pages/global/reducer';
import { composeWithDevTools } from 'redux-devtools-extension'; // 导入后才能使用redux工具（Chrome扩展程序）

const store = createStore(
  globalReducer,
  composeWithDevTools()
)
export default store;
```

src/index.js

```
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store'
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render( 
  <Provider store={ store }>
    <App />
  </Provider>, 
  document.getElementById('root')
);
```

组件中使用：
src/pages/blogContent/index.js
```
import { connect } from "react-redux";
class BlogContent extends Component {
    componentDidMount() {
        this.setState({start:this.props.start});  // this.props.start获取redux
        const action = { type: 'SET_START_NUM', plyload: [8,7,4,5,3] };
        this.props.startNum(action);  // 根据新的值修改redux
    }
    ......
}
const mapStateToProps = (state) => {
  return ({
    start: state.startNum
  })
}
const mapDispatchToProps = (dispatch, ownProps) => {  // 如果不在connect中传入这个函数，则上述组件的this.props中会含有dispatch()这个函数，直接使用这个函数给函数传入一个新的action也可以达到相同的效果
  return {
    startNum: (...args) => dispatch(...args)   // 此时的startNum函数其实就相当于dispatch函数的别名
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(BlogContent);
```

