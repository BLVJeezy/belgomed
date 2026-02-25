import { useState, useRef, useEffect, useCallback } from "react";
import { MessageCircle, X, Send, Bot, User, CheckCircle, Loader2 } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { toast } from "sonner";

type Msg = {role: "user" | "assistant";content: string;};

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/chat`;

async function streamChat({
  messages,
  onDelta,
  onDone,
  onError





}: {messages: Msg[];onDelta: (text: string) => void;onDone: (fullText: string) => void;onError: (msg: string) => void;}) {
  const resp = await fetch(CHAT_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`
    },
    body: JSON.stringify({ messages })
  });

  if (!resp.ok || !resp.body) {
    if (resp.status === 429) {onError("Te veel verzoeken, even geduld aub.");return;}
    if (resp.status === 402) {onError("Service tijdelijk niet beschikbaar.");return;}
    onError("Er ging iets mis. Probeer het later opnieuw.");
    return;
  }

  const reader = resp.body.getReader();
  const decoder = new TextDecoder();
  let buf = "";
  let fullText = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    buf += decoder.decode(value, { stream: true });

    let idx: number;
    while ((idx = buf.indexOf("\n")) !== -1) {
      let line = buf.slice(0, idx);
      buf = buf.slice(idx + 1);
      if (line.endsWith("\r")) line = line.slice(0, -1);
      if (!line.startsWith("data: ")) continue;
      const json = line.slice(6).trim();
      if (json === "[DONE]") {onDone(fullText);return;}
      try {
        const parsed = JSON.parse(json);
        const content = parsed.choices?.[0]?.delta?.content;
        if (content) {fullText += content;onDelta(content);}
      } catch {buf = line + "\n" + buf;break;}
    }
  }
  onDone(fullText);
}

async function submitLead(leadData: Record<string, string>) {
  try {
    const resp = await fetch(CHAT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`
      },
      body: JSON.stringify({ action: "submit_lead", leadData })
    });
    return resp.ok;
  } catch {
    return false;
  }
}

function stripFormTag(text: string): string {
  return text.replace(/\[SHOW_LEAD_FORM\]/g, "").trim();
}

function hasLeadFormTag(text: string): boolean {
  return text.includes("[SHOW_LEAD_FORM]");
}

const LeadForm = ({ onSubmit, conversationSummary }: {onSubmit: () => void;conversationSummary: string;}) => {
  const [naam, setNaam] = useState("");
  const [telefoon, setTelefoon] = useState("");
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async () => {
    if (!naam.trim() || !telefoon.trim() || !email.trim()) {
      toast.error("Vul alle 3 velden in aub.");
      return;
    }
    setSubmitting(true);
    const ok = await submitLead({
      naam: naam.trim(),
      telefoon: telefoon.trim(),
      email: email.trim(),
      bedrijfsnaam: "Via Chatbot",
      bericht: conversationSummary
    });
    setSubmitting(false);
    if (ok) {
      setSubmitted(true);
      toast.success("Verzoek verstuurd! Een collega neemt spoedig contact op.");
      onSubmit();
    } else {
      toast.error("Kon niet versturen. Probeer opnieuw.");
    }
  };

  if (submitted) {
    return (
      <div className="bg-primary/5 border border-primary/20 rounded-xl p-3 flex items-center gap-2 text-sm text-primary">
        <CheckCircle className="w-4 h-4 flex-shrink-0" />
        <span>Verzoek verstuurd! We nemen snel contact op.</span>
      </div>);

  }

  return (
    <div className="bg-secondary/80 border border-border/50 rounded-xl p-3 space-y-2">
      <p className="text-xs font-medium text-foreground">Laat uw gegevens achter:</p>
      <input
        value={naam}
        onChange={(e) => setNaam(e.target.value)}
        placeholder="Naam *"
        className="w-full bg-background border border-border/50 rounded-lg px-3 py-1.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/50" />

      <input
        value={telefoon}
        onChange={(e) => setTelefoon(e.target.value)}
        placeholder="Telefoon *"
        type="tel"
        className="w-full bg-background border border-border/50 rounded-lg px-3 py-1.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/50" />

      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="E-mail *"
        type="email"
        className="w-full bg-background border border-border/50 rounded-lg px-3 py-1.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/50" />

      <button
        onClick={handleSubmit}
        disabled={submitting || !naam.trim() || !telefoon.trim() || !email.trim()}
        className="w-full bg-primary text-primary-foreground rounded-lg py-2 text-sm font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 flex items-center justify-center gap-2">

        {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
        Verstuur verzoek
      </button>
    </div>);

};

const ChatBot = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [leadSaved, setLeadSaved] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, showLeadForm]);

  const getConversationSummary = useCallback(() => {
    return messages.
    filter((m) => m.role === "user").
    map((m) => m.content).
    join(" | ").
    slice(0, 500);
  }, [messages]);

  const send = async () => {
    const text = input.trim();
    if (!text || loading) return;
    setInput("");
    const userMsg: Msg = { role: "user", content: text };
    setMessages((prev) => [...prev, userMsg]);
    setLoading(true);

    let assistantSoFar = "";
    const upsert = (chunk: string) => {
      assistantSoFar += chunk;
      const display = stripFormTag(assistantSoFar);
      setMessages((prev) => {
        const last = prev[prev.length - 1];
        if (last?.role === "assistant") {
          return prev.map((m, i) => i === prev.length - 1 ? { ...m, content: display } : m);
        }
        return [...prev, { role: "assistant", content: display }];
      });
    };

    try {
      await streamChat({
        messages: [...messages, userMsg],
        onDelta: upsert,
        onDone: (fullText) => {
          setLoading(false);
          if (hasLeadFormTag(fullText) && !leadSaved) {
            setShowLeadForm(true);
          }
        },
        onError: (msg) => {
          upsert(msg);
          setLoading(false);
        }
      });
    } catch {
      upsert("Er ging iets mis. Probeer het later opnieuw.");
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating toggle button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-primary text-primary-foreground shadow-lg hover:bg-primary/90 transition-all flex items-center justify-center"
        aria-label="Chat openen"
      >
        {open ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </button>


      {open &&
      <div className="fixed bottom-24 right-6 z-50 w-[360px] max-w-[calc(100vw-2rem)] h-[500px] max-h-[calc(100vh-8rem)] bg-background border border-border rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-4 fade-in duration-300">
          <div className="bg-primary text-primary-foreground px-4 py-3 flex items-center gap-3">
            <Bot className="w-5 h-5" />
            <div>
              <p className="font-semibold text-sm">Belgomed Support</p>
              <p className="text-xs opacity-80">Hoe kunnen wij u helpen?</p>
            </div>
          </div>

          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.length === 0 &&
          <div className="text-center text-muted-foreground text-sm py-8">
                <Bot className="w-10 h-10 mx-auto mb-3 opacity-40" />
                <p>Welkom! Stel gerust uw vraag.</p>
              </div>
          }
            {messages.map((msg, i) =>
          <div key={i} className={`flex gap-2 ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                {msg.role === "assistant" &&
            <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                    <Bot className="w-4 h-4 text-primary" />
                  </div>
            }
                <div
              className={`max-w-[80%] rounded-xl px-3 py-2 text-sm ${
              msg.role === "user" ?
              "bg-primary text-primary-foreground rounded-br-sm" :
              "bg-secondary text-foreground rounded-bl-sm"}`
              }>

                  {msg.role === "assistant" ?
              <div className="prose prose-sm dark:prose-invert max-w-none [&>p]:m-0 [&>ul]:m-0 [&>ol]:m-0">
                      <ReactMarkdown>{msg.content}</ReactMarkdown>
                    </div> :

              msg.content
              }
                </div>
                {msg.role === "user" &&
            <div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center flex-shrink-0 mt-1">
                    <User className="w-4 h-4 text-primary-foreground" />
                  </div>
            }
              </div>
          )}

            {/* Lead form inline */}
            {showLeadForm && !leadSaved &&
          <LeadForm
            onSubmit={() => setLeadSaved(true)}
            conversationSummary={getConversationSummary()} />

          }

            {loading && messages[messages.length - 1]?.role !== "assistant" &&
          <div className="flex gap-2">
                <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Bot className="w-4 h-4 text-primary animate-pulse" />
                </div>
                <div className="bg-secondary rounded-xl px-3 py-2 text-sm text-muted-foreground">
                  Even denken...
                </div>
              </div>
          }
          </div>

          <div className="border-t border-border p-3">
            <form onSubmit={(e) => {e.preventDefault();send();}} className="flex gap-2">
              <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Typ uw vraag..."
              className="flex-1 bg-secondary/50 border border-border/50 rounded-lg px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/50"
              disabled={loading} />

              <button
              type="submit"
              disabled={!input.trim() || loading}
              className="w-9 h-9 rounded-lg bg-primary text-primary-foreground flex items-center justify-center disabled:opacity-50 hover:bg-primary/90 transition-colors">

                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      }
    </>);

};

export default ChatBot;