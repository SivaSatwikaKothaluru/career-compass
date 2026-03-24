import { parseMessage } from "../utils/formatMessage.js";
import InlineText from "./InlineText.jsx";

export default function BotMessage({ content }) {
  const segments = parseMessage(content);

  return (
    <div className="text-sm text-slate-700 leading-relaxed space-y-1.5">
      {segments.map((seg, idx) => {
        switch (seg.type) {
          case "h1":
            return (
              <h2 key={idx} className="text-base font-bold text-indigo-800 mt-1">
                <InlineText text={seg.content} />
              </h2>
            );
          case "h2":
            return (
              <h3 key={idx} className="text-sm font-bold text-indigo-700 mt-1">
                <InlineText text={seg.content} />
              </h3>
            );
          case "h3":
            return (
              <h4 key={idx} className="text-sm font-semibold text-slate-700 mt-0.5">
                <InlineText text={seg.content} />
              </h4>
            );
          case "bullets":
            return (
              <ul key={idx} className="space-y-1 my-1">
                {seg.items.map((item, j) => (
                  <li key={j} className="flex gap-2 items-start">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-indigo-400 flex-shrink-0" />
                    <span className="flex-1"><InlineText text={item} /></span>
                  </li>
                ))}
              </ul>
            );
          case "numbered":
            return (
              <ol key={idx} className="space-y-1 my-1">
                {seg.items.map((item, j) => (
                  <li key={j} className="flex gap-2 items-start">
                    <span className="flex-shrink-0 w-5 h-5 rounded-full bg-indigo-100 text-indigo-700 text-xs font-semibold flex items-center justify-center mt-0.5">
                      {j + 1}
                    </span>
                    <span className="flex-1 mt-0.5"><InlineText text={item} /></span>
                  </li>
                ))}
              </ol>
            );
          case "divider":
            return <hr key={idx} className="border-slate-200 my-1" />;
          case "spacer":
            return <div key={idx} className="h-1" />;
          default:
            return (
              <p key={idx}>
                <InlineText text={seg.content} />
              </p>
            );
        }
      })}
    </div>
  );
}