

const replyButtons = document.querySelectorAll('.btn.reply')

replyButtons.forEach((btn)=>{
   if(!btn.classList.contains('reply-action')){
     btn.onclick = function(e){
        e.preventDefault();
        const parent = btn.parentElement.parentElement
        const id = btn.dataset.id ;
        btn.remove();
        const input = document.createElement("input");
        input.type = "text";
        input.placeholder = "type your reply";
        input.className = "form-control w-full mr-2";
        input.name ="reply";
        const form = document.createElement("form");
        form.className = "flex ml-8 relative my-2" ;
        form.action = `/comments/${id}`
        form.method= "POST";
        const button = document.createElement("button");
        button.classList += "btn absolute right-0 mr-2"
        button.innerText ="Reply"
        form.appendChild(input)
        form.appendChild(button)
        parent.insertAdjacentElement('afterend', form)
     }
    
   }
})