import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

export default function SessionRecapScreen() {
    const router = useRouter();

    return (
        <View style={styles.container}>
            <Text style={styles.mainTitle}>EDUFITNESS</Text>
            <Text style={styles.text}>Félicitations, votre session est terminée ! 🎉</Text>

            <TouchableOpacity
                style={styles.button}
                onPress={() => router.push("/")}
            >
                <Text style={styles.buttonText}>Retour à l'accueil</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#fff", padding: 20 },
    mainTitle: { fontSize: 28, fontWeight: "bold", color: "orange", marginBottom: 20 },
    text: { fontSize: 18, textAlign: "center", marginBottom: 20 },
    button: { backgroundColor: "darkviolet", padding: 15, borderRadius: 10 },
    buttonText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
});
