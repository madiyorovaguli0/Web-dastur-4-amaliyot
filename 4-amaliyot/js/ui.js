// js/ui.js
// Interaktiv komponentlar: tungi rejim, modal oyna, forma tekshiruvi.
// Bu fayl barcha sahifalarda ulanadi, shuning uchun har bir qism
// avval kerakli element sahifada bor-yo'qligini tekshiradi.

// =====================================================================
// 1. TUNGI REJIM (tanlov localStorage da saqlanadi)
// =====================================================================
const temaTugma = document.getElementById("temaTugma");

// tungi === true bo'lsa tungi rejimni yoqadi, aks holda o'chiradi
function temaniQollash(tungi) {
    if (tungi) {
        document.body.classList.add("tungi");
        temaTugma.textContent = "☀️ Kunduzgi rejim";
    } else {
        document.body.classList.remove("tungi");
        temaTugma.textContent = "🌙 Tungi rejim";
    }
    temaTugma.setAttribute("aria-pressed", tungi ? "true" : "false");
}

// localStorage ba'zan ishlamaydi (masalan, maxfiy rejimda). Shunda sayt buzilmasligi
// uchun o'qish va yozishni try/catch ichiga olamiz.
function temaniOqi() {
    try {
        return localStorage.getItem("tema");
    } catch (xato) {
        return null;
    }
}

function temaniSaqla(qiymat) {
    try {
        localStorage.setItem("tema", qiymat);
    } catch (xato) {
        // saqlab bo'lmadi — muhim emas, rejim shu sahifada baribir almashadi
    }
}

if (temaTugma !== null) {
    // Sahifa ochilganda oxirgi saqlangan tanlovni o'qiymiz
    temaniQollash(temaniOqi() === "tungi");

    temaTugma.addEventListener("click", function () {
        const hozirTungi = document.body.classList.contains("tungi");
        temaniQollash(!hozirTungi);                       // teskarisiga o'tkazamiz
        temaniSaqla(hozirTungi ? "kunduzgi" : "tungi");
    });
}

// =====================================================================
// 2. MODAL OYNA (faqat katalog.html da bor)
// =====================================================================
const modal = document.getElementById("modal");
const modalYopishTugma = document.getElementById("modalYopish");
let oxirgiTugma = null;   // modal yopilganda fokus qaytadigan tugma

// kurs obyektidagi ma'lumotlar bilan modalni to'ldirib ochadi
function modalOch(kurs, tugma) {
    document.getElementById("modalRasm").src = kurs.rasm;
    document.getElementById("modalRasm").alt = kurs.nomi + " kursi";
    document.getElementById("modalNomi").textContent = kurs.nomi;
    document.getElementById("modalYonalish").textContent = "Yo'nalish: " + kurs.kategoriya;
    document.getElementById("modalDaraja").textContent = "Daraja: " + kurs.daraja;
    document.getElementById("modalVaqt").textContent = "Dars vaqti: " + kurs.kunlar + ", " + kurs.soat;
    document.getElementById("modalNarx").textContent = "Oylik to'lov: " + kurs.narx.toLocaleString("ru-RU") + " so'm";
    document.getElementById("modalHolat").textContent = kurs.mavjud ? "Qabul ochiq" : "Hozircha qabul yopiq";
    document.getElementById("modalTeglar").textContent = kurs.teglar.join(", ");

    oxirgiTugma = tugma;
    modal.classList.add("ochiq");
    modalYopishTugma.focus();
}

function modalYop() {
    modal.classList.remove("ochiq");
    if (oxirgiTugma !== null) {
        oxirgiTugma.focus();   // fokusni bosilgan tugmaga qaytaramiz
    }
}

if (modal !== null) {
    // 1) × tugmasi bosilganda yopiladi
    modalYopishTugma.addEventListener("click", modalYop);

    // 2) Fon ustiga (oyna tashqarisiga) bosilganda yopiladi.
    //    e.target === modal bo'lsa — bosish aynan fonga tushgan, oyna ichiga emas.
    modal.addEventListener("click", function (e) {
        if (e.target === modal) {
            modalYop();
        }
    });

    // 3) Escape tugmasi bosilganda yopiladi (faqat modal ochiq bo'lsa)
    document.addEventListener("keydown", function (e) {
        if (e.key === "Escape" && modal.classList.contains("ochiq")) {
            modalYop();
        }
    });
}

// =====================================================================
// 3. FORMA TEKSHIRUVI (faqat aloqa.html da bor)
// =====================================================================
const ariza = document.getElementById("ariza");

// Maydon ostidagi xato matnini yozadi (matn "" bo'lsa — xatoni tozalaydi).
// Xato elementining id si: maydon id + "-xato"  (masalan: "ism-xato")
function xatoYoz(id, matn) {
    const xatoElement = document.getElementById(id + "-xato");
    if (xatoElement === null) {
        return;   // bu maydon uchun xato joyi yo'q (masalan, radio tugma)
    }
    xatoElement.textContent = matn;

    const maydon = document.getElementById(id);
    maydon.classList.toggle("noto-gri", matn !== "");   // qizil chegara
    maydon.setAttribute("aria-invalid", matn !== "" ? "true" : "false");
}

// Har bir tekshiruv funksiyasi: xato bo'lsa — xato matnini, to'g'ri bo'lsa "" qaytaradi.

function ismniTekshir() {
    const qiymat = document.getElementById("ism").value.trim();
    if (qiymat === "") {
        return "Ism-familiyani kiriting.";
    }
    if (qiymat.length < 3) {
        return "Ism-familiya kamida 3 ta belgidan iborat bo'lsin.";
    }
    if (qiymat.length > 50) {
        return "Ism-familiya 50 ta belgidan oshmasin.";
    }
    return "";
}

function emailniTekshir() {
    const qiymat = document.getElementById("email").value.trim();
    if (qiymat === "") {
        return "Email manzilini kiriting.";
    }
    // Oddiy namuna: matn @ matn . matn
    const namuna = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!namuna.test(qiymat)) {
        return "Email noto'g'ri. Masalan: ismingiz@example.com";
    }
    return "";
}

function telefonniTekshir() {
    const qiymat = document.getElementById("telefon").value.trim();
    if (qiymat === "") {
        return "Telefon raqamini kiriting.";
    }
    // +998 dan keyin aynan 9 ta raqam
    const namuna = /^\+998[0-9]{9}$/;
    if (!namuna.test(qiymat)) {
        return "Telefon +998XXXXXXXXX shaklida bo'lsin. Masalan: +998901234567";
    }
    return "";
}

function yoshniTekshir() {
    const qiymat = document.getElementById("yosh").value.trim();
    if (qiymat === "") {
        return "";   // yosh majburiy emas
    }
    const son = Number(qiymat);
    if (isNaN(son) || son < 7 || son > 70) {
        return "Yosh 7 dan 70 gacha bo'lgan son bo'lsin.";
    }
    return "";
}

function kursniTekshir() {
    if (document.getElementById("kurs").value === "") {
        return "Kurs yo'nalishini tanlang.";
    }
    return "";
}

function izohniTekshir() {
    const qiymat = document.getElementById("izoh").value;
    if (qiymat.length > 300) {
        return "Izoh 300 ta belgidan oshmasin (hozir " + qiymat.length + " ta).";
    }
    return "";
}

function roziliknitekshir() {
    if (!document.getElementById("rozilik").checked) {
        return "Davom etish uchun rozilik belgisini qo'ying.";
    }
    return "";
}

// Tekshiriladigan maydonlar ro'yxati (id + tekshiruv funksiyasi)
const tekshiruvlar = [
    { id: "ism", tekshir: ismniTekshir },
    { id: "email", tekshir: emailniTekshir },
    { id: "telefon", tekshir: telefonniTekshir },
    { id: "yosh", tekshir: yoshniTekshir },
    { id: "kurs", tekshir: kursniTekshir },
    { id: "izoh", tekshir: izohniTekshir },
    { id: "rozilik", tekshir: roziliknitekshir }
];

if (ariza !== null) {
    const muvaffaqiyat = document.getElementById("muvaffaqiyat");

    // Yuborishda: brauzerning odatiy yuborishini to'xtatib, o'zimiz tekshiramiz
    ariza.addEventListener("submit", function (e) {
        e.preventDefault();   // sahifa qayta yuklanmasin

        let hammasiTogri = true;
        let birinchiXatoMaydon = null;

        // Hamma maydonni birma-bir tekshiramiz
        for (let i = 0; i < tekshiruvlar.length; i++) {
            const xato = tekshiruvlar[i].tekshir();
            xatoYoz(tekshiruvlar[i].id, xato);

            if (xato !== "") {
                hammasiTogri = false;
                if (birinchiXatoMaydon === null) {
                    birinchiXatoMaydon = document.getElementById(tekshiruvlar[i].id);
                }
            }
        }

        if (!hammasiTogri) {
            muvaffaqiyat.hidden = true;
            birinchiXatoMaydon.focus();   // birinchi xatoli maydonga o'tamiz
            return;
        }

        // Hammasi to'g'ri: ismni eslab qolamiz, formani tozalaymiz, xabar chiqaramiz
        const ism = document.getElementById("ism").value.trim();
        ariza.reset();
        muvaffaqiyat.textContent = "Rahmat, " + ism + "! Arizangiz qabul qilindi. Markaz xodimi siz bilan bog'lanadi.";
        muvaffaqiyat.hidden = false;
    });

    // Foydalanuvchi maydonni o'zgartirsa, o'sha maydonning xatosi o'chadi
    ariza.addEventListener("input", function (e) {
        xatoYoz(e.target.id, "");
        muvaffaqiyat.hidden = true;
    });
    ariza.addEventListener("change", function (e) {
        xatoYoz(e.target.id, "");
    });

    // «Tozalash» tugmasi bosilganda hamma xato va xabar o'chadi
    ariza.addEventListener("reset", function () {
        for (let i = 0; i < tekshiruvlar.length; i++) {
            xatoYoz(tekshiruvlar[i].id, "");
        }
        muvaffaqiyat.hidden = true;
    });
}
