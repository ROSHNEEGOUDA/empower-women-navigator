import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { MessageCircle, Send, X, Bot, User, Globe } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export const ChatbotAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<any[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const { language, setLanguage, t } = useLanguage();

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'hi', name: 'हिंदी' },
    { code: 'te', name: 'తెలుగు' },
  ];

  const quickActions = [
    { text: t('findSchemes'), action: "schemes" },
    { text: t('checkEligibility'), action: "loans" },
    { text: t('msmeHelp'), action: "msme" },
    { text: t('connectSHG'), action: "shg" },
  ];

  React.useEffect(() => {
    const initialMessage = {
      type: 'bot',
      content: `Hello! I'm your financial assistant. I can help you with navigation, MSME information, scheme lookups, loan FAQs, and support in multiple languages. How can I assist you today?`,
      timestamp: new Date(),
    };
    setMessages([initialMessage]);
  }, [language]);

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      type: 'user',
      content: inputMessage,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);

    // Simulate bot response
    setTimeout(() => {
      let botResponse = "";
      const lowerInput = inputMessage.toLowerCase();

      if (lowerInput.includes('scheme') || lowerInput.includes('government')) {
        botResponse = "I can help you find government schemes! Based on your location and loan type, I recommend checking the Pradhan Mantri Mudra Yojana and Stand-Up India schemes. Would you like me to guide you to the schemes section?";
      } else if (lowerInput.includes('loan') || lowerInput.includes('eligibility')) {
        botResponse = "For loan eligibility, I'll need some information about your CIBIL score, employment type, and monthly income. The Loan Generator section can provide personalized recommendations. Shall I guide you there?";
      } else if (lowerInput.includes('msme') || lowerInput.includes('registration')) {
        botResponse = "MSME registration is now called Udyam Registration. It's a simple online process that takes just a few minutes. You'll need your Aadhaar, PAN, and business details. Would you like step-by-step guidance?";
      } else if (lowerInput.includes('shg') || lowerInput.includes('community')) {
        botResponse = "Self Help Groups are a great way to connect with other women entrepreneurs! I can help you find local SHGs, upcoming events, and mentorship opportunities. Check out the SHG Community section.";
      } else {
        botResponse = "I'm here to help with navigation, MSME info, scheme lookups, and loan FAQs. You can also ask me about connecting with SHGs or any financial guidance you need. What specific area would you like help with?";
      }

      const botMessage = {
        type: 'bot',
        content: botResponse,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
    }, 1000);

    setInputMessage('');
  };

  const handleQuickAction = (action: string) => {
    let message = "";
    switch (action) {
      case "schemes":
        message = "Help me find government schemes";
        break;
      case "loans":
        message = "Check my loan eligibility";
        break;
      case "msme":
        message = "Help with MSME registration";
        break;
      case "shg":
        message = "Connect me with SHGs";
        break;
    }
    setInputMessage(message);
  };

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 w-14 h-14 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 shadow-lg z-50"
      >
        <MessageCircle className="w-6 h-6 text-white" />
      </Button>
    );
  }

  return (
    <Card
      className="
        fixed bottom-4 right-4
        w-[90vw] max-w-md
        h-[70vh] md:h-[500px]
        shadow-2xl z-50
        bg-white border-pink-200
        rounded-lg flex flex-col
      "
    >
      <CardHeader className="bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-t-lg">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Bot className="w-6 h-6" />
            <div>
              <CardTitle className="text-lg">{t('chatbotTitle')}</CardTitle>
              <div className="flex items-center space-x-2">
                <Globe className="w-4 h-4" />
                <span className="text-sm">{languages.find(l => l.code === language)?.name}</span>
              </div>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsOpen(false)}
            className="text-white hover:bg-white/20"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="flex flex-col h-full p-0">
        {/* Language Selector */}
        <div className="p-2 border-b bg-gray-50">
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value as any)}
            className="text-xs w-full bg-white border border-gray-200 rounded px-2 py-1"
          >
            {languages.map((lang) => (
              <option key={lang.code} value={lang.code}>{lang.name}</option>
            ))}
          </select>
        </div>

        {/* Messages */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`flex items-start space-x-2 max-w-[80%] ${
                  message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    message.type === 'user' ? 'bg-purple-100' : 'bg-pink-100'
                  }`}
                >
                  {message.type === 'user' ? (
                    <User className="w-4 h-4 text-purple-600" />
                  ) : (
                    <Bot className="w-4 h-4 text-pink-600" />
                  )}
                </div>
                <div
                  className={`rounded-lg p-3 text-sm ${
                    message.type === 'user'
                      ? 'bg-purple-500 text-white'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {message.content}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="p-2 border-t bg-gray-50">
          <div className="flex flex-wrap gap-1">
            {quickActions.map((action, index) => (
              <Badge
                key={index}
                variant="outline"
                className="cursor-pointer hover:bg-pink-50 text-xs"
                onClick={() => handleQuickAction(action.action)}
              >
                {action.text}
              </Badge>
            ))}
          </div>
        </div>

        {/* Input */}
        <div className="p-4 border-t">
          <div className="flex space-x-2">
            <Input
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder={t('chatbotPlaceholder')}
              className="flex-1 border-pink-200 focus:border-pink-400"
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            />
            <Button
              onClick={handleSendMessage}
              size="sm"
              className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
