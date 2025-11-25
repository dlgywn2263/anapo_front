"use client";

import React, { useState, useRef, useEffect } from "react";
import { Send, Paperclip, Phone } from "lucide-react";
import Image from "next/image";

// --- 임시 UI 컴포넌트들 ---
const Card = ({ children, className }: any) => (
  <div className={`bg-white ${className}`}>{children}</div>
);
const CardHeader = ({ children, className }: any) => (
  <div className={`p-4 border-b ${className}`}>{children}</div>
);
const CardContent = ({ children, className }: any) => (
  <div className={`p-4 ${className}`}>{children}</div>
);
const Input = (props: React.InputHTMLAttributes<HTMLInputElement>) => (
  <input
    className={`border rounded px-3 py-2 w-full ${props.className}`}
    {...props}
  />
);
const Button = ({ children, className, ...props }: any) => (
  <button
    className={`px-4 py-2 rounded font-medium transition-colors bg-[#5CA0FF] text-white hover:bg-blue-600 ${className}`}
    {...props}
  >
    {children}
  </button>
);
const Avatar = ({ children, className }: any) => (
  <div
    className={`relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full ${className}`}
  >
    {children}
  </div>
);
const AvatarImage = (props: React.ComponentProps<typeof Image>) => {
  const { alt, ...rest } = props;
  return <Image className="aspect-square h-full w-full" alt={alt} {...rest} />;
};
const AvatarFallback = ({ children, className }: any) => (
  <span
    className={`flex h-full w-full items-center justify-center rounded-full bg-gray-100 ${className}`}
  >
    {children}
  </span>
);
const Badge = ({ children, className }: any) => (
  <div
    className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors ${className}`}
  >
    {children}
  </div>
);
const ScrollArea = ({ children, className }: any) => (
  <div className={`relative h-full overflow-y-auto ${className}`}>
    {children}
  </div>
);

// --- 채팅 기능 코드 ---
interface Message {
  id: string;
  content: string;
  sender: "user" | "agent";
  timestamp: string;
  type: "text";
}
interface Agent {
  id: string;
  name: string;
  department: string;
  status: "online" | "offline" | "busy";
  avatar: string;
}

const mockAgent: Agent = {
  id: "1",
  name: "이지은 상담사",
  department: "고객센터",
  status: "online",
  avatar: "https://images.unsplash.com/photo-1626863905121-3b0c0ed7b94c?w=300",
};

const initialMessages: Message[] = [
  {
    id: "1",
    content:
      "안녕하세요! Anapo 고객센터 이지은 상담사입니다. 무엇을 도와드릴까요?",
    sender: "agent",
    timestamp: "14:20",
    type: "text",
  },
  {
    id: "2",
    content: "안녕하세요. 예약 취소 관련해서 문의드리고 싶습니다.",
    sender: "user",
    timestamp: "14:22",
    type: "text",
  },
  {
    id: "3",
    content:
      "예약 취소 도움드리겠습니다. 예약번호나 예약하신 병원명을 알려주시면 확인해드리겠습니다.",
    sender: "agent",
    timestamp: "14:23",
    type: "text",
  },
];

function Chat() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [newMessage, setNewMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // 파일 입력창
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      console.log("선택된 파일:", file.name);
      // 여기에 파일 업로드 로직 추가 가능
    }
  };

  const handleFileButtonClick = () => {
    fileInputRef.current?.click(); // 숨겨진 input 클릭
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const userMessage: Message = {
        id: Date.now().toString(),
        content: newMessage,
        sender: "user",
        timestamp: new Date().toLocaleTimeString("ko-KR", {
          hour: "2-digit",
          minute: "2-digit",
        }),
        type: "text",
      };
      setMessages([...messages, userMessage]);
      setNewMessage("");
      setIsTyping(true);
      setTimeout(() => {
        const agentResponse: Message = {
          id: (Date.now() + 1).toString(),
          content:
            "네, 말씀해주신 내용을 확인했습니다. 추가로 필요한 정보가 있으시면 언제든지 말씀해 주세요.",
          sender: "agent",
          timestamp: new Date().toLocaleTimeString("ko-KR", {
            hour: "2-digit",
            minute: "2-digit",
          }),
          type: "text",
        };
        setMessages((prev) => [...prev, agentResponse]);
        setIsTyping(false);
      }, 1500);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const getStatusColor = (status: string) =>
    status === "online" ? "bg-green-500" : "bg-gray-500";
  const getStatusText = (status: string) =>
    status === "online" ? "상담 가능" : "오프라인 ";

  return (
    <section className="max-w-4xl mx-auto h-full pt-15">
      <Card className="h-full flex flex-col rounded-xl shadow-md">
        {/* --- 상담사 정보 헤더 --- */}
        <CardHeader className="border-b border-gray-100 p-4 shrink-0 bg-white rounded-t-xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Avatar>
                  <AvatarImage
                    src={mockAgent.avatar}
                    alt={mockAgent.name}
                    width={40}
                    height={40}
                  />
                  <AvatarFallback>상담</AvatarFallback>
                </Avatar>
                <div
                  className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${getStatusColor(
                    mockAgent.status
                  )}`}
                ></div>
              </div>
              <div>
                <h3 className="font-medium text-gray-800">{mockAgent.name}</h3>
                <p className="text-sm text-gray-800">{mockAgent.department}</p>
                <Badge className="text-xs text-gray-800">
                  {getStatusText(mockAgent.status)}
                </Badge>
              </div>
            </div>
            <Button variant="ghost" size="icon">
              <Phone className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>

        {/* --- 채팅 메시지 영역 --- */}
        <CardContent className="flex-1 p-0 overflow-hidden">
          <ScrollArea className="h-full p-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`flex items-end space-x-2 max-w-xs lg:max-w-md ${
                      message.sender === "user"
                        ? "flex-row-reverse space-x-reverse"
                        : ""
                    }`}
                  >
                    {message.sender === "agent" && (
                      <Avatar className="w-8 h-8">
                        <AvatarImage
                          src={mockAgent.avatar}
                          alt={mockAgent.name}
                          width={32}
                          height={32}
                        />
                        <AvatarFallback>상담</AvatarFallback>
                      </Avatar>
                    )}
                    <div
                      className={`rounded-lg px-3 py-2 ${
                        message.sender === "user"
                          ? "bg-[#5CA0FF] text-white"
                          : "bg-gray-100 text-gray-900"
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
                      <span
                        className={`text-xs ${
                          message.sender === "user"
                            ? "text-blue-200"
                            : "text-gray-500"
                        }`}
                      >
                        {message.timestamp}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="flex items-end space-x-2">
                    <Avatar className="w-8 h-8">
                      <AvatarImage
                        src={mockAgent.avatar}
                        alt="agent typing"
                        width={32}
                        height={32}
                      />
                      <AvatarFallback>상담</AvatarFallback>
                    </Avatar>
                    <div className="bg-gray-100 rounded-lg px-3 py-2">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div
                          className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0.1s" }}
                        ></div>
                        <div
                          className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0.2s" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>
        </CardContent>

        {/* --- 입력창 & 버튼 --- */}
        <div className="border-t border-gray-100 p-4 shrink-0 bg-white rounded-b-xl">
          <div className="flex items-center space-x-2">
            {/* 숨겨진 파일 입력창 */}
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={handleFileSelect}
            />

            {/* 파일 첨부 버튼 */}
            <Button variant="ghost" size="icon" onClick={handleFileButtonClick}>
              <Paperclip className="h-4 w-4" />
            </Button>

            {/* 메시지 입력 */}
            <div
              className="flex-1 bg-gray-100 rounded-full flex items-center px-4 py-2 
            focus-within:ring-2 focus-within:ring-blue-400 transition"
            >
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="메시지를 입력하세요..."
                className="flex-1 bg-transparent border-none focus:outline-none text-gray-900 placeholder-gray-500"
              />
            </div>

            {/* 전송 버튼 */}
            <Button onClick={handleSendMessage} disabled={!newMessage.trim()}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Card>
    </section>
  );
}

// --- 최종 페이지 ---
export default function FaqPage() {
  return (
    <main className="bg-gray-50 h-screen overflow-hidden pt-16 p-4 md:p-8">
      <Chat />
    </main>
  );
}
