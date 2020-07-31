const sendMsg = () => {
  let cont = document.querySelector('#orderContact');
  let name = document.querySelector('#orderName');
  let annotation = document.querySelector('#orderAnnotation');
  let msg = `Текст сообщения: ${annotation.value}\nКонтакты: ${cont.value}\nОбращение: ${name.value}`;

  if (!cont.value.length || !name.value.length || !annotation.value.length) {
    console.error('empty fields');
    return;
  }

  fetch('/admin/sendmsg', {
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
 
