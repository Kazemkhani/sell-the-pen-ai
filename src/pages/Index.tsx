import { ArrowRight, ArrowUpRight, FileSearch, Mic2, Target } from "lucide-react";
import { Link } from "react-router-dom";

const waveform = [24, 42, 66, 34, 82, 54, 92, 46, 70, 28, 58, 88, 40, 74, 32, 62, 48, 84, 38, 68];

const Index = () => (
  <main className="min-h-screen overflow-hidden bg-[#080b10] text-[#f4f1eb] selection:bg-[#ff5d52] selection:text-white">
    <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 lg:px-10">
      <Link to="/" className="flex items-center gap-3" aria-label="Sell The Pen AI home">
        <span className="grid h-9 w-9 place-items-center rounded-full border border-white/15 bg-white/[0.04] font-mono text-xs font-bold">
          SP
        </span>
        <span className="text-sm font-semibold tracking-[0.18em]">SELL THE PEN</span>
      </Link>
      <span className="rounded-full border border-[#ff5d52]/35 bg-[#ff5d52]/10 px-3 py-1 font-mono text-[10px] tracking-[0.2em] text-[#ff8b82]">
        OPEN BETA
      </span>
    </nav>

    <section className="relative mx-auto grid max-w-7xl gap-16 px-6 pb-24 pt-14 lg:grid-cols-[1.04fr_0.96fr] lg:items-center lg:px-10 lg:pb-32 lg:pt-20">
      <div className="pointer-events-none absolute -left-48 top-8 h-80 w-80 rounded-full bg-[#ff5d52]/10 blur-[120px]" />

      <div className="relative z-10 max-w-3xl">
        <p className="mb-6 font-mono text-xs tracking-[0.28em] text-[#ff756b]">
          VOICE SALES TRAINING / HARD MODE
        </p>
        <h1 className="text-balance text-5xl font-semibold leading-[0.95] tracking-[-0.055em] sm:text-7xl lg:text-[5.5rem]">
          Practice the call before it costs you the deal.
        </h1>
        <p className="mt-8 max-w-2xl text-lg leading-8 text-white/60 sm:text-xl">
          Face a difficult AI buyer, handle real interruptions and objections, then get a transcript-linked scorecard you can use on the next call.
        </p>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Link
            to="/call-simulation"
            className="group inline-flex items-center justify-center rounded-full bg-[#ff5d52] px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-[#ff7067]"
          >
            Enter the live drill
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <Link
            to="/feedback"
            className="group inline-flex items-center justify-center rounded-full border border-white/15 bg-white/[0.04] px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-white/[0.08]"
          >
            Replay a scored call
            <ArrowUpRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
        <p className="mt-5 font-mono text-[11px] tracking-[0.12em] text-white/35">
          NO ACCOUNT REQUIRED · DEMO TRANSCRIPT INCLUDED
        </p>
      </div>

      <div className="relative mx-auto w-full max-w-xl">
        <div className="absolute -inset-8 rounded-full bg-[#ff5d52]/10 blur-3xl" />
        <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#0e131b] shadow-2xl shadow-black/50">
          <div className="flex items-center justify-between border-b border-white/10 px-6 py-4 font-mono text-[10px] tracking-[0.18em] text-white/40">
            <span>LIVE DRILL / 01</span>
            <span className="flex items-center gap-2 text-[#ff756b]">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#ff5d52]" />
              HARD MODE
            </span>
          </div>

          <div className="p-6 sm:p-8">
            <div className="flex items-start justify-between gap-6">
              <div>
                <p className="font-mono text-[10px] tracking-[0.2em] text-white/35">PROSPECT</p>
                <h2 className="mt-2 text-3xl font-semibold tracking-tight">Mukesh</h2>
                <p className="mt-1 text-sm text-white/45">Dubai property owner · skeptical · time-poor</p>
              </div>
              <div className="grid h-12 w-12 place-items-center rounded-full border border-[#ff5d52]/30 bg-[#ff5d52]/10">
                <Mic2 className="h-5 w-5 text-[#ff756b]" />
              </div>
            </div>

            <div className="my-10 flex h-24 items-center justify-center gap-1 rounded-2xl border border-white/[0.06] bg-black/20 px-5">
              {waveform.map((height, index) => (
                <span
                  key={`${height}-${index}`}
                  className="w-1 rounded-full bg-[#ff6a60] opacity-80"
                  style={{ height: `${height}%` }}
                />
              ))}
            </div>

            <blockquote className="border-l border-[#ff5d52] pl-5 text-xl leading-8 text-white/85">
              “I already have an agent. Give me one reason not to hang up.”
            </blockquote>

            <div className="mt-8 grid grid-cols-3 gap-3 border-t border-white/10 pt-6 text-center">
              <div>
                <p className="font-mono text-[10px] tracking-[0.15em] text-white/35">FORMAT</p>
                <p className="mt-2 text-sm font-medium">Voice</p>
              </div>
              <div>
                <p className="font-mono text-[10px] tracking-[0.15em] text-white/35">RUBRIC</p>
                <p className="mt-2 text-sm font-medium">5 dimensions</p>
              </div>
              <div>
                <p className="font-mono text-[10px] tracking-[0.15em] text-white/35">OUTPUT</p>
                <p className="mt-2 text-sm font-medium">Next drill</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section className="border-y border-white/10 bg-white/[0.025]">
      <div className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-y divide-white/10 px-6 sm:grid-cols-4 sm:divide-y-0 lg:px-10">
        {[
          ["01", "live voice persona"],
          ["05", "scoring dimensions"],
          ["02", "replay fixtures"],
          ["100", "point scorecard"],
        ].map(([value, label]) => (
          <div key={label} className="px-5 py-8 text-center">
            <p className="text-3xl font-semibold text-[#ff756b]">{value}</p>
            <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.15em] text-white/35">{label}</p>
          </div>
        ))}
      </div>
    </section>

    <section className="mx-auto max-w-7xl px-6 py-28 lg:px-10">
      <div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr]">
        <div>
          <p className="font-mono text-xs tracking-[0.24em] text-[#ff756b]">THE LOOP</p>
          <h2 className="mt-5 max-w-md text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">
            A sales gym with receipts.
          </h2>
          <p className="mt-6 max-w-md leading-7 text-white/50">
            No motivational filler. Every session ends with the lines that worked, the line that lost control, and one drill to run next.
          </p>
        </div>

        <div className="grid gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/10 sm:grid-cols-3">
          {[
            {
              number: "01",
              icon: Mic2,
              title: "Take the call",
              body: "Speak naturally against a prospect designed to interrupt, object, and test your control.",
            },
            {
              number: "02",
              icon: FileSearch,
              title: "Inspect the tape",
              body: "Score the transcript across opening, discovery, objections, close, and delivery.",
            },
            {
              number: "03",
              icon: Target,
              title: "Run the next rep",
              body: "Leave with an exact replacement line, a focused practice drill, and a measurable target.",
            },
          ].map(({ number, icon: Icon, title, body }) => (
            <article key={number} className="bg-[#0b0f15] p-7 sm:min-h-80">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-white/25">/{number}</span>
                <Icon className="h-5 w-5 text-[#ff756b]" />
              </div>
              <h3 className="mt-20 text-2xl font-semibold tracking-tight">{title}</h3>
              <p className="mt-4 text-sm leading-6 text-white/45">{body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>

    <section className="mx-auto max-w-7xl px-6 pb-28 lg:px-10">
      <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#111720] px-7 py-14 text-center sm:px-12 sm:py-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,93,82,0.14),_transparent_52%)]" />
        <div className="relative">
          <p className="font-mono text-xs tracking-[0.24em] text-[#ff756b]">YOUR NEXT CALL STARTS HERE</p>
          <h2 className="mx-auto mt-5 max-w-3xl text-balance text-4xl font-semibold tracking-[-0.04em] sm:text-6xl">
            Get the bad rep out of the way before a real prospect hears it.
          </h2>
          <Link
            to="/call-simulation"
            className="group mt-9 inline-flex items-center rounded-full bg-[#ff5d52] px-7 py-4 text-sm font-semibold text-white transition hover:bg-[#ff7067]"
          >
            Start the challenge
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>

    <footer className="border-t border-white/10 px-6 py-8 lg:px-10">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 text-xs text-white/35 sm:flex-row sm:items-center sm:justify-between">
        <p>Sell The Pen AI · Built by Amir Hossein Kazemkhani</p>
        <p>Rubric-informed coaching · No affiliation or certification implied</p>
      </div>
    </footer>
  </main>
);

export default Index;
