using Microsoft.EntityFrameworkCore;
using PasswordManager_Main.Models;

namespace PasswordManager_Main.Repository;

public class MainDbContext : DbContext
{
    public MainDbContext(DbContextOptions<MainDbContext> options) :base(options)
    {
  
    }

    public DbSet<PasswordUnit> PasswordUnits { get; set; }

}