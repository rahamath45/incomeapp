 const form = document.getElementById("entry-form");
 const add = document.getElementById("addentry");
const list = document.getElementById("entry-list");
const totalincome = document.getElementById("total-income");
const totalexpense = document.getElementById("total-expense");
 const netbalance = document.getElementById("net-balance");
 const resetBtn = document.getElementById("reset-btn");
 const filters = document.querySelectorAll("input[name='filter']");

 let entries = JSON.parse(localStorage.getItem("entries")) || [];

form.addEventListener("submit",(e)=>{
    e.preventDefault();
    const description = document.getElementById("description").value;
    console.log(description);
    const amount = parseFloat(document.getElementById("amount").value);
    const type = document.getElementById("type").value;

    const entry = {
        id: Date.now(),description,amount,type
    };
     entries.push(entry);
     updateLocalStorage();
     renderEntries();
     form.reset();
 });
  resetBtn.addEventListener("click",()=>{
    form.reset();
  });
 filters.forEach(filter => {
    filter.addEventListener("change",renderEntries);
 });

 function updateLocalStorage(){
    localStorage.setItem("entries",JSON.stringify(entries));
 }

 function renderEntries(){
    const selectedFilter = document.querySelector("input[name='filter']:checked").value;
    list.innerHTML ="";
    let income=0;
    let expense = 0;

    entries.filter(entry => selectedFilter ==="all" || entry.type === selectedFilter).forEach(entry =>{
        const li = document.createElement("li");
        li.innerHTML =`
        <span>${entry.description} - ${entry.amount} (${entry.type})</span>
        <span class="entry-actions"><button onclick="editEntry(${entry.id})">EDIT</button>
        <button onclick="deleteEntry(${entry.id})">DELETE</button></span>
        `;
        list.appendChild(li);
    });
    entries.forEach(e =>{
        if(e.type === "income") income += e.amount;
        else expense += e.amount;
    });

    totalincome.textcontent = income;
    totalexpense.textContent = expense;
    netbalance.textContent = income - expense;
}

function deleteEntry(id){
    entries = entries.filter(e => e.id !== id);
    updateLocalStorage();
    renderEntries();
}

function editEntry(id){
    const entry = entries.find(e => e.id === id);

    document.getElementById("description").value = entry.description;
     document.getElementById("amount").value = entry.amount;
      document.getElementById("type").value = entry.type;
     deleteEntry(id);
}

renderEntries();