"use client";

import { useState } from "react";
import { componentDocs, componentsByCategory, type ComponentDoc } from "../data/components-docs";

/**
 * Components View - A2UI component documentation
 * Left sidebar with categories, main area with component details
 */
export function ComponentsView() {
  const [selectedComponent, setSelectedComponent] = useState<ComponentDoc | null>(
    componentDocs[0]
  );

  const categories = Object.keys(componentsByCategory);

  return (
    <div className="flex h-full">
      {/* Category sidebar */}
      <div className="w-56 border-r border-gray-200 bg-gray-50 overflow-y-auto">
        <div className="p-4">
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
            Components
          </h3>
          {categories.map((category) => (
            <div key={category} className="mb-4">
              <h4 className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-2">
                {category}
              </h4>
              <ul className="space-y-1">
                {componentsByCategory[category].map((doc) => (
                  <li key={doc.name}>
                    <button
                      onClick={() => setSelectedComponent(doc)}
                      className={`w-full text-left px-3 py-1.5 rounded-lg text-sm transition-colors ${
                        selectedComponent?.name === doc.name
                          ? "bg-[#383b99] text-white"
                          : "text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      {doc.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Component documentation */}
      <div className="flex-1 overflow-y-auto p-6">
        {selectedComponent ? (
          <ComponentDocumentation doc={selectedComponent} />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400">
            Select a component to view documentation
          </div>
        )}
      </div>
    </div>
  );
}

interface ComponentDocumentationProps {
  doc: ComponentDoc;
}

function ComponentDocumentation({ doc }: ComponentDocumentationProps) {
  const [showJson, setShowJson] = useState(false);
  const [copyStatus, setCopyStatus] = useState<"idle" | "success" | "error">("idle");

  const handleCopyJson = async () => {
    try {
      await navigator.clipboard.writeText(JSON.stringify(doc.example, null, 2));
      setCopyStatus("success");
      setTimeout(() => setCopyStatus("idle"), 2000);
    } catch (error) {
      console.error("Failed to copy to clipboard:", error);
      setCopyStatus("error");
      setTimeout(() => setCopyStatus("idle"), 2000);
    }
  };

  return (
    <div className="max-w-3xl">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-2">
          <h2 className="text-2xl font-semibold text-gray-800">{doc.name}</h2>
          <span className="px-2 py-0.5 bg-gray-100 rounded text-xs text-gray-500">
            {doc.category}
          </span>
        </div>
        <p className="text-gray-600">{doc.description}</p>
      </div>

      {/* Example preview */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
            Example
          </h3>
          <button
            onClick={() => setShowJson(!showJson)}
            className="text-sm text-[#383b99] hover:text-[#2c2e8d]"
          >
            {showJson ? "Hide JSON" : "Show JSON"}
          </button>
        </div>

        {/* Preview placeholder */}
        <div className="bg-gradient-to-br from-[#f2efff] to-[#e1e0ff] rounded-xl p-6 min-h-[120px] flex items-center justify-center">
          <span className="text-[#383b99]/60 text-sm">
            Preview: {doc.name} component
          </span>
        </div>

        {showJson && (
          <pre className="mt-2 p-4 bg-gray-900 text-gray-100 rounded-xl text-sm overflow-x-auto">
            {JSON.stringify(doc.example, null, 2)}
          </pre>
        )}
      </div>

      {/* Props table */}
      {doc.props.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
            Props
          </h3>
          <div className="border border-gray-200 rounded-xl overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left px-4 py-2 font-medium text-gray-600">Name</th>
                  <th className="text-left px-4 py-2 font-medium text-gray-600">Type</th>
                  <th className="text-left px-4 py-2 font-medium text-gray-600">Required</th>
                  <th className="text-left px-4 py-2 font-medium text-gray-600">Description</th>
                </tr>
              </thead>
              <tbody>
                {doc.props.map((prop, index) => (
                  <tr
                    key={prop.name}
                    className={index % 2 === 1 ? "bg-gray-50" : ""}
                  >
                    <td className="px-4 py-2">
                      <code className="text-[#383b99] font-mono">{prop.name}</code>
                    </td>
                    <td className="px-4 py-2">
                      <code className="text-gray-600 font-mono text-xs">{prop.type}</code>
                    </td>
                    <td className="px-4 py-2">
                      {prop.required ? (
                        <span className="text-green-600">Yes</span>
                      ) : (
                        <span className="text-gray-400">No</span>
                      )}
                    </td>
                    <td className="px-4 py-2 text-gray-600">
                      {prop.description}
                      {prop.default && (
                        <span className="block text-xs text-gray-400 mt-1">
                          Default: {prop.default}
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Copy JSON button */}
      <div className="mt-6 flex gap-2">
        <button
          onClick={handleCopyJson}
          className={`px-4 py-2 rounded-lg text-sm transition-colors ${
            copyStatus === "success"
              ? "bg-green-100 text-green-700"
              : copyStatus === "error"
                ? "bg-red-100 text-red-700"
                : "bg-gray-100 hover:bg-gray-200 text-gray-700"
          }`}
        >
          {copyStatus === "success"
            ? "Copied!"
            : copyStatus === "error"
              ? "Failed to copy"
              : "Copy Example JSON"}
        </button>
      </div>
    </div>
  );
}
