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

  const _getProjectChooseById = async (id) => {
    try{
        let response = await fetch(URLs.projects.concat('?id=').concat(id));//array obj
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

  const _getProjectAll = async () => {
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

  const _postInsertEmailSubcribe = async (mail, current) => {
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

  const _postInsertFormContact = async (objInput) => {
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
    //let titleProject = getTitleProject(datas[0].id);//object
    let currentDate = getCurrentDate();
    let titleProject = getTitle(datas[0]);
    let photo = idPhoto <= 6 ? idPhoto: 'not-found';
    printDataProjectById( sectionProject, titleProject, photo , ...datas, currentDate );
  }



  const printDataProjectById = ( node, title, photo, dataObj, date ) => {
    node.innerHTML = `
    <article class="article-project-wrap">
        <header class="box-project-title">
            <h2>${title}</h2>
            <div class="box-subtitle">
              <p class="intro-medium">${dataObj.title}</p>
              <p class="intro-regular col-dark">Completed on <span class="data-now">${date}</span></p>
            </div>
        </header>
        <div class="box-project-image">
            <img class="photo-view" src="./assets/${photo}.jpg" alt="project-image-${photo}">
            <img class="photo-shadow" src="./assets/${photo}.jpg" alt="project-image-${photo}">
        </div>
        <div class="box-project-info headline-medium">
            <p>${dataObj.body}</p>
        </div>
    </article>
    `;
  }
  

  
/********* Print 3 projects ********** */

  const generateDataProjects = (datas, name) => {
    if(name === 'index'){
      let copyArr = datas.slice(0, 3);
      copyArr.forEach( (item , i) => {
        let namePhoto = getTitleProject(item.id);
        let titleProject = getTitle(datas[i]);
        printDataProjects( item, titleProject, namePhoto);
      });
    }else{
     datas.every( (item, i , array) =>{
        if(i >= 3) {
          updateLocalStorageProject();
          return false;//BREAK
        }
        let numAleProject = getProjectRandom(array.length, num = 3);//100 to 3
        let namePhoto = getTitleProject(array[numAleProject].id);//array titles
        //let numAleTitle = getProjectRandom(arrTitle.length, num = 0);//3 to 0
        let titleProject = getTitle(array[numAleProject]);

        printDataProjects( array[numAleProject], titleProject, namePhoto);
        return true;//CONTINUE
     })
    }
  }


  const printDataProjects = (project, title, photo) =>{
    //let typeProject = getTypeProject(title.toLowerCase());
    let container = document.querySelector('.content-article-project');
    container.innerHTML += `
      <article class="simplify project-article">
        <div class="background-${photo.toLowerCase()} background-style-project"></div>
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
      let response = await _postInsertEmailSubcribe(email.value, date);
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
      let response = await _postInsertFormContact(objFormInput);
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


   const dataTostar ={
    message : 'Consult Sent Thanks 🤩',
    node : '.wrapper-tostar'
   }
   
  const statusSucceffulDataInsert = (evt, status) =>{
    if(status === 'subscribe'){
      evt.target.innerText = 'Sending email... 💌';
      printMessageSubscribe(evt);
    }else if(status === 'contact' ){
      document.querySelector('.btn-submit-contact').disabled = true;
      evt.target.value = 'Sending message... 📬'
      tostarMessage(dataTostar);
    }
  }



  const tostarMessage = (objData) =>{
    try{
      createTostar(objData);
      counterBack();
    }catch(err){
      console.log(`Error create tostar: ${err}`);
    }
  }

const createTostar = (obj) => {
  let container = document.querySelector(obj.node);
  let tostar = document.createElement('div');
  tostar.setAttribute('class','tostar-container');
  let text = document.createElement('p');
  text.setAttribute('class','headline-medium');
  text.innerText = obj.message;
  let btnClose = document.createElement('div');
  btnClose.setAttribute('class','tostar-btn');
  btnClose.setAttribute("onclick","removeTostar(this.parentNode)");
  container.appendChild(tostar);
  tostar.appendChild(btnClose);
  tostar.appendChild(text);
}

 var count = 3;
const counterBack = () => {
  let tostar = document.querySelector(".tostar-container");
    if ( count > 0 ){
        --count;
        var time = setTimeout(counterBack, 1000);
    }else{
      if(tostar != null){
        document.querySelector(".tostar-btn").addEventListener('click', removeTostar(tostar));
      }
      clearTimeout(time);
    }
}  

  const removeTostar = (node) =>{
    node.remove();
    let btnContact = document.querySelector('.btn-submit-contact');
      btnContact.disabled = false;
      btnContact.value = 'Submit';
  } 

  /********** Helper Fuctions *********** */

 const getTitleProject = (num) => {
    switch(num){
        case 1 :
           return "Simplify";
        case 2 :
            return "Dashcoin";
        case 3 :
            return "Vectorify";
        case 4 :
            return "Orbit";
        case 5 :
            return "Purify";
        case 6 :
            return "CryptoPie";
        default:
            return "not-found";
    }
  }

/*   const getTypeProject = (type) => {
    switch(type){
        case 'simplify' :
           return "UI Design & App Development";
        case 'dashcoin' :
            return "Web Development";
        case 'vectorify' :
            return "User Experience Design";
    }
  } */
  
  const getProjectRandom = (max, min) => {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  const getTitle = (data) => {
    return data.title.split(' ').splice(0, 1).join('');
  }
  
  const getCurrentDate = () => {
    let date = new Date();
    let customDate = date.toString().split(' ').slice(1,4);
    customDate.splice(2, 0, ','  );
    return customDate.join(' ');// month day , year
  }

  const clearInput = (obj) =>{
    obj.email.value = '';
    obj.name.value = '';
    obj.tel.value = '';
    obj.msg.value = '';
  }


  /*******************
   ***** LOAD *******
   *****************/

  /********* Get name actual page ************* */
  const getNamePage = () =>{
    let URLactual = window.location.pathname;
    let arrUrl = URLactual.split('/');
    return arrUrl[arrUrl.length-1].split('.')
  }

  window.addEventListener('load', async () => {
    try{
      let btnSub = document.querySelector('.btn-subs');
      let namePage = getNamePage()[0];
      switch(namePage){
        case 'index'://page index
                    let responseJson = await _getProjectAll();
                    generateDataProjects(responseJson, namePage);
                    btnSub.addEventListener('click', getEmailFormSubscribe, false)
                    break;
        case 'project'://page project
                      let idProject = localStorage.getItem("project");
                      if(idProject !== 'undefined'){
                        let responseJson = await _getProjectChooseById(idProject);
                        generateDataProjectById(responseJson, idProject);
                        let responseJsonAll = await _getProjectAll();
                        generateDataProjects(responseJsonAll, namePage);
                        btnSub.addEventListener('click', getEmailFormSubscribe, false)
                      }else{
                        location.href = window.location.href;
                      }
                      break;
        case 'service'://page service
                      break;
        case 'contact'://page contact
                      let btnContact = document.querySelector('input[type="submit"]');
                      btnContact.addEventListener('click', getValueFormContact, false)
                      break;
      }

    }catch(err){
      console.log(err);
    }
    
  }) 


  /************ update local storage********** */

  const updateLocalStorageProject = () => {
    let links =  document.querySelectorAll('.learn-more');
    links.forEach( link =>{  
        link.addEventListener('click', setLocalStorageDataProject);
    })
  }

  const setLocalStorageDataProject =  (e) =>{
    let link =  e.currentTarget.dataset.project;
    localStorage.setItem('project', link);
  }

