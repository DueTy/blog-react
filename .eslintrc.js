
module.exports = {
    // 指定脚本的运行环境。每种环境都有一组特定的预定义全局变量
    "env": {
        "browser": true,
        "node": true,
        "commonjs": true,
        "es6": true
    },
    // 使用第三方开发配置合集
    "extends": [
        "eslint:recommended",
        // "plugin:react/recommended",
    ],
    "parser": "babel-eslint",
    // 指定校验的ECMAScript的版本及特性
    "parserOptions": {
        "ecmaFeatures": {   // 使用额外的语言特性
            "jsx": true,    // 启用jsx
            "legacyDecorators": true    // 可以对导出的class使用装饰器的配置
        },
        "ecmaVersion": 2018,    // ECMAScript版本，这里为ES7
        "sourceType": "module"  // 默认script，如果代码是ECMAScript模块，设置为module
    },
    "plugins": [
        "react"
    ],
    "globals": Object.assign({
        "process": true,
        "window": true,
        "document": true,
        "__dirname": true,
        "System": true,
    }),
    // 定义自己的规则 0-不验证，1-warning，2-error
    "rules": {
        // 4个空格
        "indent": [2, 4, { "SwitchCase": 1 }],
        // "linebreak-style": ["error", "unix"],
        // 单引号还是双引号
        "quotes": [2, "double"],
        // 箭头函数中，在需要的时候，在参数外使用小括号（只有一个参数时，可以不适用括号，其它情况下都需要使用括号）
        "arrow-parens": [2, "as-needed"],
        //箭头函数中的箭头前后需要留空格
        "arrow-spacing": [2, { "before": true, "after": true }],
        //如果代码块是单行的时候，代码块内部前后需要留一个空格
        "block-spacing": [2, "always"],
        //在定义对象或数组时，最后一项不能加逗号
        "comma-dangle": [2, "never"],
        //在写逗号时，逗号前面不需要加空格，而逗号后面需要添加空格
        "comma-spacing": [2, { "before": false, "after": true }],
        //如果逗号可以放在行首或行尾时，那么请放在行尾
        "comma-style": [2, "last"],
        //在constructor函数中，如果classes是继承其他class，那么请使用super。否则不使用super
        "constructor-super": 2,
        //在if-else语句中，如果if或else语句后面是多行，那么必须加大括号。如果是单行就应该省略大括号。
        "curly": [2, "multi-line"],
        //使用=== !== 代替== != .
        "eqeqeq": [2, "allow-null"],
        //该规则规定了在对象字面量语法中，key和value之间的空白，冒号前不要空格，冒号后面需要一个空格
        "key-spacing": [2, { "beforeColon": false, "afterColon": true }],
        //禁止覆盖class命名，也就是说变量名不要和class名重名
        "no-class-assign": 2,
        //在条件语句中不要使用赋值语句
        "no-cond-assign": 2,
        //const申明的变量禁止修改
        "no-const-assign": 2,
        "no-console": 0,
        //函数参数禁止重名
        "no-dupe-args": 2,
        //class中的成员禁止重名
        "no-dupe-class-members": 2,
        //在对象字面量中，禁止使用重复的key
        "no-dupe-keys": 2,
        //在switch语句中禁止重复的case
        "no-duplicate-case": 2,
        //禁止使用多余的圆括号
        "no-extra-parens": [2, "functions"],
        //在一个本来就会自动转化为布尔值的上下文中就没必要再使用!! 进行强制转化了。
        "no-extra-boolean-cast": 2,
        //空行不能够超过2行
        "no-multiple-empty-lines": [2, { "max": 2 }],
        //禁止使用eval函数
        "no-eval": 2,
        //禁止使用类eval的函数
        "no-implied-eval": 2,
        //禁止在不必要的时候使用bind函数
        "no-extra-bind": 2,
        //这条规则，简单来说就是在case语句中尽量加break，避免不必要的fallthrough错误，如果需要fall through，那么看官网。
        "no-fallthrough": 2,
        //禁止对函数名重新赋值
        "no-func-assign": 2,
        //RegExp构造函数中禁止使用非法正则语句
        "no-invalid-regexp": 2,
        //禁止无意得把全局对象当函数调用了，比如下面写法错误的：Math(), JSON()
        "no-obj-calls": 2,
        //不要重复申明一个变量
        "no-redeclare": 2,
        //return语句中不要写赋值语句
        "no-return-assign": 2,
        //正则表达式中不要使用空格
        "no-regex-spaces": 2,
        //禁止对一些关键字或者保留字进行赋值操作，比如NaN、Infinity、undefined、eval、arguments等。
        "no-shadow-restricted-names": 2,
        //函数调用时，圆括号前面不能有空格
        "no-spaced-func": 2,
        //在调用super之前不能使用this对象
        "no-this-before-super": 2,
        //禁止使用没有定义的变量，除非在／＊global＊／已经申明
        "no-undef": 2,
        //禁止把undefined赋值给一个变量
        "no-undef-init": 2,
        //禁止在不需要分行的时候使用了分行
        "no-unexpected-multiline": 2,
        //没有执行不到的代码
        "no-unreachable": 2,
        //没有定义了没有被使用到的变量
        "no-unused-vars": [2, { "vars": "all", "args": "none" }],
        // 加不加分号
        "semi": ["error", "always"],
        //该规则规定了分号前后的空格，具体规定如下。
        "semi-spacing": [2, { "before": false, "after": true }],
        //代码块前面需要加空格
        "space-before-blocks": [2, "always"],
        //函数圆括号前面需要加空格
        "space-before-function-paren": [2, "never"],
        //圆括号内部不需要加空格
        "space-in-parens": [2, "never"],
        //操作符前后需要加空格
        "space-infix-ops": 2,
        //一元操作符前后是否需要加空格，单词类操作符需要加，而非单词类操作符不用加
        "space-unary-ops": [2, { "words": true, "nonwords": false }],
        //评论符号｀／*｀ ｀／／｀，后面需要留一个空格
        "spaced-comment": [2, "always", { "markers": ["global", "globals", "eslint", "eslint-disable", "*package", "!", ","] }],
        //推荐使用isNaN方法，而不要直接和NaN作比较
        "use-isnan": 2,
        //在使用typeof操作符时，作比较的字符串必须是合法字符串eg:'string' 'object'
        "valid-typeof": 2,
        //立即执行函数需要用圆括号包围
        "wrap-iife": [2, "any"],
        //yoda条件语句就是字面量应该写在比较操作符的左边，而变量应该写在比较操作符的右边。
        //而下面的规则要求，变量写在前面，字面量写在右边
        "yoda": [2, "never"],

        // JSX里的数组需要有key
        "react/jsx-key": 2,
        // 防止React被错误地标记为未使用
        "react/jsx-uses-react": 2,
        // 防止在JSX中使用的变量被错误地标记为未使用
        "react/jsx-uses-vars": 2,
        // JSX 标签的空格
        "react/jsx-indent": [2, 4],
        // JSX 里不能使用bind, 可以使用箭头函数
        "react/jsx-no-bind": [2, {"allowArrowFunctions": true}],
        // 不能直接修改this.state
        "react/no-direct-mutation-state": 2,
        // 禁止把ReactDOM.render()当做返回值
        "react/no-render-return-value": 2,
        // render 需要 return
        "react/require-render-return": 2,
        // 在JSX属性中强制或禁止花括号中的空格
        "react/jsx-curly-spacing": [2, "never"],
        // 在JSX中关闭括号之前验证间距
        "react/jsx-tag-spacing": [2, {"beforeSelfClosing": "always"}],
        // 防止没有子级的组件的额外结束标记
        "react/self-closing-comp": 2,
        // 禁止重复的props
        "react/jsx-no-duplicate-props": 2,
        // 组件需要先定义再使用
        "react/jsx-no-undef": 2,
        // 避免使用findDOMNode，Facebook会弃用
        // "react/no-find-dom-node": 2,
        // 禁止使用html保留字标签
        "react/no-unknown-property": 2
    }
};