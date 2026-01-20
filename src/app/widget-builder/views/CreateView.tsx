"use client";

import { useState } from "react";

interface CreateViewProps {
  onCreateRequest: (description: string) => void;
  onStartBlank: () => void;
}

/**
 * Create View - AI-powered widget creation
 * "Describe your A2UI widget..." prompt with Create button
 */
export function CreateView({ onCreateRequest, onStartBlank }: CreateViewProps) {
  const [description, setDescription] = useState("");

  const handleCreate = () => {
    if (description.trim()) {
      onCreateRequest(description.trim());
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
      handleCreate();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] p-8 relative">
      {/* Gradient background effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-20 w-64 h-64 bg-[#c0c1ff]/30 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-20 w-64 h-64 bg-[#e1e0ff]/40 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-2xl">
        <h1 className="text-3xl font-semibold text-gray-800 text-center mb-2">
          What would you like to build?
        </h1>
        <p className="text-gray-500 text-center mb-8">
          Describe your widget and let AI generate the A2UI components for you.
        </p>

        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-1">
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Describe your A2UI widget... (e.g., A user profile card with avatar, name, bio, and follow button)"
            className="w-full h-32 p-4 text-gray-800 placeholder-gray-400 resize-none focus:outline-none rounded-xl"
          />
          <div className="flex items-center justify-between px-4 py-2 border-t border-gray-50">
            <span className="text-xs text-gray-400">
              Press ⌘+Enter to create
            </span>
            <button
              onClick={handleCreate}
              disabled={!description.trim()}
              className="px-6 py-2 bg-[#383b99] text-white rounded-xl font-medium
                hover:bg-[#2c2e8d] disabled:opacity-50 disabled:cursor-not-allowed
                transition-colors"
            >
              Create
            </button>
          </div>
        </div>

        <div className="text-center mt-6">
          <span className="text-gray-400 text-sm">or</span>
          <button
            onClick={onStartBlank}
            className="ml-2 text-[#383b99] hover:text-[#2c2e8d] text-sm font-medium"
          >
            Start Blank →
          </button>
        </div>

        {/* Example prompts */}
        <div className="mt-12">
          <p className="text-gray-500 text-sm text-center mb-4">Try these examples:</p>
          <div className="flex flex-wrap gap-2 justify-center">
            {[
              "Contact form with name, email, and message",
              "Product card with image, price, and buy button",
              "Weather widget showing temperature and conditions",
              "User profile with avatar and social stats",
            ].map((example) => (
              <button
                key={example}
                onClick={() => setDescription(example)}
                className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-full text-sm text-gray-600 transition-colors"
              >
                {example}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
