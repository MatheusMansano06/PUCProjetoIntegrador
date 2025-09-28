const $  = (s, ctx=document) => ctx.querySelector(s);
const $$ = (s, ctx=document) => Array.from(ctx.querySelectorAll(s));

const form   = $("#form-aluno");
const tabela = $("#tabela tbody");

function getDB(){ try{ return JSON.parse(localStorage.getItem("alunos")||"[]"); }catch{ return []; } }
function setDB(v){ localStorage.setItem("alunos", JSON.stringify(v)); }

function render(){
  const rows = getDB();
  if(!rows.length){
    tabela.innerHTML = '<tr><td colspan="5" class="muted">Sem registros.</td></tr>';
    return;
  }
  tabela.innerHTML = rows.map(r => `
    <tr>
      <td>${r.ra}</td>
      <td>${r.nome}</td>
      <td>${r.curso}</td>
      <td>${r.periodo}</td>
      <td>${r.email}</td>
    </tr>`).join("");
}

form.addEventListener("submit", (e)=>{
  e.preventDefault();
  if(!form.reportValidity()) return; // usa validação nativa do HTML5
  const data = Object.fromEntries(new FormData(form).entries());
  const db = getDB();
  db.unshift({ ra:data.ra, nome:data.nome, curso:data.curso, periodo:data.periodo, email:data.email, telefone:data.telefone||"" });
  setDB(db);
  form.reset();
  render();
});

$("#exportar").addEventListener("click", ()=>{
  const blob = new Blob([JSON.stringify(getDB(), null, 2)], {type:"application/json"});
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "alunos.json";
  a.click();
  setTimeout(()=>URL.revokeObjectURL(a.href), 500);
});

$("#limpar-db").addEventListener("click", ()=>{
  if(confirm("Apagar todos os cadastros?")){ setDB([]); render(); }
});

render();
