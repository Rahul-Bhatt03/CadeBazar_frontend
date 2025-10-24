import { Image } from "expo-image";
import {
  Platform,
  StatusBar,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { View, Text } from "react-native";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <StatusBar barStyle={"light-content"} />

      {/* headers */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Good Morning ☕</Text>
          <Text style={styles.subtitle}>Welcome to CafeBazar</Text>
        </View>
        <TouchableOpacity style={styles.profileButton}>
          <Text style={styles.profileText}>👤</Text>
        </TouchableOpacity>
      </View>

      {/* categories */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Categories</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.categoriesContainer}
        >
          <TouchableOpacity
            style={[styles.categoryCard, styles.categoryActive]}
          >
            <Text style={styles.categoryIcon}>☕</Text>
            <Text style={styles.categoryTextActive}>Coffee</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.categoryCard}>
            <Text style={styles.categoryIcon}>🍰</Text>
            <Text style={styles.categoryText}>Desserts</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.categoryCard}>
            <Text style={styles.categoryIcon}>🥪</Text>
            <Text style={styles.categoryText}>Snacks</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.categoryCard}>
            <Text style={styles.categoryIcon}>🧃</Text>
            <Text style={styles.categoryText}>Drinks</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: Platform.OS === "ios" ? 60 : 40,
    paddingBottom: 20,
    backgroundColor: "#1e40af",
  },
  greeting: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: "#e0e7ff",
  },
  profileButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#3b82f6",
    justifyContent: "center",
    alignItems: "center",
  },
  profileText: {
    fontSize: 20,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginTop: 20,
    marginBottom: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  searchIcon: {
    fontSize: 18,
    marginRight: 12,
  },
  searchPlaceholder: {
    fontSize: 15,
    color: "#9ca3af",
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1f2937",
  },
  seeAll: {
    fontSize: 14,
    color: "#1e40af",
    fontWeight: "600",
  },
  categoriesContainer: {
    marginTop: 16,
  },
  categoryCard: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    paddingHorizontal: 20,
    paddingVertical: 16,
    marginRight: 12,
    alignItems: "center",
    justifyContent: "center",
    minWidth: 100,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  categoryActive: {
    backgroundColor: "#1e40af",
  },
  categoryIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  categoryText: {
    fontSize: 14,
    color: "#4b5563",
    fontWeight: "600",
  },
  categoryTextActive: {
    fontSize: 14,
    color: "#ffffff",
    fontWeight: "600",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  productCard: {
    width: "48%",
    backgroundColor: "#ffffff",
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
    overflow: "hidden",
  },
  imageContainer: {
    position: "relative",
  },
  imagePlaceholder: {
    width: "100%",
    height: 140,
    backgroundColor: "#fef3c7",
    justifyContent: "center",
    alignItems: "center",
  },
  placeholderEmoji: {
    fontSize: 56,
  },
  badge: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  badgeText: {
    color: "#ffffff",
    fontSize: 12,
    fontWeight: "600",
  },
  productInfo: {
    padding: 12,
  },
  productName: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1f2937",
    marginBottom: 4,
  },
  productDescription: {
    fontSize: 12,
    color: "#6b7280",
    marginBottom: 12,
  },
  priceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  price: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1e40af",
  },
  addButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#1e40af",
    justifyContent: "center",
    alignItems: "center",
  },
  addButtonText: {
    color: "#ffffff",
    fontSize: 20,
    fontWeight: "600",
  },
});
