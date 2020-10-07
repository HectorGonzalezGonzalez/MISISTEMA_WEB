
function showFormTema() {
    var serverUrl = window.location.origin;
    var url = serverUrl+"/Tema/Agregar";
    fetch(url)
        .then(function (result) {
            if (result.ok) {
                return result.text();//Convertimor el resultado en texto
            } else {
                alert(result);//Mostramos el erro
                return result;
            }
        })
        .then(function (data) {
            document.getElementById("miContenido").innerHTML = data;
        })
}
function validateTema() {
    var result = false;
    var nameTema = document.getElementById("nameTema");
    if (nameTema.value.trim() == "") {
        document.getElementById("lblNameError").innerHTML = 'Escribe el nombre del tema';
        nameTema.focus();
        result = true;
    }
    return result;
}
function saveTema() {
    if (validateTema() == false) {
        var serverUrl = window.location.origin;
        var url = serverUrl+"/Tema/Agregar";
        fetch(url, {
            method: "POST",
            body: JSON.stringify({
                Name: document.getElementById("nameTema").value,
                Categoria_id: document.getElementById("Categoria_id").value
            }),
            headers: {
                "Content-type": "application/json"
            }
        }).then(function (result) {
            if (result.ok) {
                return result.json();
            } else {
                alert(result);
            }
        }).then(function (data) {
                if (data.Erro == 1) {                    
                    alertSw('info', data.mensaje, 'No se guardaron los datos');
                } else { 
                    document.getElementById("miContenido").innerHTML = "";
                   var obj = data.objeto;                    
                   addTemaTreeView(obj);
                   toast_success("Datos Guardados");                    
                }
            })
    }

}
function addTemaTreeView(obj) {
    var myUL = document.getElementById("myUL");
    var liNew = document.createElement("li");
    liNew.setAttribute("id","li_raizTema_"+obj.Id);
    

    var spanNew = document.createElement("span");
    spanNew.appendChild(document.createTextNode(obj.Name));
    spanNew.setAttribute("id", "raizTema_" + obj.Id);    
    spanNew.setAttribute("class", "caret_h padre");    
    spanNew.addEventListener("click", function () {
        mostrarDatos(obj.Id, this.parentElement, 0, obj.Id);
        this.classList.toggle("caret-down");
    });
    liNew.appendChild(spanNew);
    /*Crear elemento de edición*/
    var spanEdit = document.createElement("span");
    spanEdit.setAttribute("class", "spanEdit");
    spanEdit.onclick = function () {
        showFormEditTema(obj.Id);
    }
    /*Crear icono de editar*/
    var elementIcon = document.createElement("i");
    elementIcon.setAttribute("class", "fas fa-edit");
    spanEdit.append(elementIcon);

    liNew.appendChild(spanEdit);



    myUL.insertBefore(liNew, myUL.firstChild);
}
function showFormEditTema(id) {
    var serverUrl = window.location.origin+"/Tema/Edit?id="+id;
    fetch(serverUrl)
        .then(function (result) {
            if (result.ok) {
                return result.text();
            } else {
                alert(result);
            }
        })
        .then(function (data) {
            document.getElementById("miContenido").innerHTML = data;
        })
}
function updateTema(id) {
    if (validateTema() == false) {
        var url = window.location.origin + "/Tema/Edit";        
        fetch(url, {
            method: "POST",
            body: JSON.stringify({
                Id: id,
                Name: document.getElementById("nameTema").value,
                Categoria_id: document.getElementById("Categoria_id").value
            }),
            headers: {                
                "Content-type": "application/json"
            }
        }).then(function (result) {
            console.log(result);
            if (result.ok) {
                return result.json();
            } else {
                alert(result);
            }
        }).then(function (data) {            
            if (data.Erro == 1) {
                alertSw('info', data.mensaje, 'No se guardaron los datos');
            } else {
                document.getElementById("miContenido").innerHTML = "";
                var obj = data.objeto;                
                treeViewEditTema(obj);
                toast_success("Dato actualizado correctamente.");                    
            }
        })

        }
}
function treeViewEditTema(obj) {    
    var concatId = "raizTema_" + obj.Id;
        document.getElementById(concatId).innerHTML = obj.Name;
}
function deleteTema(id) {
    var url = window.location.origin + "/Tema/Delete";
    fetch(url, {
        method: "POST",
        body: JSON.stringify({
            id: id
        }),
        headers: {
            "Content-Type":"Application/json"
        }
    }).then(function (result) {
        if (result.ok) {
            return result.json();
        } else {
            alert(result);
        }
    }).then(function (data) {
        if (data.Erro == 1) {
            alertSw('info', data.mensaje, 'No se guardaron los datos');
        } else {
            document.getElementById("miContenido").innerHTML = "";
            toast_success("Dato actualizado correctamente.");
            var li_Element = document.getElementById("li_raizTema_"+id);            
            li_Element.parentElement.removeChild(li_Element);
            
            
        }
    })

}