import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import { StyleSheet, View, Alert } from "react-native";
import { Button, Input } from "react-native-elements";

export default function ProfileScreen({ session }) {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [household, setHousehold] = useState("");
  const user = supabase.auth.user;

  useEffect(() => {
    if (session) getProfile();
  }, [session]);

  async function getProfile() {
    try {
      setLoading(true);
      const user = supabase.auth.user();
      if (!user) throw new Error("No user on the session!");

      let { data, error, status } = await supabase
        .from("profiles")
        .select(`name, household`)
        .eq("id", user.id)
        .single();
      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setName(data.name);
        setHousehold(data.household);
      }
    } catch (error) {
      Alert.alert((error).message);
    } finally {
      setLoading(false);
    }
  }

  async function updateProfile({
    name,
    household,
  }) {
    try {
      setLoading(true);
      const user = supabase.auth.user();
      if (!user) throw new Error("No user on the session!");

      const updates = {
        id: user.id,
        name,
        household,
        updated_at: new Date(),
      };

      let { error } = await supabase
        .from("profiles")
        .upsert(updates, { returning: "minimal" });

      if (error) {
        throw error;
      }
    } catch (error) {
      Alert.alert((error).message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style ={styles.container}>
      <View style={styles.verticallySpaced}>
        <Input
          label="Name"
          value={name || ""}
          onChangeText={(text) => setName(text)}
        />
      </View>
      <View style={styles.verticallySpaced}>
        <Input
          label="Household"
          value={household || user.id}
          onChangeText={(text) => setHousehold(text)}
        />
      </View>

      <View style={[styles.verticallySpaced, styles.mt20]}>
        <Button
          title={loading ? "Loading ..." : "Update"}
          onPress={() => updateProfile({ name, household })}
          disabled={loading}
          color="darkseagreen"
        />
      </View>

      <View style={styles.verticallySpaced}>
        <Button title="Sign Out" onPress={() => supabase.auth.signOut()} color="darkseagreen" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 40,
  },
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: "stretch",
  },
  mt20: {
    marginTop: 20,
  },
  buttons: {
    marginTop: 15,
    marginBottom: 15,
  }
});