# VesperVPN landing page

Landing page VesperVPN, dibangun dengan **Vite + React**.

## Menjalankan secara lokal

```bash
npm install
npm run dev        # http://localhost:5173
```

## Build

```bash
npm run build      # hasil di dist/
npm run preview    # cek hasil build
```

`vite.config.js` memakai `base: './'`, jadi isi `dist/` bisa ditaruh di mana saja.

## Deploy

- **Vercel**: import repo ini. Framework terdeteksi sebagai Vite; build command `npm run build`, output `dist`.
- **GitHub Pages**: publish isi folder `dist/` (misalnya lewat GitHub Actions).

## Struktur

```
index.html              head, meta, font; React mount di #root
src/main.jsx            entry
src/App.jsx             urutan section + menjalankan script interaksi
src/components/         satu file per section (Header, Hero, Why, Tech, Servers,
                        Apps, Pricing, Faq, Cta, Footer…) plus modal Auth,
                        Checkout, Account, Dialogs
src/styles/             CSS dipecah per bagian; urutan impor di index.css
src/lib/interactions.js perilaku halaman (menu, modal, checkout, FAQ, tooltip…)
src/assets/images/      foto dan screenshot app
```

Interaksi masih memakai script vanilla aslinya. Script itu dijalankan sekali
setelah React selesai merender, dan bekerja langsung pada `id`/`class` di
komponen. Karena itu, `id` dan `class` di komponen jangan diganti tanpa ikut
mengubah `interactions.js`.

## Catatan

Ini konsep desain, bukan produk resmi. Semua nama dan logo pihak ketiga milik
pemiliknya masing-masing.
