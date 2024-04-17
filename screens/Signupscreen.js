// SignUpScreen.js
import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Alert,
} from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faUser,
  faEnvelope,
  faMobileScreen,
  faUnlockKeyhole,
  faPhone,
  faLock,
} from "@fortawesome/free-solid-svg-icons";
import { auth } from "../firebaseConfig"; // Ensure the path to firebase config is correct
import { createUserWithEmailAndPassword } from "firebase/auth";

const Signup = (props) => {
  // Individual focus states for each input
  const [isFocused, setIsFocused] = useState({
    Name: false,
    Email: false,
    Phone: false,
    Password: false,
    "Confirm Password": false,
  });

  // Individual handle focus and blur functions to update focus state
  const handleFocus = (field) => setIsFocused({ ...isFocused, [field]: true });
  const handleBlur = (field) => setIsFocused({ ...isFocused, [field]: false });

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const validateEmail = (email) => {
    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.{8,})/; // At least 8 characters
    return passwordRegex.test(password);
  };

  const handleSignup = () => {
    if (!validateEmail(email)) {
      Alert.alert("Invalid Email", "Please enter a valid email address.");
      return;
    }
    if (!validatePassword(password)) {
      Alert.alert(
        "Invalid Password",
        "Password must be at least 8 characters long and include at least one letter and one number."
      );
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert("Password Mismatch", "The passwords do not match.");
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        console.log(user.email);
        Alert.alert("Signup Successful", `Welcome, ${user.email}`);
      })
      .catch((error) => {
        Alert.alert("Error", error.message);
      });
  };

  // Reusable function to create input fields
  const renderInputField = (
    value, // Current value of the input
    setValue, // Setter function from useState
    icon, // Icon for the input field
    placeholder, // Placeholder text
    secureTextEntry = false, // Whether the input is for passwords
    keyboardType = "default" // Keyboard type for the input
  ) => (
    <View
      style={[
        styles.inputContainer,
        isFocused[placeholder] ? styles.focusedContainer : null,
      ]}
    >
      <FontAwesomeIcon
        icon={icon}
        style={[
          styles.icon,
          isFocused[placeholder] ? styles.focusedIcon : null,
        ]}
      />
      <TextInput
        style={[
          styles.input,
          isFocused[placeholder] ? styles.focusedInput : null,
        ]}
        placeholder={placeholder}
        onFocus={() => handleFocus(placeholder)}
        onBlur={() => handleBlur(placeholder)}
        value={value}
        onChangeText={setValue}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        autoCapitalize="none"
      />
    </View>
  );

  return (
    <SafeAreaView style={styles.saf}>
      <Text style={styles.lets}>Let's Get Started!</Text>
      <Text style={styles.create}>
        Create an account to Q Allure to get all features
      </Text>
      {renderInputField(name, setName, faUser, "Name")}
      {renderInputField(
        email,
        setEmail,
        faEnvelope,
        "Email",
        false,
        "email-address"
      )}
      {renderInputField(phone, setPhone, faPhone, "Phone", false, "phone-pad")}
      {renderInputField(password, setPassword, faLock, "Password", true)}
      {renderInputField(
        confirmPassword,
        setConfirmPassword,
        faLock,
        "Confirm Password",
        true
      )}
      <TouchableOpacity style={styles.button} onPress={handleSignup}>
        <Text style={styles.buttontext}>CREATE</Text>
      </TouchableOpacity>
      <View style={styles.loginContainer}>
        <Text>Already have an account? </Text>
        <Text
          style={styles.logintext}
          onPress={() => props.navigation.navigate("Loginscreen")}
        >
          Log In here
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  saf: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 32,
  },

  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1.5,
    borderColor: "gray",
    paddingHorizontal: 20,
    borderRadius: 50,
    marginBottom:5,
    marginTop:5,
  },
  focusedContainer: {
    borderColor: "#0148a4", // Change the borderColor when focused
  },
  input: {
    flex: 1,
    height: 50,
    paddingLeft: 10,
    borderWidth: 0,
  },
  focusedInput: {
    borderColor: "#0148a4", // This style will not affect unless you set borderWidth on input
    borderWidth: 0,
  },
  icon: {
    color: "grey",
  },
  focusedIcon: {
    color: "#0148a4", // Change the icon color when focused
  },

  lets: {
    fontSize: 23,
    fontWeight: "800",
  },
  create: {
    color: "grey",
    marginBottom: 30,
  },
  inputView: {
    marginBottom: 10,
    marginTop: 10,
    height: 50,
    width: 290,
    justifyContent: "space-around",
    alignItems: "flex-start",
    alignContent: "center",
    flexDirection: "row",
    borderWidth: 1,
    borderRadius: 30,
    paddingLeft: 20,
    borderColor: "#0148a4",
  },
  inputicon: {
    alignSelf: "center",
    color: "#0148a4",
  },

  button: {
    backgroundColor: "#0148a4",
    height: 60,
    width: "60%",
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 60,
    marginTop: 27,
  },
  buttontext: { color: "white", fontWeight: "600", fontSize: 15 },
  logintext: {
    color: "#0148a4",
  },
  touchlogin: {
    backgroundColor: "grey",
    alignItems: "center",
    textAlign: "center",
  },
});

export default Signup;
