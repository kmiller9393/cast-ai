import {
  View,
  Text,
  SafeAreaView,
  Image,
  useWindowDimensions,
  Alert,
} from "react-native";
import React, { useState } from "react";

import { images } from "../../constants";
import FormField, { KeyboardType } from "../../components/FormField";
import CastButton from "../../components/CastButton";
import { Link, router } from "expo-router";
import { createUser } from "../../lib/appwrite";

const SignUp = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // const { setUser, setIsLogged } = useGlobalContext();

  const { height } = useWindowDimensions();

  const handleSubmit = async () => {
    const { username, email, password } = form;

    if (!username || !email || !password) {
      Alert.alert("Error", "Please fill in all fields");
    }

    setIsSubmitting(true);

    try {
      const result = await createUser(email, password, username);

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
          Sign Up to CastAI
        </Text>

        <FormField
          title="Username"
          value={form.username}
          handleChangeText={(e) => setForm({ ...form, username: e })}
          containerStyles="mt-10"
        />

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
          title="Sign Up"
          handlePress={handleSubmit}
          containerStyles="mt-7"
          isLoading={isSubmitting}
        />

        <View className="flex justify-center pt-5 flex-row gap-2">
          <Text className="text-lg text-gray-100 font-pregular">
            Have an account already?
          </Text>
          <Link
            href="/sign-in"
            className="text-lg font-psemibold text-secondary"
          >
            Sign In
          </Link>
        </View>
      </View>
      {/* </ScrollView> */}
    </SafeAreaView>
  );
};

export default SignUp;
