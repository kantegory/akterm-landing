const sendMsg = () => {
  this.event.preventDefault();
  
  let cont = document.querySelector('#contact');
  let name = document.querySelector('#name');
  let annotation = document.querySelector('#order');
  let msg = `Текст сообщения: ${annotation.value}\nКонтакты: ${cont.value}\nОбращение: ${name.value}`;

  if (!cont.value.length || !name.value.length || !annotation.value.length) {
    console.error('empty fields');

    let errNotif = document.querySelector('.error');
    errNotif.style.display = "block";
    setTimeout(() => { errNotif.style.display = "none" }, 2500);

    return;
  }

  fetch('/mailer/sendmsg', {
      method: "POST",
      body: JSON.stringify({ msg: msg }),
      mode: 'cors',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'same-origin'
    }).then((response) => {
      console.log(response);
      cont.value = "";
      name.value = "";
      annotation.value = "";
      let success = document.querySelector('.success');
      success.style.display = "block";
      setTimeout(() => { success.style.display = "none" }, 2500);
    })
    .catch((err) => { console.error(err) })
}
