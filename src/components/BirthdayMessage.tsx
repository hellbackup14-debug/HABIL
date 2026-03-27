import { cn } from "@/lib/utils";

export default function BirthdayMessage() {
  return (
    <section className="relative">
      <div className="container mx-auto px-6 py-24 md:py-36">
        <div className="mx-auto max-w-3xl text-center md:text-left">
          <h3 className="font-serif text-3xl">Sebuah Surat Untukmu</h3>
          <div className={cn("mx-auto mt-6 max-w-2xl text-ink-100 leading-relaxed", "md:text-lg")}> 
            <p>
              Muthia tersayang, di hari spesialmu, aku hanya ingin membalutmu dengan kata-kata lembut.
              Kamu selalu bisa mengubah pagi yang sunyi menjadi kenangan hangat dan langkah kecil menjadi petualangan indah.
            </p>
            <p className="mt-4">
              Aku mencintai kebaikan di hatimu, keberanian di senyummu, dan caramu peduli—begitu anggun.
              Bersamamu, dunia terasa lebih ringan; udara terasa lebih lembut; dan hariku menemukan iramanya.
            </p>
            <p className="mt-4">
              Semoga tahun ini membawa segala yang lembut dan tulus untukmu. Aku beruntung mencintaimu,
              dan aku bersyukur untuk setiap versi kita—masa lalu, sekarang, dan banyak hari indah di depan.
            </p>
            <p className="mt-6 italic text-ink-100/80">Dengan cinta, selalu.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
