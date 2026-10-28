# Tryout TKA SD — Bahasa Indonesia (Password Bersama)

Website berisi 30 soal, identitas siswa (asal sekolah, nama, nomor absen), password bersama, timer 60 menit, navigasi soal, skor otomatis, pembahasan, login guru, rekap nilai online, dan ekspor CSV.

## File proyek
- `index.html`, `style.css`, `questions.js`, `app.js`: halaman siswa.
- `admin.html`, `admin.js`: halaman login guru dan rekap nilai.
- `supabase/schema.sql`: struktur database.
- `supabase/functions/tryout-api/index.ts`: verifikasi password, penilaian server, dan API rekap.

## Langkah 1 — Siapkan Supabase
1. Buka https://supabase.com lalu buat proyek baru.
2. Masuk ke **SQL Editor → New query**.
3. Buka `supabase/schema.sql`, salin seluruh isinya, tempel ke SQL Editor, lalu klik **Run**.
4. Buka **Project Settings → API** dan salin **Project URL**, **anon/publishable key**, dan **service_role/secret key**. Jangan pernah memasukkan service role key ke file HTML/JS atau GitHub.
5. Buka **Authentication → Users → Add user**, lalu buat akun guru menggunakan email dan password yang kuat.

## Langkah 2 — Atur Edge Function
Perlu Supabase CLI dan Node.js. Panduan resmi CLI: https://supabase.com/docs/guides/cli

1. Ekstrak proyek di komputer dan buka terminal pada folder proyek.
2. Jalankan:
   ```bash
   npx supabase login
   npx supabase link --project-ref ID_PROYEK_ANDA
   ```
   Ganti `ID_PROYEK_ANDA` dengan project ref dari Supabase URL.
3. Tambahkan secret server. Ganti nilai contoh dengan password bersama yang ingin diberikan kepada semua siswa, minimal 8 karakter:
   ```bash
   npx supabase secrets set STUDENT_PASSWORD="GantiPasswordKelas2026!"
   npx supabase secrets set SUPABASE_SERVICE_ROLE_KEY="ISI_SERVICE_ROLE_KEY"
   npx supabase secrets set TEACHER_EMAIL="emailguru@sekolah.sch.id"
   ```
   `SUPABASE_SERVICE_ROLE_KEY` hanya dipasang sebagai secret Supabase; jangan ditaruh di website. Supabase biasanya menyediakan `SUPABASE_URL` dan `SUPABASE_ANON_KEY` otomatis untuk Edge Functions.
4. Deploy fungsi:
   ```bash
   npx supabase functions deploy tryout-api
   ```
5. Salin URL fungsi, biasanya berbentuk `https://PROJECT_REF.supabase.co/functions/v1/tryout-api`.

## Langkah 3 — Isi URL dan key
1. Di `app.js`, ganti `GANTI_DENGAN_URL_SUPABASE_FUNCTION` dengan URL fungsi tadi.
2. Di `admin.js`, isi:
   - `SUPABASE_URL` = Project URL.
   - `SUPABASE_ANON_KEY` = anon/publishable key.
   - `API_URL` = URL fungsi tadi.

Anon/publishable key boleh berada di website; service role key tidak boleh.

## Langkah 4 — Unggah ke GitHub Pages
1. Buat repositori baru di https://github.com.
2. Unggah semua file proyek, dengan `index.html` berada di root repositori.
3. Buka **Settings → Pages**.
4. Pilih **Deploy from a branch**, branch `main`, folder `/ (root)`, lalu **Save**.
5. Tunggu sampai alamat GitHub Pages muncul. Halaman guru ada di `.../admin.html`.

## Langkah 5 — Uji sebelum digunakan
1. Buka `admin.html`, login dengan akun guru yang dibuat di Supabase.
2. Buka halaman siswa, isi sekolah, nama, nomor absen, dan password bersama yang disetel pada `STUDENT_PASSWORD`.
3. Kerjakan tryout sampai selesai. Nilai dikirim ke Supabase.
4. Kembali ke panel guru dan klik **Muat ulang rekap**. Klik **Unduh CSV** untuk membuka rekap di Excel.

## Catatan penting
- Password bersama memang lebih mudah, tetapi siapa pun yang mengetahui password dapat masuk. Bagikan hanya kepada siswa dan ganti password setelah tryout jika diperlukan.
- Identitas sekolah, nama, dan nomor absen tersimpan di database bersama agar rekap dari berbagai perangkat terkumpul.
- Login guru memakai Supabase Auth; Edge Function hanya mengizinkan email guru yang ditetapkan pada secret `TEACHER_EMAIL`.
- Nilai dan kunci jawaban dihitung di server, bukan mempercayai skor dari browser.
- 30 soal yang disediakan adalah contoh latihan buatan, bukan soal resmi atau jaminan kesesuaian dengan kisi-kisi terbaru.
- Sebelum digunakan secara resmi, uji dengan beberapa akun/perangkat. Lindungi data pribadi siswa dan jangan membagikan login guru.
