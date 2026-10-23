# CyberCare — Cyber Hygiene Scorecard

Front-end HTML, CSS, dan JavaScript dengan tata letak dan menu yang sama seperti
web CyberCare awal. Perubahan visual yang diminta hanya tema gelap. Penilaian
dihitung di browser; jawaban tidak disimpan atau dikirim.
Logo memakai file `Logo RKS Web.png` yang berada di samping file HTML.
Metadata Open Graph dan Twitter Card ada di bagian `<head>` `index.html`.
Setelah web dipublikasikan, isi `og:image` dan `twitter:image` dengan URL
HTTPS lengkap ke file logo agar aplikasi chat dapat mengambil gambar pratinjau.

## Jalankan

- Ekstrak ZIP, lalu buka `index.html` langsung di browser.
- Di VS Code: buka folder proyek, lalu klik kanan `index.html` dan pilih
  **Open with Live Server** jika ekstensi Live Server sudah terpasang.

## Edit tampilan

- `index.html` dan `login.html`: halaman dengan susunan dan menu asli. Nama
  pengguna bersifat opsional dan hanya ditampilkan di hasil browser.
- `style.css`: tema gelap; tata letak dan menu tetap seperti web awal.
- `script.js`: pertanyaan, skor, dan ringkasan hasil di browser.

Simpan perubahan lalu refresh browser untuk melihat hasilnya.

Menu Login Admin dipertahankan sebagai tampilan. Login dan penyimpanan data
memerlukan backend dan belum aktif pada versi front-end ini.
