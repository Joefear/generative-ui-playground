"use client";

import Link from "next/link";
import type { SavedWidget } from "../hooks/useWidgetStorage";

export type ActiveView = "create" | "gallery" | "components" | "icons" | "editor";

interface NavigationSidebarProps {
  activeView: ActiveView;
  onViewChange: (view: ActiveView) => void;
  savedWidgets: SavedWidget[];
  onWidgetSelect: (id: string) => void;
  onWidgetDelete: (id: string) => void;
  onNewWidget: () => void;
  currentWidgetId?: string;
}

/**
 * Left navigation sidebar
 * Contains main nav items and saved widgets list
 */
export function NavigationSidebar({
  activeView,
  onViewChange,
  savedWidgets,
  onWidgetSelect,
  onWidgetDelete,
  onNewWidget,
  currentWidgetId,
}: NavigationSidebarProps) {
  const navItems: { id: ActiveView; label: string; icon: string }[] = [
    { id: "create", label: "Create", icon: "add" },
    { id: "gallery", label: "Gallery", icon: "grid_view" },
    { id: "components", label: "Components", icon: "widgets" },
    { id: "icons", label: "Icons", icon: "emoji_symbols" },
  ];

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-gray-100">
        <Link href="/" className="text-gray-400 hover:text-gray-600 text-sm flex items-center gap-1 mb-2">
          <span className="material-symbols-outlined text-sm">arrow_back</span>
          Back to Demo
        </Link>
        <h1 className="text-lg font-semibold text-gray-800">Widget Builder</h1>
      </div>

      {/* Main navigation */}
      <nav className="p-2">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onViewChange(item.id)}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
              activeView === item.id
                ? "bg-[#f2efff] text-[#383b99]"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            <span className="material-symbols-outlined text-xl">{item.icon}</span>
            {item.label}
          </button>
        ))}
      </nav>

      {/* Divider */}
      <div className="border-t border-gray-100 mx-4 my-2" />

      {/* Saved widgets */}
      <div className="flex-1 overflow-y-auto px-2">
        <div className="flex items-center justify-between px-2 py-2">
          <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
            My Widgets
          </span>
          <button
            onClick={onNewWidget}
            className="text-[#383b99] hover:text-[#2c2e8d]"
            title="New Widget"
          >
            <span className="material-symbols-outlined text-lg">add</span>
          </button>
        </div>

        {savedWidgets.length === 0 ? (
          <div className="px-3 py-4 text-sm text-gray-400 text-center">
            No saved widgets yet.
            <br />
            Create one to get started!
          </div>
        ) : (
          <div className="space-y-1">
            {savedWidgets.map((widget) => (
              <div
                key={widget.id}
                className={`group flex items-center gap-2 px-3 py-2 rounded-lg text-sm cursor-pointer transition-colors ${
                  currentWidgetId === widget.id
                    ? "bg-[#f2efff] text-[#383b99]"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
                onClick={() => onWidgetSelect(widget.id)}
              >
                <span className="material-symbols-outlined text-lg">description</span>
                <span className="flex-1 truncate">{widget.name}</span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    if (confirm(`Delete "${widget.name}"?`)) {
                      onWidgetDelete(widget.id);
                    }
                  }}
                  className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-500 transition-opacity"
                  title="Delete widget"
                >
                  <span className="material-symbols-outlined text-sm">delete</span>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-gray-100">
        <a
          href="https://docs.copilotkit.ai/a2a/generative-ui/declarative-a2ui"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-sm text-gray-500 hover:text-[#383b99] transition-colors"
        >
          <span className="material-symbols-outlined text-lg">help</span>
          A2UI Documentation
        </a>
      </div>
    </div>
  );
}
