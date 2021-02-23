import { useEffect, useRef, useState } from "react";
import "./list.css";

export default function VirtualList(props) {
	const listRef = useRef();
	const startRef = useRef();
	const endRef = useRef();

	const [displayState, setDisplayState] = useState([]);
	const [topState, setTopState] = useState(0);
	const [buttonState, setButtonState] = useState(0);

	useEffect(() => {
		if (props.data.length > 0) {
			setDisplayState(Array(props.data.length).fill(false));
			handleScroll();
		}
	}, [props]);

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
		if (topNumber + showNum > props.data.length)
			topNumber = props.data.length - showNum;
		let buttonNum = props.data.length - showNum - topNumber;
		// console.log(topNumber, showNum, buttonNum);
		setDisplayState(
			Array(topNumber)
				.fill(false)
				.concat(Array(showNum).fill(true))
				.concat(Array(buttonNum).fill(false))
		);
		setTopState(topNumber * props.itemHeight);
		setButtonState(buttonNum * props.itemHeight);

		// 如果不是正在加载中 且滚到底部 则回调获取数据
		if (
			!props.loading &&
			endRef.current.getClientRects()[0].y -
				listRef.current.getClientRects()[0].y -
				props.height <=
				0
		)
			props.getMoreData();
	}

	return (
		<div
			className="virtual-list"
			style={{
				height: props.height + "px",
				width: props.width + "px",
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
							height: props.itemHeight + "px",
							border: props.itemBorder || "solid 1px black",
							// display: displayState[index] ? "block" : "none",
						}}
					>
						{props.model(item)}
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
			{props.getMoreData ? <div ref={endRef}>正在加載...</div> : null}
		</div>
	);
}
