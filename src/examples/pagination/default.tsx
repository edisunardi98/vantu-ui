"use client";

import { useState } from "react";
import { Pagination } from "@/components/ui/pagination";

export default function Example() {
  const [page, setPage] = useState(1);
  const from = (page - 1) * 25 + 1;
  return (
    <Pagination
      className="w-full"
      page={page}
      pageCount={6}
      onPageChange={setPage}
      summary={`${from}–${Math.min(from + 24, 128)} of 128 prospects`}
    />
  );
}
