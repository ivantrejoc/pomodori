import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const Header = ({ setTime, currentTime, setCurrentTime }) => {
  const buttons = ["Pomodoro", "Short Break", "Long Break"];

  const handlePress = (index) => () => {
    const newTime = index === 0 ? 25 : index === 1 ? 5 : 15;
    setCurrentTime(index);
    setTime(newTime * 60);
  };

  return (
    <View style={styles.view}>
      {buttons.map((button, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.button,
            currentTime !== index && { borderColor: "transparent" }
          ]}
          onPress={handlePress(index)}
        >
          <Text style={styles.text}>{button}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  view: {
    flexDirection: "row"
  },
  button: {
    width: "33.33%",
    borderWidth: 3,
    borderColor: "white",
    borderRadius: 10,
    marginVertical: 20,
    padding: 5,
    alignItems: "center"
  },
  text:{
    fontSize: 16,
    fontWeight: "700"
  }
});
