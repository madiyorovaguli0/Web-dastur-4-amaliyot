# Bilim Ziyo — 4-amaliy ish

**Loyiha mavzusi:** «Bilim Ziyo» o'quv markazi sayti (til, fan va texnologiya kurslari).
Bu ish 2-amaliy ishdagi HTML/CSS saytning davomi: sayt JavaScript bilan jonlantirildi.

## Sahifalar

| Fayl | Nima uchun |
|------|-----------|
| `index.html` | Bosh sahifa |
| `batafsil.html` | Kurslar haqida batafsil, narxlar jadvali |
| `katalog.html` | **Yangi.** Kurslar JavaScript orqali massivdan chiqadi (qidiruv, filtr, saralash, modal) |
| `aloqa.html` | Kursga yozilish formasi (JavaScript bilan tekshiriladi) |

## Qo'shilgan imkoniyatlar

**A qism — ma'lumotlar**
- `js/data.js` da 10 ta kurs obyektidan iborat `kurslar` massivi (har birida 10 ta xususiyat, `teglar` — massiv).
- Statistika bloki: jami kurslar soni, o'rtacha oylik to'lov, eng qimmat kurs (`reduce` va `find` bilan).

**B qism — DOM**
- Kartalar HTML'da qo'lda yozilmagan, `createElement` bilan massivdan yaratiladi.
- Nom bo'yicha qidiruv (katta-kichik harf farqlanmaydi), yo'nalish filtri, saralash (narx o'sish / kamayish, nom bo'yicha).
- Qidiruv, filtr va saralash birgalikda ishlaydi. Natija bo'lmasa «Hech narsa topilmadi» chiqadi, kurslar soni yangilanib turadi.
- Barcha matnlar `textContent` orqali chiqariladi (`innerHTML` ishlatilmagan).

**C qism — interaktiv komponentlar** (`js/ui.js`)
- Modal oyna: «Batafsil» bosilganda ochiladi; × tugmasi, fon ustiga bosish va Escape bilan yopiladi.
- Event delegation: «Batafsil» tugmalari uchun bitta tinglovchi ota konteynerga (`#kartalar`) qo'yilgan, `e.target.closest()` ishlatilgan.
- Forma tekshiruvi (`aloqa.html`): `preventDefault()`, har bir maydon ostida xato matni (bo'sh maydon, email formati, telefon `+998XXXXXXXXX`, matn uzunligi), to'g'ri bo'lsa muvaffaqiyat xabari va forma tozalanadi.
- Tanlov komponenti: **tungi rejim**, tanlov `localStorage` da saqlanadi (barcha sahifalarda ishlaydi).

## Ishlatilgan massiv metodlari qayerda

| Metod | Fayl va qator | Nima qiladi |
|-------|---------------|-------------|
| `reduce` | `js/data.js`, 146-qator (`ortachaNarx`) | narxlar yig'indisini hisoblaydi |
| `reduce` | `js/data.js`, 159-qator (`engQimmatKurs`) | eng katta narxni topadi |
| `find` | `js/data.js`, 165-qator (`engQimmatKurs`) | shu narxdagi kursni topadi |
| `filter` | `js/katalog.js`, 101-qator (`yangila`) | qidiruv va filtrga mos kurslarni qoldiradi |
| `sort` | `js/katalog.js`, 110–118-qatorlar (`yangila`) | narx va nom bo'yicha saralaydi |
| `map` | `js/katalog.js`, 63-qator (`kartaYarat`) | teglarni `#teg` ko'rinishiga o'tkazadi |
| `find` | `js/katalog.js`, 137-qator (delegation) | bosilgan tugma `id` si bo'yicha kursni topadi |

## Fayl tuzilmasi

```
amaliy-04/
├── index.html
├── batafsil.html
├── katalog.html
├── aloqa.html
├── css/style.css
├── js/
│   ├── data.js      ← ma'lumotlar massivi va statistika funksiyalari
│   ├── katalog.js   ← chiqarish, qidiruv, filtr, saralash, delegation
│   └── ui.js        ← tungi rejim, modal, forma tekshiruvi
├── rasmlar/
└── README.md
```

## Ishga tushirish

`index.html` yoki `katalog.html` faylini brauzerda oching. Kutubxonalar (jQuery, Bootstrap JS) ishlatilmagan.
