 class UI {

displayMessage(){
    const body = document.querySelector('body');

    const div = document.createElement('div');
    div.className = 'alert alert-primary';
    div.textContent = 'Ürününüz başarıyla sepete eklendi';

    body.appendChild(div);

    setTimeout(()=>{div.remove()},2000);
}

}