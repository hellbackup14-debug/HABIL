import { cn } from "@/lib/utils";

export default function BirthdayMessage() {
  return (
    <section className="relative">
      <div className="container mx-auto px-6 py-24 md:py-36">
        <div className="mx-auto max-w-3xl text-center md:text-left">
          <h3 className="font-serif text-3xl">A Letter for You</h3>
          <div className={cn("mx-auto mt-6 max-w-2xl text-ink-100 leading-relaxed", "md:text-lg")}>
            <p>
              Dear Muthia, on your special day, I just want to wrap you in gentle words.
              You have a way of turning quiet mornings into warm memories and small walks into soft adventures.
            </p>
            <p className="mt-4">
              I love the kindness in your heart, the courage in your smile, and the way you care—so gracefully.
              With you, the world feels lighter; the air feels softer; and my days find their rhythm.
            </p>
            <p className="mt-4">
              May this year bring you everything tender and true. I’m lucky to love you,
              and I’m grateful for every version of us—past, present, and the many beautiful tomorrows.
            </p>
            <p className="mt-6 italic text-ink-100/80">With love, always.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
