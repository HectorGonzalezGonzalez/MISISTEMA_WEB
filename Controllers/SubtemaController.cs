using BUSSINES;
using BUSSINES.Models;
using BUSSINES.Models.ViewModel;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.WebPages.Html;

namespace MISISTEMA_WEB.Controllers
{
    public class SubtemaController : Controller
    {
        BusSubtema busSubtema;
        public SubtemaController()
        {
            busSubtema = new BusSubtema();
        }
        [HttpGet]
        public JsonResult ListarSubtema(int keyId, int No_rama, int IdArbol)
        {
            return Json(busSubtema.ListarSubtemas(keyId, No_rama, IdArbol), JsonRequestBehavior.AllowGet);
        }
        
        public ActionResult Save(int Tema_id, int Padre_rama, int No_ramaSiguiente)
        {
            SubtemaDViewModel subtema = new SubtemaDViewModel(){
                Subtema=new Subtema()
                {
                    Tema_id = Tema_id,
                    Padre_rama = Padre_rama,
                    No_rama = No_ramaSiguiente,
                    EsNodo = 1
                }
            };
            return View(subtema);
        }
        [HttpPost]
        public JsonResult Save(SubtemaDViewModel viewModel)
        {
            JsonResponse j = new JsonResponse();
            j.Erro = 1;
           
            if (ModelState.IsValid || viewModel.Subtema.EsNodo==1)
            {
                try
                {
                    if (viewModel.Subtema.EsNodo == 0)
                    {
                        if (string.IsNullOrEmpty(viewModel.SubtemaDetalle.Descripcion))
                        {
                            throw new ApplicationException("La descripción es requerida");
                        }
                    }
                    Subtema model=busSubtema.save(viewModel);
                    //Lo empatamos para poder reutilizar las funciones de javascript ya que utiliza el objeto 'SubtemaViewModel'
                    j.objeto = new SubtemaViewModel() {
                        Id = model.Id,
                        Name = model.Nombre,
                        Padre_rama = model.Padre_rama,
                        No_rama = model.No_rama,
                        EsNodo = model.EsNodo,
                        Cantidad = 0//Como se agrega por primera vez asummos que la cantdad es cero
                    };
                    j.Erro = 0;
                }
                catch (Exception ex)
                {
                    j.mensaje = ex.Message;
                }
            }
            else
            {
                j.mensaje = "Datos no validos";
            }            
            return Json(j, JsonRequestBehavior.AllowGet);
        }
        public ActionResult Editar(int id)
        {                    
            return View(busSubtema.ObtenerDatosEdit(id));
        }
        [HttpPost]
        public JsonResult Editar(SubtemaDViewModel vm)
        {
            //int Id, string Nombre,string Descripcion
            JsonResponse j = new JsonResponse();
            j.Erro = 1;
            if (ModelState.IsValid)
            {
                try
                {                   
                    Subtema subtema = busSubtema.save(vm);
                    j.objeto=new SubtemaViewModel(){
                        Id = subtema.Id,
                        Name = subtema.Nombre,
                        Padre_rama = subtema.Padre_rama,
                        No_rama = subtema.No_rama,
                        EsNodo = subtema.EsNodo
                        //Cantidad = 0
                    };
                    j.Erro = 0;
                }
                catch (Exception ex)
                {
                    j.mensaje = ex.Message;
                }
            }
            else
            {
                j.mensaje = "Datos no validos";
            }
            return Json(j,JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public JsonResult Delete(int Id)
        {
            JsonResponse j = new JsonResponse();
            j.Erro = 1;
            try
            {
                int cantidadDelete=busSubtema.EliminarDatos(Id);
                if (cantidadDelete>0)
                {
                    j.Erro = 0;
                }
            }
            catch (Exception ex)
            {
                j.mensaje = ex.Message;
            }

            return Json(j, JsonRequestBehavior.AllowGet);
        }
    }
}