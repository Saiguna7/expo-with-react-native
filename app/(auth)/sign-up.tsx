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
import * as Yup from "yup";
import CustomButton from "@/components/CustomButton";
import { Link, router } from "expo-router";
import { Formik } from "formik";
import { createUser } from "@/lib/appwrite";
import { useGlobalContext } from "@/context/GlobalProvider";
const signUpschema = Yup.object({
  username: Yup.string()
    .min(3, "Username must be at least 3 characters")
    .required("Enter UserName"),
  email: Yup.string().email("Invalid email").required("Enter Your Email"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Enter Your Password"),
  confirmpassword: Yup.string()
    .oneOf([Yup.ref("password"), undefined], "Passwords must match")
    .required("Required"),
});
const SignUp = () => {
  const [isSubmitting, setisSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showCPassword, setShowCPassword] = useState(false);
  const { setUser, setIsLogged } = useGlobalContext();
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
            initialValues={{
              email: "",
              password: "",
              confirmpassword: "",
              username: "",
            }}
            validationSchema={signUpschema}
            onSubmit={async (values) => {
              setisSubmitting(true);
              try {
                const result = await createUser(values);
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
              handleBlur,
              handleChange,
              handleSubmit,
              values,
              errors,
              touched,
            }) => (
              <>
                <View className="space-y-2">
                  <Text className={`text-base mt-7 text-gray-100 font-pmedium`}>
                    User Name
                  </Text>
                  <View className="w-full h-16 px-4 bg-black-200 border-black-200 border-2 rounded-2xl focus:border-secondary items-center flex-row">
                    <TextInput
                      value={values.username}
                      placeholder="John"
                      placeholderTextColor="#7b7b8b"
                      onBlur={handleBlur("username")}
                      onChangeText={handleChange("username")}
                      className="w-full"
                    />
                  </View>
                  {errors.username && touched.username ? (
                    <Text className="mt-2 text-red-600">{errors.username}</Text>
                  ) : null}
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
                  {errors.email && touched.email ? (
                    <Text className="mt-2 text-red-600">{errors.email}</Text>
                  ) : null}
                  <Text className={`text-base mt-7 text-gray-100 font-pmedium`}>
                    Password
                  </Text>
                  <View className="w-full h-16 px-8 bg-black-200 border-black-200 border-2 rounded-2xl focus:border-secondary items-center flex-row">
                    <TextInput
                      value={values.password}
                      placeholder="***********"
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
                  <Text className={`text-base mt-7 text-gray-100 font-pmedium`}>
                    Comfirm Passowrd
                  </Text>
                  <View className="w-full h-16 px-8 bg-black-200 border-black-200 border-2 rounded-2xl focus:border-secondary items-center flex-row">
                    <TextInput
                      value={values.confirmpassword}
                      placeholder="***********"
                      placeholderTextColor="#7b7b8b"
                      onBlur={handleBlur("confirmpassword")}
                      onChangeText={handleChange("confirmpassword")}
                      secureTextEntry={!showCPassword}
                      className="w-full"
                    />
                    <TouchableOpacity
                      onPress={() => setShowCPassword(!showCPassword)}
                    >
                      <Image
                        source={!showCPassword ? icons.eye : icons.eyeHide}
                        className="w-6 h-6"
                        resizeMode="contain"
                      />
                    </TouchableOpacity>
                  </View>
                  {errors.confirmpassword && touched.confirmpassword ? (
                    <Text className="mt-2 text-red-600">
                      {errors.confirmpassword}
                    </Text>
                  ) : null}
                </View>
                <CustomButton
                  title="Sign Up"
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
              Already Sign Up
            </Text>
            <Link
              href="/sign-in"
              className="text-lg font-psemibold text-secondary"
            >
              Sign In
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
