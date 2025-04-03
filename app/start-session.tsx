import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

export default function StartSessionScreen() {
    const router = useRouter();

    const [currentExercise, setCurrentExercise] = useState("Squat");
    const [totalRepetitions, setTotalRepetitions] = useState(15);
    const [currentRepetition, setCurrentRepetition] = useState(1);
    const [totalSeries, setTotalSeries] = useState(2);
    const [currentSeries, setCurrentSeries] = useState(1);

    const [movementTime, setMovementTime] = useState(10);
    const [pauseTime, setPauseTime] = useState(5); 

    const [timeLeft, setTimeLeft] = useState(movementTime);
    const [isPaused, setIsPaused] = useState(false);
    const [isRunning, setIsRunning] = useState(false);

    useEffect(() => {
        let timer: NodeJS.Timeout | null = null;

        if (isRunning) {
            timer = setInterval(() => {
                setTimeLeft((prev) => {
                    if (prev > 0) {
                        return prev - 1;
                    } else {
                        clearInterval(timer!);
                        handleNextStep();
                        return 0;
                    }
                });
            }, 1000);
        }

        return () => clearInterval(timer!);
    }, [isRunning, timeLeft]);

    const handleNextStep = () => {
        if (isPaused) {
            if (currentRepetition < totalRepetitions) {
                setCurrentRepetition(currentRepetition + 1);
                setTimeLeft(movementTime);
                setIsPaused(false);
                setIsRunning(true);
            } else if (currentSeries < totalSeries) {
                setCurrentSeries(currentSeries + 1);
                setCurrentRepetition(1);
                setTimeLeft(movementTime);
                setIsPaused(false);
                setIsRunning(true);
            } else {
                alert("Session terminée !");
                router.push("/session-recap");
              }
        } else {
            setTimeLeft(pauseTime);
            setIsPaused(true);
            setIsRunning(true);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.mainTitle}>EDUFITNESS</Text>

            <Text style={styles.exerciseText}>Exercice en cours :</Text>
            <Text style={styles.exerciseName}>{currentExercise}</Text>

            <Text style={styles.repetitionsText}>
                Répétitions : {currentRepetition}/{totalRepetitions}
            </Text>

            <View style={styles.timerContainer}>
                <Text style={styles.timerText}>
                    {String(Math.floor(timeLeft / 60)).padStart(2, "0")}:
                    {String(timeLeft % 60).padStart(2, "0")}
                </Text>
                {isPaused && <Text style={styles.pauseText}>PAUSE</Text>}
            </View>

            <Text style={styles.seriesText}>
                Séries : {currentSeries}/{totalSeries}
            </Text>

            <TouchableOpacity
                style={styles.startButton}
                onPress={() => setIsRunning(true)}
            >
                <Text style={styles.startButtonText}>
                    {isRunning ? "En cours..." : "Commencer"}
                </Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#fff", alignItems: "center", justifyContent: "center", padding: 20 },

    mainTitle: { fontSize: 28, fontWeight: "bold", color: "orange", textAlign: "center", marginBottom: 20 },

    exerciseText: { fontSize: 20, fontWeight: "bold", color: "#4B0082" },
    exerciseName: { fontSize: 24, fontWeight: "bold", color: "black", marginBottom: 10 },

    repetitionsText: { fontSize: 18, color: "#333", marginBottom: 10 },

    timerContainer: {
        backgroundColor: "#D8BFD8",
        padding: 20,
        borderRadius: 10,
        alignItems: "center",
        marginBottom: 10,
    },
    timerText: { fontSize: 36, fontWeight: "bold", color: "black" },
    pauseText: { fontSize: 18, color: "red", marginTop: 5, fontWeight: "bold" },

    seriesText: { fontSize: 18, color: "#333", marginBottom: 20 },

    startButton: {
        backgroundColor: "darkviolet",
        padding: 15,
        borderRadius: 10,
        alignItems: "center",
        width: "100%",
    },
    startButtonText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
});

