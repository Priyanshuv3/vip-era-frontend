"use client";
import { ToolCategoryGrid } from "@/components";
import { music_tools } from "@/utils/category_data";

export default function ToolsPage() {
  return (
    <ToolCategoryGrid category={music_tools} />
  );
}
