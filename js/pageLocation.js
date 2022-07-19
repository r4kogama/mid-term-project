

const currentPageStyle = async () =>{
    try{
        let URLactual = await window.location.pathname;
        let arrUrl = URLactual.split('/');
        let pageHtml = arrUrl[arrUrl.length-1];
        if(pageHtml === 'index.html'){
            let link = document.querySelector('.home-html');
            link.setAttribute('class','col-prim');
        }else if(pageHtml === 'project.html'){
            let link = document.querySelector('.project-html');
            link.setAttribute('class','col-prim');
        }else if(pageHtml === 'service.html'){
            let link = document.querySelector('.service-html');
            link.setAttribute('class','col-prim');
        }
    }catch(err){
        console.log(err);
    }
  }

  window.addEventListener('load', () =>{
    currentPageStyle();
  })