import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Switch,
} from 'react-native';
import {
  User,
  Bell,
  Shield,
  Palette,
  HelpCircle,
  Info,
  LogOut,
  ChevronRight,
  Moon,
  Globe,
  Zap,
} from 'lucide-react-native';

const settingsData = [
  {
    section: 'Account',
    items: [
      { title: 'Profile Settings', icon: User, type: 'navigation' },
      { title: 'Notifications', icon: Bell, type: 'navigation' },
      { title: 'Privacy & Security', icon: Shield, type: 'navigation' },
    ],
  },
  {
    section: 'Preferences',
    items: [
      { title: 'Dark Mode', icon: Moon, type: 'toggle', value: true },
      { title: 'AI Assistance', icon: Zap, type: 'toggle', value: true },
      { title: 'Language', icon: Globe, type: 'navigation', value: 'English' },
      { title: 'Theme', icon: Palette, type: 'navigation', value: 'System' },
    ],
  },
  {
    section: 'Support',
    items: [
      { title: 'Help Center', icon: HelpCircle, type: 'navigation' },
      { title: 'About', icon: Info, type: 'navigation' },
    ],
  },
  {
    section: 'Account Actions',
    items: [
      { title: 'Sign Out', icon: LogOut, type: 'action', color: '#EF4444' },
    ],
  },
];

export default function Settings() {
  const [toggles, setToggles] = useState({
    darkMode: true,
    aiAssistance: true,
  });

  const handleToggle = (key: string) => {
    setToggles(prev => ({
      ...prev,
      [key]: !prev[key as keyof typeof prev],
    }));
  };

  const renderSettingItem = (item: any, index: number) => {
    switch (item.type) {
      case 'toggle':
        const toggleKey = item.title === 'Dark Mode' ? 'darkMode' : 'aiAssistance';
        return (
          <View key={index} style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <View style={styles.iconContainer}>
                <item.icon color="#9CA3AF" size={20} />
              </View>
              <Text style={styles.settingTitle}>{item.title}</Text>
            </View>
            <Switch
              value={toggles[toggleKey]}
              onValueChange={() => handleToggle(toggleKey)}
              trackColor={{ false: '#374151', true: '#3B82F6' }}
              thumbColor={toggles[toggleKey] ? '#FFFFFF' : '#9CA3AF'}
            />
          </View>
        );
      
      case 'navigation':
        return (
          <TouchableOpacity key={index} style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <View style={styles.iconContainer}>
                <item.icon color="#9CA3AF" size={20} />
              </View>
              <Text style={styles.settingTitle}>{item.title}</Text>
            </View>
            <View style={styles.settingRight}>
              {item.value && (
                <Text style={styles.settingValue}>{item.value}</Text>
              )}
              <ChevronRight color="#6B7280" size={16} />
            </View>
          </TouchableOpacity>
        );
      
      case 'action':
        return (
          <TouchableOpacity key={index} style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <View style={styles.iconContainer}>
                <item.icon color={item.color || "#9CA3AF"} size={20} />
              </View>
              <Text style={[styles.settingTitle, item.color && { color: item.color }]}>
                {item.title}
              </Text>
            </View>
          </TouchableOpacity>
        );
      
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.title}>Settings</Text>
          <Text style={styles.subtitle}>
            Customize your Bolt experience
          </Text>
        </View>

        {settingsData.map((section, sectionIndex) => (
          <View key={sectionIndex} style={styles.section}>
            <Text style={styles.sectionTitle}>{section.section}</Text>
            <View style={styles.sectionContent}>
              {section.items.map((item, itemIndex) => 
                renderSettingItem(item, itemIndex)
              )}
            </View>
          </View>
        ))}

        {/* App Info */}
        <View style={styles.appInfo}>
          <Text style={styles.appName}>Bolt Mobile</Text>
          <Text style={styles.appVersion}>Version 1.0.0</Text>
          <Text style={styles.copyright}>© 2024 StackBlitz. All rights reserved.</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0A0A',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  header: {
    marginBottom: 32,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: 'white',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#9CA3AF',
    lineHeight: 24,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#9CA3AF',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 12,
  },
  sectionContent: {
    backgroundColor: '#1F1F1F',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#374151',
    overflow: 'hidden',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#374151',
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: 'white',
    flex: 1,
  },
  settingRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  settingValue: {
    fontSize: 14,
    color: '#9CA3AF',
  },
  appInfo: {
    alignItems: 'center',
    marginTop: 32,
    paddingTop: 24,
    borderTopWidth: 1,
    borderTopColor: '#374151',
  },
  appName: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
    marginBottom: 4,
  },
  appVersion: {
    fontSize: 14,
    color: '#9CA3AF',
    marginBottom: 8,
  },
  copyright: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
  },
});