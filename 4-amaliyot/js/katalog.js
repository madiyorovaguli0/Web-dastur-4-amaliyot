// js/katalog.js
// Katalog sahifasi: kartalarni chiqarish, qidiruv, filtr, saralash.
// data.js dagi `kurslar` massivi va statistika funksiyalaridan foydalanadi.

// ---------- 1-qadam: HTML'dagi elementlarni topib olamiz ----------
const konteyner = document.getElementById("kartalar");
const soni = document.getElementById("soni");
const boshXabar = document.getElementById("bosh");
const qidiruv = document.getElementById("qidiruv");
const kategoriya = document.getElementById("kategoriya");
const saralash = document.getElementById("saralash");

// ---------- 2-qadam: yordamchi funksiya (pulni chiroyli yozish) ----------
// 350000 -> "350 000 so'm"
function pulFormat(son) {
    return son.toLocaleString("ru-RU") + " so'm";
}

// ---------- 3-qadam: statistika blokini to'ldirish ----------
function statistikaniChiqar() {
    document.getElementById("statJami").textContent = jamiSoni(kurslar);
    document.getElementById("statOrtacha").textContent = pulFormat(Math.round(ortachaNarx(kurslar)));
    document.getElementById("statEngQimmat").textContent = engQimmatKurs(kurslar).nomi;
}

// ---------- 4-qadam: bitta kurs uchun karta yaratish ----------
// Hamma matn textContent bilan qo'yiladi (innerHTML ishlatilmaydi — XSS xavfsizligi).
function kartaYarat(kurs) {
    const karta = document.createElement("article");
    karta.className = "card";
    karta.dataset.id = kurs.id;

    // "Qabul ochiq / yopiq" belgisi
    const belgi = document.createElement("span");
    if (kurs.mavjud) {
        belgi.className = "badge";
        belgi.textContent = "Qabul ochiq";
    } else {
        belgi.className = "badge badge-yopiq";
        belgi.textContent = "Qabul yopiq";
    }

    const rasm = document.createElement("img");
    rasm.src = kurs.rasm;
    rasm.alt = kurs.nomi + " kursi";
    rasm.width = 800;
    rasm.height = 500;
    rasm.loading = "lazy";

    const sarlavha = document.createElement("h3");
    sarlavha.textContent = kurs.nomi;

    const yonalish = document.createElement("p");
    yonalish.textContent = "Yo'nalish: " + kurs.kategoriya;

    const narx = document.createElement("p");
    narx.className = "card-narx";
    narx.textContent = pulFormat(kurs.narx) + " / oy";

    // map: har bir tegni "#tegi" ko'rinishiga o'tkazadi, join bilan bitta matn qiladi
    const teglar = document.createElement("p");
    teglar.className = "izoh";
    teglar.textContent = kurs.teglar.map(function (tegi) {
        return "#" + tegi;
    }).join(" ");

    const tugma = document.createElement("button");
    tugma.type = "button";
    tugma.className = "btn batafsil-tugma";
    tugma.dataset.id = kurs.id;
    tugma.textContent = "Batafsil";

    karta.append(belgi, rasm, sarlavha, yonalish, narx, teglar, tugma);
    return karta;
}

// ---------- 5-qadam: ro'yxatni sahifaga chiqarish ----------
function chiqar(royxat) {
    // Eski kartalarni tozalaymiz
    konteyner.replaceChildren();

    // Har bir kurs uchun karta yasab, konteynerga qo'shamiz
    for (let i = 0; i < royxat.length; i++) {
        konteyner.append(kartaYarat(royxat[i]));
    }

    // Ko'rsatilayotgan kurslar sonini yangilaymiz
    soni.textContent = royxat.length;

    // Natija bo'lmasa — «Hech narsa topilmadi» xabarini ko'rsatamiz
    boshXabar.hidden = royxat.length !== 0;
}

// ---------- 6-qadam: qidiruv + filtr + saralash BIRGALIKDA ----------
function yangila() {
    const matn = qidiruv.value.trim().toLowerCase();   // katta-kichik harf farqlanmaydi
    const tanlanganYonalish = kategoriya.value;
    const tartib = saralash.value;

    // a) filter: faqat shartga mos kurslar qoladi (nom VA yo'nalish)
    const natija = kurslar.filter(function (kurs) {
        const nomTogri = kurs.nomi.toLowerCase().includes(matn);
        const yonalishTogri = tanlanganYonalish === "hammasi" || kurs.kategoriya === tanlanganYonalish;
        return nomTogri && yonalishTogri;
    });

    // b) sort: tanlangan tartib bo'yicha saralash
    //    (a, b) => a - b  — raqamlarni to'g'ri saralash uchun kerak
    if (tartib === "narx-osish") {
        natija.sort(function (a, b) {
            return a.narx - b.narx;
        });
    } else if (tartib === "narx-kamayish") {
        natija.sort(function (a, b) {
            return b.narx - a.narx;
        });
    } else if (tartib === "nom") {
        natija.sort(function (a, b) {
            return a.nomi.localeCompare(b.nomi);
        });
    }

    // c) natijani sahifaga chiqaramiz
    chiqar(natija);
}

// ---------- 7-qadam: EVENT DELEGATION ----------
// Tinglovchi har bir tugmaga emas, BITTA ota konteynerga qo'yiladi.
// Bosilgan joydan yuqoriga qarab closest() bilan «Batafsil» tugmasini qidiramiz.
konteyner.addEventListener("click", function (e) {
    const tugma = e.target.closest(".batafsil-tugma");
    if (tugma === null) {
        return;   // boshqa joy bosilgan — hech narsa qilmaymiz
    }
    const id = Number(tugma.dataset.id);
    // find: id bo'yicha bitta kursni topadi
    const kurs = kurslar.find(function (k) {
        return k.id === id;
    });
    modalOch(kurs, tugma);   // modalOch ui.js faylida yozilgan
});

// ---------- 8-qadam: hodisalarni ulash va birinchi marta chiqarish ----------
qidiruv.addEventListener("input", yangila);        // har bir harf yozilganda
kategoriya.addEventListener("change", yangila);    // tanlov o'zgarganda
saralash.addEventListener("change", yangila);

statistikaniChiqar();
yangila();
