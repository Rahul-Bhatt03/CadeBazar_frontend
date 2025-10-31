import { useState } from "react";
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

const ProfilePage = () => {
  const [profile, setProfile] = useState({
    name: "",
    userName: "",
    email: "",
    phone: "",
    role:"",
    profilePic: "",
  });
  const [showPass, setShowPass] = useState("");
  const [edit, setEdit] = useState(false);

  const handleEditToggle = () => {
    setEdit(!edit);
  };
  return (
    <ScrollView>
      <TouchableOpacity>
        <Image />
      </TouchableOpacity>

      <View>
        <View>Name</View>
        <TextInput
        style={[styles.input,!edit&&styles.disabledInput]}
        value={profile.name}
        editable={edit}
        onChangeText={(text)=>setProfile({...profile,name:text})}
        />

        <View>Email</View>
        <TextInput 
          style={[styles.input,!edit&&styles.disabledInput]}
        value={profile.email}
        editable={edit}
        onChangeText={(text)=>setProfile({...profile,email:text})}
        />

         <View>Role</View>
        <TextInput 
          style={[styles.input,!edit&&styles.disabledInput]}
        value={profile.role}
        editable={edit}
        onChangeText={(text)=>setProfile({...profile,role:text})}/>

        <View>Phone Number</View>
        <TextInput />

        {!edit ? (
          <TouchableOpacity onPress={handleEditToggle}>
            <Text>Edit Profile</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity>
            <Text>Save Changes</Text>
          </TouchableOpacity>
        )}
      </View>
    </ScrollView>
  );
};

const styles=StyleSheet.create({
      container: {
    alignItems: "center",
    paddingVertical: 30,
    backgroundColor: "#fff",
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: "#ddd",
    marginBottom: 20,
  },
  infoContainer: {
    width: "85%",
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
    marginTop: 10,
    color: "#333",
  },
  input: {
    backgroundColor: "#f9f9f9",
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    fontSize: 16,
    marginTop: 5,
  },
  disabledInput: {
    backgroundColor: "#eee",
  },
  editButton: {
    marginTop: 25,
    backgroundColor: "#007BFF",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  editButtonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
});

export default ProfilePage;