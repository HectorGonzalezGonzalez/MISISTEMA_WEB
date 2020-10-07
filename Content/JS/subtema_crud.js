var editorCodeMirror;//Se va a utilizar en varios metodos

function AgregarSubtema(keyId, context, No_ramaSiguiente, IdArbol) {
    var url = window.location.origin + "/Subtema/Save?Tema_id=" + IdArbol + "&Padre_rama=" + keyId + "&No_ramaSiguiente=" + No_ramaSiguiente;
    fetch(url)
        .then(function (result) {
            if (result.ok) {
                return result.text();
            } else {
                alert(result);
            }
        }).then(function (data) {
            document.getElementById("miContenido").innerHTML = data;            
        })
}
function validaFormSubtema(EsNodo) {    
    var valida = false;
    var nombreSubtema = document.getElementById("nombreSubtema");
    if (nombreSubtema.value.trim() == "") {
        document.getElementById("nombreSubtema_validate").innerHTML = "El subtema es requerido";
        nombreSubtema.focus();
        valida = true;
    } else if (EsNodo == 0) {                
        var Descripcion = editorCodeMirror.getValue();//obtenemos los datos del textarea        
        if (Descripcion.trim() == "") {
            document.getElementById("descripcion_validate").innerHTML = "La descripción es requerida";            
            valida = true;
        }
    }    
    return valida;
}
function obtenerRadioButtonSeleccionado() {
    var seleccionado = 0;
    var radioButton = document.getElementsByName("Subtema.EsNodo");
    for (var i = 0; i < radioButton.length; i++) {
        if (radioButton[i].checked) {
            seleccionado = radioButton[i].value;            
        }
    }
    return seleccionado;
}
function saveSubtema(Tema_id, Padre_rama, No_rama) {
    
    var EsNodo = obtenerRadioButtonSeleccionado();
    if (validaFormSubtema(EsNodo) == false) {
        var url = window.location.origin + "/Subtema/Save";
        var Descripcion="";
        if (EsNodo==0) {
            Descripcion = editorCodeMirror.getValue();//obtenemos los datos del textarea
        }
        fetch(url, {
            method: "POST",
            body: JSON.stringify({
                Subtema: {
                    Tema_id: Tema_id,
                    Nombre: document.getElementById("nombreSubtema").value,
                    No_rama: No_rama,
                    Padre_rama: Padre_rama,
                    EsNodo: EsNodo
                },   
                SubtemaDetalle: {
                    Descripcion: Descripcion
                }
            }),
            headers: {
                "Content-type": "Application/json"
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
                addSubtemaTreeView(obj, Tema_id);
                toast_success("Datos Guardados");     
            }

           
        })
    }    
}
function addSubtemaTreeView(obj, Tema_id) {    
    var keyId = obj.Padre_rama;
    var context;
    if (keyId == 0) {
        keyId = Tema_id;
        context = document.getElementById("raizTema_" + keyId);
    } else {
        context = document.getElementById("li_clild_" + keyId);
    }  
    var ul_element = document.getElementById("ul_" + keyId);    
    addElementTreeView(obj, ul_element,Tema_id)    
}
function showFormEditSubtema(Id) {
    var url = window.location.origin + "/Subtema/Editar?id=" + Id;
    fetch(url)
        .then(function (result) {
            if (result.ok) {
                return result.text();
            } else {
                alert(result);
            }
        }).then(function (data) {
            document.getElementById("miContenido").innerHTML = data;
            estiloTextareaCodeMirror();
        })
}

function UpdateSubtema(Id, EsNodo, SubtemaDetalle_Id) {
    if (validaFormSubtema() == false) {        
        var url = window.location.origin + "/Subtema/Editar";
        var Descripcion = "";
        var SubtemaDetalle = {};
        if (EsNodo == 0) {
            Descripcion = editorCodeMirror.getValue();//obtenemos los datos del textarea
            SubtemaDetalle= {
                Id:SubtemaDetalle_Id,
                    SubtemaId:Id,
                    Descripcion:Descripcion
                    };  
        }

        fetch(url, {
            method: "POST",
            body: JSON.stringify({
                Subtema: {
                    Id: Id,
                    Nombre: document.getElementById("nombreSubtema").value
                },
                SubtemaDetalle: SubtemaDetalle       
            }),
            headers: {
                "Content-type": "Application/json"                
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
                var obj = data.objeto;
                if (EsNodo == 1) {
                    document.getElementById("subtemaChaild_" + obj.Id).innerHTML = obj.Name;   
                } else {
                    document.getElementById("spanLink_" + obj.Id).innerHTML = obj.Name;                    
                }
                document.getElementById("miContenido").innerHTML = "";
                toast_success("Subtema actualizado correctamente")
            }
        })
    }
}

function DeleteSubtemaNodo(Id) {
    var url = window.location.origin + "/subtema/Delete";
    fetch(url, {
        method: "POST",
        body: JSON.stringify({
            Id:Id
        }),
        headers: {
            "Content-Type":"Application/json"
        }
    })
        .then(function (result) {
            if (result.ok) {
                return result.json();
            } else {
                alert(result);
            }
        }).then(function (data) {
            if (data.Erro == 1) {
                alertSw('info', data.mensaje, 'No se elimino el registro');
            } else {
                var li_clild = document.getElementById("li_clild_" + Id);
                li_clild.parentElement.removeChild(li_clild);
                document.getElementById("miContenido").innerHTML = "";
                toast_success("Se elimino el registro correctamente");
            }
        })
}



function showControlData(bandea) {    
    var element=document.getElementById("divControlData")
    if (bandea == 0) {
        element.style.display ='block';
        estiloTextareaCodeMirror();
    } else {
        element.style.display = 'none';
    }
}


function estiloTextareaCodeMirror() {

    var yaExisteClase = document.getElementsByClassName("CodeMirror");
    if (yaExisteClase.length == 0)//Para que no se ejecute dos veces cuando se usa radio buttons(display)
    {       
        var textarea = document.getElementById("SubtemaDetalle_Descripcion"); 
        if (textarea) {
            editorCodeMirror = CodeMirror.fromTextArea(textarea, {
                mode: "text/html",
                lineNumbers: true,
                matchBrackets: true
            });
            //editorCodeMirror.setSize("auto", 200);
        }          
    }
}