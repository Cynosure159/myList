# myList

这是一个React的简单虚拟列表组件

## demo

clone本项目到本地

``` 
npm install
npm start
```

## 使用

组件包含 `./src/VirtualList/VirtualList.jsx` 和 `./src/VirtualList/list.css`

``` jsx
import VirtualList from "./VirtualList/VirtualList";

<VirtualList
    width={600}
    height={800}
    itemHeight={40}
    backgroundColor="#ffffff"
    overscanRowCount={2}
    data={data}
    border="solid 2px black"
    model={(item, index) => (
        <div>{item}</div>
    )}
/>
```

## API

| Prop             | Description                | Type                          | Default           |
| ---------------- | -------------------------- | ----------------------------- | ----------------- |
| data             | 用来渲染列表的数据         | Array                         | -                 |
| model            | 列表的item                 | (item, index) => ReactElement | -                 |
| width            | 列表宽度（px）             | number                        | 300               |
| height           | 列表高度（px）             | number                        | 500               |
| itemHeight       | 列表每项高度（px）         | number                        | 40                |
| overscanRowCount | 可视区域外加载项           | number                        | 2                 |
| border           | 列表边框                   | CSSstring                     | "solid 1px black" |
| backgroundColor  | 列表背景颜色               | CSSstring                     | "\#ffffff"        |
| itemBorder       | 列表元素边框               | CSSstring                     | "solid 1px black" |
| hasMoreData      | 是否有更多数据需要下拉加载 | boolean                       | -                 |
| getMoreData      | 下拉后的更新数据函数       | function                      | -                 |
| loading          | 是否在更新数据中           | boolean                       | -                 |
| loadingBlock     | 下拉加载的显示             | ReactElement                  | -                 |

## 方法

#### refresh

更新列表，用于数据变更后刷新列表

``` jsx
<VirtualList
    ref={listRef}
    ...
/>

listRef.current.refresh()
```

