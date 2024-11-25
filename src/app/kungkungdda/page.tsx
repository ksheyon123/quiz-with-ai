'use client'

import { RefObject, useEffect, useRef, useState } from 'react'

interface ChatMessage {
  id: number
  text: string
  isMine: boolean
}

export default function ChatPage() {
  const viewRef = useRef<HTMLDivElement>();

  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [inputText, setInputText] = useState('')
  const [lastMessageId, setLastMessageId] = useState<number | null>(null);

  // 마지막 메시지 ID가 변경될 때마다 스크롤을 아래로 이동
  useEffect(() => {
    if (viewRef.current && lastMessageId !== null) {
      const scrollContainer = viewRef.current.querySelector('.overflow-y-auto');
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  }, [lastMessageId]);

  const handleSendMessage = () => {
    if (inputText.trim()) {
      const newMessageId = Date.now();
      setMessages([...messages, {
        id: newMessageId,
        text: inputText,
        isMine: true
      }])
      setLastMessageId(newMessageId);
      setInputText('');
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  }

  return (
    <div className="w-full h-screen bg-gray-100 flex items-center justify-center">
      <div ref={viewRef as RefObject<HTMLDivElement>} className="w-[400px] h-[600px] bg-white rounded-3xl shadow-lg flex flex-col p-5">
        {/* 메시지 목록 - scrollbar-hide 클래스 추가 */}
        <div className="flex-1 overflow-y-auto scrollbar-hide mb-5">
          {messages.map((message) => (
            <div 
              key={message.id} 
              className={`flex mb-3 ${message.isMine ? 'justify-end' : 'justify-start'}`}
            >
              <div 
                className={`max-w-[300px] p-3 rounded-2xl break-words
                  ${message.isMine 
                    ? 'bg-yellow-200 text-gray-800' 
                    : 'bg-sky-200 text-gray-800'
                  }`}
              >
                {message.text}
              </div>
            </div>
          ))}
        </div>

        {/* 입력 영역 */}
        <div className="flex gap-2 bg-white p-3 rounded-2xl shadow-md border border-gray-200">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="메시지를 입력하세요..."
            className="flex-1 outline-none text-sm"
          />
          <button 
            onClick={handleSendMessage}
            className="bg-blue-500 text-white px-4 py-2 rounded-xl hover:bg-blue-600 transition-colors"
          >
            전송
          </button>
        </div>
      </div>
    </div>
  )
}
