"use client";

import { useEffect, useState } from "react";
import { FileItem, FileUploadArea } from "@/components/ui/file-upload";

interface Upload {
  id: number;
  name: string;
  size: number;
  progress: number;
  status: "uploading" | "done" | "error";
}

let nextId = 4;

export default function Example() {
  const [files, setFiles] = useState<Upload[]>([
    { id: 1, name: "q3-prospects.csv", size: 120_000, progress: 35, status: "uploading" },
    { id: 2, name: "icp-brief.pdf", size: 2_400_000, progress: 100, status: "done" },
    { id: 3, name: "lost-deals.xlsx", size: 860_000, progress: 0, status: "error" },
  ]);

  // Simulated upload progress.
  useEffect(() => {
    const t = setInterval(() => {
      setFiles((fs) => fs.map((f) => (f.status !== "uploading" ? f : f.progress >= 100 ? { ...f, status: "done" } : { ...f, progress: Math.min(100, f.progress + 9) })));
    }, 400);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="flex w-full max-w-md flex-col gap-3">
      <FileUploadArea onFiles={(list) => setFiles((fs) => [...list.map((f) => ({ id: nextId++, name: f.name, size: f.size, progress: 0, status: "uploading" as const })), ...fs])} />
      {files.map((f) => (
        <FileItem
          key={f.id}
          name={f.name}
          size={f.size}
          status={f.status}
          progress={f.progress}
          error="Failed — file is password protected"
          onRemove={() => setFiles((fs) => fs.filter((x) => x.id !== f.id))}
          onRetry={() => setFiles((fs) => fs.map((x) => (x.id === f.id ? { ...x, status: "uploading", progress: 0 } : x)))}
        />
      ))}
    </div>
  );
}
