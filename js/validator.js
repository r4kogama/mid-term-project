const stateHide = { 'page_1': '/contact.html#menu-hide', 'page_2': '/index.html#menu-hide', 'page_2': '/project.html#menu-hide' }
const stateShow = { 'page_1': '/contact.html#menu-show', 'page_2': '/index.html#menu-show', 'page_2': '/project.html#menu-show' }
function locationHashChanged() {
    if (location.hash === '#menu-hide') {
         console.log(window.location.href.replace("#menu-hide", ''))
        window.history.pushState(stateHide, '', window.location.href.replace("#menu-hide", '')); 
    }
    if (location.hash === '#menu-show') {
         console.log(window.location.href.replace("#menu-show", ''))
        window.history.pushState(stateShow, '', window.location.href.replace("#menu-show", '')); 
    }
}
window.onhashchange = locationHashChanged;

/********* class message formulary **********/
class Message {

    constructor(argName, argEmail, argPhone, argMessage) {
        this.name = argName !== 'undefined' ? argName : '';
        this.email = argEmail !== 'undefined' ? argEmail : '';
        this.phone = argPhone !== 'undefined' ? argPhone : null;
        this.message = argMessage !== 'undefined' ? argMessage : '';
    }


    validateEmail() {
        let reg = /^[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*@[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[.][a-zA-Z]{2,3}$/;
        if(reg.test(this.email) ==  true) return true; //email correct
        return false;
    }

    validatePhone(){
        let reg = /^(\d{3})[- ]?(\d{3})[- ]?(\d{3})$/;
        if(reg.test(this.phone) ==  true) return true;//phone correct
        return false;
    }
    
    validateMessage(){
        let reg = /^[a-zA-Z0-9!@#$€%^&*()_+\-=\[\]{};':"\\|,.<>\/?\s]{10,450}$/;
        if(reg.test(this.message) ==  true){
            let cont = this.message.split(' ').reduce((acc, word) => ( typeof word === 'string' ? (acc += 1) : acc ), 0);
            if(cont > 120){//max 120 words
                return false;
            }
            return true;//message correct
        };
        return false;
    }

    validateName(){
        let reg = /^[^0-9][a-zA-Z\s]{8,40}$/;
        if(reg.test(this.name) ==  true){
            let spacesWords = this.name.split(' ').filter( e =>{
                return e != '';//without extra spaces
            }).reduce((acc, word) => ( typeof word === 'string' ? (acc += 1) : acc ), 0);
            if(spacesWords < 2){//less 2 words
                return false;          
            }
            return true;//full name correct
        };
        return false;
    }
}

/********** Helpers Create elements DOM ******** */

/**
 * Metodo que inserta un elemento hermano a continuacion del otro.
 * @param {object} createTag - Nuevo elemento html creado.
 * @param {string} selector - selector que sera hermano mayor/previous del nuevo elemento creado. Introducir tag o nombre de la .class/#id.
 */
 const elementSibling = (createTag, selector) => {
    let eleSibling = document.querySelector(`#${selector.id}`);
    eleSibling.parentNode.insertBefore(createTag, eleSibling.nextSibling);
    return createTag;
}

/**
 * Creacion de nuevo elemento, unicamente crea el elemento y retorna dicho objeto. Actua como funcion global.
 * @param {object} objElement - Recibe un objeto con los siguientes atributos:
 * @attr {string} tag - crea el nuevo elemento, introducir el nombre de la etiqueta a crear.
 * @attr {array} class - Opcional: introducir una o varias class al nuevo elemento
 * @attr {strung} content - Opcional: Introducir el contenido de texto que tendra el nuevo elemento
 */
 const createElement = (objElement) => {
    let newElement = document.createElement(objElement.tag);
    if (objElement.class !== '') {
       newElement.setAttribute('class', objElement.class);
    }
    if (objElement.content !== '') {
        let content = document.createTextNode(objElement.content);
        newElement.appendChild(content);
    }
    return newElement;
}

/****************************
 **** ERRORS CONTROL ********
 **************************/

//check if the input field is full or empty, modifying styles
const is_emptyInput = (inputs) => {
    let empty = inputs.filter(ele => {
        return ele.value === '';
    })
    if(empty.length !== 0){//empty fields
        empty.forEach( ele => {
            generateTagMessage("empty", ele , "wrong", "Mandatory field");
        });
        return false;
    }
    return true;
}

const inputInvalidStyle = (element) =>{
    let inputTag = document.querySelector(`#${element.id}`);
    inputTag.setAttribute('class','input-border');
    inputTag.focus();
}

/***************** ERROR HANDLER FUNCTION *********************/
const generateTagMessage = (status, element, name, text) => {
    let argsCreateElement = { tag: 'span', class: name, content: text }
    let newEle = '';
    switch (status) {
        case 'empty':
            newEle = createElement(argsCreateElement);
            elementSibling(newEle, element);
            inputInvalidStyle(element);
            break;
        case 'invalid':
            newEle = createElement(argsCreateElement);
            elementSibling(newEle, element);
            inputInvalidStyle(element);
            break;
    }
}


/********* all fields have been filled in correctly **********/
const validFormSubmit = (ev) => {
  
}


/********* validation state creation control ***********/
const validateFormularyContact = () => {
    document.querySelector(".form-contact").addEventListener('submit', (e) => {
        e.preventDefault();
        try{
            let form = [...e.currentTarget];
            if (is_emptyInput(form)) {//el campo input no esta vacio
                let valid = true;
                let objForm = new Message
                    ( form[0].value.trim(),//name
                      form[1].value.trim().toLowerCase(),//email
                      form[2].value.trim(),//tel
                      form[3].value.trim() );//message
                if(!objForm.validateName()){
                    generateTagMessage("invalid", form[1] , "wrong", "Wrong full name format");
                    valid = false;                    
                }else if(!objForm.validateEmail()){
                    generateTagMessage("invalid", form[2] , "wrong", "Wrong email format");
                    valid = false;
                }else if(!objForm.validatePhone()){
                    generateTagMessage("invalid", form[3] , "wrong", "Wrong phone format");
                    valid = false;                    
                }else if(!objForm.validateMessage()){
                    generateTagMessage("invalid", form[4] , "wrong", "Wrong message format");
                    valid = false;                   
                }
                if(valid){
                    validFormSubmit();
                }
            }
        }catch(err){
            console.log(err);
        }
       
    })
}

window.addEventListener('load',  () =>{
    validateFormularyContact();
}); 