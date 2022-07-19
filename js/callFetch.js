// urls save in json
const URLs = {
    projects: 'https://jsonplaceholder.typicode.com/posts',
  } 
  
  /****** Call fetch  */
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
  
  const fillDataProject = (datas, idPhoto) => {
    const sectionProject = document.querySelector('.section-project-container');
    //let numPhoto = getPhotoProjectRandom();
    let titleProject = getTitleProject(datas);
    let currentDate = getCurrentDate();
    printDataProject( sectionProject, titleProject, idPhoto, datas.title, datas.body, currentDate );
  }
  
  /**** print datas in html */
  const printDataProject = ( node, title, photo, subTitle, text, date ) => {
    node.innerHTML = `
    <article class="article-project-wrap">
        <header class="box-project-title">
            <h2>${title}</h2>
            <p>${subTitle}</p>
            <p>Completed on <span>${date}</span></p>
        </header>
        <div class="box-project-image">
            <img src="./assets/${photo}.jpg" alt="project-image-${photo}">
        </div>
        <div class="box-project-info">
            <p>${text}</p>
        </div>
    </article>
    `;
  }
  
  const getTitleProject = (datosJson) => {
    switch(datosJson.id){
        case 1 :
           return "Simplify";
        case 2 :
            return "Dashcoin";
        case 3 :
            return "Vectorify";
    }
  }
  
  /* const getPhotoProjectRandom = () => {
  return Math.floor(Math.random() * 6) + 1;
  } */
  
  const getCurrentDate = () => {
    let date = new Date();
    let customDate = date.toString().split(' ').slice(1,4);
    customDate.splice(2, 0, ",");
    return customDate.join(' ');// month day , year
  }
  
  window.addEventListener('load', async () => {
    let idProject = localStorage.getItem("project");
    let responseJson = await getProjectChooseId(idProject);
    fillDataProject(responseJson, idProject);
  })