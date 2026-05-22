"use client";

import React, { useState, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mic,
  MicOff,
  Phone,
  PhoneOff,
  Settings,
  Volume2,
  VolumeX,
  MessageSquare,
  BookOpen,
  Upload,
  ChevronDown,
  Send,
  Bot,
  User,
  Globe,
  Loader2,
  X,
  CheckCircle,
  AlertCircle,
  Brain,
  FileText,
  Shield,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";

// Types
interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  language?: string;
  knowledgeUsed?: boolean;
}

interface VoiceState {
  isListening: boolean;
  isSpeaking: boolean;
  isProcessing: boolean;
  isOnCall: boolean;
  audioLevel: number;
}

type Language = "en" | "hi" | "te";

export default function VoiceAssistant() {
  // State
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState("");
  const [language, setLanguage] = useState<Language>("en");
  const [voiceState, setVoiceState] = useState<VoiceState>({
    isListening: false,
    isSpeaking: false,
    isProcessing: false,
    isOnCall: false,
    audioLevel: 0,
  });
  const [showSettings, setShowSettings] = useState(false);
  const [showKnowledge, setShowKnowledge] = useState(false);
  const [showVoiceClone, setShowVoiceClone] = useState(false);
  const [voiceCloneProgress, setVoiceCloneProgress] = useState(0);
  const [voiceSamples, setVoiceSamples] = useState<File[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [ttsEnabled, setTtsEnabled] = useState(true);

  // Refs
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animationFrameRef = useRef<number>(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const currentAudioRef = useRef<HTMLAudioElement | null>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
      if (currentAudioRef.current) currentAudioRef.current.pause();
      if (audioContextRef.current) audioContextRef.current.close();
    };
  }, []);

  // Audio level visualization
  const startAudioVisualization = useCallback((stream: MediaStream) => {
    const audioContext = new AudioContext();
    const source = audioContext.createMediaStreamSource(stream);
    const analyser = audioContext.createAnalyser();
    analyser.fftSize = 256;
    source.connect(analyser);
    audioContextRef.current = audioContext;
    analyserRef.current = analyser;

    const dataArray = new Uint8Array(analyser.frequencyBinCount);
    const updateLevel = () => {
      analyser.getByteFrequencyData(dataArray);
      const average = dataArray.reduce((a, b) => a + b, 0) / dataArray.length;
      setVoiceState((prev) => ({ ...prev, audioLevel: Math.min(average / 128, 1) }));
      animationFrameRef.current = requestAnimationFrame(updateLevel);
    };
    updateLevel();
  }, []);

  const stopAudioVisualization = useCallback(() => {
    if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    if (audioContextRef.current) audioContextRef.current.close();
    setVoiceState((prev) => ({ ...prev, audioLevel: 0 }));
  }, []);

  // Send message to API
  const sendMessage = useCallback(
    async (text: string) => {
      if (!text.trim()) return;

      const userMsg: Message = {
        id: Date.now().toString(),
        role: "user",
        content: text,
        timestamp: new Date(),
        language,
      };
      setMessages((prev) => [...prev, userMsg]);
      setInputText("");
      setVoiceState((prev) => ({ ...prev, isProcessing: true }));
      setError(null);

      try {
        const response = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            message: text,
            language,
            history: messages.slice(-10).map((m) => ({ role: m.role, content: m.content })),
          }),
        });

        if (!response.ok) throw new Error("API error");

        const data = await response.json();

        const assistantMsg: Message = {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: data.reply,
          timestamp: new Date(),
          language: data.language,
          knowledgeUsed: data.knowledgeUsed,
        };
        setMessages((prev) => [...prev, assistantMsg]);

        // TTS
        if (ttsEnabled) {
          speakText(data.reply);
        }
      } catch (err) {
        setError("Failed to get response. Please try again.");
        console.error(err);
      } finally {
        setVoiceState((prev) => ({ ...prev, isProcessing: false }));
      }
    },
    [language, messages, ttsEnabled]
  );

  // Text-to-Speech
  const speakText = useCallback(
    async (text: string) => {
      try {
        setVoiceState((prev) => ({ ...prev, isSpeaking: true }));

        const response = await fetch("/api/tts", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text, language }),
        });

        if (response.ok && response.headers.get("content-type")?.includes("audio")) {
          const audioBlob = await response.blob();
          const audioUrl = URL.createObjectURL(audioBlob);
          const audio = new Audio(audioUrl);
          currentAudioRef.current = audio;
          audio.onended = () => {
            setVoiceState((prev) => ({ ...prev, isSpeaking: false }));
            URL.revokeObjectURL(audioUrl);
          };
          audio.onerror = () => {
            // Fallback to browser TTS
            browserTTS(text);
          };
          await audio.play();
        } else {
          // Fallback to browser TTS
          browserTTS(text);
        }
      } catch {
        // Fallback to browser TTS
        browserTTS(text);
      }
    },
    [language]
  );

  // Browser TTS fallback
  const browserTTS = useCallback(
    (text: string) => {
      if (typeof window === "undefined" || !window.speechSynthesis) {
        setVoiceState((prev) => ({ ...prev, isSpeaking: false }));
        return;
      }

      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);

      const langCodes: Record<string, string> = { en: "en-US", hi: "hi-IN", te: "te-IN" };
      utterance.lang = langCodes[language] || "en-US";
      utterance.rate = 0.95;
      utterance.pitch = 1.0;

      // Try to find a matching voice
      const voices = window.speechSynthesis.getVoices();
      const matchingVoice = voices.find((v) => v.lang.startsWith(langCodes[language]?.split("-")[0] || "en"));
      if (matchingVoice) utterance.voice = matchingVoice;

      utterance.onend = () => setVoiceState((prev) => ({ ...prev, isSpeaking: false }));
      utterance.onerror = () => setVoiceState((prev) => ({ ...prev, isSpeaking: false }));

      window.speechSynthesis.speak(utterance);
    },
    [language]
  );

  // Start voice recording using Web Speech API
  const startListening = useCallback(async () => {
    // Try Web Speech API first (works in Chrome, Edge, Safari)
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (SpeechRecognition) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        startAudioVisualization(stream);

        const recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;

        const langCodes: Record<string, string> = { en: "en-US", hi: "hi-IN", te: "te-IN" };
        recognition.lang = langCodes[language] || "en-US";

        recognition.onresult = async (event: any) => {
          const transcript = event.results[0][0].transcript;
          stopAudioVisualization();
          stream.getTracks().forEach((t) => t.stop());
          setVoiceState((prev) => ({ ...prev, isListening: false, isProcessing: true }));

          if (transcript.trim()) {
            await sendMessage(transcript);
          } else {
            setError("Couldn't hear you clearly. Please try again.");
            setVoiceState((prev) => ({ ...prev, isProcessing: false }));
          }
        };

        recognition.onerror = (event: any) => {
          console.error("Speech recognition error:", event.error);
          stopAudioVisualization();
          stream.getTracks().forEach((t) => t.stop());
          setVoiceState((prev) => ({ ...prev, isListening: false }));
          if (event.error === "not-allowed") {
            setError("Microphone access denied. Please allow microphone access.");
          } else {
            setError("Voice recognition failed. Try typing instead.");
          }
        };

        recognition.onend = () => {
          setVoiceState((prev) => ({ ...prev, isListening: false }));
        };

        recognition.start();
        (window as any).__speechRecognition = recognition;
        setVoiceState((prev) => ({ ...prev, isListening: true }));
      } catch {
        setError("Microphone access denied. Please allow microphone access.");
      }
    } else {
      // Fallback: Use MediaRecorder + server STT
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const mediaRecorder = new MediaRecorder(stream, { mimeType: "audio/webm" });
        audioChunksRef.current = [];

        mediaRecorder.ondataavailable = (event) => {
          if (event.data.size > 0) audioChunksRef.current.push(event.data);
        };

        mediaRecorder.onstop = async () => {
          stream.getTracks().forEach((t) => t.stop());
          stopAudioVisualization();

          setVoiceState((prev) => ({ ...prev, isProcessing: true }));
          // For browsers without Web Speech API, use browser's built-in dictation
          setError("Your browser doesn't support voice recognition. Please use Chrome or type your message.");
          setVoiceState((prev) => ({ ...prev, isProcessing: false }));
        };

        mediaRecorder.start();
        mediaRecorderRef.current = mediaRecorder;
        startAudioVisualization(stream);
        setVoiceState((prev) => ({ ...prev, isListening: true }));
      } catch {
        setError("Microphone access denied. Please allow microphone access.");
      }
    }
  }, [language, sendMessage, startAudioVisualization, stopAudioVisualization]);

  // Stop voice recording
  const stopListening = useCallback(() => {
    // Stop Web Speech API
    if ((window as any).__speechRecognition) {
      (window as any).__speechRecognition.stop();
      (window as any).__speechRecognition = null;
    }
    // Stop MediaRecorder fallback
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
      mediaRecorderRef.current.stop();
    }
    stopAudioVisualization();
    setVoiceState((prev) => ({ ...prev, isListening: false }));
  }, [stopAudioVisualization]);

  // Toggle call mode
  const toggleCall = useCallback(() => {
    if (voiceState.isOnCall) {
      stopListening();
      setVoiceState((prev) => ({ ...prev, isOnCall: false }));
      if (currentAudioRef.current) currentAudioRef.current.pause();
      window.speechSynthesis?.cancel();
      setVoiceState((prev) => ({ ...prev, isSpeaking: false }));
    } else {
      setVoiceState((prev) => ({ ...prev, isOnCall: true }));
      startListening();
    }
  }, [voiceState.isOnCall, startListening, stopListening]);

  // Upload voice sample for cloning
  const handleVoiceSampleUpload = useCallback(async () => {
    if (voiceSamples.length === 0) return;

    setVoiceCloneProgress(10);

    try {
      // Create voice model
      const createResponse = await fetch("/api/voice-clone", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "Rajesh-Voice",
          description: "Rajesh Kantubhukta's custom voice model",
          language,
        }),
      });

      if (!createResponse.ok) throw new Error("Voice creation failed");
      const { voiceId } = await createResponse.json();
      setVoiceCloneProgress(40);

      // Upload each sample
      for (let i = 0; i < voiceSamples.length; i++) {
        const formData = new FormData();
        formData.append("voiceId", voiceId);
        formData.append("audio", voiceSamples[i]);

        const uploadResponse = await fetch("/api/voice-clone", {
          method: "PUT",
          body: formData,
        });

        if (!uploadResponse.ok) throw new Error("Upload failed");
        setVoiceCloneProgress(40 + ((i + 1) / voiceSamples.length) * 50);
      }

      setVoiceCloneProgress(100);
    } catch (err) {
      setError("Voice cloning failed. Please try again.");
      setVoiceCloneProgress(0);
    }
  }, [voiceSamples, language]);

  // Language labels
  const languageLabels: Record<Language, string> = {
    en: "English",
    hi: "हिन्दी",
    te: "తెలుగు",
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-[#f5f5f5] flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#0a0a0f]/90 backdrop-blur-lg border-b border-[#c4943a]/10">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#c4943a] to-[#e5b94e] flex items-center justify-center">
              <Brain className="w-5 h-5 text-[#0a0a0f]" />
            </div>
            <div>
              <h1 className="font-mono text-sm font-bold text-[#c4943a]">RAJESH AI</h1>
              <p className="text-xs text-[#a3a3a3]">RCM Voice Assistant</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Language Selector */}
            <div className="flex bg-[#111827] rounded-lg border border-[#c4943a]/20 overflow-hidden">
              {(["en", "hi", "te"] as Language[]).map((lang) => (
                <button
                  key={lang}
                  onClick={() => setLanguage(lang)}
                  className={`px-3 py-1.5 text-xs font-mono transition-all ${
                    language === lang
                      ? "bg-[#c4943a]/20 text-[#c4943a]"
                      : "text-[#a3a3a3] hover:text-[#f5f5f5]"
                  }`}
                >
                  {languageLabels[lang]}
                </button>
              ))}
            </div>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowSettings(!showSettings)}
              className="text-[#a3a3a3] hover:text-[#c4943a]"
            >
              <Settings className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </header>

      {/* Settings Panel */}
      <AnimatePresence>
        {showSettings && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-b border-[#c4943a]/10"
          >
            <div className="max-w-4xl mx-auto px-4 py-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-[#a3a3a3]">Voice Output</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setTtsEnabled(!ttsEnabled)}
                  className="text-[#c4943a]"
                >
                  {ttsEnabled ? <Volume2 className="w-4 h-4 mr-1" /> : <VolumeX className="w-4 h-4 mr-1" />}
                  {ttsEnabled ? "On" : "Off"}
                </Button>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-[#a3a3a3]">Voice Cloning</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowVoiceClone(!showVoiceClone)}
                  className="text-[#c4943a]"
                >
                  <Upload className="w-4 h-4 mr-1" />
                  Setup
                </Button>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-[#a3a3a3]">Knowledge Base</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowKnowledge(!showKnowledge)}
                  className="text-[#c4943a]"
                >
                  <BookOpen className="w-4 h-4 mr-1" />
                  View
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-4 flex flex-col">
        {/* Call Mode Banner */}
        <AnimatePresence>
          {voiceState.isOnCall && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mb-4"
            >
              <div className="bg-gradient-to-r from-[#c4943a]/10 to-transparent border border-[#c4943a]/20 rounded-xl p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-sm font-mono text-[#c4943a]">LIVE CALL MODE</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="border-[#c4943a]/30 text-[#c4943a] text-xs">
                    {languageLabels[language]}
                  </Badge>
                  <span className="text-xs text-[#a3a3a3]">
                    {voiceState.isListening
                      ? "Listening..."
                      : voiceState.isSpeaking
                      ? "Speaking..."
                      : voiceState.isProcessing
                      ? "Thinking..."
                      : "Ready"}
                  </span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Voice Clone Panel */}
        <AnimatePresence>
          {showVoiceClone && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-4 overflow-hidden"
            >
              <Card className="bg-[#111827] border-[#c4943a]/20 p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-mono text-sm text-[#c4943a]">Voice Cloning Setup</h3>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setShowVoiceClone(false)}
                    className="text-[#a3a3a3] h-6 w-6"
                  >
                    <X className="w-3 h-3" />
                  </Button>
                </div>
                <p className="text-xs text-[#a3a3a3] mb-3">
                  Record or upload 3 voice samples in English, Hindi, and Telugu. Speak naturally for at least 30
                  seconds each.
                </p>
                <div className="grid grid-cols-3 gap-2 mb-3">
                  {["English", "Hindi", "Telugu"].map((lang, i) => (
                    <div key={lang} className="text-center">
                      <label className="cursor-pointer">
                        <div className="border border-dashed border-[#c4943a]/30 rounded-lg p-3 hover:border-[#c4943a]/60 transition-colors">
                          <Upload className="w-4 h-4 mx-auto mb-1 text-[#c4943a]/60" />
                          <span className="text-xs text-[#a3a3a3]">{lang}</span>
                        </div>
                        <input
                          type="file"
                          accept="audio/*"
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) setVoiceSamples((prev) => [...prev.slice(0, i), file, ...prev.slice(i + 1)]);
                          }}
                        />
                      </label>
                      {voiceSamples[i] && (
                        <p className="text-xs text-green-500 mt-1 flex items-center justify-center gap-1">
                          <CheckCircle className="w-3 h-3" />
                          Uploaded
                        </p>
                      )}
                    </div>
                  ))}
                </div>
                {voiceCloneProgress > 0 && voiceCloneProgress < 100 && (
                  <Progress value={voiceCloneProgress} className="h-2 mb-3" />
                )}
                {voiceCloneProgress === 100 && (
                  <p className="text-xs text-green-500 mb-3 flex items-center gap-1">
                    <CheckCircle className="w-3 h-3" /> Voice model created successfully!
                  </p>
                )}
                <Button
                  onClick={handleVoiceSampleUpload}
                  disabled={voiceSamples.length === 0 || voiceCloneProgress > 0}
                  className="w-full bg-[#c4943a] hover:bg-[#d4a843] text-[#0a0a0f] font-mono text-xs"
                  size="sm"
                >
                  {voiceCloneProgress > 0 ? "Processing..." : "Create Voice Model"}
                </Button>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Knowledge Base Panel */}
        <AnimatePresence>
          {showKnowledge && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-4 overflow-hidden"
            >
              <Card className="bg-[#111827] border-[#c4943a]/20 p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-mono text-sm text-[#c4943a]">RCM Knowledge Base</h3>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setShowKnowledge(false)}
                    className="text-[#a3a3a3] h-6 w-6"
                  >
                    <X className="w-3 h-3" />
                  </Button>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  <div className="bg-[#0a0a0f] rounded-lg p-3 text-center">
                    <FileText className="w-4 h-4 mx-auto mb-1 text-[#c4943a]" />
                    <p className="font-mono text-lg font-bold text-[#c4943a]">22</p>
                    <p className="text-xs text-[#a3a3a3]">Denial Codes</p>
                  </div>
                  <div className="bg-[#0a0a0f] rounded-lg p-3 text-center">
                    <Shield className="w-4 h-4 mx-auto mb-1 text-[#c4943a]" />
                    <p className="font-mono text-lg font-bold text-[#c4943a]">8</p>
                    <p className="text-xs text-[#a3a3a3]">Payer Rules</p>
                  </div>
                  <div className="bg-[#0a0a0f] rounded-lg p-3 text-center">
                    <MessageSquare className="w-4 h-4 mx-auto mb-1 text-[#c4943a]" />
                    <p className="font-mono text-lg font-bold text-[#c4943a]">15</p>
                    <p className="text-xs text-[#a3a3a3]">Scenarios</p>
                  </div>
                  <div className="bg-[#0a0a0f] rounded-lg p-3 text-center">
                    <Globe className="w-4 h-4 mx-auto mb-1 text-[#c4943a]" />
                    <p className="font-mono text-lg font-bold text-[#c4943a]">3</p>
                    <p className="text-xs text-[#a3a3a3]">Languages</p>
                  </div>
                </div>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto space-y-4 mb-4 min-h-0">
          {messages.length === 0 && (
            <div className="flex flex-col items-center justify-center h-full text-center py-16">
              <motion.div
                animate={{
                  scale: [1, 1.05, 1],
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-24 h-24 rounded-full bg-gradient-to-br from-[#c4943a] to-[#e5b94e] flex items-center justify-center mb-6"
              >
                <Mic className="w-10 h-10 text-[#0a0a0f]" />
              </motion.div>
              <h2 className="font-mono text-xl font-bold text-[#c4943a] mb-2">Rajesh AI Assistant</h2>
              <p className="text-[#a3a3a3] text-sm max-w-md mb-8">
                Your RCM voice assistant. Ask me about denial codes, appeal strategies, payer rules, or any revenue
                cycle question.
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-w-lg">
                {[
                  "What is CO-197 denial?",
                  "How to appeal CO-50?",
                  "Medicare timely filing?",
                  "UHC auth requirements?",
                  "CO-97 bundling appeal",
                  "Best denial strategies",
                ].map((suggestion) => (
                  <button
                    key={suggestion}
                    onClick={() => sendMessage(suggestion)}
                    className="text-xs text-left px-3 py-2 rounded-lg bg-[#111827] border border-[#c4943a]/10 text-[#a3a3a3] hover:border-[#c4943a]/30 hover:text-[#f5f5f5] transition-colors"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          )}

          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex gap-3 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              {msg.role === "assistant" && (
                <div className="w-8 h-8 rounded-full bg-[#c4943a]/20 flex items-center justify-center flex-shrink-0 mt-1">
                  <Brain className="w-4 h-4 text-[#c4943a]" />
                </div>
              )}
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                  msg.role === "user"
                    ? "bg-[#c4943a]/20 border border-[#c4943a]/20"
                    : "bg-[#111827] border border-[#c4943a]/10"
                }`}
              >
                <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-[10px] text-[#a3a3a3]">
                    {msg.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </span>
                  {msg.knowledgeUsed && (
                    <Badge variant="outline" className="text-[9px] border-[#c4943a]/30 text-[#c4943a] px-1 py-0">
                      KB
                    </Badge>
                  )}
                </div>
              </div>
              {msg.role === "user" && (
                <div className="w-8 h-8 rounded-full bg-[#111827] border border-[#c4943a]/20 flex items-center justify-center flex-shrink-0 mt-1">
                  <User className="w-4 h-4 text-[#a3a3a3]" />
                </div>
              )}
            </motion.div>
          ))}

          {voiceState.isProcessing && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-[#c4943a]/20 flex items-center justify-center flex-shrink-0">
                <Brain className="w-4 h-4 text-[#c4943a]" />
              </div>
              <div className="bg-[#111827] border border-[#c4943a]/10 rounded-2xl px-4 py-3">
                <div className="flex items-center gap-1">
                  <Loader2 className="w-4 h-4 animate-spin text-[#c4943a]" />
                  <span className="text-sm text-[#a3a3a3]">Thinking...</span>
                </div>
              </div>
            </motion.div>
          )}

          {error && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-center">
              <div className="flex items-center gap-2 text-red-400 text-xs bg-red-500/10 px-3 py-2 rounded-lg">
                <AlertCircle className="w-3 h-3" />
                {error}
                <button onClick={() => setError(null)} className="ml-2 hover:text-red-300">
                  <X className="w-3 h-3" />
                </button>
              </div>
            </motion.div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Bottom Controls */}
        <div className="sticky bottom-0 bg-[#0a0a0f]/90 backdrop-blur-lg border-t border-[#c4943a]/10 py-3 -mx-4 px-4">
          <div className="max-w-4xl mx-auto">
            {/* Audio Visualization */}
            {(voiceState.isListening || voiceState.isSpeaking) && (
              <div className="flex items-center justify-center gap-1 mb-3">
                {Array.from({ length: 20 }).map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{
                      height: voiceState.isListening
                        ? [4, Math.max(4, voiceState.audioLevel * 40 * Math.random()), 4]
                        : [4, 20 * Math.sin(Date.now() / 200 + i * 0.5) + 20, 4],
                    }}
                    transition={{
                      duration: 0.3,
                      repeat: Infinity,
                      repeatType: "reverse",
                      delay: i * 0.05,
                    }}
                    className="w-1 bg-[#c4943a] rounded-full"
                    style={{ minHeight: 4 }}
                  />
                ))}
              </div>
            )}

            {/* Input Row */}
            <div className="flex items-center gap-2">
              {/* Voice / Call Button */}
              {voiceState.isOnCall ? (
                <Button
                  onClick={toggleCall}
                  className="bg-red-600 hover:bg-red-700 text-white rounded-full w-12 h-12 p-0 flex-shrink-0"
                >
                  <PhoneOff className="w-5 h-5" />
                </Button>
              ) : (
                <Button
                  onClick={startListening}
                  disabled={voiceState.isProcessing}
                  className={`rounded-full w-12 h-12 p-0 flex-shrink-0 ${
                    voiceState.isListening
                      ? "bg-red-600 hover:bg-red-700"
                      : "bg-[#c4943a] hover:bg-[#d4a843] text-[#0a0a0f]"
                  }`}
                >
                  {voiceState.isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                </Button>
              )}

              {/* Text Input */}
              <div className="flex-1 flex items-center bg-[#111827] border border-[#c4943a]/20 rounded-full px-4 py-2">
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      sendMessage(inputText);
                    }
                  }}
                  placeholder={
                    voiceState.isOnCall
                      ? "Listening... (type to override)"
                      : "Ask about RCM, denials, appeals..."
                  }
                  className="flex-1 bg-transparent text-sm text-[#f5f5f5] placeholder:text-[#a3a3a3]/50 focus:outline-none"
                  disabled={voiceState.isProcessing}
                />
                <Button
                  onClick={() => sendMessage(inputText)}
                  disabled={!inputText.trim() || voiceState.isProcessing}
                  variant="ghost"
                  size="icon"
                  className="text-[#c4943a] hover:text-[#d4a843] h-6 w-6 ml-2"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>

              {/* Call Mode Toggle */}
              <Button
                onClick={toggleCall}
                disabled={voiceState.isProcessing}
                variant="outline"
                className={`rounded-full w-12 h-12 p-0 flex-shrink-0 ${
                  voiceState.isOnCall
                    ? "border-green-500/50 text-green-500"
                    : "border-[#c4943a]/30 text-[#c4943a]"
                }`}
              >
                {voiceState.isOnCall ? <PhoneOff className="w-4 h-4" /> : <Phone className="w-4 h-4" />}
              </Button>
            </div>

            {/* Status bar */}
            <div className="flex items-center justify-center gap-4 mt-2">
              <span className="text-[10px] text-[#a3a3a3]">
                {voiceState.isOnCall
                  ? "Tap 🎤 to mute • Tap 📞 to end call"
                  : "Tap 🎤 to speak • Tap 📞 for call mode"}
              </span>
              {voiceState.isSpeaking && (
                <button
                  onClick={() => {
                    window.speechSynthesis?.cancel();
                    if (currentAudioRef.current) currentAudioRef.current.pause();
                    setVoiceState((prev) => ({ ...prev, isSpeaking: false }));
                  }}
                  className="text-[10px] text-[#c4943a] hover:underline"
                >
                  Stop speaking
                </button>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
