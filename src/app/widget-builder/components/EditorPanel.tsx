"use client";

import { useState, useCallback } from "react";
import dynamic from "next/dynamic";
import type { A2UIComponent } from "../hooks/useWidgetStorage";
import { WidgetPreview } from "./WidgetPreview";

// Dynamic import for Monaco to avoid SSR issues
const Editor = dynamic(() => import("@monaco-editor/react").then((mod) => mod.default), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-full bg-gray-900 text-gray-400">
      Loading editor...
    </div>
  ),
});

type EditorTab = "components" | "data";

interface EditorPanelProps {
  widgetName: string;
  components: A2UIComponent[];
  data: Record<string, unknown>;
  onNameChange: (name: string) => void;
  onComponentsChange: (components: A2UIComponent[]) => void;
  onDataChange: (data: Record<string, unknown>) => void;
  onSave: () => void;
}

/**
 * Editor Panel - Preview + Monaco JSON editors
 * Split view with live preview on left and dual JSON editors on right
 */
export function EditorPanel({
  widgetName,
  components,
  data,
  onNameChange,
  onComponentsChange,
  onDataChange,
  onSave,
}: EditorPanelProps) {
  const [activeTab, setActiveTab] = useState<EditorTab>("components");
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(widgetName);
  const [copySuccess, setCopySuccess] = useState(false);

  // JSON strings for editors
  const componentsJson = JSON.stringify(components, null, 2);
  const dataJson = JSON.stringify(data, null, 2);

  // Handle component JSON changes
  const handleComponentsChange = useCallback(
    (value: string | undefined) => {
      if (!value) return;
      try {
        const parsed = JSON.parse(value);
        if (Array.isArray(parsed)) {
          onComponentsChange(parsed);
        }
      } catch {
        // Invalid JSON, ignore
      }
    },
    [onComponentsChange]
  );

  // Handle data JSON changes
  const handleDataChange = useCallback(
    (value: string | undefined) => {
      if (!value) return;
      try {
        const parsed = JSON.parse(value);
        if (typeof parsed === "object" && parsed !== null && !Array.isArray(parsed)) {
          onDataChange(parsed);
        }
      } catch {
        // Invalid JSON, ignore
      }
    },
    [onDataChange]
  );

  // Copy JSON to clipboard
  const handleCopy = async () => {
    const widgetJson = JSON.stringify({ components, data }, null, 2);
    try {
      await navigator.clipboard.writeText(widgetJson);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  // Download JSON file
  const handleDownload = () => {
    const widgetJson = JSON.stringify({ components, data }, null, 2);
    const blob = new Blob([widgetJson], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${widgetName.replace(/\s+/g, "-").toLowerCase()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Save widget name
  const handleNameSave = () => {
    onNameChange(editName);
    setIsEditing(false);
  };

  return (
    <div className="flex flex-col h-full bg-white overflow-hidden">
      {/* Top toolbar */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 bg-gray-50">
        <div className="flex items-center gap-2">
          {isEditing ? (
            <input
              type="text"
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              onBlur={handleNameSave}
              onKeyDown={(e) => e.key === "Enter" && handleNameSave()}
              autoFocus
              className="px-2 py-1 border border-[#383b99] rounded text-lg font-semibold focus:outline-none"
            />
          ) : (
            <button
              onClick={() => {
                setEditName(widgetName);
                setIsEditing(true);
              }}
              className="text-lg font-semibold text-gray-800 hover:text-[#383b99] flex items-center gap-1"
            >
              {widgetName}
              <span className="material-symbols-outlined text-sm text-gray-400">edit</span>
            </button>
          )}
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className="flex items-center gap-1 px-3 py-1.5 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <span className="material-symbols-outlined text-sm">
              {copySuccess ? "check" : "content_copy"}
            </span>
            {copySuccess ? "Copied!" : "Copy JSON"}
          </button>
          <button
            onClick={handleDownload}
            className="flex items-center gap-1 px-3 py-1.5 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <span className="material-symbols-outlined text-sm">download</span>
            Download
          </button>
          <button
            onClick={onSave}
            className="flex items-center gap-1 px-4 py-1.5 text-sm bg-[#383b99] text-white hover:bg-[#2c2e8d] rounded-lg transition-colors"
          >
            <span className="material-symbols-outlined text-sm">save</span>
            Save
          </button>
        </div>
      </div>

      {/* Main content - split view */}
      <div className="flex-1 flex overflow-hidden">
        {/* Preview panel */}
        <div className="flex-1 border-r border-gray-200 overflow-auto bg-gradient-to-br from-[#fafafa] to-[#f5f5f5]">
          <div className="p-6">
            <div className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-4">
              Preview
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 min-h-[200px]">
              <WidgetPreview components={components} data={data} />
            </div>
          </div>
        </div>

        {/* Editor panel */}
        <div className="w-[400px] flex flex-col">
          {/* Tabs */}
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => setActiveTab("components")}
              className={`flex-1 px-4 py-2 text-sm font-medium transition-colors ${
                activeTab === "components"
                  ? "text-[#383b99] border-b-2 border-[#383b99] bg-white"
                  : "text-gray-500 hover:text-gray-700 bg-gray-50"
              }`}
            >
              Components
            </button>
            <button
              onClick={() => setActiveTab("data")}
              className={`flex-1 px-4 py-2 text-sm font-medium transition-colors ${
                activeTab === "data"
                  ? "text-[#383b99] border-b-2 border-[#383b99] bg-white"
                  : "text-gray-500 hover:text-gray-700 bg-gray-50"
              }`}
            >
              Data
            </button>
          </div>

          {/* Monaco editor */}
          <div className="flex-1">
            {activeTab === "components" ? (
              <Editor
                height="100%"
                defaultLanguage="json"
                value={componentsJson}
                onChange={handleComponentsChange}
                theme="vs-dark"
                options={{
                  minimap: { enabled: false },
                  fontSize: 13,
                  lineNumbers: "on",
                  scrollBeyondLastLine: false,
                  automaticLayout: true,
                  tabSize: 2,
                  wordWrap: "on",
                }}
              />
            ) : (
              <Editor
                height="100%"
                defaultLanguage="json"
                value={dataJson}
                onChange={handleDataChange}
                theme="vs-dark"
                options={{
                  minimap: { enabled: false },
                  fontSize: 13,
                  lineNumbers: "on",
                  scrollBeyondLastLine: false,
                  automaticLayout: true,
                  tabSize: 2,
                  wordWrap: "on",
                }}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
