
  const getCurrentPage = async () =>{
    let URLactual = window.location.pathname;
    try{
        return namePage = new Promise((resolve, reject) =>{
            let arrUrl = URLactual.split('/');
            let nameExtension = arrUrl[arrUrl.length-1].split('.')
            if(nameExtension.includes('index') || nameExtension.includes('project') || nameExtension.includes('service')){
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
        }
  }

window.addEventListener('load',  () =>{
    let namePage = getCurrentPage();
    getCurrentPageStyle(namePage);
});