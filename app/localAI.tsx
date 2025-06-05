import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import { Brain, UploadCloud, FileText, Send, MessageSquare, AlertTriangle } from 'lucide-react-native';

interface GGUFFile {
  name: string;
  size: number | undefined;
  uri: string;
}

export default function LocalAIScreen() {
  const [selectedModel, setSelectedModel] = useState<GGUFFile | null>(null);
  const [isLoadingModel, setIsLoadingModel] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState<Array<{text: string, sender: 'user' | 'bot'}>>([]);
  const [error, setError] = useState<string | null>(null);

  const pickDocument = useCallback(async () => {
    setIsLoadingModel(true);
    setError(null);
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: '*/*', // Or be more specific if GGUF has a common MIME type or extension
        copyToCacheDirectory: true,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const asset = result.assets[0];
        if (asset.name.toLowerCase().endsWith('.gguf')) {
          setSelectedModel({
            name: asset.name,
            size: asset.size,
            uri: asset.uri,
          });
        } else {
          setError('Invalid file type. Please select a .gguf file.');
          setSelectedModel(null);
        }
      } else {
        setSelectedModel(null);
      }
    } catch (err) {
      console.error('Error picking document:', err);
      setError('Failed to pick document. Please try again.');
      setSelectedModel(null);
    } finally {
      setIsLoadingModel(false);
    }
  }, []);

  const handleSendMessage = () => {
    if (chatInput.trim() === '' || !selectedModel) return;

    const newUserMessage = { text: chatInput, sender: 'user' as 'user' };
    setChatMessages(prevMessages => [...prevMessages, newUserMessage]);
    setChatInput('');

    // Simulate bot response (replace with actual GGUF model inference)
    setTimeout(() => {
      const botResponse = {
        text: `Simulated response for: "${newUserMessage.text}". Actual GGUF processing not yet implemented.`,
        sender: 'bot' as 'bot',
      };
      setChatMessages(prevMessages => [...prevMessages, botResponse]);
    }, 1000);
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 85 : 0} // Adjust offset for tab bar
      >
        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.header}>
            <Brain color="#3B82F6" size={32} />
            <Text style={styles.title}>Local AI Chat</Text>
            <Text style={styles.subtitle}>
              Load a GGUF model from your device to chat offline.
            </Text>
          </View>

          {error && (
            <View style={styles.errorContainer}>
              <AlertTriangle color="#EF4444" size={20} />
              <Text style={styles.errorText}>{error}</Text>
            </View>
          )}

          {!selectedModel && (
            <TouchableOpacity style={styles.uploadButton} onPress={pickDocument} disabled={isLoadingModel}>
              {isLoadingModel ? (
                <ActivityIndicator size="small" color="#FFFFFF" />
              ) : (
                <>
                  <UploadCloud color="#FFFFFF" size={24} />
                  <Text style={styles.uploadButtonText}>Load GGUF Model</Text>
                </>
              )}
            </TouchableOpacity>
          )}

          {selectedModel && (
            <View style={styles.modelInfoContainer}>
              <FileText color="#3B82F6" size={24} />
              <View style={styles.modelDetails}>
                <Text style={styles.modelName}>{selectedModel.name}</Text>
                {selectedModel.size && (
                  <Text style={styles.modelSize}>
                    Size: {(selectedModel.size / (1024 * 1024)).toFixed(2)} MB
                  </Text>
                )}
              </View>
              <TouchableOpacity onPress={() => { setSelectedModel(null); setChatMessages([]); setError(null);}}>
                <Text style={styles.changeModelText}>Change</Text>
              </TouchableOpacity>
            </View>
          )}

          {selectedModel && (
            <View style={styles.chatContainer}>
              <ScrollView style={styles.chatMessagesContainer} contentContainerStyle={{ paddingBottom: 10 }}>
                {chatMessages.length === 0 && (
                    <View style={styles.emptyChatContainer}>
                        <MessageSquare color="#6B7280" size={48} />
                        <Text style={styles.emptyChatText}>Model loaded. Start chatting!</Text>
                    </View>
                )}
                {chatMessages.map((msg, index) => (
                  <View
                    key={index}
                    style={[
                      styles.messageBubble,
                      msg.sender === 'user' ? styles.userMessage : styles.botMessage,
                    ]}
                  >
                    <Text style={styles.messageText}>{msg.text}</Text>
                  </View>
                ))}
              </ScrollView>
              <View style={styles.inputWrapper}>
                <TextInput
                  style={styles.textInput}
                  placeholder="Ask the local AI..."
                  placeholderTextColor="#6B7280"
                  value={chatInput}
                  onChangeText={setChatInput}
                  multiline
                />
                <TouchableOpacity style={styles.sendButton} onPress={handleSendMessage}>
                  <Send color="#3B82F6" size={20} />
                </TouchableOpacity>
              </View>
            </View>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0A0A',
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: 'white',
    marginTop: 8,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#9CA3AF',
    textAlign: 'center',
    lineHeight: 24,
  },
  errorContainer: {
    backgroundColor: '#371B1B', // Dark red
    padding: 12,
    borderRadius: 8,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    borderWidth: 1,
    borderColor: '#572828'
  },
  errorText: {
    color: '#FCA5A5', // Light red
    fontSize: 14,
    flex: 1,
  },
  uploadButton: {
    backgroundColor: '#3B82F6',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    marginBottom: 32,
  },
  uploadButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  modelInfoContainer: {
    backgroundColor: '#1F1F1F',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#374151',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 24,
  },
  modelDetails: {
    flex: 1,
  },
  modelName: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  modelSize: {
    color: '#9CA3AF',
    fontSize: 12,
  },
  changeModelText: {
    color: '#3B82F6',
    fontSize: 14,
    fontWeight: '500',
  },
  chatContainer: {
    flex: 1,
    backgroundColor: '#1F1F1F',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#374151',
    overflow: 'hidden', // Important for child ScrollView
    minHeight: 300, // Ensure it has some height
  },
  chatMessagesContainer: {
    flex: 1,
    padding: 12,
  },
  emptyChatContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyChatText: {
    color: '#6B7280',
    fontSize: 16,
    marginTop: 12,
    textAlign: 'center',
  },
  messageBubble: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 18,
    marginBottom: 8,
    maxWidth: '80%',
  },
  userMessage: {
    backgroundColor: '#3B82F6',
    alignSelf: 'flex-end',
    borderBottomRightRadius: 4,
  },
  botMessage: {
    backgroundColor: '#374151',
    alignSelf: 'flex-start',
    borderBottomLeftRadius: 4,
  },
  messageText: {
    color: 'white',
    fontSize: 15,
    lineHeight: 20,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    padding: 12,
    borderTopWidth: 1,
    borderTopColor: '#374151',
    backgroundColor: '#1F1F1F', // Match chat container background
  },
  textInput: {
    flex: 1,
    backgroundColor: '#0A0A0A',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 15,
    color: 'white',
    maxHeight: 100,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#374151',
  },
  sendButton: {
    backgroundColor: '#3B82F6',
    padding: 10,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
