import { useEffect, useRef, useState } from "react";
import "./App.css";
import VirtualList from "./VirtualList/VirtualList";

function App() {
	const [data, setData] = useState([]);
	const [hasMore, setHasMore] = useState(false);
	const [loading, setLoading] = useState(false);

	const listRef = useRef();

	// 获取更多数据
	function getData() {
		setLoading(true);
		setTimeout(() => {
			let temp = data[data.length - 1] || 0;
			setData(
				data.concat(Array.from({ length: 10 }, (v, k) => k + temp + 1))
			);
			if (data.length < 100) {
				setHasMore(true);
			} else {
				setHasMore(false);
			}
			setLoading(false);
		}, 1000);
	}

	function handleDelete(index) {
		let temp = data;
		temp.splice(index, 1);
		setData(temp);
		listRef.current.refresh(); // 调用组件方法刷新
	}

	useEffect(() => {
		getData();
	}, []);

	return (
		<div
			className="App"
			style={{
				padding: "50px",
			}}
		>
			<VirtualList
				ref={listRef}
				width={600}
				height={800}
				itemHeight={120}
				backgroundColor="#ffffff"
				overscanRowCount={2}
				data={data}
				border="solid 2px #e7e7e7"
				itemBorder="none"
				model={(item, index) => (
					<div className="custom-list-item">
						<img
							src="https://source.unsplash.com/random"
							alt={item}
							className="custom-list-item-img"
						/>
						<span>这是第{item}个item</span>
						<button
							onClick={() => {
								handleDelete(index);
							}}
						>
							删除
						</button>
					</div>
				)}
				hasMoreData={hasMore}
				getMoreData={getData}
				loading={loading}
				loadingBlock={
					<div
						style={{
							fontSize: "20px",
							textAlign: "center",
						}}
					>
						正在加载...
					</div>
				}
			/>
		</div>
	);
}

export default App;
