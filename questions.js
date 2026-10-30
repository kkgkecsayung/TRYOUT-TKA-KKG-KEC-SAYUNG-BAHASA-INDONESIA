/*
 * Bank soal Tryout TKA SD - Bahasa Indonesia
 * 30 soal berdasarkan dokumen TRYOUT TKA SD.
 *
 * Struktur:
 * - single: jawaban tunggal; answer adalah indeks opsi (mulai dari 0)
 * - multiple: pilihan ganda kompleks; answer adalah array indeks opsi
 * - true_false: answer berisi "Benar"/"Salah" untuk tiap pernyataan
 * - fact_opinion: answer berisi "Fakta"/"Opini" untuk tiap pernyataan
 *
 * Catatan: karena kunci jawaban disertakan di sisi klien untuk pembahasan,
 * jangan menganggap file ini sebagai sumber penilaian yang aman untuk ujian berisiko tinggi.
 */
window.TRYOUT_QUESTIONS = [
  {
    "id": 1,
    "type": "single",
    "passage": "Hutan mangrove tumbuh di wilayah pesisir yang dipengaruhi oleh pasang surut air laut. Tumbuhan ini memiliki akar yang kuat dan mampu bertahan di lingkungan berlumpur. Mangrove mempunyai peran penting bagi kehidupan di pantai.
Akar mangrove dapat membantu menahan lumpur dan mengurangi pengikisan pantai. Hutan ini juga menjadi tempat hidup berbagai hewan, seperti kepiting, ikan kecil, dan burung. Selain itu, kawasan mangrove dapat menjadi tempat berkembang biak bagi beberapa jenis ikan.
Sayangnya, sebagian hutan mangrove mengalami kerusakan akibat penebangan dan pembangunan yang tidak terkendali. Jika kerusakan terus terjadi, habitat hewan akan berkurang dan pantai menjadi lebih rentan mengalami pengikisan.
Masyarakat dapat membantu menjaga kelestarian mangrove dengan tidak membuang sampah sembarangan dan mengikuti kegiatan penanaman pohon. Pemerintah dan warga juga perlu bekerja sama melindungi kawasan pesisir. Dengan demikian, manfaat hutan mangrove dapat dirasakan oleh generasi sekarang dan mendatang.",

    "text": "Bacalah teks “Hutan Mangrove dan Manfaatnya”. Apa fungsi akar mangrove berdasarkan teks?",
    "options": [
      "Menghasilkan air tawar bagi warga.",
      "Menahan lumpur dan mengurangi pengikisan pantai.",
      "Menghalangi semua hewan masuk ke pantai.",
      "Mengubah air laut menjadi air tawar."
    ],
    "answer": 1,
    "explanation": "Teks menyebutkan bahwa akar mangrove membantu menahan lumpur dan mengurangi pengikisan pantai."
  },
  {
    "id": 2,
    "type": "single",
    "text": "Hewan yang disebutkan hidup di kawasan mangrove adalah ....",
    "options": [
      "Harimau, rusa, dan gajah.",
      "Ayam, bebek, dan angsa.",
      "Kepiting, ikan kecil, dan burung.",
      "Kambing, sapi, dan kerbau."
    ],
    "answer": 2,
    "explanation": "Pada teks disebutkan kepiting, ikan kecil, dan burung sebagai hewan yang hidup di kawasan mangrove."
  },
  {
    "id": 3,
    "type": "single",
    "text": "Apa ide pokok paragraf ketiga pada teks “Hutan Mangrove dan Manfaatnya”?",
    "options": [
      "Mangrove hanya tumbuh di pantai berlumpur.",
      "Kerusakan mangrove dapat menimbulkan berbagai dampak buruk.",
      "Semua hewan laut hidup di hutan mangrove.",
      "Masyarakat tidak membutuhkan hutan mangrove."
    ],
    "answer": 1,
    "explanation": "Paragraf ketiga menjelaskan kerusakan mangrove akibat penebangan dan pembangunan serta dampaknya bagi habitat hewan dan pantai."
  },
  {
    "id": 4,
    "type": "single",
    "text": "Mengapa kerusakan hutan mangrove dapat membahayakan wilayah pantai?",
    "options": [
      "Karena air laut akan langsung menghilang.",
      "Karena semua tumbuhan pantai akan berubah menjadi mangrove.",
      "Karena habitat hewan berkurang dan pantai lebih rentan terkikis.",
      "Karena jumlah penduduk pesisir akan berkurang."
    ],
    "answer": 2,
    "explanation": "Menurut teks, kerusakan mangrove mengurangi habitat hewan dan membuat pantai lebih rentan mengalami pengikisan."
  },
  {
    "id": 5,
    "type": "multiple",
    "text": "Pilihan Ganda Kompleks — pilih semua pernyataan yang benar. Berdasarkan teks, manfaat hutan mangrove adalah ....",
    "options": [
      "Membantu mengurangi pengikisan pantai.",
      "Menjadi habitat bagi berbagai hewan.",
      "Menyebabkan semua ikan berpindah ke laut lepas.",
      "Menjadi tempat berkembang biak bagi beberapa jenis ikan."
    ],
    "answer": [
      0,
      1,
      3
    ],
    "explanation": "Mangrove membantu mengurangi pengikisan pantai, menjadi habitat berbagai hewan, dan tempat berkembang biak beberapa jenis ikan. Pernyataan C tidak sesuai dengan teks."
  },
  {
    "id": 6,
    "type": "true_false",
    "text": "Kategori Benar-Salah — tentukan apakah pernyataan berikut sesuai dengan isi teks “Hutan Mangrove dan Manfaatnya”.",
    "statements": [
      {
        "statement": "Mangrove dapat tumbuh di wilayah berlumpur.",
        "answer": "Benar"
      },
      {
        "statement": "Penebangan yang tidak terkendali dapat merusak hutan mangrove.",
        "answer": "Benar"
      },
      {
        "statement": "Menjaga mangrove hanya merupakan tanggung jawab pemerintah.",
        "answer": "Salah"
      }
    ],
    "answer": [
      "Benar",
      "Benar",
      "Salah"
    ],
    "explanation": "A dan B sesuai dengan teks. C salah karena teks menyatakan pemerintah dan warga perlu bekerja sama melindungi kawasan pesisir."
  },
  {
    "id": 7,
    "type": "single",
    "text": "Dalam cerita “Sepeda untuk Rani”, di manakah Rani berteduh ketika hujan turun?",
    "options": [
      "Di perpustakaan sekolah.",
      "Di depan warung.",
      "Di halaman rumahnya.",
      "Di ruang kelas."
    ],
    "answer": 1,
    "explanation": "Rani berteduh di depan warung sambil menunggu hujan reda."
  },
  {
    "id": 8,
    "type": "single",
    "text": "Mengapa Pak Damar meminjamkan sepeda kepada Rani?",
    "options": [
      "Agar Rani dapat menjual sepeda itu.",
      "Agar Rani tidak perlu mengikuti lomba.",
      "Agar perjalanan Rani lebih singkat dan ia mempunyai lebih banyak waktu berlatih.",
      "Agar Rani bekerja di warung setiap pagi."
    ],
    "answer": 2,
    "explanation": "Dengan sepeda, perjalanan Rani ke sekolah menjadi lebih singkat sehingga ia memiliki lebih banyak waktu untuk berlatih membaca puisi."
  },
  {
    "id": 9,
    "type": "single",
    "text": "Watak Rani yang tampak dalam cerita “Sepeda untuk Rani” adalah ....",
    "options": [
      "Mudah menyerah dan ceroboh.",
      "Rajin dan bertanggung jawab.",
      "Sombong dan suka memerintah.",
      "Pemarah dan tidak peduli."
    ],
    "answer": 1,
    "explanation": "Rani tetap berusaha pergi ke sekolah dan berlatih puisi. Ia juga khawatir apakah mampu menjaga sepeda pinjaman, yang menunjukkan kepedulian terhadap tanggung jawab."
  },
  {
    "id": 10,
    "type": "single",
    "text": "Makna ungkapan “bantuan kecil dapat memberikan kesempatan besar” adalah ....",
    "options": [
      "Bantuan hanya berguna jika berupa uang banyak.",
      "Pertolongan sederhana dapat memberikan dampak berarti bagi orang lain.",
      "Setiap orang harus memberikan sepeda kepada temannya.",
      "Kesempatan hanya datang kepada orang yang menang lomba."
    ],
    "answer": 1,
    "explanation": "Sepeda yang dipinjamkan Pak Damar merupakan bantuan sederhana yang memberi Rani lebih banyak waktu untuk berlatih."
  },
  {
    "id": 11,
    "type": "multiple",
    "text": "Pilihan Ganda Kompleks — pilih semua jawaban yang benar. Pelajaran yang dapat diambil dari cerita “Sepeda untuk Rani” adalah ....",
    "options": [
      "Kita sebaiknya membantu orang lain sesuai kemampuan.",
      "Keberhasilan hanya ditentukan oleh hadiah yang diterima.",
      "Kita perlu bertanggung jawab terhadap barang yang dipinjam.",
      "Berusaha dengan sungguh-sungguh tetap penting meskipun belum menjadi juara."
    ],
    "answer": [
      0,
      2,
      3
    ],
    "explanation": "Cerita mengajarkan kepedulian, tanggung jawab atas barang pinjaman, serta pentingnya usaha meskipun Rani tidak menjadi juara pertama."
  },
  {
    "id": 12,
    "type": "true_false",
    "text": "Kategori Benar-Salah — tentukan apakah pernyataan berikut sesuai dengan cerita “Sepeda untuk Rani”.",
    "statements": [
      {
        "statement": "Rani selalu mengeluh ketika berjalan ke sekolah.",
        "answer": "Salah"
      },
      {
        "statement": "Pak Damar membantu Rani dengan meminjamkan sepeda.",
        "answer": "Benar"
      },
      {
        "statement": "Rani memenangkan juara pertama dalam lomba puisi.",
        "answer": "Salah"
      }
    ],
    "answer": [
      "Salah",
      "Benar",
      "Salah"
    ],
    "explanation": "Rani tidak pernah mengeluh, Pak Damar meminjamkan sepeda, dan Rani tidak memenangkan juara pertama."
  },
  {
    "id": 13,
    "type": "single",
    "text": "Menurut teks “Mengurangi Sampah Plastik di Sekolah”, sampah plastik di sekolah dapat berasal dari ....",
    "options": [
      "Daun kering dan ranting pohon saja.",
      "Bungkus makanan, sedotan, dan botol minuman sekali pakai.",
      "Air hujan dan udara.",
      "Batu dan pasir di halaman."
    ],
    "answer": 1,
    "explanation": "Teks menyebut bungkus makanan, sedotan, dan botol minuman sekali pakai sebagai contoh sumber sampah plastik."
  },
  {
    "id": 14,
    "type": "single",
    "text": "Apa tujuan memilah sampah plastik berdasarkan jenisnya?",
    "options": [
      "Agar sampah terlihat lebih berwarna.",
      "Agar sampah semakin banyak.",
      "Agar sampah lebih mudah dikelola.",
      "Agar semua sampah dapat dibakar."
    ],
    "answer": 2,
    "explanation": "Pemilahan berdasarkan jenis membantu sampah lebih mudah dikelola."
  },
  {
    "id": 15,
    "type": "single",
    "text": "Makna kata “konsisten” dalam paragraf terakhir teks “Mengurangi Sampah Plastik di Sekolah” adalah ....",
    "options": [
      "Dilakukan secara teratur dan berkelanjutan.",
      "Dilakukan hanya ketika ada perlombaan.",
      "Dilakukan secara terburu-buru.",
      "Dilakukan jika mendapat hadiah."
    ],
    "answer": 0,
    "explanation": "Konsisten berarti dilakukan secara tetap, teratur, dan berkelanjutan."
  },
  {
    "id": 16,
    "type": "single",
    "text": "Apa simpulan yang tepat berdasarkan teks “Mengurangi Sampah Plastik di Sekolah”?",
    "options": [
      "Sampah plastik hanya dapat dikurangi oleh petugas kebersihan.",
      "Penyediaan tempat sampah sudah cukup tanpa perubahan perilaku.",
      "Pengurangan sampah plastik membutuhkan fasilitas dan keterlibatan warga sekolah.",
      "Semua sampah plastik tidak dapat dimanfaatkan kembali."
    ],
    "answer": 2,
    "explanation": "Teks menjelaskan perlunya fasilitas seperti tempat sampah terpilah sekaligus keterlibatan seluruh warga sekolah."
  },
  {
    "id": 17,
    "type": "multiple",
    "text": "Pilihan Ganda Kompleks — pilih semua jawaban yang benar. Tindakan yang sesuai dengan isi teks “Mengurangi Sampah Plastik di Sekolah” adalah ....",
    "options": [
      "Membawa botol minum sendiri.",
      "Membuang seluruh sampah ke satu tempat.",
      "Menggunakan kembali barang yang masih layak.",
      "Mengikuti edukasi tentang lingkungan."
    ],
    "answer": [
      0,
      2,
      3
    ],
    "explanation": "Membawa botol sendiri, menggunakan kembali barang yang layak, dan mengikuti edukasi lingkungan sesuai dengan anjuran dalam teks."
  },
  {
    "id": 18,
    "type": "fact_opinion",
    "text": "Kategori Fakta-Opini — tentukan apakah setiap pernyataan termasuk fakta atau opini berdasarkan isi dan bentuk pernyataannya.",
    "statements": [
      {
        "statement": "Sampah plastik dapat berasal dari bungkus makanan.",
        "answer": "Fakta"
      },
      {
        "statement": "Menurut saya, membawa kotak makan sendiri merupakan cara paling menyenangkan.",
        "answer": "Opini"
      },
      {
        "statement": "Sekolah dapat menyediakan tempat sampah terpilah.",
        "answer": "Fakta"
      }
    ],
    "answer": [
      "Fakta",
      "Opini",
      "Fakta"
    ],
    "explanation": "A didukung informasi dalam teks. B merupakan pendapat pribadi yang ditandai “Menurut saya”. C menyatakan tindakan yang dapat dilakukan sekolah dan disebutkan dalam teks sebagai informasi."
  },
  {
    "id": 19,
    "type": "single",
    "text": "Kapan mobil perpustakaan keliling mengunjungi Desa Sukamaju?",
    "options": [
      "Setiap hari Senin.",
      "Setiap hari Rabu.",
      "Setiap hari Jumat.",
      "Setiap akhir bulan."
    ],
    "answer": 1,
    "explanation": "Pada paragraf pertama disebutkan bahwa mobil perpustakaan keliling mengunjungi Desa Sukamaju setiap hari Rabu."
  },
  {
    "id": 20,
    "type": "single",
    "text": "Mengapa jumlah pengunjung perpustakaan keliling bertambah?",
    "options": [
      "Semua anak diwajibkan membeli buku.",
      "Mobil perpustakaan memberikan uang kepada setiap anak.",
      "Petugas membuat kegiatan membaca lebih menarik.",
      "Anak-anak tidak boleh bermain di rumah."
    ],
    "answer": 2,
    "explanation": "Petugas mengadakan membaca cerita bersama dan kuis sederhana sehingga kegiatan membaca menjadi lebih menarik."
  },
  {
    "id": 21,
    "type": "single",
    "text": "Apa ide pokok paragraf ketiga pada teks “Perpustakaan Keliling di Desa Sukamaju”?",
    "options": [
      "Anak-anak tidak suka membaca buku.",
      "Kegiatan yang menarik meningkatkan minat anak untuk membaca.",
      "Mira ingin pergi ke kota.",
      "Kepala desa ingin membeli mobil baru."
    ],
    "answer": 1,
    "explanation": "Paragraf ketiga menjelaskan bahwa kegiatan yang menarik membuat membaca lebih menyenangkan, jumlah pengunjung bertambah, dan anak mulai meminjam buku."
  },
  {
    "id": 22,
    "type": "single",
    "text": "Makna ungkapan “minat baca” adalah ....",
    "options": [
      "Keinginan atau ketertarikan untuk membaca.",
      "Kemampuan untuk membeli banyak buku.",
      "Kewajiban untuk menulis cerita.",
      "Kebiasaan mengumpulkan kendaraan."
    ],
    "answer": 0,
    "explanation": "Minat baca berarti keinginan atau ketertarikan seseorang terhadap kegiatan membaca."
  },
  {
    "id": 23,
    "type": "multiple",
    "text": "Pilihan Ganda Kompleks — pilih semua jawaban yang benar. Berdasarkan teks “Perpustakaan Keliling di Desa Sukamaju”, manfaat perpustakaan keliling adalah ....",
    "options": [
      "Memudahkan anak mendapatkan bahan bacaan.",
      "Membantu meningkatkan minat baca.",
      "Mengharuskan semua anak tinggal di balai desa.",
      "Memberikan kesempatan meminjam buku untuk dibaca di rumah."
    ],
    "answer": [
      0,
      1,
      3
    ],
    "explanation": "Perpustakaan keliling mendekatkan buku kepada anak, membantu meningkatkan minat baca, dan memungkinkan anak meminjam buku untuk dibaca di rumah."
  },
  {
    "id": 24,
    "type": "true_false",
    "text": "Kategori Benar-Salah — tentukan apakah pernyataan berikut sesuai dengan teks “Perpustakaan Keliling di Desa Sukamaju”.",
    "statements": [
      {
        "statement": "Pada awalnya, hanya sedikit anak yang datang ke perpustakaan keliling.",
        "answer": "Benar"
      },
      {
        "statement": "Mira merasa senang karena dapat membaca buku tanpa pergi jauh ke kota.",
        "answer": "Benar"
      },
      {
        "statement": "Kepala desa menilai dukungan warga tidak diperlukan.",
        "answer": "Salah"
      }
    ],
    "answer": [
      "Benar",
      "Benar",
      "Salah"
    ],
    "explanation": "A dan B sesuai dengan teks. C salah karena kepala desa menyatakan dukungan warga sangat diperlukan."
  },
  {
    "id": 25,
    "type": "single",
    "text": "Apa yang dapat menyebabkan air terbuang percuma berdasarkan teks “Hemat Air, Selamatkan Masa Depan”?",
    "options": [
      "Mematikan keran setelah digunakan.",
      "Membiarkan keran terbuka dan membiarkan pipa bocor.",
      "Menyiram tanaman sesuai kebutuhan.",
      "Melaporkan keran yang rusak."
    ],
    "answer": 1,
    "explanation": "Keran yang dibiarkan terbuka saat tidak digunakan dan pipa yang bocor dapat menyebabkan air terbuang percuma."
  },
  {
    "id": 26,
    "type": "single",
    "text": "Apa tindakan yang dapat dilakukan siswa ketika menemukan keran bocor di sekolah?",
    "options": [
      "Membiarkannya sampai keran berhenti sendiri.",
      "Menggunakan air sebanyak-banyaknya.",
      "Melaporkannya kepada guru atau petugas.",
      "Menutup semua keran di sekolah secara permanen."
    ],
    "answer": 2,
    "explanation": "Teks menyarankan siswa melaporkan keran yang bocor kepada guru atau petugas."
  },
  {
    "id": 27,
    "type": "single",
    "text": "Simpulan yang paling tepat dari teks “Hemat Air, Selamatkan Masa Depan” adalah ....",
    "options": [
      "Air hanya diperlukan untuk minum dan memasak.",
      "Menghemat air merupakan tanggung jawab petugas sekolah saja.",
      "Penghematan air dapat dilakukan melalui kebiasaan sederhana dan kerja sama.",
      "Air bekas mencuci sayuran harus selalu dibuang."
    ],
    "answer": 2,
    "explanation": "Teks memberi contoh kebiasaan sederhana di rumah dan sekolah serta menekankan bahwa penghematan air lebih efektif jika dilakukan bersama-sama."
  },
  {
    "id": 28,
    "type": "single",
    "text": "Makna ungkapan “terbuang percuma” dalam teks adalah ....",
    "options": [
      "Digunakan secara tepat.",
      "Hilang atau terpakai tanpa manfaat yang diperlukan.",
      "Disimpan untuk digunakan kembali.",
      "Dibagikan kepada orang lain."
    ],
    "answer": 1,
    "explanation": "Terbuang percuma berarti terbuang sia-sia atau tidak memberi manfaat yang seharusnya."
  },
  {
    "id": 29,
    "type": "multiple",
    "text": "Pilihan Ganda Kompleks — pilih semua jawaban yang benar. Manakah tindakan yang mendukung penghematan air?",
    "options": [
      "Mematikan keran ketika menyikat gigi.",
      "Membiarkan pipa bocor selama beberapa hari.",
      "Menggunakan air sesuai kebutuhan.",
      "Melaporkan keran bocor kepada petugas."
    ],
    "answer": [
      0,
      2,
      3
    ],
    "explanation": "Mematikan keran, menggunakan air sesuai kebutuhan, dan melaporkan kebocoran membantu menghemat air. Membiarkan pipa bocor justru memboroskan air."
  },
  {
    "id": 30,
    "type": "fact_opinion",
    "text": "Kategori Fakta-Opini — tentukan apakah setiap pernyataan termasuk fakta atau opini berdasarkan isi dan bentuk pernyataannya.",
    "statements": [
      {
        "statement": "Air digunakan untuk minum dan memasak.",
        "answer": "Fakta"
      },
      {
        "statement": "Menurut saya, poster hemat air merupakan cara paling menarik untuk mengajak siswa.",
        "answer": "Opini"
      },
      {
        "statement": "Kebocoran pipa dapat menyebabkan air terbuang.",
        "answer": "Fakta"
      }
    ],
    "answer": [
      "Fakta",
      "Opini",
      "Fakta"
    ],
    "explanation": "A dan C merupakan informasi yang dapat diperiksa dan sesuai dengan teks. B adalah opini karena menyatakan penilaian pribadi melalui frasa “Menurut saya” dan “paling menarik”."
  }
];
