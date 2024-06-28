import {
  View,
  Text,
  ScrollView,
  Image,
  useWindowDimensions,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import { images } from "../../constants";
import FormField, { KeyboardType } from "../../components/FormField";
import CastButton from "../../components/CastButton";
import { Link, router } from "expo-router";

const SignIn = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // const { setUser, setIsLogged } = useGlobalContext();

  const { height } = useWindowDimensions();

  const handleSubmit = async () => {
    if (form.email === "" || form.password === "") {
      Alert.alert("Error", "Please fill in all fields");
    }

    setIsSubmitting(true);

    try {
      // await signIn(form.email, form.password);
      // const result = await getCurrentUser();
      // setUser(result);
      // setIsLogged(true);

      Alert.alert("Success", "User signed in successfully");
      router.replace("/home");
    } catch (error: any) {
      Alert.alert("Error", error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      {/* <ScrollView> */}
      <View
        // className="w-full justify-center px-4 my-6"
        className="w-full flex justify-center h-full px-4 my-6" // TODO: fix styling to center later on w/ KeyboardAvoidingView
        style={{
          minHeight: height - 100,
        }}
      >
        <Image
          source={images.logo}
          resizeMode="contain"
          className="w-[115px] h-[34px]"
        />

        <Text className="text-2xl font-semibold text-white mt-10 font-psemibold">
          Log in to CastAI
        </Text>

        <FormField
          title="Email"
          value={form.email}
          handleChangeText={(e) => setForm({ ...form, email: e })}
          containerStyles="mt-7"
          keyboardType={KeyboardType.EmailAddress}
        />

        <FormField
          title="Password"
          value={form.password}
          handleChangeText={(e) => setForm({ ...form, password: e })}
          containerStyles="mt-7"
        />

        <CastButton
          title="Sign In"
          handlePress={handleSubmit}
          containerStyles="mt-7"
          isLoading={isSubmitting}
        />

        <View className="flex justify-center pt-5 flex-row gap-2">
          <Text className="text-lg text-gray-100 font-pregular">
            Don't have an account?
          </Text>
          <Link
            href="/sign-up"
            className="text-lg font-psemibold text-secondary"
          >
            Sign Up
          </Link>
        </View>
      </View>
      {/* </ScrollView> */}
    </SafeAreaView>
  );
};

export default SignIn;
