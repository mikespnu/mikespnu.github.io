var inputel = document.querySelector('#query');

var queryBuilder = function () {
  let value = inputel.value;
  return `{"model": "text-davinci-003", "prompt": "${value}", "temperature": 0, "max_tokens": 400}`
}

var makeReq = function() {
  document.querySelector("#element").innerHTML = "";
  //create loading element
  
  let image =  document.createElement("img");
  image.setAttribute("src", "assets/ellipsis-loader.gif");
  image.setAttribute("width", 35);
  image.classList = "loading-image";

  //add element to dom
  document.querySelector("#element").appendChild(image);


    //Create AJAX Object
    var req = new XMLHttpRequest();

    //Open Request
    req.open('POST', 'https://mama2go.com/request.php');

    //CallBack
    req.onreadystatechange = function () {
      if (req.readyState === 4) {

      // //Parse text
      var data = new Promise((resolve,reject)=>{
        let data = JSON.parse(req.responseText)
        // console.log(data)
        let text = data['choices'][0].text
        // //Filter Text
        text = text.replace(/\n/gm, '');
        if(text) {
          resolve(text);
        }
      });

      data 
      .then(txt => {
        image.remove();
        const instance = new TypeIt('#element', {
          speed: 50
        })
          .type(`${txt}`)
          .pause(5000)
          .delete(null, {speed: 5000})
          .flush(()=> {
            const instance = new TypeIt('#element', {
              speed: 50
            })
              .type('Ask me something else')
              .go();
           });
      })

      

      





        // document.querySelector('#element').innerText = `${txt}`
    
    }
  }

  req.setRequestHeader('Content-type', 'application/x-www-form-urlencoded; charset=UTF-8')

  let test = queryBuilder()
  req.send(`data=${test}`);
  inputel.value = ''
}

document.querySelector('#send').addEventListener('click', () => {
  makeReq();
})

document.addEventListener("keydown", (e) => {
  if(e.key === "Enter") {
    makeReq();
  }
})