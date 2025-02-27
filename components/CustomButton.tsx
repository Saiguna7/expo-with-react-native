import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
type Props = {
  title: string;
  handlePress: () => void;
  containerStyles: string;
  isLoading?: boolean;
  textStyles?: string;
};
const CustomButton = ({
  title,
  handlePress,
  containerStyles,
  textStyles,
  isLoading,
}: Props) => {
  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.7}
      className={`bg-secondary rounded-xl
        min-h-[62px] justify-center items-center
        ${containerStyles}
          ${isLoading ? "opacity-50" : ""}
    `}
      disabled={isLoading}
    >
      <Text className={`text-primary font-psemibold text-lg ${textStyles}`}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
