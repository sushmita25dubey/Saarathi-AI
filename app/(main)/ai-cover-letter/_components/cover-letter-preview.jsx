"use client";

import React from "react";
import MDEditor from "@uiw/react-md-editor";

const CoverLetterPreview = ({ content }) => {
  if (!content) {
    return (
      <div className="rounded-lg border border-dashed p-6 text-muted-foreground">
        No cover letter content available yet.
      </div>
    );
  }

  return (
    <div data-color-mode="light" className="py-4">
      <MDEditor value={content} preview="preview" height={700} />
    </div>
  );
};

export default CoverLetterPreview;