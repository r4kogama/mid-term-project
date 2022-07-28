const stateHide = { 'page_1': '/contact.html#menu-hide', 'page_2': '/index.html#menu-hide', 'page_3': '/project.html#menu-hide' }
const stateShow = { 'page_1': '/contact.html#menu-show', 'page_2': '/index.html#menu-show', 'page_3': '/project.html#menu-show' }
function locationHashChanged() {
    if (location.hash === '#menu-hide') {
         //console.log(window.location.href.replace("#menu-hide", ''))
        window.history.pushState(stateHide, '', window.location.href.replace("#menu-hide", '')); 
    }
    if (location.hash === '#menu-show') {
         //console.log(window.location.href.replace("#menu-show", ''))
        window.history.pushState(stateShow, '', window.location.href.replace("#menu-show", '')); 
    }
}
window.onhashchange = locationHashChanged;
  
  const getCurrentPage = async () =>{
    let URLactual = window.location.pathname;
    try{
        return namePage = new Promise((resolve, reject) =>{
            let arrUrl = URLactual.split('/');
            let nameExtension = arrUrl[arrUrl.length-1].split('.')
            if(nameExtension.includes('index') || nameExtension.includes('project') || nameExtension.includes('service') || nameExtension.includes('contact')){
                //setTimeout(() => resolve(nameExtension[0]), 1000);
                resolve(nameExtension[0]);
            }else{
                const reason = new Error('The current url does not contain the correct page name');
                reject(reason);
            }
        })   
            
    }catch(err){
        console.log(`Error url: ${err}`);   
        //location.href = URLactual;
        //window.location.replace('url absoluta')
    }
  }

  const getCurrentPageStyle = async (page) =>{
      let resultPage = await page;
        if(resultPage === 'index'){
            let link = document.querySelector('.home-html');
            link.setAttribute('class','col-prim');
        }else if(resultPage === 'project'){
            let link = document.querySelector('.project-html');
            link.setAttribute('class','col-prim');
        }else if(resultPage === 'service'){
            let link = document.querySelector('.service-html');
            link.setAttribute('class','col-prim');
        }else if(resultPage === 'contact'){
            let link = document.querySelector('.contact-html');
            link.setAttribute('class','col-prim');
        }
  }

window.addEventListener('load',  () =>{
    let namePage = getCurrentPage();
    getCurrentPageStyle(namePage);
});