import React, { useState } from "react";
import {
    View, Text, TouchableOpacity, FlatList, StyleSheet, Alert, TextInput, KeyboardAvoidingView, Platform
} from "react-native";
import { useRouter } from "expo-router";

const exercisesList = [
    "Squat", "Burpee", "Push Ups",
    "Lunges", "Crunches", "Leg Circles", 
    "Jumping Jacks", "Double Leg Kick", "Leg Scissors"
];

export default function SessionScreen() {
    const router = useRouter();
    const [selectedExercises, setSelectedExercises] = useState<string[]>([]);
    const [exerciseDetails, setExerciseDetails] = useState<{ 
        [key: string]: { series: string; movements: string; timePerMovement: string; restTime: string } 
    }>({});

    const toggleExercise = (exercise: string) => {
        setSelectedExercises((prev) =>
            prev.includes(exercise) ? prev.filter((ex) => ex !== exercise) : [...prev, exercise]
        );
    };

    const handleInputChange = (exercise: string, field: "series" | "movements" | "timePerMovement" | "restTime", value: string) => {
        setExerciseDetails((prev) => ({
            ...prev,
            [exercise]: { ...prev[exercise], [field]: value },
        }));
    };

    const handleNext = () => {
        if (selectedExercises.length === 0) {
            Alert.alert("Erreur", "Veuillez sélectionner au moins un exercice.");
            return;
        }

        for (const exercise of selectedExercises) {
            if (!exerciseDetails[exercise]?.series || !exerciseDetails[exercise]?.movements || 
                !exerciseDetails[exercise]?.timePerMovement || !exerciseDetails[exercise]?.restTime) {
                Alert.alert("Erreur", `Veuillez remplir tous les champs pour ${exercise}.`);
                return;
            }
        }

        Alert.alert("Succès", "Exercices validés, début de la session !");
        router.push("/start-session");
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}
        >
            <Text style={styles.mainTitle}>EDUFITNESS</Text>

            <Text style={styles.sectionTitle}>Sélectionnez vos exercices :</Text>
            <FlatList
                data={exercisesList}
                keyExtractor={(item) => item}
                numColumns={3}
                contentContainerStyle={styles.exerciseContainer}
                columnWrapperStyle={{ justifyContent: "space-between" }}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={[
                            styles.exerciseButton,
                            selectedExercises.includes(item) && styles.selectedExercise
                        ]}
                        onPress={() => toggleExercise(item)}
                    >
                        <Text
                            style={[
                                styles.exerciseText,
                                selectedExercises.includes(item) && styles.selectedText
                            ]}
                        >
                            {item}
                        </Text>
                    </TouchableOpacity>
                )}
            />

            {selectedExercises.length > 0 && (
                <FlatList
                    data={selectedExercises}
                    keyExtractor={(item) => item}
                    contentContainerStyle={styles.detailsContainer}
                    nestedScrollEnabled={true}
                    renderItem={({ item: exercise }) => (
                        <View key={exercise} style={styles.exerciseBlock}>
                            <Text style={styles.exerciseLabel}>{exercise}</Text>

                            <View style={styles.inputRow}>
                                <View style={styles.inputGroup}>
                                    <Text style={styles.inputLabel}>Séries :</Text>
                                    <TextInput
                                        style={styles.input}
                                        keyboardType="numeric"
                                        value={exerciseDetails[exercise]?.series || ""}
                                        onChangeText={(text) => handleInputChange(exercise, "series", text)}
                                    />
                                </View>

                                <View style={styles.inputGroup}>
                                    <Text style={styles.inputLabel}>Mouvements :</Text>
                                    <TextInput
                                        style={styles.input}
                                        keyboardType="numeric"
                                        value={exerciseDetails[exercise]?.movements || ""}
                                        onChangeText={(text) => handleInputChange(exercise, "movements", text)}
                                    />
                                </View>
                            </View>

                            <View style={styles.inputRow}>
                                <View style={styles.inputGroup}>
                                    <Text style={styles.inputLabel}>Temps/mouvement (s) :</Text>
                                    <TextInput
                                        style={styles.input}
                                        keyboardType="numeric"
                                        value={exerciseDetails[exercise]?.timePerMovement || ""}
                                        onChangeText={(text) => handleInputChange(exercise, "timePerMovement", text)}
                                    />
                                </View>

                                <View style={styles.inputGroup}>
                                    <Text style={styles.inputLabel}>Temps de pause (s) :</Text>
                                    <TextInput
                                        style={styles.input}
                                        keyboardType="numeric"
                                        value={exerciseDetails[exercise]?.restTime || ""}
                                        onChangeText={(text) => handleInputChange(exercise, "restTime", text)}
                                    />
                                </View>
                            </View>
                        </View>
                    )}
                />
            )}

            {selectedExercises.length > 0 && (
                <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
                    <Text style={styles.nextButtonText}>Suivant</Text>
                </TouchableOpacity>
            )}
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#fff", padding: 20 },

    mainTitle: { fontSize: 28, fontWeight: "bold", color: "orange", textAlign: "center", marginBottom: 20 },
    sectionTitle: { fontSize: 20, fontWeight: "bold", color: "#4B0082", marginBottom: 10 },

    exerciseContainer: { width: "100%" },

    exerciseButton: {
        width: "30%",
        backgroundColor: "#D8BFD8",
        paddingVertical: 15,
        marginVertical: 8,
        borderRadius: 8,
        alignItems: "center",
    },
    selectedExercise: { backgroundColor: "orange" },
    exerciseText: { fontSize: 16, color: "black", textAlign: "center" },
    selectedText: { color: "white" },

    detailsContainer: { marginTop: 20, width: "100%" },

    exerciseBlock: { marginBottom: 15, width: "100%" },

    exerciseLabel: { fontSize: 18, fontWeight: "bold", marginBottom: 8 },

    inputRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 10 },

    inputGroup: { width: "48%" },

    inputLabel: { fontSize: 14, color: "#555", marginBottom: 5 },

    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        padding: 10,
        borderRadius: 5,
        backgroundColor: "#fff",
        textAlign: "center"
    },

    nextButton: {
        marginTop: 20, backgroundColor: "darkviolet", padding: 15,
        borderRadius: 10, alignItems: "center", width: "100%"
    },
    nextButtonText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
});
