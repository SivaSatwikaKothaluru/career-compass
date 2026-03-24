export function parseMessage(text) {
  const lines = text.split("\n");
  const segments = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    if (line.trim() === "") {
      if (segments.length > 0 && segments[segments.length - 1].type !== "spacer") {
        segments.push({ type: "spacer" });
      }
      i++;
      continue;
    }

    if (line.startsWith("# ")) {
      segments.push({ type: "h1", content: line.slice(2).trim() });
      i++;
      continue;
    }

    if (line.startsWith("## ")) {
      segments.push({ type: "h2", content: line.slice(3).trim() });
      i++;
      continue;
    }

    if (line.startsWith("### ")) {
      segments.push({ type: "h3", content: line.slice(4).trim() });
      i++;
      continue;
    }

    if (line.match(/^---+$/)) {
      segments.push({ type: "divider" });
      i++;
      continue;
    }

    if (line.startsWith("- ") || line.startsWith("• ") || line.startsWith("* ")) {
      const items = [];
      while (
        i < lines.length &&
        (lines[i].startsWith("- ") || lines[i].startsWith("• ") || lines[i].startsWith("* "))
      ) {
        items.push(lines[i].replace(/^[-•*] /, "").trim());
        i++;
      }
      segments.push({ type: "bullets", items });
      continue;
    }

    if (/^\d+\. /.test(line)) {
      const items = [];
      while (i < lines.length && /^\d+\. /.test(lines[i])) {
        items.push(lines[i].replace(/^\d+\. /, "").trim());
        i++;
      }
      segments.push({ type: "numbered", items });
      continue;
    }

    segments.push({ type: "paragraph", content: line.trim() });
    i++;
  }

  while (segments.length > 0 && segments[segments.length - 1].type === "spacer") {
    segments.pop();
  }

  return segments;
}

export function parseInline(text) {
  const parts = [];
  const regex = /(\*\*(.+?)\*\*|`(.+?)`)/g;
  let last = 0;
  let match;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > last) {
      parts.push({ text: text.slice(last, match.index), bold: false, code: false });
    }
    if (match[0].startsWith("**")) {
      parts.push({ text: match[2], bold: true, code: false });
    } else {
      parts.push({ text: match[3], bold: false, code: true });
    }
    last = match.index + match[0].length;
  }

  if (last < text.length) {
    parts.push({ text: text.slice(last), bold: false, code: false });
  }

  return parts.length > 0 ? parts : [{ text, bold: false, code: false }];
}