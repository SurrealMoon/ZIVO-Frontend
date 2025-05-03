import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Alert,
  Image,
} from "react-native";
import { useTheme } from "@/context/ThemeContext";
import { useTranslation } from "react-i18next";
import { useRouter } from "expo-router";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const { theme } = useTheme();
  const { t } = useTranslation();
  const router = useRouter();

  // Giriş işlemi için işlev
  const handleAuth = () => {
    if (isLogin) {
      if (email === "test@example.com" && password === "123") {
        Alert.alert(t("Login Successful"), t("Welcome back!"));
        router.replace("/(user)/(tabs)");
      } else {
        Alert.alert(t("Error"), t("Invalid email or password."));
      }
    } else {
      if (email && password && name) {
        Alert.alert(t("Registration Successful"), t("You can now log in."));
        setIsLogin(true); // Giriş ekranına dön
      } else {
        Alert.alert(t("Error"), t("Please fill in all fields."));
      }
    }
  };

  return (
    <ImageBackground
      source={{
        uri: "https://i.pinimg.com/736x/6b/66/ab/6b66ab351898299b06beebf73aa1a726.jpg",
      }}
      style={styles.background}
      blurRadius={2}
    >
           <View className="items-center mb-8">
        <Image
          source={require('../../assets/images/zivo (2).png')}
          style={{
            width: 120,
            height: 70,
           
            marginBottom:25,
            alignSelf: 'center', 
          }}
        />
      </View>
      <View style={[styles.container, { backgroundColor: theme.cardBackground }]}>
        <View style={styles.card}>
          <Text style={[styles.title, { color: theme.text }]}>
            {isLogin ? t("Login") : t("Register")}
          </Text>
          <View style={styles.form}>
            {!isLogin && (
              <View style={styles.inputContainer}>
                <Text style={[styles.label, { color: theme.text }]}>
                  {t("Name")}
                </Text>
                <TextInput
                  style={[styles.input, { borderColor: theme.border }]}
                  placeholder={t("Enter your name")}
                  placeholderTextColor={theme.placeholder}
                  value={name}
                  onChangeText={setName}
                />
              </View>
            )}
            <View style={styles.inputContainer}>
              <Text style={[styles.label, { color: theme.text }]}>
                {t("Email")}
              </Text>
              <TextInput
                style={[styles.input, { borderColor: theme.border }]}
                placeholder={t("Enter your email")}
                placeholderTextColor={theme.placeholder}
                keyboardType="email-address"
                value={email}
                onChangeText={setEmail}
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={[styles.label, { color: theme.text }]}>
                {t("Password")}
              </Text>
              <TextInput
                style={[styles.input, { borderColor: theme.border }]}
                placeholder={t("Enter your password")}
                placeholderTextColor={theme.placeholder}
                secureTextEntry
                value={password}
                onChangeText={setPassword}
              />
            </View>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: theme.buttonBackground }]}
              onPress={handleAuth}
            >
              <Text style={[styles.buttonText, { color: theme.buttonText }]}>
                {isLogin ? t("Login") : t("Register")}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.dividerContainer}>
            <Text style={[styles.dividerText, { color: theme.text }]}>
              {t("Or")}
            </Text>
          </View>
          <View style={styles.socialButtons}>
            <TouchableOpacity
              style={[styles.socialButton, { borderColor: "#dcdcdc", backgroundColor: "white" }]}
            >
              <Image
                source={{
                  uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/1024px-Google_%22G%22_logo.svg.png",
                }}
                style={styles.socialIcon}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.socialButton, { borderColor: "#dcdcdc", backgroundColor: "white" }]}
            >
              <Image
                source={{
                  uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/2023_Facebook_icon.svg/768px-2023_Facebook_icon.svg.png",
                }}
                style={styles.socialIcon}
              />
            </TouchableOpacity>
          </View>
          <Text style={[styles.switchText, { color: theme.text }]}>
            {isLogin ? (
              <>
                {t("Don’t have an account?")}{" "}
                <Text
                  onPress={() => setIsLogin(false)}
                  style={styles.linkText}
                >
                  {t("Register")}
                </Text>
              </>
            ) : (
              <>
                {t("Already have an account?")}{" "}
                <Text
                  onPress={() => setIsLogin(true)}
                  style={styles.linkText}
                >
                  {t("Login")}
                </Text>
              </>
            )}
          </Text>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    width: "90%",
    borderRadius: 20,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 4.65,
    elevation: 8,
  },
  card: {
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  form: {
    width: "100%",
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    fontSize: 16,
  },
  button: {
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  dividerContainer: {
    marginVertical: 20,
    alignItems: "center",
  },
  dividerText: {
    fontSize: 16,
  },
  socialButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
  socialButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderRadius: 10,
    width: "48%",
    justifyContent: "center",
    borderWidth: 1,
  },
  socialIcon: {
    width: 24,
    height: 24,
  },
  switchText: {
    marginTop: 20,
    fontSize: 14,
  },
  linkText: {
    color: "#f1c338",
    fontWeight: "bold",
  },
});

export default AuthPage;
