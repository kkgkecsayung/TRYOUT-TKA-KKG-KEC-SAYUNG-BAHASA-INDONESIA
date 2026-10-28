// Isi API_URL dengan URL Supabase Edge Function setelah deployment.
const API_URL = "https://nwtpsdwpvrowweuxlkse.supabase.co/functions/v1/tryout-api";
const $ = (id) => document.getElementById(id);
let attemptId = null, answers = Array(30).fill(null), current = 0, seconds = 3600, timerId = null, submitting = false, startedAt = 0;
function showMessage(id, text, isError=true){ const el=$(id); el.textContent=text; el.style.color=isError?"#b91c1c":"#166534"; }
async function api(payload){
  if(API_URL.startsWith("GANTI_")) throw new Error("Website belum dikonfigurasi. Ikuti panduan README.md.");
  const res=await fetch(API_URL,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(payload)});
  const data=await res.json().catch(()=>({error:"Respons server tidak valid."}));
  if(!res.ok) throw new Error(data.error||"Permintaan gagal.");
  return data;
}
$("startForm").addEventListener("submit",async(e)=>{
 e.preventDefault();
 const name=$("studentName").value.trim(), school=$("school").value.trim(), attendance=Number($("attendance").value), password=$("studentPassword").value;
 if(!name||!school||!Number.isInteger(attendance)||attendance<1||attendance>99||!password) return;
 const btn=$("startForm").querySelector("button");btn.disabled=true;showMessage("loginMessage","Memeriksa identitas dan password...",false);
 try{
   const data=await api({action:"start",name,school,attendance,password});
   attemptId=data.attemptId; startedAt=Date.now();
   $("who").textContent=`${name} · ${school} · Absen ${attendance}`;
   $("loginCard").classList.add("hidden");$("quizCard").classList.remove("hidden");
   renderQuestion(); renderNav(); updateProgress(); timerId=setInterval(tick,1000);
 }catch(err){showMessage("loginMessage",err.message);}
 finally{btn.disabled=false;}
});
function tick(){seconds--; if(seconds<=0){seconds=0;updateTimer();clearInterval(timerId);submitQuiz(true);return;}updateTimer();}
function updateTimer(){const m=String(Math.floor(seconds/60)).padStart(2,"0"),s=String(seconds%60).padStart(2,"0");$("timer").textContent=`${m}:${s}`;if(seconds<=300)$("timer").style.background="#fee2e2";}
function renderQuestion(){
 const item=window.TRYOUT_QUESTIONS[current]; $("questionCount").textContent=`Soal ${current+1} dari 30`; $("questionText").textContent=item.q;
 const labels=["A","B","C","D"]; $("choices").replaceChildren();
 item.a.forEach((choice,i)=>{const label=document.createElement("label");label.className="choice"+(answers[current]===i?" selected":"");
 const input=document.createElement("input");input.type="radio";input.name="answer";input.value=i;input.checked=answers[current]===i;
 input.addEventListener("change",()=>{answers[current]=i;renderQuestion();renderNav();updateProgress();});
 const span=document.createElement("span");span.textContent=`${labels[i]}. ${choice}`;label.append(input,span);$("choices").append(label);});
 $("prevBtn").disabled=current===0;$("nextBtn").disabled=current===29;renderNav();
}
function renderNav(){const box=$("questionNav");box.replaceChildren();answers.forEach((a,i)=>{const b=document.createElement("button");b.type="button";b.className="navBtn"+(a!==null?" answered":"")+(i===current?" current":"");b.textContent=i+1;b.setAttribute("aria-label",`Buka soal ${i+1}`);b.addEventListener("click",()=>{current=i;renderQuestion();});box.append(b);});}
function updateProgress(){const count=answers.filter(a=>a!==null).length;$("progressBar").style.width=(count/30*100)+"%";$("quizMessage").textContent=`${count} dari 30 soal telah dijawab.`;$("quizMessage").style.color="#64748b";}
$("prevBtn").addEventListener("click",()=>{if(current>0){current--;renderQuestion();}});
$("nextBtn").addEventListener("click",()=>{if(current<29){current++;renderQuestion();}});
$("submitBtn").addEventListener("click",()=>submitQuiz(false));
async function submitQuiz(auto=false){
 if(submitting||!attemptId)return;
 if(!auto){const blank=answers.filter(a=>a===null).length;if(!confirm(blank?`Masih ada ${blank} soal kosong. Kumpulkan sekarang?`:"Yakin ingin mengumpulkan jawaban?"))return;}
 submitting=true;clearInterval(timerId);$("submitBtn").disabled=true;showMessage("quizMessage","Mengirim jawaban...",false);
 try{
   const elapsed=Math.max(0,Math.floor((Date.now()-startedAt)/1000));
   const result=await api({action:"submit",attemptId,answers,elapsedSeconds:elapsed});
   $("quizCard").classList.add("hidden");$("resultCard").classList.remove("hidden");
   $("resultText").textContent=`Terima kasih, ${result.name}. Nilai Anda: ${result.score}/100 (${result.correct}/30 jawaban benar).`;
   const review=$("reviewList");review.replaceChildren();
   (result.review||[]).forEach((r,i)=>{const card=document.createElement("article");card.className="card";
     const h=document.createElement("h3");h.textContent=`Soal ${i+1} — ${r.correct?"Benar":"Belum tepat"}`;
     const p=document.createElement("p");p.textContent=window.TRYOUT_QUESTIONS[i].q;
     const a=document.createElement("p");a.textContent=`Jawaban benar: ${["A","B","C","D"][r.answer]}. ${window.TRYOUT_QUESTIONS[i].a[r.answer]}`;
     const ex=document.createElement("p");ex.textContent=`Pembahasan: ${r.explanation}`;
     card.append(h,p,a,ex);review.append(card);
   });
 }catch(err){submitting=false;$("submitBtn").disabled=false;showMessage("quizMessage",err.message);if(seconds>0)timerId=setInterval(tick,1000);}
}
updateTimer();
