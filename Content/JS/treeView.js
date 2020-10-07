function mostrarDatos(keyId, context, No_rama, IdArbol) {    
    var serverUrl = window.location.origin;
    var parametros = "?keyId=" + keyId + "&No_rama=" + No_rama + "&IdArbol=" + IdArbol;
    var url = serverUrl +"/Subtema/ListarSubtema" + parametros;
    fetch(url)
        .then(function (result) {
            return result.json();
        }).then(function (data) {
            var ul_element = document.getElementById("ul_" + keyId);
            
            if (ul_element)//valida si existe el elemento
            {
                ul_element.parentNode.removeChild(ul_element);/*eliminamos el nodo creado*/
            } else {
                ul_element = addOption_nuevoInTreeView(ul_element, context, keyId, No_rama, IdArbol);
                
                data.forEach(function (element) {
                    addElementTreeView(element, ul_element, IdArbol);                    
                })

            }

        })
}

function addOption_nuevoInTreeView(ul_element, context, keyId, No_rama, IdArbol) {
    
    ul_element = document.createElement("ul");
    ul_element.setAttribute("id", "ul_" + keyId);
    ul_element.setAttribute("class", "active");
    context.appendChild(ul_element);


    //Opcion para agregar Nuevo
    var spanAddNewElement = document.createElement("span");
    spanAddNewElement.appendChild(document.createTextNode("Nuevo"));
    spanAddNewElement.setAttribute("class", "newElement");
    spanAddNewElement.addEventListener("click", function () {
        var No_ramaSiguiente = No_rama + 1;
        if (No_ramaSiguiente == 1) {
            keyId = 0;
        }        
        AgregarSubtema(keyId, context, No_ramaSiguiente, IdArbol);
    });
    ul_element.appendChild(spanAddNewElement);
    return ul_element;//Se retorna por que el elemento no esta creado ya que era nulo y lo creamos en este metodo
}


function addElementTreeView(element, ul_element, IdArbol) {
    var li_element = document.createElement("li")
    var elmentSpant;
    if (element.EsNodo == 1) {//Es modo
        elmentSpant = document.createElement("span");
        elmentSpant.setAttribute("id", "subtemaChaild_" + element.Id);
        elmentSpant.setAttribute("class", "caret_h");
        elmentSpant.appendChild(document.createTextNode(element.Name + " (" + element.Cantidad + ")"));
        elmentSpant.addEventListener("click", function () {
            mostrarDatos(element.Id, this.parentElement, element.No_rama, IdArbol);
            this.classList.toggle("caret-down");            
        });
        li_element.appendChild(elmentSpant);
        /*Crear Edicion del nodo*/
        var newSpanEdit = document.createElement("span");
        newSpanEdit.setAttribute("class", "spanEdit");        
        newSpanEdit.addEventListener("click", function () {
            showFormEditSubtema(element.Id);
        });
        /*Crear Icono del nodo en el subtema*/
        var i_element = document.createElement("i");
        i_element.setAttribute("class", "fas fa-pencil-alt");
        newSpanEdit.appendChild(i_element);

        li_element.appendChild(newSpanEdit);


    } else {//Es Link
        elmentSpant = document.createElement("span");
        elmentSpant.setAttribute("id", "spanLink_" + element.Id)
        elmentSpant.setAttribute("class", "span_chiaild");
        elmentTextNode = document.createTextNode(element.Name);
        elmentSpant.appendChild(elmentTextNode);
        elmentSpant.addEventListener("click", function () {            
            showFormEditSubtema(element.Id);
        });
        li_element.setAttribute("class", "li_chiaild");
        li_element.appendChild(elmentSpant);
    }

    


    li_element.setAttribute("id", "li_clild_" + element.Id);

    ul_element.appendChild(li_element);
}











/*Metodo Raiz */
//var toggler = document.getElementsByClassName("caret_h");
//var i;
//for (i = 0; i < toggler.length; i++) {
//    toggler[i].addEventListener("click", function () {
//        var id = this.parentElement.id;
//        alert(id);
//        mostrarDatos(id, this.parentElement, 0, id);
//        this.classList.toggle("caret-down");
//    });
//}



var toggler = document.getElementsByClassName("caret_h");
var i;
for (i = 0; i < toggler.length; i++) {
    toggler[i].addEventListener("click", function () {        
        this.classList.toggle("caret-down");
    });
}