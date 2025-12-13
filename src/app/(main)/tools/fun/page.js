"use client";
import { fun_tools } from "@/utils/category_data";
import { ToolCategoryGrid } from "@/components";


export default function ToolsPage() {
  return (
      <ToolCategoryGrid category={fun_tools} />
  );
}
