export function PromoBanner() {
    return (
        <div className="relative w-full h-32 md:h-48 rounded-2xl overflow-hidden bg-gradient-to-r from-violet-500 to-purple-500 shadow-md">
            <div className="absolute inset-0 flex items-center justify-between px-8 md:px-12 text-white">
                <div className="space-y-1">
                    <div className="inline-block px-3 py-1 bg-white/20 backdrop-blur rounded-full text-xs font-bold mb-2">
                        EVENT
                    </div>
                    <h3 className="text-xl md:text-3xl font-bold">첫 예약 10% 할인</h3>
                    <p className="text-sm md:text-base opacity-90">신규 회원 가입하고 쿠폰 받아가세요!</p>
                </div>

                {/* Decorative Circle */}
                <div className="hidden md:block w-64 h-64 bg-white/10 rounded-full absolute -right-16 -top-16 blur-2xl" />
                <div className="hidden md:block w-32 h-32 bg-white/10 rounded-full absolute right-32 -bottom-16 blur-xl" />
            </div>
        </div>
    );
}
