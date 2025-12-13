"use client";
import { ToolCategoryGrid } from "@/components";
import { pdf_tools } from "@/utils/category_data";

export default function ToolsPage() {
  return (
      <ToolCategoryGrid category={pdf_tools} />
  );
}
