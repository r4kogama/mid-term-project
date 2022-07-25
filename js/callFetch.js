
// urls save in json
const URLs = {
    projects: 'https://jsonplaceholder.typicode.com/posts/',
    subscribe: 'http://localhost:3000/subscribe/',
    contact: 'http://localhost:3000/contact/',
  } 
  

  /******************************
   * ***  Request server ********
   * ****************************/

  /****** Request fetch get project  by id *******/

  const getProjectChooseId = async (id) => {
    try{
        let response = await fetch(URLs.projects.concat('?id=').concat(id));
        if (!response.ok) { //bad
          let error = await response.text();
          throw new Error(error);
        }
        return response.json();
    }catch(err){
        console.log(err);
    }
  }
  
  /****** Request fetch get project all *******/

  const getProjectAll = async () => {
    try{
        let response = await fetch(URLs.projects);
        if (!response.ok) { //bad
          let error = await response.text();
          throw new Error(error);
        }
        return response.json();
    }catch(err){
        console.log(err);
    }
  }
  
  /******** Request Register subscribe by email *********** */

  const postInsertEmailSubcribe = async (mail, current) => {
    try{
      let params = {
          method: 'POST',
          body: JSON.stringify({
          email: mail,
          date : current
          }),
          headers: {
            'Content-type': 'application/json', 
          },
      }

      let response = await fetch(URLs.subscribe, params);
      if (!response.ok) { //bad
        let error = await response.text();
        throw new Error(error);
      }
      return response.json();
    }catch(err){
      console.log(`Error insert form susbcribe: ${err}`);
    }
  }

  /******** Request insert contact  *********** */

  const postInsertFormContact = async (objInput) => {
    try{
      let formData = new FormData();
      formData.append('date', new Date().toLocaleDateString());
      formData.append('email', objInput.email.value);
      formData.append('name', objInput.name.value);
      formData.append('phone', objInput.tel.value);
      formData.append('message', objInput.msg.value);
       //Create an object from the form data entries
      let formDataObject = Object.fromEntries(formData.entries());
      // Format the plain form data as JSON
      let formDataJson = JSON.stringify(formDataObject);
      let params = {
        method: 'POST',
        body: formDataJson,
          headers: {
            'Content-type': 'application/json', 
          },
      }
      let response = await fetch(URLs.contact, params);
      if (!response.ok) { //bad
        let error = await response.text();
        throw new Error(error);
      }
      return response.json();// ok
    }catch(err){
      console.log(`Error insert form contact: ${err}`);
    }
  }
  

  /**** print project by id in localstorage */

  const generateDataProjectById = (datas, idPhoto) => {
    const sectionProject = document.querySelector('.section-project-container');
    let titleProject = getTitleProject(datas);
    let currentDate = getCurrentDate();
    printDataProjectById( sectionProject, titleProject, idPhoto, datas.title, datas.body, currentDate );
  }

  const printDataProjectById = ( node, title, photo, subTitle, text, date ) => {
    node.innerHTML = `
    <article class="article-project-wrap">
        <header class="box-project-title">
            <h2>${title}</h2>
            <div class="box-subtitle">
              <p class="intro-medium">${subTitle}</p>
              <p class="intro-regular col-dark">Completed on <span class="data-now">${date}</span></p>
            </div>
        </header>
        <div class="box-project-image">
            <img class="photo-view" src="./assets/${photo}.jpg" alt="project-image-${photo}">
            <img class="photo-shadow" src="./assets/${photo}.jpg" alt="project-image-${photo}">
        </div>
        <div class="box-project-info headline-medium">
            <p>${text}</p>
        </div>
    </article>
    `;
  }
  

  
/********* Print 3 projects ********** */

  const generateDataProjects = (datas, name) => {
    if(name === 'index'){
      let copyArr = datas.slice(0, 3);
      copyArr.forEach( item => {
        let titleProject = getTitleProject(item);
        printDataProjects( item, titleProject);
      });
    }else{
      for(let i = 0; i < 3; i++){
          let numAleProject = getProjectRandom(datas.length, num = 3);//100
          let arrTitle = getTitleProject(datas[numAleProject]);//item aleatory
          let numAleTitle = getProjectRandom(arrTitle.length, num = 0);//3
          printDataProjects( datas[numAleProject], arrTitle[numAleTitle]);
      }
    }
  }


  const printDataProjects = (project, title) =>{
    //let typeProject = getTypeProject(title.toLowerCase());
    let container = document.querySelector('.content-article-project');
    container.innerHTML += `
      <article class="simplify project-article">
        <div class="background-${title.toLowerCase()} background-style-project"></div>
        <div class="content-info-project">
            <header>
                <h4>${title}</h4>
                <p class="headline-regular">${project.title}</p>
            </header>
            <footer class="headline-regular">
                <a href="project.html" data-project="${project.id}" class="learn-more">Learn more</a>
            </footer>
        </div>
      </article>
    `;
  }

  /*********** Get email form and generate message **************** */

  const getEmailFormSubscribe = async (e) => {
    try{
      e.preventDefault();
      let date = new Date().toLocaleDateString();
      let email = document.querySelector('.box-subs #email');
      let response = await postInsertEmailSubcribe(email.value, date);
      email.value = '';
      if(Object.keys(response).length !== 0){ //object no empty
        statusSucceffulDataInsert(e, 'subscribe');
      }
    }catch(err){
      console.log(`Error subscribe: ${err}`)
    }
  }

  /*********** Get value form contact generate request **************** */

  const getValueFormContact = async (e) => {
    try{
      e.preventDefault();
      let objFormInput = {
        email : document.querySelector('.input-box #email'),
        name : document.querySelector('.input-box #name'),
        tel : document.querySelector('.input-box #phone'),
        msg : document.querySelector('.input-box #message'),
      }
      let response = await postInsertFormContact(objFormInput);
      clearInput(objFormInput);
      if(Object.keys(response).length !== 0){// no empty
        statusSucceffulDataInsert(e, 'contact');
      }
    }catch(err){
      console.log(`Error form contact: ${err}`)
    }
   }

  /********** Print message for subscribe  & form contact ********/
   

  const printMessageSubscribe = (e) => {
    setTimeout(() => {
      e.target.parentNode.remove();
      let boxForm = document.querySelector('.box-form-subscribe');
      let div = document.createElement('div');
      div.setAttribute('class','subscribe-success');
      let p = document.createElement('p');
      p.setAttribute('class','intro-regular');
      p.innerText = 'Thank you for subscribing  🤙';
      div.appendChild(p);
      boxForm.appendChild(div);
    }, 1000); 
  }


  /********** Helper Fuctions *********** */

  const getTitleProject = (datosJson) => {
    switch(datosJson.id){
        case 1 :
           return "Simplify";
        case 2 :
            return "Dashcoin";
        case 3 :
            return "Vectorify";
        default:
            return ['Orbit', 'Purify', 'CryptoPie'];
    }
  }

  const getTypeProject = (type) => {
    switch(type){
        case 'simplify' :
           return "UI Design & App Development";
        case 'dashcoin' :
            return "Web Development";
        case 'vectorify' :
            return "User Experience Design";
    }
  }
  
  const getProjectRandom = (max, min) => {
    return Math.floor(Math.random() * (max - min)) + min;
  }
  
  const getCurrentDate = () => {
    let date = new Date();
    let customDate = date.toString().split(' ').slice(1,4);
    customDate.splice(2, 0, ','  );
    return customDate.join(' ');// month day , year
  }

  const clearInput = (obj) =>{
    [...obj].forEach(input =>{
      input
    })
    obj.mail.value = '';
    obj.name.value = '';
    obj.tel.value = '';
    obj.msg.value = '';
  }


  /*******************
   ***** LOAD *******
   *****************/

  window.addEventListener('load', async () => {
    let btnSub = document.querySelector('.btn-subs');
    let namePage = getNamePage()[0];
    switch(namePage){
      case 'index':
                  let responseJson = await getProjectAll();
                  generateDataProjects(responseJson, namePage);
                  btnSub.addEventListener('click', getEmailFormSubscribe, false)
                  break;
      case 'project':
                    let idProject = localStorage.getItem("project");
                    if(idProject !== 'undefined'){
                      let responseJson = await getProjectChooseId(idProject);
                      generateDataProjectById(responseJson, idProject);
                      let responseJsonAll = await getProjectAll();
                      generateDataProjects(responseJsonAll, namePage);
                      btnSub.addEventListener('click', getEmailFormSubscribe, false)
                    }else{
                      location.href = window.location.href;
                    }
                    break;
      case 'service':
                    break;
      case 'contact':
                    let btnContact = document.querySelector('.btn-contact');
                    btnContact.addEventListener('click', getValueFormContact, false)
                    break;
    }
    
  }) 


  const getNamePage = () =>{
    let URLactual = window.location.pathname;
    let arrUrl = URLactual.split('/');
    return arrUrl[arrUrl.length-1].split('.')
  }