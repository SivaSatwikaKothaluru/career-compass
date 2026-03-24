import { parseInline } from "../utils/formatMessage.js";

export default function InlineText({ text, className = "" }) {
  const parts = parseInline(text);

  return (
    <span className={className}>
      {parts.map((part, i) => {
        if (part.code) {
          return (
            <code key={i} className="font-mono text-[0.8em] bg-indigo-50 text-indigo-700 px-1.5 py-0.5 rounded border border-indigo-100 mx-0.5">
              {part.text}
            </code>
          );
        }
        if (part.bold) {
          return (
            <strong key={i} className="font-semibold text-slate-800">
              {part.text}
            </strong>
          );
        }
        return <span key={i}>{part.text}</span>;
      })}
    </span>
  );
}