import React, { useState } from "react";
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Alert, TextInput } from "react-native";
import { useRouter } from "expo-router";

const exercisesList = [
  "Squat",
  "Jumping Jacks",
  "Push Ups",
  "Lunges",
  "Burpee",
  "Crunches",
  "Leg Circles",
  "Leg Scissors",
];

export default function SessionScreen() {
  const router = useRouter();
  const [selectedExercises, setSelectedExercises] = useState<string[]>([]);
  const [exerciseDetails, setExerciseDetails] = useState<{ [key: string]: { series: string; movements: string } }>({});

  const toggleExercise = (exercise: string) => {
    setSelectedExercises((prev) =>
      prev.includes(exercise) ? prev.filter((ex) => ex !== exercise) : [...prev, exercise]
    );
  };

  const handleInputChange = (exercise: string, field: "series" | "movements", value: string) => {
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
      if (!exerciseDetails[exercise]?.series || !exerciseDetails[exercise]?.movements) {
        Alert.alert("Erreur", `Veuillez entrer les détails pour ${exercise}.`);
        return;
      }
    }

    Alert.alert("Succès", "Exercices validés, début de la session !");
    router.push("/start-session"); 
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sélectionnez vos exercices :</Text>
      <FlatList
        data={exercisesList}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.exerciseButton, selectedExercises.includes(item) && styles.selectedExercise]}
            onPress={() => toggleExercise(item)}
          >
            <Text style={styles.exerciseText}>{item}</Text>
          </TouchableOpacity>
        )}
      />
      
      {selectedExercises.length > 0 && (
        <View style={styles.detailsContainer}>
          <Text style={styles.subtitle}>Entrez le nombre de séries et de mouvements :</Text>
          {selectedExercises.map((exercise) => (
            <View key={exercise} style={styles.inputContainer}>
              <Text style={styles.exerciseLabel}>{exercise}</Text>
              <TextInput
                style={styles.input}
                placeholder="Séries"
                keyboardType="numeric"
                value={exerciseDetails[exercise]?.series || ""}
                onChangeText={(text) => handleInputChange(exercise, "series", text)}
              />
              <TextInput
                style={styles.input}
                placeholder="Mouvements"
                keyboardType="numeric"
                value={exerciseDetails[exercise]?.movements || ""}
                onChangeText={(text) => handleInputChange(exercise, "movements", text)}
              />
            </View>
          ))}
        </View>
      )}

      {selectedExercises.length > 0 && (
        <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
          <Text style={styles.nextButtonText}>Suivant</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  title: { fontSize: 22, fontWeight: "bold", textAlign: "center", marginBottom: 20 },
  exerciseButton: { padding: 15, backgroundColor: "#ddd", marginVertical: 5, borderRadius: 8, alignItems: "center" },
  selectedExercise: { backgroundColor: "#4B0082" },
  exerciseText: { fontSize: 18, color: "#000" },
  detailsContainer: { marginTop: 20 },
  subtitle: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
  inputContainer: { flexDirection: "row", alignItems: "center", marginBottom: 10 },
  exerciseLabel: { flex: 1, fontSize: 16 },
  input: { borderWidth: 1, borderColor: "#ccc", padding: 10, width: 80, textAlign: "center", borderRadius: 5 },
  nextButton: { marginTop: 20, backgroundColor: "darkviolet", padding: 15, borderRadius: 10, alignItems: "center" },
  nextButtonText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
});

