// ==========================================
// KONFIGURASI SUPABASE
// ==========================================

const SUPABASE_URL = "https://nwtpsdwpvrowweuxlkse.supabase.co";

const SUPABASE_ANON_KEY = "sb_publishable_jWbnBJFOZyPwmlGh2b4Fxw_1IsUfLLo";

const API_URL = "https://nwtpsdwpvrowweuxlkse.supabase.co/functions/v1/tryout-api";


// ==========================================
// VARIABEL DAN FUNGSI DASAR
// ==========================================

const $ = (id) => document.getElementById(id);

let supabaseClient = null;
let lastResults = [];


function msg(id, text, error = true) {
  const element = $(id);

  if (!element) return;

  element.textContent = text;
  element.style.color = error ? "#b91c1c" : "#166534";
}


function configOk() {
  return ![
    SUPABASE_URL,
    SUPABASE_ANON_KEY,
    API_URL
  ].some((x) => x.startsWith("GANTI_"));
}


// ==========================================
// FUNGSI MENGHUBUNGI EDGE FUNCTION SUPABASE
// ==========================================

async function api(action) {
  const {
    data: { session }
  } = await supabaseClient.auth.getSession();

  if (!session) {
    throw new Error(
      "Sesi login berakhir. Silakan login kembali."
    );
  }

  const res = await fetch(API_URL, {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + session.access_token,
      "apikey": SUPABASE_ANON_KEY
    },

    body: JSON.stringify({
      action: action
    })
  });

  const data = await res.json().catch(() => ({
    error: "Respons server tidak valid."
  }));

  if (!res.ok) {
    throw new Error(
      data.error || "Permintaan gagal."
    );
  }

  return data;
}


// ==========================================
// MEMBUAT KONEKSI SUPABASE
// ==========================================

if (!configOk()) {
  msg(
    "loginMsg",
    "Konfigurasi belum diisi. Periksa SUPABASE_URL, SUPABASE_ANON_KEY dan API_URL pada admin.js.",
    true
  );

} else {
  supabaseClient = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_ANON_KEY
  );
}


// ==========================================
// LOGIN GURU
// ==========================================

$("teacherLogin").addEventListener(
  "submit",
  async (e) => {

    e.preventDefault();

    if (!supabaseClient) return;

    const btn = e.currentTarget.querySelector("button");

    btn.disabled = true;

    msg(
      "loginMsg",
      "Memeriksa akun...",
      false
    );

    try {
      const {
        error
      } = await supabaseClient.auth.signInWithPassword({

        email: $("email").value.trim(),

        password: $("password").value

      });

      if (error) {
        throw error;
      }

      $("loginPanel").classList.add("hidden");

      $("dashboard").classList.remove("hidden");

      await loadResults();

    } catch (err) {

      msg(
        "loginMsg",
        err.message || "Login gagal. Periksa email dan password guru.",
        true
      );

    } finally {

      btn.disabled = false;

    }
  }
);


// ==========================================
// LOGOUT GURU
// ==========================================

$("logout").addEventListener(
  "click",
  async () => {

    await supabaseClient.auth.signOut();

    $("dashboard").classList.add("hidden");

    $("loginPanel").classList.remove("hidden");

  }
);


// ==========================================
// TOMBOL MUAT ULANG REKAP
// ==========================================

$("refresh").addEventListener(
  "click",
  loadResults
);


// ==========================================
// MENENTUKAN LABEL PAKET TRYOUT
// ==========================================

function packageLabel(value) {

  const number = Number(value || 1);

  if (number === 1) {
    return "Paket 1";
  }

  if (number === 2) {
    return "Paket 2";
  }

  if (number === 3) {
    return "Paket 3";
  }

  return `Paket ${number}`;
}


// ==========================================
// MEMUAT REKAP NILAI SISWA
// ==========================================

async function loadResults() {

  try {

    const data = await api("list-results");

    lastResults = data.results || [];

    const tbody = $("resultsTable").querySelector("tbody");

    tbody.replaceChildren();


    lastResults.forEach((r) => {

      const tr = document.createElement("tr");


      // Menghitung durasi pengerjaan
      const duration = r.elapsed_seconds == null
        ? "—"
        : `${Math.floor(r.elapsed_seconds / 60)} mnt ${r.elapsed_seconds % 60} dtk`;


      // Data yang ditampilkan pada setiap baris tabel
      const values = [

        r.school,

        r.student_name,

        r.attendance_number,

        // Kolom baru: Paket Tryout
        packageLabel(r.tryout_number),

        r.score == null
          ? "—"
          : r.score,

        r.correct_count == null
          ? "—"
          : `${r.correct_count}/30`,

        formatDate(r.started_at),

        formatDate(r.submitted_at),

        duration,

        r.submitted_at
          ? "Selesai"
          : "Belum selesai"

      ];


      // Membuat kolom tabel
      values.forEach((value) => {

        const td = document.createElement("td");

        td.textContent = value ?? "—";

        tr.append(td);

      });


      tbody.append(tr);

    });


    msg(
      "resultsMsg",
      `${lastResults.length} data dimuat.`,
      false
    );


  } catch (err) {

    msg(
      "resultsMsg",
      err.message || "Gagal memuat rekap.",
      true
    );

  }

}


// ==========================================
// UNDUH REKAP NILAI DALAM FORMAT CSV
// ==========================================

$("csv").addEventListener(
  "click",
  () => {

    const rows = [

      // Judul kolom CSV
      [
        "Asal sekolah",
        "Nama siswa",
        "Nomor absen",
        "Paket Tryout",
        "Nilai",
        "Benar",
        "Mulai",
        "Selesai",
        "Durasi detik",
        "Status"
      ],


      // Isi data siswa
      ...lastResults.map((r) => [

        r.school,

        r.student_name,

        r.attendance_number,

        // Paket tryout ikut masuk ke CSV
        packageLabel(r.tryout_number),

        r.score ?? "",

        r.correct_count ?? "",

        r.started_at ?? "",

        r.submitted_at ?? "",

        r.elapsed_seconds ?? "",

        r.submitted_at
          ? "Selesai"
          : "Belum selesai"

      ])

    ];


    // Mengubah data menjadi format CSV
    const csv = rows.map((row) =>

      row.map((value) =>

        '"' +
        String(value ?? "").replaceAll('"', '""') +
        '"'

      ).join(",")

    ).join("\r\n");


    // Membuat file CSV
    const blob = new Blob(
      ["\ufeff" + csv],
      {
        type: "text/csv;charset=utf-8;"
      }
    );


    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");

    a.href = url;

    a.download = "rekap-tryout-tka-sd.csv";

    a.click();

    URL.revokeObjectURL(url);

  }
);


// ==========================================
// FORMAT TANGGAL DAN WAKTU
// ==========================================

function formatDate(value) {

  if (!value) {
    return "—";
  }

  return new Date(value).toLocaleString("id-ID");

}
