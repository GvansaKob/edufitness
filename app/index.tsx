import { View, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

export default function HomeScreen() {
  const router = useRouter();

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#fff" }}>
      <Text style={{ fontSize: 50, fontWeight: "bold", color: "orange" }}>EDUFITNESS</Text>
      <TouchableOpacity
        onPress={() => router.push("/session")}
        style={{
          marginTop: 20,
          backgroundColor: "darkviolet",
          padding: 15,
          borderRadius: 10,
        }}
      >
        <Text style={{ color: "white", fontSize: 18 }}>Commencer ma session</Text>
      </TouchableOpacity>
    </View>
  );
}
