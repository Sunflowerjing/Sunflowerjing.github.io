# React 父组件调子组件方法



* 使用此方法要求 react版本>=@16.4

1. 父组件
```javascript
const { Component } = React;
class Parent extends Component {
    constructor(props) {
        super(props);
        this.child = React.createRef();
    }
    performChild = () => {
        this.child.current.getAlert();
    };
    render() {
        return (
            <div>
                <Child ref={this.child} />
                <button onClick={this.performChild}>Click</button>
            </div>
        );
    }
}
ReactDOM.render(<Parent />, document.getElementById('root'));
```

2. 子组件
```javascript
class Child extends Component {
    getAlert() {
        alert('父组件要执行我了!!!!!!!!!');
    }
    render() {
        return <h1>Hello</h1>;
    }
}
```












