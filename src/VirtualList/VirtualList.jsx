import {
	forwardRef,
	useEffect,
	useImperativeHandle,
	useRef,
	useState,
} from "react";
import "./list.css";

const VirtualList = forwardRef((props, ref) => {
	const listRef = useRef();
	const startRef = useRef();
	const endRef = useRef();

	const [displayState, setDisplayState] = useState([]);
	const [topState, setTopState] = useState(0);
	const [buttonState, setButtonState] = useState(0);

	useEffect(() => {
		if (props.data.length > 0) {
			setDisplayState(Array(props.data.length).fill(false));
		}
		handleScroll();
	}, [props]);

	useImperativeHandle(ref, () => ({
		refresh: refresh,
	}));

	function refresh() {
		handleScroll();
	}

	function handleScroll() {
		let offsetTop =
			listRef.current.getClientRects()[0].y -
			startRef.current.getClientRects()[0].y;
		let topNumber =
			Math.floor(offsetTop / props.itemHeight) - props.overscanRowCount;
		if (topNumber < 0) topNumber = 0;
		let showNum =
			Math.ceil(props.height / props.itemHeight) +
			2 * props.overscanRowCount;
		let buttonNum;
		if (topNumber + showNum > props.data.length) buttonNum = 0;
		else buttonNum = props.data.length - showNum - topNumber;
		// console.log(topNumber, showNum, buttonNum);
		setDisplayState(
			Array(topNumber)
				.fill(false)
				.concat(Array(showNum).fill(true))
				.concat(Array(buttonNum).fill(false))
		);
		setTopState(topNumber * props.itemHeight);
		setButtonState(buttonNum * props.itemHeight);

		if (props.hasMoreData) {
			// 如果不是正在加载中 且滚到底部 则回调获取数据
			if (
				!props.loading &&
				endRef.current.getClientRects()[0].y -
					listRef.current.getClientRects()[0].y -
					props.height <=
					0
			)
				props.getMoreData();
		} else {
		}
	}

	return (
		<div
			className="virtual-list"
			style={{
				height: props.height ? props.height + "px" : "500px",
				width: props.width ? props.width + "px" : "300px",
				backgroundColor: props.backgroundColor || "#ffffff",
				border: props.border || "solid 1px black",
			}}
			ref={listRef}
			onScroll={handleScroll}
		>
			{/* 位于列表头的锚点，用于计算滚动距离 */}
			<div ref={startRef} />

			{/* 位于列表上方占位块*/}
			<div
				style={{
					height: topState + "px",
				}}
			/>
			{props.data.map((item, index) =>
				displayState[index] ? (
					<div
						className="virtual-list-item"
						key={index}
						style={{
							height: props.itemHeight
								? props.itemHeight + "px"
								: "40px",
							border: props.itemBorder || "solid 1px black",
							// display: displayState[index] ? "block" : "none",
						}}
					>
						{props.model(item, index)}
					</div>
				) : null
			)}

			{/* 位于列表下方占位块*/}
			<div
				style={{
					height: buttonState + "px",
				}}
			/>

			{/* 加載更多 */}
			{props.hasMoreData ? (
				<div ref={endRef}> {props.loadingBlock || "正在加載..."}</div>
			) : null}
		</div>
	);
});

VirtualList.defaultProps = {
	width: 300,
	height: 500,
	itemHeight: 40,
	overscanRowCount: 2,
	border: "solid 1px black",
};

export default VirtualList;
