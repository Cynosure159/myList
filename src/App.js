import { useEffect, useState } from "react";
import VirtualList from "./VirtualList/VirtualList";

function App() {
	const [data, setData] = useState([]);
	const [hasMore, setHasMore] = useState(false);
	const [loading, setLoading] = useState(false);

	function getData() {
		setLoading(true);
		setData(data.concat(Array.from({ length: 100 }, (v, k) => k)));
		if (data.length < 1000) {
			setHasMore(true);
		} else {
			setHasMore(false);
		}
		setLoading(false);
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
				width={600}
				height={800}
				itemHeight={40}
				backgroundColor="#ecf3ff"
				overscanRowCount={2}
				data={data}
				model={(item) => <div>{item}</div>}
				hasMoreData={hasMore}
				getMoreData={getData}
				loading={loading}
			/>
		</div>
	);
}

export default App;
