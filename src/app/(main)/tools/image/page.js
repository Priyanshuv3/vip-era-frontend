"use client";
import { image_tools } from "@/utils/category_data";
import { ToolCategoryGrid } from "@/components";


export default function ToolsPage() {
  return (
    <ToolCategoryGrid category={image_tools} />
  );
}
