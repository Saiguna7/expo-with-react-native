import {
  Alert,
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { icons, images } from "../../constants";
import CustomButton from "@/components/CustomButton";
import { Link, router } from "expo-router";
import * as Yup from "yup";
import { Formik } from "formik";
import { getCurrentUser } from "@/lib/appwrite";
import { useGlobalContext } from "@/context/GlobalProvider";
const signInpschema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("enter your email"),
  password: Yup.string()
    .min(6, "passowrd must be 6 characters")
    .required("Enter Your Password"),
});

const SignIn = () => {
  const { setUser, setIsLogged } = useGlobalContext();
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setisSubmitting] = useState(false);

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="w-full justify-center min-h-[85vh] px-4 my-6">
          <Image
            source={images.logo}
            resizeMode="contain"
            className="w-[115px] h-[35px]"
          />
          <Text className="text-2xl text-semibold mt-10 font-psemibold text-white">
            Log in to Aora
          </Text>
          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={signInpschema}
            onSubmit={async (values) => {
              setisSubmitting(true);
              try {
                const result = await getCurrentUser();
                console.log(result);
                setUser(result);
                setIsLogged(true);
                router.replace("/home");
              } catch (error) {
                Alert.alert("Error", error as string);
              } finally {
                setisSubmitting(false);
              }
            }}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              touched,
            }) => (
              <>
                <View className="space-y-2">
                  <Text className={`text-base mt-7 text-gray-100 font-pmedium`}>
                    Email
                  </Text>
                  <View className="w-full h-16 px-4 bg-black-200 border-black-200 border-2 rounded-2xl focus:border-secondary items-center flex-row">
                    <TextInput
                      value={values.email}
                      placeholder="jonh@gmail.com"
                      placeholderTextColor="#7b7b8b"
                      onBlur={handleBlur("email")}
                      onChangeText={handleChange("email")}
                      keyboardType="email-address"
                      className="w-full"
                    />
                  </View>
                  {errors.email && touched.password ? (
                    <Text className="mt-2 text-red-600">{errors.email}</Text>
                  ) : null}
                  <Text className={`text-base mt-7 text-gray-100 font-pmedium`}>
                    Passowrd
                  </Text>
                  <View className="w-full h-16 px-8 bg-black-200 border-black-200 border-2 rounded-2xl focus:border-secondary items-center flex-row">
                    <TextInput
                      value={values.password}
                      placeholder="*******"
                      placeholderTextColor="#7b7b8b"
                      onBlur={handleBlur("password")}
                      onChangeText={handleChange("password")}
                      secureTextEntry={!showPassword}
                      className="w-full"
                    />
                    <TouchableOpacity
                      onPress={() => setShowPassword(!showPassword)}
                    >
                      <Image
                        source={!showPassword ? icons.eye : icons.eyeHide}
                        className="w-6 h-6"
                        resizeMode="contain"
                      />
                    </TouchableOpacity>
                  </View>
                  {errors.password && touched.password ? (
                    <Text className="mt-2 text-red-600">{errors.password}</Text>
                  ) : null}
                </View>
                <CustomButton
                  title="Sign In"
                  handlePress={handleSubmit}
                  containerStyles="mt-7"
                  textStyles=""
                  isLoading={isSubmitting}
                />
              </>
            )}
          </Formik>
          <View className=" justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-green-100 font-pregular">
              Don't have account
            </Text>
            <Link
              href="/sign-up"
              className="text-lg font-psemibold text-secondary"
            >
              Sign Up
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
