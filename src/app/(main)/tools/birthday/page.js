"use client";
import { birthday_tools } from "@/utils/category_data";
import { ToolCategoryGrid } from "@/components";

export default function ToolsPage() {
  return (
      <ToolCategoryGrid category={birthday_tools}/>
  );
}
