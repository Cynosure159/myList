import VirtualList from "./VirtualList/VirtualList";

function App() {
	const data = Array.from({ length: 10000 }, (v, k) => k);

	return (
		<div
			className="App"
			style={{
				padding: "50px",
			}}
		>
			<VirtualList
				width={600}
				height={800}
				itemHeight={40}
				backgroundColor="#ecf3ff"
				overscanRowCount={2}
				data={data}
				model={(item) => <div>{item}</div>}
			/>
		</div>
	);
}

export default App;
