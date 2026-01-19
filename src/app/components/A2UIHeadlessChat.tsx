/**
 * A2UIHeadlessChat - Custom headless chat for A2UI mode
 *
 * Uses useAgent from @copilotkitnext/react to avoid the subscribe error
 * that occurs with the CopilotChat component when using A2AAgent.
 * Also uses useRenderActivityMessage to render A2UI activity messages.
 */

"use client";

import { useState, useRef, useEffect } from "react";
import { useAgent, UseAgentUpdate, useRenderActivityMessage } from "@copilotkitnext/react";

export function A2UIHeadlessChat() {
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // useAgent provides lower-level control over the agent
  const { agent } = useAgent({
    updates: [UseAgentUpdate.OnMessagesChanged],
  });

  // Hook to render activity messages (A2UI, tool calls, etc.)
  const renderActivityMessage = useRenderActivityMessage();

  const messages = agent?.messages || [];
  const isLoading = agent?.isRunning || false;

  // Debug: log messages to see what's coming through
  useEffect(() => {
    if (messages.length > 0) {
      console.log("[A2UIHeadlessChat] Messages:", messages);
      messages.forEach((m, i) => {
        console.log(`[A2UIHeadlessChat] Message ${i}:`, {
          role: m.role,
          type: (m as any).type,
          content: typeof m.content,
          hasGenerativeUI: !!(m as any).generativeUI,
          keys: Object.keys(m),
        });
      });
    }
  }, [messages]);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading || !agent) return;

    const message = input.trim();
    setInput("");

    // Add user message and run agent
    agent.addMessage({
      id: crypto.randomUUID(),
      role: "user",
      content: message,
    });

    await agent.runAgent({});
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Messages area */}
      <div className="flex-1 overflow-auto p-4 space-y-4">
        {messages.length === 0 && (
          <div className="text-gray-500 text-center mt-8">
            Ask me to find restaurants or make a reservation!
          </div>
        )}

        {messages.map((message) => {
          // Activity messages have role: "activity" (not type)
          if (message.role === "activity") {
            // Render activity message using the hook-provided renderer
            const activityEl = renderActivityMessage(message as any);
            if (activityEl) {
              return (
                <div key={message.id} className="flex justify-start">
                  <div className="max-w-[90%]">
                    {activityEl}
                  </div>
                </div>
              );
            }
            // If no renderer matched, show debug info
            console.log("[A2UIHeadlessChat] No renderer for activity:", message);
            return null;
          }

          // Regular user/assistant message
          return (
            <div
              key={message.id}
              className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[80%] rounded-lg p-3 ${
                  message.role === "user"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-100 text-gray-900"
                }`}
              >
                {/* Render text content (only if string) */}
                {typeof message.content === "string" && message.content && (
                  <p>{message.content}</p>
                )}

                {/* Render generative UI if present */}
                {message.role === "assistant" &&
                  typeof (message as any).generativeUI === "function" &&
                  (message as any).generativeUI()}
              </div>
            </div>
          );
        })}

        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-gray-100 rounded-lg p-3 text-gray-500">
              <span className="animate-pulse">Thinking...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input area */}
      <div className="border-t border-gray-200 p-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask me to find restaurants or make a reservation!"
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={isLoading}
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Send
          </button>
        </div>
        <p className="text-xs text-gray-500 mt-2 text-center">
          AI can make mistakes. Please verify important information.
        </p>
      </div>
    </div>
  );
}
