using PasswordManager_Main.Models;

namespace PasswordManager_Main.Repository;

public class MainDbSeeding: IMainDbSeeding
{
    private readonly MainDbContext _ctx;

    public MainDbSeeding(MainDbContext ctx)
    {
        _ctx = ctx;
    }

    public void SeedDevelopment()
    {
        // _ctx.Database.EnsureDeleted();
        // _ctx.Database.EnsureCreated();

        var passwordUnits = new List<PasswordUnit>
        {
            new PasswordUnit
            {
                UserId = 1,
                Website = "example.com",
                Username = "user1",
                PasswordHash = "password1",
                PasswordSalt = "salt1",
                CreatedAt = DateTime.Now
            },
            new PasswordUnit
            {
                UserId = 2,
                Website = "test.com",
                Username = "user2",
                PasswordHash = "password2",
                PasswordSalt = "salt2",
                CreatedAt = DateTime.Now
            }
        };

        _ctx.PasswordUnits.AddRange(passwordUnits);
        _ctx.SaveChanges();
    }

    public void SeedProduction()
    {
        // Seed production data if needed
    }
}