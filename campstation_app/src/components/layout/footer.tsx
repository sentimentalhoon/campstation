import Link from "next/link";
import { Logo } from "@/components/layout/logo";

export function Footer() {
    return (
        <footer className="w-full border-t bg-background py-10 md:py-16">
            <div className="container mx-auto grid px-4 gap-8 md:grid-cols-4">
                <div className="space-y-4">
                    <Logo />
                    <p className="text-sm text-muted-foreground leading-relaxed">
                        나만의 캠핑, Campstation에서 시작하세요. <br />
                        전국의 숨은 명소를 예약하고 솔직한 후기를 공유하세요.
                    </p>
                </div>

                <div className="space-y-4">
                    <h4 className="text-sm font-semibold tracking-wide uppercase">Company</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                        <li><Link href="/about" className="hover:text-primary">소개</Link></li>
                        <li><Link href="/careers" className="hover:text-primary">채용</Link></li>
                        <li><Link href="/contact" className="hover:text-primary">연락처</Link></li>
                    </ul>
                </div>

                <div className="space-y-4">
                    <h4 className="text-sm font-semibold tracking-wide uppercase">Legal</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                        <li><Link href="/privacy" className="hover:text-primary">개인정보처리방침</Link></li>
                        <li><Link href="/terms" className="hover:text-primary">이용약관</Link></li>
                    </ul>
                </div>

                <div className="space-y-4">
                    <h4 className="text-sm font-semibold tracking-wide uppercase">Social</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                        <li><Link href="#" className="hover:text-primary">Instagram</Link></li>
                        <li><Link href="#" className="hover:text-primary">Twitter</Link></li>
                    </ul>
                </div>
            </div>
            <div className="container mx-auto px-4 mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
                © 2026 Campstation Inc. All rights reserved.
            </div>
        </footer>
    );
}
