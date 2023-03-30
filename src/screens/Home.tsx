import { ScrollView, StyleSheet, View } from "react-native";
import PhotoCard from "../components/PhotoCard";
import { colors } from "../styles/colors";

const images = [
  { source: require("../assets/1.png") },
  { source: require("../assets/2.png") },
  { source: require("../assets/3.png") },
  { source: require("../assets/4.png") },
  { source: require("../assets/5.png") },
];

const Home = () => {
  return (
    <View style={styles.container}>
      {images.map((img, index) => (
        <PhotoCard source={img.source} key={index} />
      ))}
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },
});
