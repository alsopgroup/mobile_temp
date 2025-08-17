import './polyfills';
import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Image,
  Alert,
} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { PrivyProvider, usePrivy } from '@privy-io/expo';
import SwipeButton from './SwipeButton';
import HomeScreen from './HomeScreen';

const AppContent = () => {
  const [currentScreen, setCurrentScreen] = useState<'landing' | 'home'>('landing');
  const { login, authenticated, logout } = usePrivy();

  // Global listener for authentication state changes
  useEffect(() => {
    if (authenticated) {
      setCurrentScreen('home');
    } else {
      setCurrentScreen('landing');
    }
  }, [authenticated]);

  const handleSwipeToConnect = async () => {
    try {
      console.log('Swipe completed! Connecting wallet...');
      await login();
    } catch (error) {
      console.error('Connection error:', error);
      Alert.alert('Connection Failed', 'Failed to connect wallet. Please try again.');
    }
  };

  const handleNavigateBack = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  if (currentScreen === 'home') {
    return <HomeScreen onNavigateBack={handleNavigateBack} />;
  }

  return (
    <SafeAreaProvider>
      <StatusBar barStyle="light-content" backgroundColor="#2D1B69" translucent={false} />
      <LinearGradient
        colors={['#2D1B69', '#1E3A8A']}
        style={styles.container}
      >
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.content}>
            <View style={styles.logoContainer}>
              <Image
                source={require('./logo-3d.png')}
                style={styles.logo}
                resizeMode="contain"
              />
            </View>
            
            <View style={styles.textContainer}>
              <Text style={styles.title}>Swap, trade & stake{'\n'}in one place</Text>
              <Text style={styles.description}>
                BerrieDex is a self-custody, multi-chain{'\n'}
                orderbook DEX with no bridging required.{'\n'}
                All fees go to $BERRIE stakers
              </Text>
            </View>
          </View>
          
          <SwipeButton onSwipeComplete={handleSwipeToConnect} />
        </SafeAreaView>
      </LinearGradient>
    </SafeAreaProvider>
  );
};

export default function App() {
  return (
    <PrivyProvider 
      appId="cme7trsfy00a9l40bm85bgm8a"
      config={{
        appearance: {
          accentColor: "#ff56c8",
          theme: "#131722",
          showWalletLoginFirst: false,
          logo: "https://auth.privy.io/logos/privy-logo-dark.png",
          walletChainType: "ethereum-and-solana",
          walletList: [
            "detected_wallets",
            "metamask",
            "phantom",
            "coinbase_wallet",
            "base_account",
            "rainbow",
            "solflare",
            "backpack",
            "okx_wallet",
            "wallet_connect"
          ]
        },
        loginMethods: [
          "wallet"
        ],
        fundingMethodConfig: {
          moonpay: {
            useSandbox: true
          }
        },
        embeddedWallets: {
          requireUserPasswordOnCreate: false,
          showWalletUIs: true,
          ethereum: {
            createOnLogin: "users-without-wallets"
          },
          solana: {
            createOnLogin: "users-without-wallets"
          }
        },
        mfa: {
          noPromptOnMfaRequired: false
        },
        externalWallets: {
          solana: {
            connectors: {}
          }
        }
      }}
    >
      <AppContent />
    </PrivyProvider>
  );
}

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
  logoContainer: {
    alignItems: 'center',
    marginBottom: 60,
  },
  logo: {
    width: 306,
    height: 306,
  },
  textContainer: {
    alignItems: 'center',
  },
  title: {
    fontSize: 38,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 46,
  },
  description: {
    fontSize: 18,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
    lineHeight: 24,
  },
});
