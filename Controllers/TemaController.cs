using BUSSINES;
using BUSSINES.Models;
using BUSSINES.Models.ViewModel;
using Microsoft.Ajax.Utilities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.Helpers;
using System.Web.Mvc;

namespace MISISTEMA_WEB.Controllers
{
    public class TemaController : Controller
    {
        BusTema busTema;
        
        public TemaController()
        {
            busTema = new BusTema();            
        }
        // GET: Tema
        public ActionResult Index()
        {
            return View(busTema.ListarArbol());
        }
        
        public ActionResult Agregar()
        {
            ViewBag.Categoria_id = new SelectList(new BusCategoria().Combo(), "Value", "Text");
            return View();
        }
        [HttpPost]
        public JsonResult Agregar(Tema model)
        {
            JsonResponse j = new JsonResponse();
            j.Erro = 1;
            try
            {
                if (ModelState.IsValid)
                {
                    busTema.save(model);
                    j.objeto = model;
                    j.Erro = 0;
                }
                else
                {
                    j.mensaje = "El dato no es valido";
                }
            }
            catch (Exception ex)
            {
                j.mensaje = ex.Message;
            }
            return Json(j, JsonRequestBehavior.AllowGet);
        }
        public ActionResult Edit(int id)
        {
            ViewBag.Categoria_id = new SelectList(new BusCategoria().Combo(), "Value", "Text");
            return View(busTema.ListarById(id));
        }
        [HttpPost]
        public JsonResult Edit(Tema model)
        {
            JsonResponse j = new JsonResponse();
            j.Erro = 1;
            if (ModelState.IsValid)
            {
                try
                {
                    j.objeto = busTema.save(model);
                    j.Erro = 0;
                }
                catch (Exception ex)
                {
                    j.mensaje = ex.Message;
                }
            }
            else
            {
                j.mensaje = "El modelo no es valido";
            }

            return Json(j, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public JsonResult Delete(int id)
        {
            JsonResponse j = new JsonResponse();
            j.Erro = 1;
            try
            {
                busTema.DeleteValidate(id);
                j.Erro = 0;
            }
            catch (Exception ex)
            {
                j.mensaje = ex.Message;
                
            }
            return Json(j, JsonRequestBehavior.AllowGet);
        }
    }
}