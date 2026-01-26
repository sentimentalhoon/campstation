import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
    // 1. Clean up existing data
    await prisma.review.deleteMany();
    await prisma.booking.deleteMany();
    await prisma.campsite.deleteMany();
    await prisma.account.deleteMany();
    await prisma.session.deleteMany();
    await prisma.user.deleteMany();

    console.log('🧹 Cleaned up existing data');

    // 2. Create Users (Host & Guests)
    const hashedPassword = await bcrypt.hash('password123', 10);

    const host = await prisma.user.create({
        data: {
            name: '김캠핑',
            email: 'host@test.com',
            password: hashedPassword,
            role: 'ADMIN',
            image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=host',
        },
    });

    const guest = await prisma.user.create({
        data: {
            name: '이여행',
            email: 'guest@test.com',
            password: hashedPassword,
            role: 'USER',
            image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=guest',
        },
    });

    console.log('👤 Created users');

    // 3. Create Campsites
    const campsites = [
        {
            name: '포천 산정호수 글램핑',
            description: '산정호수의 맑은 물과 숲속의 고요함을 즐길 수 있는 프리미엄 글램핑장입니다. 밤하늘의 별을 보며 바베큐를 즐겨보세요.',
            location: '경기 포천시 영북면 산정화동로',
            price: 150000,
            images: [
                'https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?auto=format&fit=crop&q=80&w=800', // Tent
                'https://images.unsplash.com/photo-1533582415312-79477416963d?auto=format&fit=crop&q=80&w=800'  // Bonfire
            ],
            facilities: ['WiFi', '개별화장실', '바베큐', '주차장'],
        },
        {
            name: '강릉 바다향기 캠핑장',
            description: '동해바다가 바로 눈앞에 펼쳐지는 오션뷰 캠핑장. 파도 소리를 들으며 잠들 수 있는 낭만적인 공간입니다.',
            location: '강원 강릉시 해안로',
            price: 80000,
            images: [
                'https://images.unsplash.com/photo-1510312305653-8ed496efae75?auto=format&fit=crop&q=80&w=800', // Beach Camping
                'https://images.unsplash.com/photo-1496947850313-7743325fa58c?auto=format&fit=crop&q=80&w=800'  // Sunrise
            ],
            facilities: ['샤워실', '매점', '전기', '반려동물'],
        },
        {
            name: '제주 숲속의 힐링',
            description: '제주의 곶자왈 숲속 깊은 곳에 위치한 프라이빗 캠핑장. 진정한 휴식을 원하는 당신을 위한 곳입니다.',
            location: '제주 제주시 애월읍',
            price: 120000,
            images: [
                'https://images.unsplash.com/photo-1537225228614-56cc3556d7ed?auto=format&fit=crop&q=80&w=800', // Forest
                'https://images.unsplash.com/photo-1517824806704-9040b037703b?auto=format&fit=crop&q=80&w=800'  // Nature
            ],
            facilities: ['WiFi', '카페', '조식제공'],
        },
        {
            name: '가평 별빛 오토캠핑',
            description: '서울 근교 최고의 접근성. 깨끗한 계곡물과 울창한 잣나무 숲이 어우러진 자연 친화적인 캠핑장입니다.',
            location: '경기 가평군 북면',
            price: 60000,
            images: [
                'https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?auto=format&fit=crop&q=80&w=800', // Starry Night
                'https://images.unsplash.com/photo-1517176118179-6524673f458e?auto=format&fit=crop&q=80&w=800'  // Group
            ],
            facilities: ['수영장', '트램펄린', '노키즈존'],
        },
        {
            name: '양양 서피비치 카라반',
            description: '서핑과 캠핑을 동시에! 힙한 분위기와 이국적인 해변을 경험할 수 있는 카라반 존입니다.',
            location: '강원 양양군 현북면',
            price: 200000,
            images: [
                'https://images.unsplash.com/photo-1563299796-b729d0af54a5?auto=format&fit=crop&q=80&w=800', // Caravan Interior
                'https://images.unsplash.com/photo-1526491109672-74740652028d?auto=format&fit=crop&q=80&w=800'  // Festival vibe
            ],
            facilities: ['에어컨', '개별샤워실', '서핑렌탈', '펍'],
        },
        {
            name: '지리산 하늘아래 첫동네',
            description: '해발 700m 고지의 상쾌한 공기. 탁 트인 전망과 함께 즐기는 구름 위의 캠핑.',
            location: '전북 남원시 운봉읍',
            price: 50000,
            images: [
                'https://images.unsplash.com/photo-1537225228614-56cc3556d7ed?auto=format&fit=crop&q=80&w=800', // Forest Camping (Verified)
                'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&q=80&w=800'  // Tent view
            ],
            facilities: ['공용샤워실', '등산로', '장작판매'],
        }
    ];

    for (const site of campsites) {
        await prisma.campsite.create({
            data: {
                ...site,
                ownerId: host.id,
                reviews: {
                    create: [
                        {
                            rating: 5,
                            comment: '시설이 정말 깨끗하고 사장님이 친절해요!',
                            userId: guest.id,
                        },
                        {
                            rating: 4,
                            comment: '뷰가 미쳤습니다. 재방문 의사 있습니다.',
                            userId: guest.id,
                        }
                    ]
                }
            },
        });
    }

    console.log(`⛺ Created ${campsites.length} campsites`);
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
