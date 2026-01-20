"use client";

import { useState } from "react";
import { galleryTemplates, type GalleryTemplate } from "../data/gallery-templates";

interface GalleryViewProps {
  onTemplateSelect: (template: GalleryTemplate) => void;
}

/**
 * Gallery View - Pre-built widget templates
 * Grid of cards showing templates users can start from
 */
export function GalleryView({ onTemplateSelect }: GalleryViewProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  // Get unique tags from all templates
  const allTags = Array.from(
    new Set(galleryTemplates.flatMap((t) => t.tags))
  ).sort();

  // Filter templates based on search and tag
  const filteredTemplates = galleryTemplates.filter((template) => {
    const matchesSearch =
      !searchQuery ||
      template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTag = !selectedTag || template.tags.includes(selectedTag);
    return matchesSearch && matchesTag;
  });

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">Widget Gallery</h2>
        <p className="text-gray-500">
          Choose a template to start from, or create your own from scratch.
        </p>
      </div>

      {/* Search and filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex-1">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search templates..."
            className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#383b99]/20 focus:border-[#383b99]"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedTag(null)}
            className={`px-3 py-1.5 rounded-full text-sm transition-colors ${
              selectedTag === null
                ? "bg-[#383b99] text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            All
          </button>
          {allTags.slice(0, 6).map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag === selectedTag ? null : tag)}
              className={`px-3 py-1.5 rounded-full text-sm transition-colors ${
                selectedTag === tag
                  ? "bg-[#383b99] text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Template grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredTemplates.map((template) => (
          <TemplateCard
            key={template.id}
            template={template}
            onClick={() => onTemplateSelect(template)}
          />
        ))}
      </div>

      {filteredTemplates.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No templates found matching your criteria.</p>
        </div>
      )}
    </div>
  );
}

interface TemplateCardProps {
  template: GalleryTemplate;
  onClick: () => void;
}

function TemplateCard({ template, onClick }: TemplateCardProps) {
  return (
    <button
      onClick={onClick}
      className="text-left bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg hover:border-[#383b99]/30 transition-all group"
    >
      {/* Preview placeholder - in real impl this would render the widget */}
      <div className="h-40 bg-gradient-to-br from-[#f2efff] to-[#e1e0ff] flex items-center justify-center">
        <div className="text-[#383b99]/60 text-4xl font-light">
          {template.name.charAt(0)}
        </div>
      </div>

      <div className="p-4">
        <h3 className="font-medium text-gray-800 group-hover:text-[#383b99] transition-colors">
          {template.name}
        </h3>
        <p className="text-sm text-gray-500 mt-1 line-clamp-2">
          {template.description}
        </p>
        <div className="flex flex-wrap gap-1 mt-3">
          {template.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 bg-gray-100 rounded text-xs text-gray-500"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </button>
  );
}
