import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  TouchableOpacity,
  TextInput,
  Alert
} from "react-native";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faLock, faUserAlt } from "@fortawesome/free-solid-svg-icons";
import { faFacebookF, faGoogle } from "@fortawesome/free-brands-svg-icons";
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from "../firebaseConfig";

const Login = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        console.log("Logged in with:", user.email);
        // Navigate to another screen or update the state
        Alert.alert("Login Successful", `Welcome back, ${user.email}`);
      })
      .catch((error) => {
        Alert.alert("Login Error", error.message);
      });
  };

  return (
    <SafeAreaView style={css.home}>
      <Image
        style={css.homeimg}
        source={{ uri: "https://cdn.pixabay.com/photo/2016/10/24/09/41/businesswoman-1765651_960_720.png" }}
      />
      <Text style={css.heading}>Welcome back!</Text>
      <Text style={css.textlog}>
        Log in to your existing account of Q Allure
      </Text>
      <View style={css.TextInputview}>
        <FontAwesomeIcon icon={faUserAlt} style={css.textboxicon}/>
        <TextInput
          style={css.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>
      <View style={css.TextInputview}>
        <FontAwesomeIcon icon={faLock} style={css.textboxicon}/>
        <TextInput
          style={css.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={true}
          autoCapitalize="none"
        />
      </View>
      <Text style={css.forgot} onPress={() => console.log("Forgot Password Pressed")}>
        Forgot Password?
      </Text>
      <TouchableOpacity style={[css.button, css.btncolor1]} onPress={handleLogin}>
        <Text style={css.buttonText}>LOG IN</Text>
      </TouchableOpacity>
      <Text style={css.connect}>Or connect using</Text>
      <View style={css.mediaview}>
        <TouchableOpacity style={[css.mediabotton, css.mediabottoncolorf]}>
          <FontAwesomeIcon icon={faFacebookF} style={css.ssmicon} />
          <Text style={css.facebooktext}> Facebook</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[css.mediabotton, css.mediabottoncolorg]}>
          <FontAwesomeIcon icon={faGoogle} style={css.ssmicon} />
          <Text style={css.facebooktext}> Google</Text>
        </TouchableOpacity>
      </View>
      <Text>
        Don't have an account?{" "}
        <Text style={css.inputicon} onPress={() => props.navigation.navigate("Signupscreen")}>
          Sign Up
        </Text>
      </Text>
    </SafeAreaView>
  );
};

const css = StyleSheet.create({
  home: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  homeimg: {
    height: "30%",
    width: "100%",
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  textlog: {
    color: 'grey',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    height: 50,
    paddingHorizontal: 10,
  },
  textboxicon:{
    marginBottom: 15,
    marginTop: 15,
  },
  TextInputview: {
    flexDirection: 'row',
    marginBottom: 10,
    marginTop: 10,
    width: '100%',
    justifyContent: 'space-around',
    alignItems: 'flex-start',
    alignContent: 'center',
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: 30,
    paddingLeft: 20,
    borderColor: 'grey',
  },
  button: {
    height: 60,
    width: "60%",
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    backgroundColor: "#0148a4",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
  },
  connect: {
    color: "grey",
    marginTop: 20,
  },
  mediaview: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 15,
    marginBottom: 20,
  },
  mediabotton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '48%',
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#385c8e',  // Adjusted for Facebook button
  },
  mediabottoncolorg: {
    backgroundColor: '#f14336',  // Adjusted for Google button
  },
  facebooktext: {
    color: 'white',
  },
  
  inputicon: {
    color: '#0148a4',
    fontWeight: 'bold',
  },
  forgot: {
    alignSelf: 'flex-end',
    color: 'blue',
    marginBottom: 15,
  },
  ssmicon: {  // Icon style added
    color: 'white',
    fontSize: 20,
  }
});

export default Login;
