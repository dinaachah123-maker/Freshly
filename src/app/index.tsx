import { useState } from 'react';
import {
  FlatList,
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const PRODUCTS = [
  { id: '1', name: 'Pommes Rouges Bio', price: 15.0, category: 'Fruits', image: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=200' },
  { id: '2', name: 'Bananes Douces', price: 12.0, category: 'Fruits', image: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=200' },
  { id: '3', name: 'Lait Frais 1L', price: 9.5, category: 'Laiterie', image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=200' },
  { id: '4', name: 'Pain Artisanal', price: 5.0, category: 'Boulangerie', image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=200' },
  { id: '5', name: 'Jus d’Orange Pur', price: 18.0, category: 'Boissons', image: 'https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=200' },
];

export default function FreshlyHomeScreen() {
  const [cart, setCart] = useState<{ [key: string]: number }>({});

  const addToCart = (id: string) => {
    setCart((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => {
      const updated = { ...prev };
      if (updated[id] > 1) {
        updated[id] -= 1;
      } else {
        delete updated[id];
      }
      return updated;
    });
  };

  const getTotalItems = () => Object.values(cart).reduce((a, b) => a + b, 0);

  const getTotalPrice = () => {
    return Object.entries(cart)
      .reduce((sum, [id, qty]) => {
        const item = PRODUCTS.find((p) => p.id === id);
        return sum + (item ? item.price * qty : 0);
      }, 0)
      .toFixed(2);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#13085E" />
      
      {/* En-tête aux couleurs de la marque (Bleu Nuit & Orange) */}
      <View style={styles.header}>
        <Text style={styles.logoText}>⚡ FRESHLY</Text>
        <Text style={styles.slogan}>Vos courses en un clic, livrées en un éclair.</Text>
      </View>

      {/* Liste des produits */}
      <FlatList
        data={PRODUCTS}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item }) => {
          const quantity = cart[item.id] || 0;
          return (
            <View style={styles.productCard}>
              <Image source={{ uri: item.image }} style={styles.productImage} />
              <View style={styles.productInfo}>
                <Text style={styles.category}>{item.category}</Text>
                <Text style={styles.productName}>{item.name}</Text>
                <Text style={styles.productPrice}>{item.price.toFixed(2)} DH</Text>
              </View>

              <View style={styles.actionContainer}>
                {quantity > 0 ? (
                  <View style={styles.counterRow}>
                    <TouchableOpacity onPress={() => removeFromCart(item.id)} style={styles.btnSmall}>
                      <Text style={styles.btnText}>-</Text>
                    </TouchableOpacity>
                    <Text style={styles.quantityText}>{quantity}</Text>
                    <TouchableOpacity onPress={() => addToCart(item.id)} style={styles.btnSmall}>
                      <Text style={styles.btnText}>+</Text>
                    </TouchableOpacity>
                  </View>
                ) : (
                  <TouchableOpacity onPress={() => addToCart(item.id)} style={styles.addBtn}>
                    <Text style={styles.addBtnText}>+ Ajouter</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          );
        }}
      />

      {/* Barre de Panier Flottante (Orange Électrique & Jaune Doré) */}
      {getTotalItems() > 0 && (
        <View style={styles.cartBar}>
          <View>
            <Text style={styles.cartBarCount}>{getTotalItems()} article(s) sélectionnés</Text>
            <Text style={styles.cartBarTotal}>Total : {getTotalPrice()} DH</Text>
          </View>
          <TouchableOpacity style={styles.checkoutBtn}>
            <Text style={styles.checkoutText}>Commander ➔</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F4F5F9' },
  header: { 
    padding: 20, 
    backgroundColor: '#13085E', 
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    elevation: 4,
  },
  logoText: { fontSize: 26, fontWeight: 'bold', color: '#FF7A00', letterSpacing: 1 },
  slogan: { fontSize: 12, color: '#FFA800', marginTop: 4, fontStyle: 'italic' },
  listContainer: { padding: 16, paddingBottom: 100 },
  productCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 12,
    marginBottom: 12,
    alignItems: 'center',
    shadowColor: '#13085E',
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  productImage: { width: 75, height: 75, borderRadius: 12, marginRight: 12 },
  productInfo: { flex: 1 },
  category: { fontSize: 11, color: '#666666', textTransform: 'uppercase', fontWeight: '600' },
  productName: { fontSize: 16, fontWeight: '700', color: '#13085E', marginTop: 2 },
  productPrice: { fontSize: 15, fontWeight: 'bold', color: '#FF7A00', marginTop: 6 },
  actionContainer: { justifyContent: 'center' },
  addBtn: { backgroundColor: '#FF7A00', paddingVertical: 9, paddingHorizontal: 14, borderRadius: 12 },
  addBtnText: { color: '#FFFFFF', fontWeight: 'bold', fontSize: 13 },
  counterRow: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F4F5F9', borderRadius: 12, borderWidth: 1, borderColor: '#E2E8F0' },
  btnSmall: { paddingHorizontal: 12, paddingVertical: 8 },
  btnText: { fontSize: 16, fontWeight: 'bold', color: '#13085E' },
  quantityText: { paddingHorizontal: 6, fontWeight: 'bold', fontSize: 14, color: '#13085E' },
  cartBar: {
    position: 'absolute',
    bottom: 20,
    left: 16,
    right: 16,
    backgroundColor: '#13085E',
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 8,
    borderWidth: 1,
    borderColor: '#FFA800',
  },
  cartBarCount: { color: '#FFA800', fontSize: 12, fontWeight: '600' },
  cartBarTotal: { color: '#FFFFFF', fontSize: 18, fontWeight: 'bold' },
  checkoutBtn: { backgroundColor: '#FF7A00', paddingVertical: 10, paddingHorizontal: 16, borderRadius: 12 },
  checkoutText: { color: '#FFFFFF', fontWeight: 'bold', fontSize: 14 },
});