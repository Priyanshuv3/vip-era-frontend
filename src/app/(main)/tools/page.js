"use client";

import tools from "@/components/ToolCards/toolsData";
import ToolCard from "@/components/ToolCards/ToolCard";

export default function ToolsPage() {
  return (
    <main style={{ padding: "40px 20px" }}>
      <h1 className="heading">AI Tools</h1>

      <div className="grid">
        {tools.map((tool) => (
          <ToolCard key={tool.slug} {...tool} />
        ))}
      </div>
    </main>
  );
}
