"use client";
import React from "react";
import DOMPurify from "dompurify";

// Decode HTML entities in case the stored content is encoded
const decodeHtml = (html) => {
  const txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
};

const RichTextRenderer = ({ content }) => {
  // Decode the content (if it's already raw HTML, this is harmless)
  const decodedContent = decodeHtml(content);
  
  // Sanitize the decoded content and allow necessary tags/attributes
  const cleanHtml = DOMPurify.sanitize(decodedContent, {
    ALLOWED_TAGS: [
      "p",
      "strong",
      "em",
      "u",
      "blockquote",
      "a",
      "img",
      "ul",
      "ol",
      "li",
      "br",
      "span",
      "div",
      "h1",
      "h2",
      "h3",
      "h4",
      "h5",
      "h6",
    ],
    ALLOWED_ATTR: [
      "href",
      "src",
      "alt",
      "style",
      "width",
      "height",
      "class",
      "title",
    ],
    ALLOWED_URI_REGEXP:
      /^(?:(?:https?|mailto|tel|data):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i,
  });

  // Use the sanitized HTML for rendering
  return <div dangerouslySetInnerHTML={{ __html: cleanHtml }} />;
};

export default RichTextRenderer;
