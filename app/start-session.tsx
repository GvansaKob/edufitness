import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

export default function StartSessionScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Session en cours !</Text>
      <Text style={styles.subtitle}>Ici, nous ajouterons le chronomètre et le suivi des répétitions.</Text>
      
      <TouchableOpacity style={styles.backButton} onPress={() => router.push("/session")}>
        <Text style={styles.backButtonText}>Retour</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#fff" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 10 },
  subtitle: { fontSize: 18, color: "gray", textAlign: "center", marginBottom: 20 },
  backButton: { backgroundColor: "darkviolet", padding: 15, borderRadius: 10 },
  backButtonText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
});
