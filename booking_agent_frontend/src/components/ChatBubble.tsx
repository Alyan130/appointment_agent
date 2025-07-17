"use client"

import React, { useState, useRef, useEffect } from 'react';

interface BookingData {
  fullName: string;
  email: string;
  date: string;
  startTime: string;
  endTime: string;
  serviceTitle: string;
}

interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
}

interface BookingChatBubbleProps {
  apiEndpoint?: string;
}

const BookingChatBubble: React.FC<BookingChatBubbleProps> = ({ 
  apiEndpoint = 'https://appointment-agent.up.railway.app/' 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'assistant',
      content: '👋 Hello! I\'m your Appointment Booking Agent. How can I help you today?',
    }
  ]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [formData, setFormData] = useState<BookingData>({
    fullName: '',
    email: '',
    date: '',
    startTime: '',
    endTime: '',
    serviceTitle: ''
  });

  const chatRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);


  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };


  const handleMessageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentMessage(e.target.value);
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: currentMessage,
    };

    setMessages(prev => [...prev, userMessage]);
    setCurrentMessage('');
    setIsLoading(true);

    
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: getAssistantResponse(currentMessage),
      };
      setMessages(prev => [...prev, assistantMessage]);
      setIsLoading(false);
    }, 1000);
  };


  const getAssistantResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('book') || lowerMessage.includes('appointment') || lowerMessage.includes('meeting')) {
      setTimeout(() => setShowBookingForm(true), 500);
      return 'Great! I can help you book an appointment. Please fill out the booking form that will appear below.';
    } else if (lowerMessage.includes('cancel') || lowerMessage.includes('reschedule')) {
      return 'I understand you want to cancel or reschedule. Please provide your booking reference number, and I\'ll help you with that.';
    } else if (lowerMessage.includes('time') || lowerMessage.includes('available')) {
      return 'I can help you check available time slots. What date are you looking for?';
    } else if (lowerMessage.includes('service') || lowerMessage.includes('what')) {
      return 'We offer various services including consultations, meetings, and appointments. What type of service are you interested in?';
    } else if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
      return 'Hello! How can I assist you with your appointment booking today?';
    } else {
      return 'I\'m here to help with appointment bookings. You can ask me to book an appointment, check availability, or reschedule existing bookings. How can I help you?';
    }
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch(apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        const successMessage: Message = {
          id: Date.now().toString(),
          type: 'assistant',
          content: '✅ Perfect! Your appointment has been booked successfully. Cofirmation will be sent to you via email.',
        };
        setMessages(prev => [...prev, successMessage]);
        setShowBookingForm(false);
        
        setFormData({
          fullName: '',
          email: '',
          date: '',
          startTime: '',
          endTime: '',
          serviceTitle: ''
        });
      } else {
        throw new Error('Booking failed');
      }
    } catch (error) {
      console.error('Error:', error);
      const errorMessage: Message = {
        id: Date.now().toString(),
        type: 'assistant',
        content: 'Sorry, there was an error booking your appointment. Please try again or contact support.',
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  
  const handleOpen = () => {
    setIsOpen(true);
  };

  
  const handleClose = () => {
    setIsOpen(false);
    setShowBookingForm(false);
  };


  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (chatRef.current && !chatRef.current.contains(event.target as Node)) {
        if (isOpen) {
          handleClose();
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  return (
    <div ref={chatRef} className="fixed bottom-6 right-6 z-50">
    
      <button
        onClick={handleOpen}
        className="bg-gradient-to-r from-blue-500 to-blue-400 text-white px-6 py-3 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center space-x-2"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-3.582 8-8 8a8.955 8.955 0 01-4.126-.956L3 21l1.956-5.874A8.955 8.955 0 013 12c0-4.418 3.582-8 8-8s8 3.582 8 8z"></path>
        </svg>
        <span className="font-medium">Book Meeting</span>
      </button>

     
      <div
        className={`absolute bottom-20 max-h-[700px] right-0 w-[405px] max-w-[calc(100vw-2rem)] bg-white rounded-lg shadow-2xl  border transform transition-all duration-300 origin-bottom-right ${
          isOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
        }`}
      >
      
        <div className="flex justify-between items-center p-4 border-b bg-gradient-to-r from-blue-500 to-blue-400 rounded-t-lg">
          <h3 className="text-white font-semibold">Booking Assistant</h3>
          <button
            onClick={handleClose}
            className="text-white hover:text-gray-200 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>

       
        <div className="h-80 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                  message.type === 'user'
                    ? 'bg-gradient-to-r from-blue-400 to-blue-300 text-white'
                    : 'bg-gray-100 text-gray-800'
                }`}
              >
                <p className="text-sm">{message.content}</p>
                <p className={`text-xs mt-1 ${
                  message.type === 'user' ? 'text-blue-100' : 'text-gray-500'
                }`}>
                </p>
              </div>
            </div>
          ))}
          
          
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-gray-100 rounded-lg px-4 py-2">
                <div className="flex items-center space-x-2">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                  <span className="text-xs text-gray-500">Typing...</span>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        
        {showBookingForm && (
          <div className="border-t p-4 bg-gray-50">
            <h4 className="font-medium text-gray-800 mb-3">Booking Form</h4>
            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  name="fullName"
                  placeholder="Full Name"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  required
                  className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="time"
                  name="startTime"
                  value={formData.startTime}
                  onChange={handleInputChange}
                  required
                  className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <input
                  type="time"
                  name="endTime"
                  value={formData.endTime}
                  onChange={handleInputChange}
                  required
                  className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              
              <input
                type="text"
                name="serviceTitle"
                placeholder="Service / Meeting Title"
                value={formData.serviceTitle}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-blue-400 to-blue-300 text-white py-2 px-4 rounded-md hover:from-blue-500 hover:to-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200 font-medium text-sm disabled:opacity-50"
              >
                {isLoading ? 'Booking...' : 'Book Now'}
              </button>
            </form>
          </div>
        )}

    
        <div className="border-t p-4">
          <form onSubmit={handleSendMessage} className="flex space-x-2">
            <input
              type="text"
              value={currentMessage}
              onChange={handleMessageChange}
              placeholder="Type your message..."
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
            />
            <button
              type="submit"
              disabled={isLoading || !currentMessage.trim()}
              className="bg-gradient-to-r from-blue-400 to-blue-300 text-white px-4 py-2 rounded-md hover:from-blue-500 hover:to-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200 disabled:opacity-50"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
              </svg>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookingChatBubble;