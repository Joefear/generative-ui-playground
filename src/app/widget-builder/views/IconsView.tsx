"use client";

import { useState } from "react";
import { materialIcons, iconCategories } from "../data/icons";

/**
 * Icons View - Material Icons reference
 * Searchable grid of icons with click-to-copy
 */
export function IconsView() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [copiedIcon, setCopiedIcon] = useState<string | null>(null);

  // Filter icons based on search and category
  const filteredIcons = (() => {
    let icons = materialIcons;

    // Filter by category
    if (selectedCategory && iconCategories[selectedCategory]) {
      icons = iconCategories[selectedCategory];
    }

    // Filter by search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      icons = icons.filter((icon) => icon.toLowerCase().includes(query));
    }

    return icons;
  })();

  const handleCopyIcon = async (iconName: string) => {
    try {
      await navigator.clipboard.writeText(iconName);
      setCopiedIcon(iconName);
      setTimeout(() => setCopiedIcon(null), 2000);
    } catch (err) {
      console.error("Failed to copy icon name:", err);
    }
  };

  const categories = Object.keys(iconCategories);

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">Icons</h2>
        <p className="text-gray-500">
          Click an icon to copy its name. Use with the Icon component:{" "}
          <code className="bg-gray-100 px-1 rounded">{"{ type: \"Icon\", icon: \"star\" }"}</code>
        </p>
      </div>

      {/* Search and filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex-1">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search icons..."
            className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#383b99]/20 focus:border-[#383b99]"
          />
        </div>
      </div>

      {/* Category pills */}
      <div className="flex flex-wrap gap-2 mb-6">
        <button
          onClick={() => setSelectedCategory(null)}
          className={`px-3 py-1.5 rounded-full text-sm transition-colors ${
            selectedCategory === null
              ? "bg-[#383b99] text-white"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          All ({materialIcons.length})
        </button>
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category === selectedCategory ? null : category)}
            className={`px-3 py-1.5 rounded-full text-sm transition-colors ${
              selectedCategory === category
                ? "bg-[#383b99] text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {category} ({iconCategories[category].length})
          </button>
        ))}
      </div>

      {/* Icon grid */}
      <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-2">
        {filteredIcons.map((icon) => (
          <button
            key={icon}
            onClick={() => handleCopyIcon(icon)}
            className={`flex flex-col items-center justify-center p-3 rounded-xl transition-all
              ${
                copiedIcon === icon
                  ? "bg-green-100 text-green-700"
                  : "bg-gray-50 hover:bg-[#f2efff] hover:text-[#383b99]"
              }`}
            title={icon}
          >
            <span className="material-symbols-outlined text-2xl">{icon}</span>
            <span className="text-[10px] mt-1 truncate w-full text-center">
              {copiedIcon === icon ? "Copied!" : icon.replace(/_/g, " ")}
            </span>
          </button>
        ))}
      </div>

      {filteredIcons.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No icons found matching &quot;{searchQuery}&quot;</p>
        </div>
      )}

      {/* External link */}
      <div className="mt-8 text-center">
        <a
          href="https://fonts.google.com/icons"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#383b99] hover:text-[#2c2e8d] text-sm"
        >
          View full Material Icons library →
        </a>
      </div>
    </div>
  );
}
