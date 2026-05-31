import { Text, View, StyleSheet } from "react-native";
import Game from "@/components/game";
import { GestureHandlerRootView } from 'react-native-gesture-handler'


export default function Index() {
  return (
    <GestureHandlerRootView>
      <Game />
    </GestureHandlerRootView>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
