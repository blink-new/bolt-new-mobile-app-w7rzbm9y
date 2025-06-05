import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import {
  Smartphone,
  Globe,
  Code,
  Palette,
  Bot,
  Zap,
  Cpu,
  Database,
  ShoppingCart,
  Calendar,
  Camera,
  Music,
} from 'lucide-react-native';

const templates = [
  {
    category: 'Mobile Apps',
    items: [
      { title: 'Social Media App', icon: Smartphone, gradient: ['#FF6B6B', '#FF8E8E'] },
      { title: 'E-commerce App', icon: ShoppingCart, gradient: ['#4ECDC4', '#44A08D'] },
      { title: 'Photo Editor', icon: Camera, gradient: ['#A8E6CF', '#7FCDCD'] },
      { title: 'Music Player', icon: Music, gradient: ['#FFD93D', '#FFA630'] },
    ],
  },
  {
    category: 'Web Applications',
    items: [
      { title: 'Portfolio Website', icon: Globe, gradient: ['#667EEA', '#764BA2'] },
      { title: 'Blog Platform', icon: Code, gradient: ['#F093FB', '#F5576C'] },
      { title: 'Dashboard', icon: Database, gradient: ['#4FACFE', '#00F2FE'] },
      { title: 'Landing Page', icon: Palette, gradient: ['#43E97B', '#38F9D7'] },
    ],
  },
  {
    category: 'AI & Automation',
    items: [
      { title: 'ChatBot', icon: Bot, gradient: ['#FA709A', '#FEE140'] },
      { title: 'AI Assistant', icon: Cpu, gradient: ['#A8EDEA', '#FED6E3'] },
      { title: 'Workflow Automation', icon: Zap, gradient: ['#D299C2', '#FEF9D7'] },
      { title: 'Calendar App', icon: Calendar, gradient: ['#89F7FE', '#66A6FF'] },
    ],
  },
];

export default function Explore() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.title}>Explore Templates</Text>
          <Text style={styles.subtitle}>
            Get started quickly with pre-built templates and examples
          </Text>
        </View>

        {templates.map((category, categoryIndex) => (
          <View key={categoryIndex} style={styles.category}>
            <Text style={styles.categoryTitle}>{category.category}</Text>
            <View style={styles.templateGrid}>
              {category.items.map((template, index) => (
                <TouchableOpacity key={index} style={styles.templateCard}>
                  <LinearGradient
                    colors={template.gradient}
                    style={styles.templateGradient}
                  >
                    <template.icon color="white" size={24} />
                  </LinearGradient>
                  <Text style={styles.templateTitle}>{template.title}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ))}
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
  category: {
    marginBottom: 32,
  },
  categoryTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: 'white',
    marginBottom: 16,
  },
  templateGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  templateCard: {
    width: '48%',
    backgroundColor: '#1F1F1F',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#374151',
  },
  templateGradient: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  templateTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: 'white',
    lineHeight: 20,
  },
});