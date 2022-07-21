 
// urls save in json
const URLs = {
    projects: 'https://jsonplaceholder.typicode.com/posts',
    subscribe: 'https://jsonplaceholder.typicode.com/posts/1/comments',
  } 
  

  /*****  call server **** */

  /****** Call fetch get project  by id */
  const getProjectChooseId = async (id) => {
    try{
        let response = await fetch(`${URLs.projects}/${id}`);
        if(response.ok){
            return response.json();
        }
    }catch(err){
        console.log(err);
    }
  }
  
  /****** Call fetch get project all */
  const getProjectAll = async () => {
    try{
        let response = await fetch(URLs.projects);
        if(response.ok){
            return response.json();
        }
    }catch(err){
        console.log(err);
    }
  }
  
  const postEmailSubcribe = async () => {
    try{
      let parametros = {
          method: 'POST',
          body: JSON.stringify({
          name: 'foo',
          email: 'bar',
          postId: 1,
        }),
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
      }
      
      let responseJson = await fetch(URLs.subscribe, parametros);
        if(responseJson.ok){
          return response.json();
      }

    }catch(err){
      console.log(err);
    }
  }
  

  /**** print project by id in localstorage */


  const getDataProject = (datas, idPhoto) => {
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

  const getProjectsTypeInit = (datas, name) => {
    if(name === 'index'){
      let copyArr = datas.slice(0, 3);
      copyArr.forEach( item => {
        let titleProject = getTitleProject(item);
        printDataProjects( item, titleProject);
      });
    }else{
      let projectAle = getProjectRandom(datas.length-1, num = 3);//100
      let copyArr = datas.slice( (projectAle-3), projectAle);
      copyArr.forEach( (item, i) => {
        let titleProject = getTitleProject(item);
        let indexAle = getProjectRandom(copyArr.length, num = 0);//3
        printDataProjects( item, titleProject[indexAle]);
      });
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
  
  const getProjectRandom = (num, min) => {
    return Math.floor(Math.random() * num) + min;
  }
  
  const getCurrentDate = () => {
    let date = new Date();
    let customDate = date.toString().split(' ').slice(1,4);
    customDate.splice(2, 0, ",");
    return customDate.join(' ');// month day , year
  }


  /********** LOAD ***********/

  window.addEventListener('load', async () => {
    let namePage = getNamePage()[0];
    switch(namePage){
      case 'index':
                  let responseJson = await getProjectAll();
                  getProjectsTypeInit(responseJson, namePage);
                  postEmailSubcribe();
                  break;
      case 'project':
                    let idProject = localStorage.getItem("project");
                    if(idProject !== 'undefined'){
                      let responseJson = await getProjectChooseId(idProject);
                      getDataProject(responseJson, idProject);
                      let responseJsonAll = await getProjectAll();
                      getProjectsTypeInit(responseJsonAll, namePage);
                    }else{
                      location.href = window.location.href;
                    }
                    break;
      case 'service':
                    break;
      case 'contact':
                    break;
    }
    
  }) 


  const getNamePage = () =>{
    let URLactual = window.location.pathname;
    let arrUrl = URLactual.split('/');
    return arrUrl[arrUrl.length-1].split('.')
  }