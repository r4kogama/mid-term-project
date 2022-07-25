
const setLocalStorageData =  (e) =>{
  let link =  e.currentTarget.dataset.project;
  localStorage.setItem('project', link);
}

window.addEventListener('load',  () =>{
   setTimeout(() => {
    let links =  document.querySelectorAll('.learn-more');
    links.forEach( link =>{  
        link.addEventListener('click', setLocalStorageData);
    })
  }, 100); 

}) 

/* async function onLoad() {

  let links = await document.querySelectorAll('.learn-more');
   console.log(links)
   links.forEach(async link =>{  
     console.log('ok')
      await link.addEventListener('click', setLocalStorageData);
   }) 
}

onLoad(); */









/* const fillDataProject = (datas) => {
      
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
 */