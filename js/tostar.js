class Tostar {
    static count = 3;
    time;
    constructor(objTostar) {
       this.message = objTostar.message;
    }
    
    
    createTostar() {
        let container = document.querySelector('.wrapper-tostar');
        let tostar = document.createElement('div');
        tostar.setAttribute('class','tostar-container');
        let text = document.createElement('p');
        text.setAttribute('class','headline-medium');
        text.innerText = this.message;
        let btnClose = document.createElement('div');
        btnClose.setAttribute('class','tostar-btn');
        btnClose.setAttribute("onclick","Tostar.removeTostarClick(this.parentNode)");
        container.appendChild(tostar);
        tostar.appendChild(btnClose);
        tostar.appendChild(text);
    } 
    
    counterBack() {
        try{
            if ( Tostar.count > 0 ){
                Tostar.count--;
                this.time = setTimeout(() => {this.counterBack()}, 1000);
            }else{
                clearTimeout(this.time);
                Tostar.count = 3;
                Tostar.deleteTostarWithTime();
            }
        }catch(err){
            throw err;
        }
    }  
    
    static deleteTostarWithTime(){
        try{
            let tostarContainer = document.querySelector(".tostar-container");
            if(tostarContainer !== null){
              document.querySelector(".tostar-btn").addEventListener('click', Tostar.removeTostarClick(tostarContainer));
              let btnContact = document.querySelector('.btn-submit-contact');
              if(btnContact.disabled === true){
                  btnContact.disabled = false;
                  btnContact.value = 'Submit';
              }
            }
        }catch(err){
            throw err;
        }
    }
      
    static removeTostarClick(node){
        try{
            if(node !== null){
                node.remove();
                let btnContact = document.querySelector('.btn-submit-contact');
                if(btnContact.disabled === true){
                    btnContact.disabled = false;
                    btnContact.value = 'Submit';
                }
            }
        }catch(err){
            throw err;
        }  
    } 
}  