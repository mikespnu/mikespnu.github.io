var inputel = document.querySelector('#query');

var queryBuilder = function () {
  let value = inputel.value;
  return `${value}`
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
    req.open('POST', 'https://stylesbynikki.com/req.php');

    //CallBack
    req.onreadystatechange = function () {
      if (req.readyState === 4) {

      // //Parse text
      var data = new Promise((resolve,reject)=>{
        resolve(req.responseText)
      });

      data 
      .then(txt => {
        image.remove();
        const instance = new TypeIt('#element', {
          speed: 60
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

      
    
    }
  }

  req.setRequestHeader('Content-type', 'application/json')

  let test = queryBuilder()
  req.send(JSON.stringify({prompt: test}));
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