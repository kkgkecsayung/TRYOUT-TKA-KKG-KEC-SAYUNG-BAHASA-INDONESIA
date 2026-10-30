// Isi API_URL dengan URL Supabase Edge Function setelah deployment.
const API_URL = "https://nwtpsdwpvrowweuxlkse.supabase.co/functions/v1/tryout-api";
const $ = (id) => document.getElementById(id);

let attemptId = null, 
    answers = Array(30).fill(null), 
    current = 0, 
    seconds = 3600, 
    timerId = null, 
    submitting = false, 
    startedAt = 0;

function showMessage(id, text, isError=true){ 
  const el=$(id); 
  el.textContent=text; 
  el.style.color=isError?"#b91c1c":"#166534"; 
}

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
 const item = window.TRYOUT_QUESTIONS[current]; 
 $("questionCount").textContent = `Soal ${current + 1} dari 30`; 
 $("questionText").style.whiteSpace = "pre-line";
 $("questionText").textContent = item.text || item.q;
 
 const box = $("choices");
 box.replaceChildren();

 if (item.type === "single" || !item.type) {
   const options = item.options || item.a;
   const labels = ["A", "B", "C", "D"];
   options.forEach((choice, i) => {
     const label = document.createElement("label");
     label.className = "choice" + (answers[current] === i ? " selected" : "");
     
     const input = document.createElement("input");
     input.type = "radio";
     input.name = "answer";
     input.value = i;
     input.checked = answers[current] === i;
     
     input.addEventListener("change", () => {
       answers[current] = i;
       renderQuestion();
       renderNav();
       updateProgress();
     });
     
     const span = document.createElement("span");
     span.textContent = `${labels[i]}. ${choice}`;
     label.append(input, span);
     box.append(label);
   });
 } 
 else if (item.type === "multiple") {
   if (!Array.isArray(answers[current])) answers[current] = [];
   const labels = ["A", "B", "C", "D"];
   
   item.options.forEach((choice, i) => {
     const label = document.createElement("label");
     const isChecked = answers[current].includes(i);
     label.className = "choice" + (isChecked ? " selected" : "");
     
     const input = document.createElement("input");
     input.type = "checkbox";
     input.value = i;
     input.checked = isChecked;
     
     input.addEventListener("change", () => {
       if (input.checked) {
         if (!answers[current].includes(i)) answers[current].push(i);
       } else {
         answers[current] = answers[current].filter(idx => idx !== i);
       }
       renderQuestion();
       renderNav();
       updateProgress();
     });
     
     const span = document.createElement("span");
     span.textContent = `${labels[i]}. ${choice}`;
     label.append(input, span);
     box.append(label);
   });
 } 
 else if (item.type === "true_false" || item.type === "fact_opinion") {
   if (typeof answers[current] !== "object" || answers[current] === null || Array.isArray(answers[current])) {
     answers[current] = {};
   }

   const isTrueFalse = item.type === "true_false";
   const col1Header = "Pernyataan";
   const col2Header = isTrueFalse ? "Benar" : "Fakta";
   const col3Header = isTrueFalse ? "Salah" : "Opini";

   const table = document.createElement("table");
   table.style.width = "100%";
   table.style.borderCollapse = "collapse";
   table.style.marginTop = "10px";

   table.innerHTML = `
     <thead>
       <tr style="background:#f1f5f9; text-align:left;">
         <th style="padding:8px; border:1px solid #cbd5e1;">${col1Header}</th>
         <th style="padding:8px; border:1px solid #cbd5e1; text-align:center; width:80px;">${col2Header}</th>
         <th style="padding:8px; border:1px solid #cbd5e1; text-align:center; width:80px;">${col3Header}</th>
       </tr>
     </thead>
   `;

   const tbody = document.createElement("tbody");
   item.statements.forEach((st, i) => {
     const tr = document.createElement("tr");
     
     const tdStatement = document.createElement("td");
     tdStatement.style.padding = "8px";
     tdStatement.style.border = "1px solid #cbd5e1";
     tdStatement.textContent = st.statement;

     const tdOpt1 = document.createElement("td");
     tdOpt1.style.padding = "8px";
     tdOpt1.style.border = "1px solid #cbd5e1";
     tdOpt1.style.textAlign = "center";
     const radio1 = document.createElement("input");
     radio1.type = "radio";
     radio1.name = `statement_${current}_${i}`;
     radio1.value = col2Header;
     radio1.checked = answers[current][i] === col2Header;

     radio1.addEventListener("change", () => {
       answers[current][i] = col2Header;
       renderNav();
       updateProgress();
     });
     tdOpt1.append(radio1);

     const tdOpt2 = document.createElement("td");
     tdOpt2.style.padding = "8px";
     tdOpt2.style.border = "1px solid #cbd5e1";
     tdOpt2.style.textAlign = "center";
     const radio2 = document.createElement("input");
     radio2.type = "radio";
     radio2.name = `statement_${current}_${i}`;
     radio2.value = col3Header;
     radio2.checked = answers[current][i] === col3Header;

     radio2.addEventListener("change", () => {
       answers[current][i] = col3Header;
       renderNav();
       updateProgress();
     });
     tdOpt2.append(radio2);

     tr.append(tdStatement, tdOpt1, tdOpt2);
     tbody.append(tr);
   });

   table.append(tbody);
   box.append(table);
 }

 $("prevBtn").disabled = current === 0;
 $("nextBtn").disabled = current === 29;
 renderNav();
}

function isAnswered(a, item) {
  if (a === null || a === undefined) return false;
  if (typeof a === "number") return true;
  if (Array.isArray(a)) return a.length > 0;
  if (typeof a === "object") {
    const totalStatements = item && item.statements ? item.statements.length : 0;
    return Object.keys(a).length === totalStatements;
  }
  return false;
}

function renderNav(){
  const box=$("questionNav");
  box.replaceChildren();
  answers.forEach((a,i)=>{
    const item = window.TRYOUT_QUESTIONS[i];
    const answered = isAnswered(a, item);
    const b=document.createElement("button");
    b.type="button";
    b.className="navBtn"+(answered?" answered":"")+(i===current?" current":"");
    b.textContent=i+1;
    b.setAttribute("aria-label",`Buka soal ${i+1}`);
    b.addEventListener("click",()=>{current=i;renderQuestion();});
    box.append(b);
  });
}

function updateProgress(){
  const count = answers.filter((a, i) => isAnswered(a, window.TRYOUT_QUESTIONS[i])).length;
  $("progressBar").style.width=(count/30*100)+"%";
  $("quizMessage").textContent=`${count} dari 30 soal telah dijawab.`;
  $("quizMessage").style.color="#64748b";
}

$("prevBtn").addEventListener("click",()=>{if(current>0){current--;renderQuestion();}});
$("nextBtn").addEventListener("click",()=>{if(current<29){current++;renderQuestion();}});
$("submitBtn").addEventListener("click",()=>submitQuiz(false));


function getAnswerLabel(item, answer) {
  const letters = ["A", "B", "C", "D"];
  if (item.type === "single") {
    return `${letters[item.answer]}. ${item.options[item.answer]}`;
  }
  if (item.type === "multiple") {
    return item.answer.map(i => `${letters[i]}. ${item.options[i]}`).join("; ");
  }
  if (item.type === "true_false" || item.type === "fact_opinion") {
    return item.statements.map((st, i) => `${String.fromCharCode(65+i)}. ${st.statement} — ${item.answer[i]}`).join("\n");
  }
  return "";
}

function answerIsCorrect(item, userAnswer) {
  if (item.type === "single") return userAnswer === item.answer;
  if (item.type === "multiple") {
    if (!Array.isArray(userAnswer)) return false;
    const given = [...userAnswer].sort((a,b) => a-b);
    const key = [...item.answer].sort((a,b) => a-b);
    return given.length === key.length && given.every((value, i) => value === key[i]);
  }
  if (item.type === "true_false" || item.type === "fact_opinion") {
    if (!userAnswer || typeof userAnswer !== "object" || Array.isArray(userAnswer)) return false;
    return item.answer.every((value, i) => userAnswer[i] === value);
  }
  return false;
}

function getUserAnswerLabel(item, userAnswer) {
  const letters = ["A", "B", "C", "D"];
  if (userAnswer === null || userAnswer === undefined ||
      (Array.isArray(userAnswer) && userAnswer.length === 0) ||
      (typeof userAnswer === "object" && !Array.isArray(userAnswer) && Object.keys(userAnswer).length === 0)) {
    return "Belum dijawab";
  }
  if (item.type === "single") {
    return Number.isInteger(userAnswer) && item.options[userAnswer] !== undefined
      ? `${letters[userAnswer]}. ${item.options[userAnswer]}` : "Belum dijawab";
  }
  if (item.type === "multiple") {
    return userAnswer.map(i => `${letters[i]}. ${item.options[i]}`).join("; ");
  }
  if (item.type === "true_false" || item.type === "fact_opinion") {
    return item.statements.map((st, i) => `${String.fromCharCode(65+i)}. ${userAnswer[i] || "Belum dijawab"}`).join("; ");
  }
  return "Belum dijawab";
}

function renderReview() {
  const reviewList = $("reviewList");
  if (!reviewList) return;
  reviewList.replaceChildren();

  window.TRYOUT_QUESTIONS.forEach((item, index) => {
    const correct = answerIsCorrect(item, answers[index]);
    const card = document.createElement("article");
    card.className = `review-item ${correct ? "review-correct" : "review-incorrect"}`;

    const heading = document.createElement("h4");
    heading.textContent = `Soal ${index + 1} · ${correct ? "Benar" : "Perlu dipelajari lagi"}`;

    const question = document.createElement("p");
    question.className = "review-question";
    question.textContent = item.text || item.q || "";

    const userAnswer = document.createElement("p");
    userAnswer.textContent = `Jawaban Anda: ${getUserAnswerLabel(item, answers[index])}`;

    const key = document.createElement("p");
    key.textContent = `Kunci jawaban: ${getAnswerLabel(item, answers[index])}`;

    const explanation = document.createElement("p");
    explanation.textContent = `Pembahasan: ${item.explanation}`;

    card.append(heading, question, userAnswer, key, explanation);
    reviewList.append(card);
  });
}

async function submitQuiz(auto=false){
 if(submitting||!attemptId)return;
 if(!auto){
   const blank = answers.filter((a, i) => !isAnswered(a, window.TRYOUT_QUESTIONS[i])).length;
   if(!confirm(blank?`Masih ada ${blank} soal belum lengkap/kosong. Kumpulkan sekarang?`:"Yakin ingin mengumpulkan jawaban?"))return;
 }
 submitting=true;clearInterval(timerId);$("submitBtn").disabled=true;showMessage("quizMessage","Mengirim jawaban...",false);
 try{
   const elapsed=Math.max(0,Math.floor((Date.now()-startedAt)/1000));
   const result=await api({action:"submit",attemptId,answers,elapsedSeconds:elapsed});
  $("quizCard").classList.add("hidden");
$("resultCard").classList.remove("hidden");

$("resultText").textContent =
  `Terima kasih, ${result.name}. Nilai Anda: ${result.score}/100 (${result.correct}/30 jawaban benar).`;
  renderReview();
// Tampilkan pembahasan seluruh soal
     renderReview();
 }catch(err){
   submitting=false;$("submitBtn").disabled=false;showMessage("quizMessage",err.message);
   if(seconds>0)timerId=setInterval(tick,1000);
 }
}

updateTimer();
