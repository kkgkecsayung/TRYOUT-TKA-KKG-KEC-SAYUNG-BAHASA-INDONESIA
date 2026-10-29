// Isi URL dan anon key Supabase, serta URL Edge Function.
const SUPABASE_URL = "https://nwtpsdwpvrowweuxlkse.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_jWbnBJFOZyPwmlGh2b4Fxw_1IsUfLLo";
const API_URL = "https://nwtpsdwpvrowweuxlkse.supabase.co/functions/v1/tryout-api";
const $ = (id) => document.getElementById(id);
let supabaseClient = null, lastResults = [];
function msg(id,text,error=true){$(id).textContent=text;$(id).style.color=error?"#b91c1c":"#166534";}
function configOk(){return ![SUPABASE_URL,SUPABASE_ANON_KEY,API_URL].some(x=>x.startsWith("GANTI_"));}
async function api(action){
 const {data:{session}}=await supabaseClient.auth.getSession();
 if(!session) throw new Error("Sesi login berakhir. Silakan login kembali.");
 const res=await fetch(API_URL,{method:"POST",headers:{"Content-Type":"application/json","Authorization":"Bearer "+session.access_token,"apikey":SUPABASE_ANON_KEY},body:JSON.stringify({action})});
 const data=await res.json().catch(()=>({error:"Respons server tidak valid."}));
 if(!res.ok) throw new Error(data.error||"Permintaan gagal.");
 return data;
}
if(!configOk()){msg("loginMsg","Konfigurasi belum diisi. Isi SUPABASE_URL, SUPABASE_ANON_KEY dan API_URL pada admin.js.",true);}
else{supabaseClient=window.supabase.createClient(SUPABASE_URL,SUPABASE_ANON_KEY);}
$("teacherLogin").addEventListener("submit",async e=>{
 e.preventDefault();if(!supabaseClient)return;
 const btn=e.currentTarget.querySelector("button");btn.disabled=true;msg("loginMsg","Memeriksa akun...",false);
 try{const {error}=await supabaseClient.auth.signInWithPassword({email:$("email").value.trim(),password:$("password").value});if(error)throw error;
 $("loginPanel").classList.add("hidden");$("dashboard").classList.remove("hidden");await loadResults();}
 catch(err){msg("loginMsg","Login gagal. Periksa email dan password guru.");}
 finally{btn.disabled=false;}
});
$("logout").addEventListener("click",async()=>{await supabaseClient.auth.signOut();$("dashboard").classList.add("hidden");$("loginPanel").classList.remove("hidden");});
$("refresh").addEventListener("click",loadResults);
async function loadResults(){try{
 const data=await api("list-results");lastResults=data.results||[];
 const tbody=$("resultsTable").querySelector("tbody");tbody.replaceChildren();
 lastResults.forEach(r=>{const tr=document.createElement("tr");const duration=r.elapsed_seconds==null?"—":`${Math.floor(r.elapsed_seconds/60)} mnt ${r.elapsed_seconds%60} dtk`;
 [r.school,r.student_name,r.attendance_number,r.score==null?"—":r.score,r.correct_count==null?"—":`${r.correct_count}/30`,formatDate(r.started_at),formatDate(r.submitted_at),duration,r.submitted_at?"Selesai":"Belum selesai"].forEach(v=>{const td=document.createElement("td");td.textContent=v??"—";tr.append(td);});tbody.append(tr);});
 msg("resultsMsg",`${lastResults.length} data dimuat.`,false);
 }catch(err){msg("resultsMsg",err.message);}}
$("csv").addEventListener("click",()=>{const rows=[["Asal sekolah","Nama siswa","Nomor absen","Nilai","Benar","Mulai","Selesai","Durasi detik","Status"],...lastResults.map(r=>[r.school,r.student_name,r.attendance_number,r.score??"",r.correct_count??"",r.started_at??"",r.submitted_at??"",r.elapsed_seconds??"",r.submitted_at?"Selesai":"Belum selesai"])];
 const csv=rows.map(row=>row.map(v=>'"'+String(v??"").replaceAll('"','""')+'"').join(",")).join("\r\n");
 const blob=new Blob(["\ufeff"+csv],{type:"text/csv;charset=utf-8;"}),url=URL.createObjectURL(blob),a=document.createElement("a");a.href=url;a.download="rekap-tryout-tka-sd.csv";a.click();URL.revokeObjectURL(url);});
function formatDate(value){if(!value)return "—";return new Date(value).toLocaleString("id-ID");}
