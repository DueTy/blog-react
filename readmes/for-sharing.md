### 项目结构
├─build    
├─dist              
│  └─assets         
│      └─images     
├─express-router    
├─readmes           
└─src               
    ├─assets        
    │  ├─font       
    │  │  └─iconfont
    │  └─images     
    ├─common        
    │  ├─http       
    │  ├─menus      
    │  └─routes     
    ├─components    
    │  ├─header     
    │  ├─login      
    │  ├─navigate   
    │  └─sider      
    ├─containers    
    │  ├─admin      
    │  ├─archive    
    │  ├─article    
    │  ├─collection  
    ├─reducers      
    ├─router-view   
    └─utils      
### build
##### build-存放打包脚本
build.config.js & webacpk.config.js &  webpack.production.config.js 


build.config.js | webacpk.config.js | webpack.production.config.js 
---|---|---
提供dev、生产打包的基本配置，包括路径、插件、打包loader | dev配置，webpack-dev-server的热更新、替换，以及devtool的inline-source-map | 打包，分离入口import打包vendor

##### app-server
区分npm development/producttion环境

development | 非dev
---|---
webpack-hot-middleware和wepack-dev-middleware，引入webpack配置编译为中间件，进行server层的热更新、替换 | start，app默认配置express/express-router为后台，加dist前台文件

### express-router

接口

引入配置

bodyParse | cookieParser | utils
---|---|---
配置app过程引入，app.use(bodyParse.json), router中访问req.body为json对象，方便获取请求头 | 同bodyParse，可操作cookie | 工具方法，自建：packRes、packInsert、packUpdate，格式化请求，组合参数，搭配db-connnection操作数据库，插件：uuidV4、sillyDate，时间戳转日期串，id生成

### src-frontend

#### ui
assets | components | containers | router-view
---|---|---|---
静态资源,字体图片 | 页面组件，头部、底部、sider、pagination、登录 | 页面，home/主页，archive/归档，collection/收藏，about/个人相关，admin/后台管理，error-page/错误404 | route页面路由入口

#### data
common | utils | reducers
---|---|---|---
页面路由，全局进度条http，导航栏 | 通用工具类，日期，标签随机色color | redux-reducers

### react+redux
#### 状态管理

![image](https://user-gold-cdn.xitu.io/2018/5/28/163a64520b7eec3f?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

##### 方法
###### getState()
获取store中当前的状态。
###### dispatch(action)
分发一个action，并返回这个action。这是唯一能改变store中数据的方式，且触发listener的调用
###### subscribe(listener)
注册一个监听者，它在store发生变化的时候被调用
###### replaceReducer(nextReducer)
更新当前store里的reducer，一般只会在开发模式中调用该方法。

#### 一些理解
##### 单一存储
redux在应用中存在的形式为store，可以有多个reducer，但组装的store有且仅有一个

使用redux的createStore进行store的创建，react中使用属性绑定，在入口注入store

##### 只读state
getState()可以拿到当前store，但state为只读，改变state的方法通过dispatch来分发action，进行状态更新

##### 纯函数 *
1.函数在有相同的输入值时，产生相同的输出

2.函数中不包含任何会产生副作用的语句

##### action
可以理解为一个描述，告诉程序我“会”去执行何种状态（执行通过dispatch），代码为一个object，拥有一个基础字段type来描述状态（建议为常量，因为随着项目越来越大，管理状态越来越多）

##### reducer
如果action是一个描述的话，那reducer就算是一个描述的发起者，会告诉应用，我的状态到底会如何更新，状态会如何变化

谨记纯函数的原则，在一个reducer中，不能做会修改state的操作，保证，同一个action，状态只会更新到对应的state

##### 数据流
严格的单向数据流是 Redux 架构的设计核心

也就是说，对 state 树的任何修改都该通过 action 发起，然后经过一系列 reducer 组合的处理，最后返回一个新的 state 对象。

#### react-redux
##### provider，connnet


```javascript
const store = createStore(reducers);
const render = Component => {
    ReactDOM.render(
        (
            <Provider store={store}>
                <Component></Component>
            </Provider>
        ),
        document.getElementById("app")
    )
};
render(RouterVew);
```

```javascript
connect(
    state => state.user, //挂载state到组件的props
    { loginSuccess, logout } //组件的更改，action
)(Component);
```

通过connnet连接后，“子孙”组件中可通过访问props来获取store中的state