import React, { useState, useEffect } from "react";
import {
	View,
	Text,
	StatusBar,
	TouchableOpacity,
	Image,
	FlatList,
	RefreshControl,
} from "react-native";
import { COLOURS } from "../database/Database";

const Home = ({ navigation }) => {
	const [books, setBooks] = useState([]);
	const [page, setPage] = useState(1);
	const [limit, setLimit] = useState(10);
	const [refreshing, setRefreshing] = useState(false);
	const [isFetching, setIsFetching] = useState(false);
	const [hasMore, setHasMore] = useState(true);

	useEffect(() => {
		getBooks();
		console.log("books", books);
	}, []);

	//get data from DB

	const onRefresh = async () => {
		setRefreshing(true);
		setPage(1);
		setHasMore(true);
		fetch(
			`http://127.0.0.1:4000/books/getBooks?page=${page}&limit=${limit}`
		)
			.then((res) => res.json())
			.then((data) => {
				if (data.books?.length > 0) {
					setBooks(books.concat(data?.books));
					setPage(page + 1);
					if (books.length < 10) setHasMore(false);
					setRefreshing(false);
				}
			})
			.catch((err) => console.error("error --------->", err));
	};

	const getBooks = () => {
		if (!hasMore || isFetching) return;

		setIsFetching(true);
		fetch(
			`http://127.0.0.1:4000/books/getBooks?page=${page}&limit=${limit}`
		)
			.then((res) => res.json())
			.then((data) => {
				if (data.books?.length > 0) {
					setBooks(books.concat(data?.books));
					setPage(page + 1);
					if (books.length < 10) setHasMore(false);

					setPage(page + 1);
					setIsFetching(false);
				}
			})
			.catch((err) => console.error("error --------->", err));
	};

	// console.log("books ----->", books);
	//create an product reusable card

	const BookCard = ({ data }) => {
		return (
			<TouchableOpacity
				onPress={() =>
					navigation.navigate("ProductInfo", { bookId: data._id })
				}
				style={{
					width: "48%",
					marginVertical: 14,
				}}
			>
				<View
					style={{
						width: "100%",
						height: 187,
						borderRadius: 10,
						backgroundColor: COLOURS.backgroundLight,
						position: "relative",
						justifyContent: "center",
						alignItems: "center",
						marginBottom: 8,
					}}
				>
					<Image
						source={`http://127.0.0.1:4000/${data.coverImage}`}
						style={{
							width: "80%",
							height: "80%",
							resizeMode: "contain",
						}}
					/>
				</View>
				<View style={{ marginRight: 10, marginLeft: 10 }}>
					<View style={{ marginBottom: 5 }}>
						<Text
							style={{
								fontSize: 12,
								color: COLOURS.black,
								fontWeight: "600",
							}}
						>
							{data.title}
						</Text>
					</View>
					<View
						style={{
							flexDirection: "row",
							alignItems: "center",
							justifyContent: "space-between",
						}}
					>
						<View
							style={{
								flexDirection: "row",
								alignItems: "center",
							}}
						>
							<Text
								style={{
									fontSize: 14,
									color: COLOURS.red,
									fontWeight: "600",
									opacity: 0.5,
								}}
							>
								{data.discount}%
							</Text>
						</View>
						<Text>{data.price} 원</Text>
					</View>
				</View>
			</TouchableOpacity>
		);
	};

	return (
		<View
			style={{
				width: "100%",
				height: "100%",
				backgroundColor: COLOURS.white,
			}}
		>
			<StatusBar
				backgroundColor={COLOURS.white}
				barStyle="dark-content"
			/>

			{/* <ScrollView showsVerticalScrollIndicator={false}> */}
			<View
				style={{
					justifyContent: "center",
					alignItems: "center",
				}}
			>
				<Text
					style={{
						fontSize: 26,
						color: COLOURS.black,
						fontWeight: "500",
						letterSpacing: 1,
						marginBottom: 10,
					}}
				>
					자유톡
				</Text>
			</View>

			<FlatList
				data={books}
				keyExtractor={(item) => item._id}
				onEndReached={getBooks}
				onEndReachedThreshold={0.8}
				refreshControl={
					<RefreshControl
						refreshing={refreshing}
						onRefresh={onRefresh}
					/>
				}
				renderItem={({ item }) => (
					<View
						style={{
							padding: 16,
						}}
					>
						<View
							style={{
								flexDirection: "row",
								flexWrap: "wrap",
								justifyContent: "space-around",
							}}
						>
							{books?.map((data, _idx) => {
								return <BookCard data={data} key={_idx} />;
							})}
						</View>
					</View>
				)}
			/>
			{/* </ScrollView> */}
		</View>
	);
};

export default Home;
