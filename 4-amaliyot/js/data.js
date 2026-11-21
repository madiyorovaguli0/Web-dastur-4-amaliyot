// js/data.js
// Bilim Ziyo o'quv markazi kurslari (namuna ma'lumotlar).
// Har bir kurs — alohida obyekt, hammasi bitta massivda.
// Xususiyatlar: id, nomi, daraja, kategoriya, narx, mavjud, rasm, kunlar, soat, teglar

const kurslar = [
    {
        id: 1,
        nomi: "Ingliz tili (boshlang'ich)",
        daraja: "Boshlang'ich",
        kategoriya: "Til",
        narx: 350000,              // oylik to'lov, so'mda
        mavjud: true,              // qabul ochiqmi? (true / false)
        rasm: "rasmlar/sinfxona.jpg",
        kunlar: "Du, Chor, Ju",
        soat: "09:00–10:30",
        teglar: ["ommabop", "suhbat", "grammatika"]   // massiv xususiyat
    },
    {
        id: 2,
        nomi: "Ingliz tili (o'rta)",
        daraja: "O'rta (Intermediate)",
        kategoriya: "Til",
        narx: 400000,
        mavjud: true,
        rasm: "rasmlar/sinfxona.jpg",
        kunlar: "Se, Pay, Sha",
        soat: "15:00–16:30",
        teglar: ["suhbat", "tinglab tushunish"]
    },
    {
        id: 3,
        nomi: "IELTS tayyorlov",
        daraja: "Yuqori",
        kategoriya: "Til",
        narx: 500000,
        mavjud: false,             // hozircha qabul yopiq
        rasm: "rasmlar/sinfxona.jpg",
        kunlar: "Du, Chor, Ju",
        soat: "17:30–19:00",
        teglar: ["imtihon", "ingliz tili"]
    },
    {
        id: 4,
        nomi: "Matematika (maktab dasturi)",
        daraja: "Maktab dasturi",
        kategoriya: "Fan",
        narx: 300000,
        mavjud: true,
        rasm: "rasmlar/sinfxona.jpg",
        kunlar: "Du, Chor, Ju",
        soat: "16:00–17:30",
        teglar: ["masala", "mantiq"]
    },
    {
        id: 5,
        nomi: "Matematika (abituriyentlar)",
        daraja: "Abituriyentlar uchun",
        kategoriya: "Fan",
        narx: 450000,
        mavjud: true,
        rasm: "rasmlar/sinfxona.jpg",
        kunlar: "Se, Pay, Sha",
        soat: "17:30–19:30",
        teglar: ["imtihon", "masala"]
    },
    {
        id: 6,
        nomi: "Matematika (5-7-sinflar)",
        daraja: "Boshlang'ich",
        kategoriya: "Fan",
        narx: 250000,
        mavjud: true,
        rasm: "rasmlar/sinfxona.jpg",
        kunlar: "Du, Chor, Ju",
        soat: "14:00–15:30",
        teglar: ["yangi", "mantiq"]
    },
    {
        id: 7,
        nomi: "Veb-dasturlash (HTML va CSS)",
        daraja: "Boshlang'ich",
        kategoriya: "Texnologiya",
        narx: 500000,
        mavjud: true,
        rasm: "rasmlar/kompyuter-xonasi.jpg",
        kunlar: "Du, Chor, Ju",
        soat: "18:00–19:30",
        teglar: ["mashhur", "HTML", "CSS"]
    },
    {
        id: 8,
        nomi: "Veb-dasturlash (JavaScript)",
        daraja: "O'rta",
        kategoriya: "Texnologiya",
        narx: 550000,
        mavjud: true,
        rasm: "rasmlar/kompyuter-xonasi.jpg",
        kunlar: "Se, Pay, Sha",
        soat: "18:00–19:30",
        teglar: ["mashhur", "JavaScript", "DOM"]
    },
    {
        id: 9,
        nomi: "Kompyuter savodxonligi",
        daraja: "Boshlang'ich",
        kategoriya: "Texnologiya",
        narx: 280000,
        mavjud: true,
        rasm: "rasmlar/kompyuter-xonasi.jpg",
        kunlar: "Du, Chor, Ju",
        soat: "10:00–11:30",
        teglar: ["boshlang'ich", "Word", "Excel"]
    },
    {
        id: 10,
        nomi: "Python asoslari",
        daraja: "Boshlang'ich",
        kategoriya: "Texnologiya",
        narx: 480000,
        mavjud: false,
        rasm: "rasmlar/kompyuter-xonasi.jpg",
        kunlar: "Se, Pay, Sha",
        soat: "16:00–17:30",
        teglar: ["dasturlash", "yangi"]
    }
];

// ---------------------------------------------------------------
// STATISTIKA FUNKSIYALARI (reduce va find bilan)
// ---------------------------------------------------------------

// 1) Jami elementlar soni
function jamiSoni(royxat) {
    return royxat.length;
}

// 2) O'rtacha narx.
//    reduce massivni aylanib, hamma narxni bitta yig'indiga qo'shadi.
//    "0" — boshlang'ich qiymat: yig'indi 0 dan boshlanadi.
//    Keyin yig'indini kurslar soniga bo'lamiz.
function ortachaNarx(royxat) {
    if (royxat.length === 0) {
        return 0;
    }
    const yigindi = royxat.reduce(function (jami, kurs) {
        return jami + kurs.narx;
    }, 0);
    return yigindi / royxat.length;
}

// 3) Eng qimmat kurs.
//    1-qadam: reduce bilan eng katta narxni topamiz.
//    2-qadam: find bilan shu narxga ega birinchi kursni olamiz.
function engQimmatKurs(royxat) {
    if (royxat.length === 0) {
        return null;
    }
    const engKattaNarx = royxat.reduce(function (katta, kurs) {
        if (kurs.narx > katta) {
            return kurs.narx;
        }
        return katta;
    }, 0);
    return royxat.find(function (kurs) {
        return kurs.narx === engKattaNarx;
    });
}
