import { useState, useEffect } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Platform,
  TouchableOpacity
} from "react-native";
import Header from "./src/components/header/Header";
import Timer from "./src/components/timer/Timer";
import { Audio } from "expo-av";

const colors = ["#F5DB5D", "#78DEF5", "#CDF55D"];

export default function App() {
  const [running, setIsRunning] = useState(false);
  const [time, setTime] = useState(25 * 60);
  const [currentTime, setCurrentTime] = useState("POMO" | "SHORT" | "LONG");
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setTime(time - 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    if (time === 0) {
      setIsActive(false);
      setIsRunning((prev) => !prev);
      setTime(running ? 300 : 1500);
    }
    return () => clearInterval(interval);
  }, [isActive, time]);

  const playSound = async () => {
    const { sound } = await Audio.Sound.createAsync(
      require("./assets/button-click.mp3")
    );
    await sound.playAsync();
  };

  const handleStartStop = () => {
    playSound();
    setIsActive(!isActive);
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors[currentTime] }]}
    >
      <View style={styles.view}>
        <Text style={styles.title}>Pomodori</Text>

        <Header
          setTime={setTime}
          currentTime={currentTime}
          setCurrentTime={setCurrentTime}
        />
        <Timer time={time} />
        <TouchableOpacity style={styles.button} onPress={handleStartStop}>
          <Text style={styles.buttonLabel}>{isActive ? "Stop" : "Start"}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  view: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? 40 : 0,
    paddingHorizontal: 15
  },
  title: {
    fontSize: 40,
    fontWeight: "700"
  },
  button: {
    backgroundColor: "#333333",
    padding: 15,
    marginTop: 15,
    borderRadius: 15,
    alignItems: "center"
  },
  buttonLabel: {
    color: "white",
    fontWeight: "bold",
    fontSize: 20
  }
});
