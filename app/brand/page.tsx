import Image from "next/image";

export const metadata = {
  title: "Vyzor — Brand",
};

export default function BrandPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-5xl mx-auto px-6 py-12 space-y-10">
        <header>
          <h1 className="text-3xl font-bold tracking-tight">Vyzor brand kit</h1>
          <p className="text-sm text-muted-foreground mt-2">
            Logo variants + colors. Click any asset to download the SVG.
          </p>
        </header>

        {/* Hero — primary lockup */}
        <section className="rounded-2xl border border-border bg-card p-12 flex items-center justify-center">
          <Image
            src="/vyzor-lockup.svg"
            alt="Vyzor"
            width={220}
            height={64}
            priority
          />
        </section>

        {/* Variants grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Tile
            title="Primary mark"
            subtitle="Purple bg · white symbol · 16px radius"
            bg="bg-card"
          >
            <Image src="/vyzor-mark.svg" alt="Vyzor mark" width={96} height={96} />
          </Tile>

          <Tile
            title="Mono mark — light"
            subtitle="On dark surfaces · uses currentColor"
            bg="bg-[#0A0A0A]"
            tileTextLight
          >
            <span className="text-white">
              <Image
                src="/vyzor-mark-mono.svg"
                alt="Vyzor mark mono"
                width={96}
                height={96}
              />
            </span>
          </Tile>

          <Tile
            title="Wordmark"
            subtitle="Inter Bold · -0.04 tracking · uses currentColor"
            bg="bg-card"
          >
            <span className="text-foreground">
              <Image
                src="/vyzor-wordmark.svg"
                alt="Vyzor wordmark"
                width={140}
                height={42}
              />
            </span>
          </Tile>

          <Tile
            title="Wordmark — purple"
            subtitle="Color variant"
            bg="bg-card"
          >
            <span className="text-primary">
              <Image
                src="/vyzor-wordmark.svg"
                alt="Vyzor wordmark purple"
                width={140}
                height={42}
              />
            </span>
          </Tile>
        </section>

        {/* Color palette */}
        <section>
          <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">
            Palette
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <Swatch hex="#7C3AED" name="Primary" />
            <Swatch hex="#0A0A0A" name="Ink" />
            <Swatch hex="#FAFAF7" name="Surface" textDark />
            <Swatch hex="#10B981" name="Accent / OK" />
          </div>
        </section>

        {/* Type */}
        <section>
          <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">
            Typography
          </h2>
          <div className="rounded-xl border border-border bg-card p-6 space-y-3">
            <p className="text-3xl font-bold tracking-tight">Inter — display</p>
            <p className="text-base">
              Inter — body. Used for everything. Weight 400 / 500 / 600 / 700.
            </p>
            <p className="font-mono text-sm tabular-nums text-muted-foreground">
              Geist Mono — for numbers, IDs, code · 1,234 · 47 deals · $14.2M
            </p>
          </div>
        </section>

        {/* Usage notes */}
        <section>
          <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">
            Concept
          </h2>
          <div className="rounded-xl border border-border bg-card p-6 text-sm leading-relaxed text-foreground/90">
            <p>
              The mark is a stylized <strong>V</strong> drawn as a chart
              line — descending into a low point and ascending to a peak with
              a data point. It carries two readings at once: the brand letter
              <em> and</em> a recovery chart, the visual signature of the
              product&apos;s job — turning a noisy real estate stack into
              clear decisions and rising performance.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}

function Tile({
  title,
  subtitle,
  bg,
  tileTextLight,
  children,
}: {
  title: string;
  subtitle: string;
  bg: string;
  tileTextLight?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-border overflow-hidden flex flex-col">
      <div
        className={`${bg} flex-1 flex items-center justify-center py-12 px-6 min-h-[200px]`}
      >
        {children}
      </div>
      <div
        className={`px-5 py-3 border-t border-border ${
          tileTextLight ? "bg-card" : "bg-card"
        }`}
      >
        <div className="text-sm font-semibold text-foreground">{title}</div>
        <div className="text-xs text-muted-foreground mt-0.5">{subtitle}</div>
      </div>
    </div>
  );
}

function Swatch({
  hex,
  name,
  textDark,
}: {
  hex: string;
  name: string;
  textDark?: boolean;
}) {
  return (
    <div className="rounded-xl overflow-hidden border border-border">
      <div
        className="h-24 w-full"
        style={{ backgroundColor: hex }}
        aria-hidden
      />
      <div className="px-3 py-2 bg-card">
        <div className="text-sm font-semibold text-foreground">{name}</div>
        <div
          className={`text-[11px] font-mono mt-0.5 ${
            textDark ? "text-muted-foreground" : "text-muted-foreground"
          }`}
        >
          {hex}
        </div>
      </div>
    </div>
  );
}
