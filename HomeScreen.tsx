import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { usePrivy } from '@privy-io/expo';

interface HomeScreenProps {
  onNavigateBack: () => void;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ onNavigateBack }) => {
  const { user, authenticated } = usePrivy();

  const getWalletAddress = () => {
    if (user?.wallet?.address) {
      const address = user.wallet.address;
      return `${address.slice(0, 6)}...${address.slice(-4)}`;
    }
    return 'No wallet connected';
  };

  return (
    <SafeAreaProvider>
      <StatusBar barStyle="light-content" backgroundColor="#2D1B69" translucent={false} />
      <LinearGradient
        colors={['#2D1B69', '#1E3A8A']}
        style={styles.container}
      >
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.content}>
            <Text style={styles.title}>Home</Text>
            <Text style={styles.subtitle}>Welcome to BerrieDex</Text>
            
            <View style={styles.userCard}>
              <Text style={styles.cardTitle}>
                {authenticated ? 'Wallet Connected' : 'Not Connected'}
              </Text>
              <Text style={styles.cardText}>
                {authenticated ? getWalletAddress() : 'Please connect your wallet'}
              </Text>
              {authenticated && (
                <TouchableOpacity style={styles.disconnectButton} onPress={onNavigateBack}>
                  <Text style={styles.disconnectText}>Disconnect</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
          
          {/* Glass Navigation Bar */}
          <View style={styles.navContainer}>
            <View style={styles.navBar}>
              <TouchableOpacity style={[styles.navItem, styles.navItemActive]}>
                <Text style={styles.navIcon}>🏠</Text>
                <Text style={[styles.navLabel, styles.navLabelActive]}>Home</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.navItem}>
                <Text style={styles.navIcon}>🔄</Text>
                <Text style={styles.navLabel}>Swap</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.navItem}>
                <Text style={styles.navIcon}>📈</Text>
                <Text style={styles.navLabel}>Trade</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.navItem}>
                <Text style={styles.navIcon}>💰</Text>
                <Text style={styles.navLabel}>Stake</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.navItem}>
                <Text style={styles.navIcon}>👤</Text>
                <Text style={styles.navLabel}>Profile</Text>
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </LinearGradient>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 18,
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 40,
  },
  userCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    padding: 24,
    width: '100%',
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
  },
  cardText: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 16,
  },
  disconnectButton: {
    backgroundColor: '#FF56C8',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  disconnectText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
  navContainer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  navBar: {
    height: 64,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 16,
    minWidth: 50,
  },
  navItemActive: {
    backgroundColor: 'rgba(255, 86, 200, 0.2)',
  },
  navIcon: {
    fontSize: 16,
    marginBottom: 2,
  },
  navLabel: {
    fontSize: 10,
    color: 'rgba(255, 255, 255, 0.8)',
    fontFamily: 'System',
  },
  navLabelActive: {
    color: '#FF56C8',
    fontWeight: '600',
  },
});

export default HomeScreen;

