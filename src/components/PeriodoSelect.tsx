import React, { useRef, useEffect, useState, use } from "react";
import { View, Text, TouchableOpacity, Animated } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Calendar } from "react-native-calendars";
import dayjs from "dayjs";

type Props = {
  showPeriodo: boolean;
  handleShowPeriodo: () => void;
  setPeriodo: (value: { startDate?: string; endDate?: string }) => void;
  periodo: { startDate?: string; endDate?: string };
};

export default function PeriodoSelect({
  showPeriodo,
  handleShowPeriodo,
  setPeriodo,
  periodo,
}: Props) {
  const slideAnim = useRef(new Animated.Value(0)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  const [selectedRange, setSelectedRange] = useState<{
    startDate?: string;
    endDate?: string;
  }>({});

  useEffect(() => {
    if (showPeriodo) {
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [showPeriodo]);

  const handleDayPress = (day: any) => {
    const { dateString } = day;

    if (
      !selectedRange.startDate ||
      (selectedRange.startDate && selectedRange.endDate)
    ) {
      setSelectedRange({ startDate: dateString, endDate: undefined });
    } else if (selectedRange.startDate && !selectedRange.endDate) {
      const start = new Date(selectedRange.startDate);
      const end = new Date(dateString);

      if (end < start) {
        setSelectedRange({
          startDate: dateString,
          endDate: selectedRange.startDate,
        });
      } else {
        setSelectedRange({ ...selectedRange, endDate: dateString });
      }
    }
  };

  const getMarkedDates = () => {
    const marked: any = {};

    if (selectedRange.startDate) {
      marked[selectedRange.startDate] = {
        startingDay: true,
        color: "#4CAF50",
        textColor: "white",
      };
    }

    if (selectedRange.endDate) {
      marked[selectedRange.endDate] = {
        endingDay: true,
        color: "#4CAF50",
        textColor: "white",
      };

      let start = new Date(selectedRange.startDate!);
      let end = new Date(selectedRange.endDate);
      let current = new Date(start);

      while (current < end) {
        const dateString = current.toISOString().split("T")[0];
        if (
          dateString !== selectedRange.startDate &&
          dateString !== selectedRange.endDate
        ) {
          marked[dateString] = { color: "#A5D6A7", textColor: "white" };
        }
        current.setDate(current.getDate() + 1);
      }
    }

    return marked;
  };

  // Atualiza o período no componente pai
  useEffect(() => {
    setPeriodo(selectedRange);
  }, [selectedRange]);

  const animatedStyle = {
    transform: [
      {
        translateY: slideAnim.interpolate({
          inputRange: [0, 1],
          outputRange: [-20, 0],
        }),
      },
    ],
    opacity: opacityAnim,
  };

  const startDate = dayjs(selectedRange.startDate).format("DD/MM/YYYY");
  const endDate = dayjs(selectedRange.endDate).format("DD/MM/YYYY");

  const resumoPeriodo =
    startDate && endDate ? `${startDate} até ${endDate}` : "Selecionar";

  useEffect(() => {
    setSelectedRange({});
  }, [selectedRange]);

  console.log(selectedRange);
  console.log(resumoPeriodo);

  return (
    <View style={{ gap: 10 }}>
      <Text style={{ fontSize: 18 }}>Período</Text>

      <TouchableOpacity
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          padding: 10,
          backgroundColor: "#eee",
          borderRadius: 8,
        }}
        onPress={handleShowPeriodo}
      >
        <Text>{resumoPeriodo}</Text>
        <MaterialIcons
          name={showPeriodo ? "arrow-drop-up" : "arrow-drop-down"}
          size={24}
          color="black"
        />
      </TouchableOpacity>

      {showPeriodo && (
        <Animated.View style={[animatedStyle]}>
          <Calendar
            onDayPress={handleDayPress}
            markingType="period"
            markedDates={getMarkedDates()}
            theme={{
              todayTextColor: "#009688",
              arrowColor: "#009688",
            }}
          />
          <TouchableOpacity
            onPress={() => {
              setPeriodo(selectedRange);
            }}
          >
            <Text>Aplicar</Text>
          </TouchableOpacity>
        </Animated.View>
      )}
    </View>
  );
}
