import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { icons } from "../constants";
type Props = {
  title: string;
  placeholder: string;
  otherStyles?: string;
  keyboardType?: string;
  secureTextEntry?: boolean;
  value: string;
  onBlur: (e: string) => void;
  handleChange: (e: string) => void;
};
const FormField = ({
  title,
  handleChange,
  onBlur,
  value,
  placeholder,
  otherStyles,
  keyboardType,
}: Props) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <View className="space-y-2">
      <Text className={`text-base ${otherStyles} text-gray-100 font-pmedium`}>
        {title}
      </Text>
      <View className="w-full h-16 px-4 bg-black-200 border-black-200 border-2 rounded-2xl focus:border-secondary items-center flex-row">
        <TextInput
          value={value}
          placeholder={placeholder}
          placeholderTextColor="#7b7b8b"
          onBlur={onBlur}
          onChangeText={handleChange}
          secureTextEntry={title === "Password" && !showPassword}
          keyboardType={keyboardType}
        />
        {title === "Password" && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Image
              source={!showPassword ? icons.eye : icons.eyeHide}
              className="w-6 h-6"
              resizeMode="contain"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default FormField;
