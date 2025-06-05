import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { 
  Paperclip, 
  Star, 
  Github, 
  Figma,
  Sparkles
} from 'lucide-react-native';

const suggestionButtons = [
  'Build a mobile app',
  'Start a blog', 
  'Create a docs site',
  'Make a dashboard with charts'
];

const importOptions = [
  { title: 'Figma', icon: Figma },
  { title: 'GitHub', icon: Github },
];

const footerTopLinks = [
  { title: 'We\'re hiring', hasIcon: true },
  { title: 'Help Center', hasIcon: false },
  { title: 'Pricing', hasIcon: false },
  { title: 'Blog', hasIcon: false }
];

const footerBottomLinks = [
  { title: 'Terms', hasIcon: false },
  { title: 'Privacy', hasIcon: false },
  { title: '⚡ StackBlitz', hasIcon: false, isBrand: true }
];

export default function Home() {
  const [input, setInput] = useState('');

  const handleSuggestion = (suggestion: string) => {
    setInput(suggestion);
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>want to build?</Text>
            <Text style={styles.subtitle}>
              Create stunning apps & websites by{'\n'}chatting with AI.
            </Text>
          </View>

          {/* Input Section */}
          <View style={styles.inputContainer}>
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.textInput}
                placeholder="How can Bolt help you today?"
                placeholderTextColor="#6B7280"
                value={input}
                onChangeText={setInput}
                multiline
              />
              <View style={styles.inputIcons}>
                <TouchableOpacity style={styles.iconButton}>
                  <Paperclip color="#6B7280" size={18} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconButton}>
                  <Star color="#6B7280" size={18} />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* Import Section */}
          <View style={styles.importSection}>
            <Text style={styles.orText}>or import from</Text>
            <View style={styles.importButtons}>
              {importOptions.map((option, index) => (
                <TouchableOpacity key={index} style={styles.importButton}>
                  <option.icon color="#9CA3AF" size={16} />
                  <Text style={styles.importButtonText}>{option.title}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Suggestion Buttons */}
          <View style={styles.suggestionsContainer}>
            {suggestionButtons.map((suggestion, index) => (
              <TouchableOpacity
                key={index}
                style={styles.suggestionButton}
                onPress={() => handleSuggestion(suggestion)}
              >
                <Text style={styles.suggestionText}>{suggestion}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Footer */}
          <View style={styles.footer}>
            {/* Top Footer Links */}
            <View style={styles.footerRow}>
              {footerTopLinks.map((link, index) => (
                <View key={index} style={styles.footerLinkContainer}>
                  {index > 0 && <Text style={styles.footerDot}>•</Text>}
                  <TouchableOpacity style={styles.footerLinkButton}>
                    <Text style={styles.footerLink}>
                      {link.title}
                      {link.hasIcon && (
                        <Sparkles color="#3B82F6" size={12} style={styles.hiringIcon} />
                      )}
                    </Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>

            {/* Bottom Footer Links */}
            <View style={styles.footerRow}>
              {footerBottomLinks.map((link, index) => (
                <View key={index} style={styles.footerLinkContainer}>
                  {index > 0 && <Text style={styles.footerDot}>•</Text>}
                  <TouchableOpacity style={styles.footerLinkButton}>
                    <Text style={[
                      styles.footerLink, 
                      link.isBrand && styles.brandLink
                    ]}>
                      {link.title}
                    </Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111827', // Dark charcoal background matching the image
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 48,
  },
  title: {
    fontSize: 56,
    fontWeight: '600',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 20,
    letterSpacing: -1.5,
    lineHeight: 64,
  },
  subtitle: {
    fontSize: 18,
    color: '#9CA3AF',
    textAlign: 'center',
    lineHeight: 28,
    letterSpacing: 0.3,
  },
  inputContainer: {
    marginBottom: 48,
  },
  inputWrapper: {
    backgroundColor: '#1F2937',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#374151',
    paddingHorizontal: 20,
    paddingVertical: 20,
    minHeight: 120,
    position: 'relative',
  },
  textInput: {
    fontSize: 16,
    color: '#FFFFFF',
    textAlignVertical: 'top',
    paddingRight: 80,
    minHeight: 80,
    lineHeight: 24,
  },
  inputIcons: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    flexDirection: 'row',
    gap: 12,
  },
  iconButton: {
    padding: 4,
  },
  importSection: {
    alignItems: 'center',
    marginBottom: 48,
  },
  orText: {
    fontSize: 16,
    color: '#9CA3AF',
    marginBottom: 20,
    textAlign: 'center',
  },
  importButtons: {
    flexDirection: 'row',
    gap: 16,
  },
  importButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1F2937',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#374151',
    gap: 8,
  },
  importButtonText: {
    fontSize: 14,
    color: '#D1D5DB',
    fontWeight: '500',
  },
  suggestionsContainer: {
    gap: 12,
    marginBottom: 60,
  },
  suggestionButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#374151',
    borderRadius: 8,
    paddingHorizontal: 20,
    paddingVertical: 14,
    alignItems: 'center',
  },
  suggestionText: {
    fontSize: 15,
    color: '#D1D5DB',
    fontWeight: '400',
    textAlign: 'center',
  },
  footer: {
    alignItems: 'center',
    gap: 16,
    marginTop: 20,
  },
  footerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 8,
  },
  footerLinkContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  footerLinkButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  footerLink: {
    fontSize: 14,
    color: '#9CA3AF',
    textAlign: 'center',
  },
  footerDot: {
    fontSize: 14,
    color: '#6B7280',
  },
  brandLink: {
    color: '#D1D5DB',
    fontWeight: '500',
  },
  hiringIcon: {
    marginLeft: 4,
  },
});