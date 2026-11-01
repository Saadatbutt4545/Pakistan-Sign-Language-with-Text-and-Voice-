import React, { useEffect, useMemo, useRef, useState } from "react";
import { FiMinimize2, FiX, FiMessageSquare } from "react-icons/fi"; 

const cosineSimilarity = (a, b) => {
  if (a.length !== b.length) return 0;
  let dot = 0,
    na = 0,
    nb = 0;
  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i];
    na += a[i] * a[i];
    nb += b[i] * b[i];
  }
  if (na === 0 || nb === 0) return 0;
  return dot / (Math.sqrt(na) * Math.sqrt(nb));
};

const tokenize = (text) =>
  (text || "")
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter(Boolean);

const buildVocab = (items) => {
  const vocab = new Map();
  let idx = 0;
  for (const t of items) {
    if (!vocab.has(t)) vocab.set(t, idx++);
  }
  return vocab;
};

const toVector = (tokens, vocab) => {
  const vec = new Array(vocab.size).fill(0);
  for (const t of tokens) {
    const i = vocab.get(t);
    if (i !== undefined) vec[i] += 1;
  }
  return vec;
};

const useLocalQAIndex = (dataset) => {
  return useMemo(() => {
    if (!dataset || dataset.length === 0) return null;
    const allTokens = [];
    const entries = dataset.map((item) => {
      const qTokens = tokenize(item.q);
      const aTokens = tokenize(item.a);
      const tokens = [...qTokens, ...aTokens];
      allTokens.push(...tokens);
      return { ...item, tokens };
    });
    const vocab = buildVocab(allTokens);
    const vectors = entries.map((e) => toVector(e.tokens, vocab));
    return { entries, vocab, vectors };
  }, [dataset]);
};

const Chatbot = () => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [dataset, setDataset] = useState([]);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "👋 Hi! I’m your PSL helper. Ask me about this website, how to use recognition, or general usage in English.",
    },
  ]);
  const [input, setInput] = useState("");
  const containerRef = useRef(null);

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      try {
        setLoading(true);
        const res = await fetch("/qa_dataset.json", { cache: "no-store" });
        if (!res.ok) throw new Error("Failed to load dataset");
        const data = await res.json();
        if (!cancelled) {
          setDataset(Array.isArray(data) ? data : data.items || []);
        }
      } catch (e) {
        if (!cancelled) setError("Could not load local QA dataset.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    load();
    return () => {
      cancelled = true;
    };
  }, []);

  const index = useLocalQAIndex(dataset);

  useEffect(() => {
    if (!open) return;
    const el = containerRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  }, [messages, open]);

  const answerQuestion = (question) => {
    if (!index)
      return "I’m still preparing my knowledge base. Please try again shortly.";
    const qTokens = tokenize(question);
    const qVec = toVector(qTokens, index.vocab);
    let best = { score: -1, item: null };
    for (let i = 0; i < index.entries.length; i++) {
      const score = cosineSimilarity(qVec, index.vectors[i]);
      if (score > best.score) best = { score, item: index.entries[i] };
    }
    if (!best.item || best.score < 0.1) {
      return "Sorry, I can only answer questions about this website and how to use the recognition feature. Try asking about navigation, pages, or usage steps.";
    }
    return best.item.a;
  };

  const onSend = () => {
    const trimmed = input.trim();
    if (!trimmed) return;
    const userMsg = { role: "user", content: trimmed };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    const reply = answerQuestion(trimmed);
    const assistantMsg = { role: "assistant", content: reply };
    setMessages((prev) => [...prev, assistantMsg]);
  };

  return (
    <>
      {/* Floating button */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed z-50 bottom-4 right-4 md:bottom-6 md:right-6 h-12 w-12 md:h-14 md:w-14 rounded-full bg-blue-600 text-white shadow-lg hover:bg-blue-700 transition-all flex items-center justify-center"
          aria-label="Open chatbot"
        >
          <FiMessageSquare className="text-2xl" />
        </button>
      )}

      {/* Chatbot panel */}
      {open && (
        <div className="fixed z-50 bottom-20 right-4 md:right-6 w-[94vw] max-w-[720px] md:w-[50vw] h-[60vh] md:h-[55vh] bg-white shadow-2xl rounded-2xl border border-gray-200 flex flex-col overflow-hidden transition-all">
          {/* Header */}
          <div className="px-4 py-3 border-b flex items-center justify-between bg-blue-600 text-white rounded-t-2xl">
            <div className="font-semibold text-base">🧠 PSL Helper</div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setOpen(false)}
                className="p-1 rounded hover:bg-blue-500"
                title="Minimize"
              >
                <FiMinimize2 size={18} />
              </button>
              <button
                onClick={() => setOpen(false)}
                className="p-1 rounded hover:bg-blue-500"
                title="Close"
              >
                <FiX size={18} />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div
            ref={containerRef}
            className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50"
          >
            {loading && (
              <div className="text-sm text-gray-500">Loading knowledge…</div>
            )}
            {error && <div className="text-sm text-red-600">{error}</div>}
            {messages.map((m, i) => (
              <div
                key={i}
                className={
                  m.role === "assistant"
                    ? "max-w-[85%] bg-white border border-gray-200 rounded-lg p-3 text-sm"
                    : "ml-auto max-w-[85%] bg-blue-600 text-white rounded-lg p-3 text-sm"
                }
              >
                {m.content}
              </div>
            ))}
          </div>

          {/* Input box */}
          <div className="p-3 border-t bg-white">
            <div className="flex items-center gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    onSend();
                  }
                }}
                placeholder="Ask about the site or how to use recognition…"
                className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={onSend}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700"
              >
                Send
              </button>
            </div>
            <p className="mt-2 text-[11px] text-gray-500">
              I can answer in English about this website, pages, and recognition usage.
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;
