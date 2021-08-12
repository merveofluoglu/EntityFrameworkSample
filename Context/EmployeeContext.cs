using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.ModelConfiguration.Conventions;
using System.Linq;
using System.Threading.Tasks;
using EFSample.Models;

namespace EFSample.Context
{
    public class EmployeeContext : DbContext 
    {
        public EmployeeContext() : base("EmployeeContext")
        {
        }
        public DbSet<EmployeeModel> Employees { get; set; }
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Conventions.Remove<PluralizingTableNameConvention>();
        }
    }
}
