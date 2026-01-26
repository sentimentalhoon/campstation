import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden bg-slate-900">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30 z-10" />
          {/* Placeholder for Hero Image - In real app, use next/image */}
          <div
            className="w-full h-full bg-cover bg-center animate-in fade-in zoom-in duration-1000 scale-105"
            style={{
              backgroundImage: 'url("https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?q=80&w=2070&auto=format&fit=crop")'
            }}
          />
        </div>

        <div className="relative z-20 container px-4 text-center space-y-8">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold font-heading text-white tracking-tight animate-in slide-in-from-bottom-4 duration-1000 delay-300 fill-mode-backwards">
            자연 속에서의 완벽한 하룻밤
          </h1>
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-slate-200 animate-in slide-in-from-bottom-4 duration-1000 delay-500 fill-mode-backwards">
            엄선된 최고의 캠핑장을 예약하고, 잊지 못할 추억을 만들어보세요.
            Campstation이 당신의 여정을 함께합니다.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-in slide-in-from-bottom-4 duration-1000 delay-700 fill-mode-backwards">
            <Button size="lg" className="text-lg px-8 py-6 rounded-full" asChild>
              <Link href="/campsites">캠핑장 둘러보기</Link>
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-6 rounded-full bg-white/10 text-white border-white/20 hover:bg-white/20 hover:text-white backdrop-blur-sm" asChild>
              <Link href="/about">더 알아보기</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Preview */}
      <section className="py-24 bg-background">
        <div className="container px-4 mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl font-bold font-heading">왜 Campstation인가요?</h2>
            <p className="text-muted-foreground">우리는 단순한 예약 그 이상의 가치를 제공합니다.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "엄선된 큐레이션", desc: "전문가가 직접 검증한 퀄리티 높은 캠핑장만을 소개합니다." },
              { title: "편리한 예약", desc: "복잡한 절차 없이 몇 번의 클릭만으로 예약을 확정하세요." },
              { title: "생생한 커뮤니티", desc: "실제 이용자들의 솔직한 후기와 팁을 공유받으세요." },
            ].map((feature, i) => (
              <div key={i} className="p-8 rounded-2xl bg-muted/50 hover:bg-muted transition-colors border border-border/50">
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
