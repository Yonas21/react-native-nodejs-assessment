import React, { useState, useEffect } from "react";
import {
	View,
	Text,
	StatusBar,
	ScrollView,
	TouchableOpacity,
	FlatList,
	Image,
	Dimensions,
	Animated,
	TextInput,
	ToastAndroid,
	Button,
} from "react-native";
import { COLOURS } from "../database/Database";
import Entypo from "react-native-vector-icons/Entypo";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { commentIcons } from "../database/Database";

const ProductInfo = ({ route, navigation }) => {
	const { bookId } = route.params;
	const [bookDetail, setBookDetail] = useState({});

	console.log("bookId", bookId);

	const [product, setProduct] = useState({});

	const width = Dimensions.get("window").width;

	const scrollX = new Animated.Value(0);

	let position = Animated.divide(scrollX, width);

	useEffect(() => {
		getBookDetail(bookId);
	}, [navigation]);

	//get product data by productID

	const getBookDetail = (id) => {
		fetch(`http://127.0.0.1:4000/books/getBooks/${id}`)
			.then((res) => res.json())
			.then((data) => {
				setBookDetail(data?.book);
			})
			.catch((err) => console.error("error --------->", err));
	};

	console.log("book detail ------>", bookDetail);
	return (
		<View
			style={{
				width: "100%",
				height: "100%",
				backgroundColor: COLOURS.white,
				position: "relative",
			}}
		>
			<StatusBar
				backgroundColor={COLOURS.backgroundLight}
				barStyle="dark-content"
			/>
			<ScrollView>
				<View
					style={{
						width: "100%",
						backgroundColor: COLOURS.backgroundLight,
						borderBottomRightRadius: 20,
						borderBottomLeftRadius: 20,
						position: "relative",
						justifyContent: "center",
						alignItems: "center",
						marginBottom: 4,
					}}
				>
					<View
						style={{
							width: "100%",
							flexDirection: "row",
							alignContent: "center",
							justifyContent: "space-between",
							paddingTop: 16,
							paddingLeft: 16,
						}}
					>
						<TouchableOpacity
							onPress={() => navigation.goBack("Home")}
						>
							<Entypo
								name="chevron-left"
								style={{
									fontSize: 18,
									color: COLOURS.backgroundDark,
									padding: 12,
									backgroundColor: COLOURS.white,
									borderRadius: 10,
								}}
							/>
						</TouchableOpacity>
						<Text style={{ marginRight: "40%" }}>
							{bookDetail.title}
						</Text>
					</View>
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
							source={`https://2fcd-196-190-62-176.ngrok-free.app/${bookDetail.coverImage}`}
							style={{
								width: "80%",
								height: "80%",
								resizeMode: "contain",
							}}
						/>
					</View>
				</View>
				<View
					style={{
						paddingHorizontal: 16,
						marginTop: 6,
					}}
				>
					<View
						style={{
							flexDirection: "row",
							alignItems: "center",
							marginVertical: 14,
						}}
					>
						<Text
							style={{
								fontSize: 16,
								color: COLOURS.black,
							}}
						>
							{bookDetail.title}
						</Text>
					</View>
					<View
						style={{
							flexDirection: "row",
							marginVertical: 4,
							alignItems: "center",
							justifyContent: "space-between",
						}}
					>
						<Text
							style={{
								fontSize: 12,
								fontWeight: "600",
								letterSpacing: 0.5,
								marginVertical: 4,
								color: COLOURS.black,
								maxWidth: "84%",
							}}
						>
							{bookDetail.description}
						</Text>
						{/* <Ionicons
							name="link-outline"
							style={{
								fontSize: 24,
								color: COLOURS.blue,
								backgroundColor: COLOURS.blue + 10,
								padding: 8,
								borderRadius: 100,
							}}
						/> */}
					</View>
					<Text
						style={{
							fontSize: 12,
							color: COLOURS.black,
							fontWeight: "400",
							letterSpacing: 1,
							opacity: 0.5,
							lineHeight: 20,
							maxWidth: "85%",
							maxHeight: 44,
							// marginBottom: 18,
						}}
					>
						{product.description}
					</Text>
					<View
						style={{
							flexDirection: "row",
							alignItems: "center",
							justifyContent: "space-between",
							marginVertical: 14,
							// borderBottomColor: COLOURS.backgroundLight,
							// borderBottomWidth: 1,
							// paddingBottom: 20,
						}}
					>
						<View
							style={{
								flexDirection: "row",
								width: "80%",
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
								{bookDetail.discount}%
							</Text>
						</View>
						<Text
							style={{
								fontSize: 18,
								fontWeight: "500",
								maxWidth: "85%",
								color: COLOURS.black,
								marginBottom: 4,
							}}
						>
							{bookDetail.price} 원
						</Text>
					</View>
					<View
						style={{
							flexDirection: "row",
							alignItems: "center",
							justifyContent: "space-between",
						}}
					>
						<View style={{ flexDirection: "row" }}>
							<Image
								source={commentIcons.comment_icon}
								style={{
									width: 34,
									height: 34,
									// resizeMode: "contain",
								}}
							/>
							<Text
								style={{
									fontSize: 18,
									fontWeight: "500",
									maxWidth: "85%",
									color: COLOURS.black,
									marginBottom: 4,
								}}
							>
								안녕 나 응애
							</Text>
							<MaterialCommunityIcons
								name="check-circle"
								style={{
									fontSize: 16,
									color: COLOURS.green,
								}}
							/>
							<Text
								style={{
									fontSize: 10,
									fontWeight: "500",
									maxWidth: "85%",
									color: "#919EB6",
								}}
							>
								1일전
							</Text>
						</View>
						<MaterialCommunityIcons
							name="dots-horizontal"
							style={{
								fontSize: 16,
								color: COLOURS.backgroundMedium,
							}}
						/>
					</View>
					<View>
						<Text style={{ marginLeft: "10%", marginRight: "5%" }}>
							어머 제가 있던 테이블이 제일 반응이 좋았나보네요🤭
							우짤래미님도 아시겠지만 저도 일반인 몸매 그 이상도
							이하도 아니잖아요?! 그런 제가 기꺼이 도전해봤는데
							생각보다 괜찮았어요! 오늘 중으로 라이브 리뷰
							올라온다고 하니 꼭 봐주세용~!
						</Text>

						<View
							style={{
								flexDirection: "row",
								alignItems: "center",
								marginLeft: "15%",
								// justifyContent: "space-around",
							}}
						>
							<View style={{ flexDirection: "row" }}>
								<MaterialCommunityIcons
									name="heart-outline"
									style={{
										fontSize: 16,
										color: COLOURS.backgroundMedium,
									}}
								/>
								<Text>5</Text>
							</View>
							<View
								style={{
									flexDirection: "row",
									paddingLeft: 10,
								}}
							>
								<MaterialCommunityIcons
									name="message-processing-outline"
									style={{
										fontSize: 16,
										color: COLOURS.backgroundMedium,
									}}
								/>
								<Text>5</Text>
							</View>
						</View>
					</View>

					{/* reply */}
					<View
						style={{
							flexDirection: "row",
							alignItems: "center",
							justifyContent: "space-between",
							marginLeft: "20%",
						}}
					>
						<View style={{ flexDirection: "row" }}>
							<Image
								source={commentIcons.replay_icon}
								style={{
									width: 34,
									height: 34,
									// resizeMode: "contain",
								}}
							/>
							<Text
								style={{
									fontSize: 18,
									fontWeight: "500",
									maxWidth: "85%",
									color: COLOURS.black,
									marginBottom: 4,
								}}
							>
								ㅇㅅㅇ
							</Text>
							<Text
								style={{
									fontSize: 10,
									fontWeight: "500",
									maxWidth: "85%",
									color: "#919EB6",
								}}
							>
								1일전
							</Text>
						</View>
						<MaterialCommunityIcons
							name="dots-horizontal"
							style={{
								fontSize: 16,
								color: COLOURS.backgroundMedium,
							}}
						/>
					</View>
					<View>
						<Text style={{ marginLeft: "20%", marginRight: "5%" }}>
							오 대박! 라이브 리뷰 오늘 올라온대요? 챙겨봐야겠다
						</Text>

						<View
							style={{
								flexDirection: "row",
								alignItems: "center",
								marginLeft: "25%",
								// justifyContent: "space-around",
							}}
						>
							<View
								style={{
									flexDirection: "row",
									paddingLeft: 10,
								}}
							>
								<MaterialCommunityIcons
									name="message-processing-outline"
									style={{
										fontSize: 16,
										color: COLOURS.backgroundMedium,
									}}
								/>
								<Text>5</Text>
							</View>
						</View>
					</View>
					<View
						style={{
							flexDirection: "row",
							alignItems: "center",
							justifyContent: "space-between",
							// marginLeft: 10,
							// marginRight: 10,
						}}
					>
						<View
							style={{
								flexDirection: "row",
								alignItems: "center",
							}}
						>
							<MaterialCommunityIcons
								name="image-outline"
								style={{
									fontSize: 24,
									color: COLOURS.backgroundMedium,
								}}
							/>
							<TextInput
								placeholder="댓글을 남겨주세요."
								style={{
									// width: 400,
									height: 12,
									lineHeight: 12,
								}}
							/>
						</View>
						<Button title="등록" color={COLOURS.backgroundMedium} />
					</View>
				</View>
			</ScrollView>
		</View>
	);
};

export default ProductInfo;
