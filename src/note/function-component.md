# 函数式组件

## 声明方式

```typescript
const App = () => {
  return <div></div>
}
export default App;
```

## 使用方式

```typescript
import App from './App'
<App />
```

使用标签直接使用即可。

## props

React 组件使用 *props* 来互相通信。每个父组件都可以提供 props 给它的子组件，从而将一些信息传递给它。Props 可能会让你想起 HTML 属性，但你可以通过它们传递任何 JavaScript 值，包括对象、数组和函数。

### 步骤 1: 将 props 传递给子组件 

```typescript
const App = () => {
  return (
    <Persion info={{name: 'Serein', age: 18, gender: 'male'}}></Son>
  );
}
export default App;
```

### 步骤 2: 在子组件中读取 props 

```typescript
const Persion = ({ info }) => {
  return (
    <>
      <div>name: {info.name}</div>
      <div>age: {info.age}</div>
      <div>gender: {info.gender}</div>
    </>
  );
}
```

## 插槽

当您将内容嵌套在 JSX 标签中时，父组件将在名为 `children` 的 prop 中接收到该内容。例如，下面的 `Parent` 组件将接收一个被设为 `<Son />` 的 `children` prop 并将其包裹在 div 中渲染。

```typescript
const App = () => {
  return (
    <Parent>
    	<Son></Son>
    </Parent>
  );
}
export default App;

const Parent = ({ children }) => {
  return (
    <div>
    	{children}
    </div>
  );
}
export default App;
```

具名插槽只需传递对象即可，使用如下：

```typescript
const App = () => {
  return (
    <Parent>
      {{ Son, Daughter }}
    </Parent>
  );
}
export default App;

const Parent = ({ children }) => {
  return (
    <div>
    	{children.Son && children.Son()}
      {children.Daughter && children.Daughter()}
    </div>
  );
}
export default App;
```

