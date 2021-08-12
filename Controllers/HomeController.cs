using EFSample.Context;
using EFSample.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using System.Data.Entity;

namespace EFSample.Controllers
{
    public class HomeController : Controller
    {       
        public EmployeeContext db = new EmployeeContext();
        public HomeController()
        {           
        }
        public IActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public JsonResult Add(EmployeeModel employee)
        {
            db.Employees.Add(employee);
            db.SaveChanges();
            return Json(true);
        }

        [HttpGet]
        public JsonResult GetEmployeeList()
        {
            return Json(db.Employees.ToList());
        }

        [Route("home/delete/{_id}")]
        public JsonResult Delete(long _id)
        {
            db.Employees.Remove(db.Employees.Find(_id));
            db.SaveChanges();

            return Json(true);
        }

        [Route("home/edit")]
        [HttpPost]
        public JsonResult Edit(EmployeeModel emp)
        {
            db.Entry(emp).State = EntityState.Modified;           
            db.SaveChanges();

            return Json(true);
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
