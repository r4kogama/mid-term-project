
const localStorageData = (e) =>{
  let link = e.currentTarget.dataset.project;
  localStorage.setItem('project',link);
}

window.addEventListener('load', () =>{
  let links = document.querySelectorAll('.learn-more');
  links.forEach( link =>{  
      link.addEventListener('click', localStorageData, false);
  })
})








/* 
// las urls se almacenan en un objeto
const URLs = {
  projects: 'https://jsonplaceholder.typicode.com/posts',
} 


const getProjectChooseid = async (id) => {
  try{
      let response = await fetch(`${URLs.projects}/${id}`);
      if(response.ok){
          return response.json();
      }
  }catch(err){
      console.log(err);
  }
}

const fillDataProject = (datas) => {
      
  let subTitle = document.querySelector('.box-project-title p:first-child');
  subTitle.innerText = datas.title;

  let infoProject = document.querySelector('.box-project-info');
  const p = document.createElement('p');
  p.innerText = datas.body;
  infoProject.appendChild(p);

  let h2 = document.querySelector('.box-project-title h2');
  switch(datas.id){
      case 1 :
          h2.innerText = "Simplify";
          break;
      case 2 :
          h2.innerText = "Dashcoin";
          break;
      case 3 :
          h2.innerText = "Vectorify";
          break;
  }


  let dateProject = document.querySelector('.box-project-title p:last-child span');
  let date = currentDate();
  dateProject.innerText = date; 
}


const currentDate = () => {
  let date = new Date();
  let customDate = date.toString().split(' ').slice(1,4);
  customDate.splice(2, 0, ",");
  return customDate.join(' ');// month day , year
}

window.addEventListener('load', async () => {
  let id = localStorage.getItem("project");
  let responseJson = await getProjectChooseid(id);
  fillDataProject(responseJson);
}) */
