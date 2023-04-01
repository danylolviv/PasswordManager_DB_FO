using PasswordManager_Main.IService;
using PasswordManager_Main.Models;

namespace PasswordManager_Main.Repository;

public class MainDbSeeding: IMainDbSeeding
{
    private readonly MainDbContext _ctx;
    private readonly IPasswordUnitService _passwordunitService;

    public MainDbSeeding(MainDbContext ctx, IPasswordUnitService passwordService)
    {
        _ctx = ctx;
        _passwordunitService = passwordService;

    }

    public void SeedDevelopment()
    {
        _ctx.Database.EnsureDeleted();
        _ctx.Database.EnsureCreated();

        var pass1 = new PasswordUnit
        {
            UserId = 1,
            Website = "example.com",
            Username = "user1",
            PasswordHash = "password1",
            PasswordSalt = "2b7e151628aed2a6abf7158809cf4f3c",
            CreatedAt = DateTime.Now
        };

        var pass2 = new PasswordUnit
        {
            UserId = 2,
            Website = "test.com",
            Username = "user2",
            PasswordHash = "password2",
            PasswordSalt = "2b7e151628aed2a6abf7158809cf4f3c",
            CreatedAt = DateTime.Now
        };
        
        _passwordunitService.AddPasswordUnit(pass1);
        _passwordunitService.AddPasswordUnit(pass2);
    }

    public void SeedProduction()
    {
        // Seed production data if needed
    }
}