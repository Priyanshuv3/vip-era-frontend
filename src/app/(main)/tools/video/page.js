"use client";
import { ToolCategoryGrid } from "@/components";
import { video_tools } from "@/utils/category_data";

export default function ToolsPage() {
  return (
    <ToolCategoryGrid category={video_tools} />
  );
}
