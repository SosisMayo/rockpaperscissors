# Deskripsi Proyek

API ini dikembangkan sebagai bagian dari final project dalam Bootcamp ODP IT di Bank Syariah Indonesia. Proyek ini merupakan backend untuk game multiplayer Rock Paper Scissors yang dirancang untuk mendukung mode permainan online dengan beberapa fitur utama seperti autentikasi, manajemen data pengguna, penyimpanan riwayat pertandingan, dan implementasi real-time gameplay menggunakan WebSocket.

# Fitur Utama

- Autentikasi dan Otorisasi
- Login & Register: Pengguna dapat membuat akun baru dan masuk dengan kredensial mereka.
- Refresh Token: Menggunakan mekanisme token berbasis JWT untuk menjaga keamanan sesi pengguna.
- Role-Based Access Control (RBAC): Membatasi akses berdasarkan peran pengguna (misalnya admin vs player).

- Manajemen Pengguna (CRUD User)

  - Create: Menambahkan data pengguna baru ke dalam sistem.
  - Read: Mengambil data pengguna tertentu atau daftar semua pengguna (hanya untuk admin).
  - Update: Memperbarui informasi pengguna seperti username atau email.
  - Delete: Menghapus akun pengguna dari sistem.

- Penyimpanan History Match
  -Menyimpan data pertandingan seperti tanggal, pemain yang terlibat, dan hasil pertandingan.

  - Memberikan fitur untuk melihat riwayat permainan pengguna.

- Gameplay Multiplayer dengan WebSocket
  - Menggunakan WebSocket untuk mengatur komunikasi real-time antara pemain selama permainan berlangsung.
  - Handling koneksi pemain, pemilihan simbol (batu, gunting, kertas), dan penghitungan hasil pertandingan secara real-time.

# Teknologi yang Digunakan

- Node.js dengan framework Express.js sebagai server-side framework.
- PostgreSQL untuk penyimpanan data pengguna dan riwayat pertandingan.
- Sequelize sebagai ORM untuk pengelolaan database.
- JWT (JSON Web Token) untuk autentikasi dan otorisasi.
- Socket.IO untuk implementasi WebSocket dan fitur multiplayer real-time.
- Joi untuk validasi input data.
- dotenv untuk pengelolaan variabel lingkungan.

# Arsitektur

- RESTful API dengan endpoint terstruktur berdasarkan fitur.
- Clean Architecture untuk memastikan kode mudah di-maintain dan scalable.
- Modular Design untuk pemisahan logika antara domain seperti autentikasi, pengguna, gameplay, dan riwayat.

# Tujuan

- Mengembangkan API yang robust, scalable, dan secure untuk mendukung aplikasi game Rock Paper Scissors.
- Menerapkan prinsip software engineering yang baik, termasuk clean code, pengujian, dan dokumentasi.
