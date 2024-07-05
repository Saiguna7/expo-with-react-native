import { Alert, Image, TextInput, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { icons } from "../constants";
import { router, usePathname } from "expo-router";
const SeachInput = ({ initialQuery }: any) => {
  const pathname = usePathname();
  const [query, setquery] = useState(initialQuery || "");
  return (
    <>
      <View
        className="w-full h-16 px-4 bg-black-200 border-black-200 border-2 rounded-2xl focus:border-secondary items-center flex-row
            space-x-4"
      >
        <TextInput
          value={query}
          placeholder="Search for a video topic"
          placeholderTextColor="#CDCDE0"
          onChangeText={(e) => setquery(e)}
          className="flex-1 text-white font-pregular text-base mt-0.5"
        />
        <TouchableOpacity
          onPress={() => {
            if (!query) {
              return Alert.alert(
                "Missign query",
                "Please input something to search results across database"
              );
            }
            if (pathname.startsWith("/search")) router.setParams({ query });
            else router.push(`/search/${query}`);
          }}
        >
          <Image
            source={icons.search}
            className="w-5 h-5"
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
    </>
  );
};

export default SeachInput;
