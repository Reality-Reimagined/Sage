import React from 'react';
import { User, Bot } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface ChatMessageProps {
  message: {
    type: 'user' | 'ai';
    content: string;
    timestamp: string;
  };
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.type === 'user';

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      <div
        className={`flex max-w-[80%] ${
          isUser ? 'flex-row-reverse' : 'flex-row'
        } items-start space-x-2`}
      >
        <div
          className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
            isUser ? 'bg-indigo-100 ml-2' : 'bg-gray-100 mr-2'
          }`}
        >
          {isUser ? (
            <User className="h-5 w-5 text-indigo-600" />
          ) : (
            <Bot className="h-5 w-5 text-gray-600" />
          )}
        </div>
        <div
          className={`rounded-lg p-3 ${
            isUser
              ? 'bg-indigo-600 text-white'
              : 'bg-gray-100 text-gray-800'
          }`}
        >
          <div className="text-sm markdown-content">
            <ReactMarkdown 
              remarkPlugins={[remarkGfm]}
              components={{
                p: ({node, ...props}) => <p className="mb-2 last:mb-0" {...props} />,
                strong: ({node, ...props}) => <strong className="font-bold" {...props} />,
                em: ({node, ...props}) => <em className="italic" {...props} />,
                h1: ({node, ...props}) => <h1 className="text-xl font-bold mb-2" {...props} />,
                h2: ({node, ...props}) => <h2 className="text-lg font-bold mb-2" {...props} />,
                h3: ({node, ...props}) => <h3 className="text-base font-bold mb-2" {...props} />,
                ul: ({node, ...props}) => <ul className="list-disc ml-4 mb-2" {...props} />,
                ol: ({node, ...props}) => <ol className="list-decimal ml-4 mb-2" {...props} />,
                li: ({node, ...props}) => <li className="mb-1" {...props} />,
                blockquote: ({node, ...props}) => (
                  <blockquote 
                    className={`border-l-4 pl-3 my-2 ${
                      isUser ? 'border-white/30' : 'border-gray-300'
                    }`} 
                    {...props} 
                  />
                ),
                code: ({node, inline, ...props}) => 
                  inline ? (
                    <code 
                      className={`px-1 rounded ${
                        isUser ? 'bg-white/20' : 'bg-gray-200'
                      }`} 
                      {...props}
                    />
                  ) : (
                    <code 
                      className={`block p-2 rounded my-2 ${
                        isUser ? 'bg-white/20' : 'bg-gray-200'
                      }`} 
                      {...props}
                    />
                  ),
              }}
            >
              {message.content}
            </ReactMarkdown>
          </div>
          <span className="text-xs opacity-70 mt-1 block">
            {new Date(message.timestamp).toLocaleTimeString()}
          </span>
        </div>
      </div>
    </div>
  );
}