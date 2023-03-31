using PasswordManager_Main.IRepository;
using PasswordManager_Main.Models;

namespace PasswordManager_Main.Repository;

public class PasswordUnitRepository : IUnitRepository
{
    private readonly MainDbContext _context;

    public PasswordUnitRepository(MainDbContext context)
    {
        _context = context ?? throw new ArgumentNullException(nameof(context));
    }

    public void AddPasswordUnit(PasswordUnit passwordUnit)
    {
        try
        {
            _context.PasswordUnits.Add(passwordUnit);
            _context.SaveChanges();
        }
        catch (Exception ex)
        {
            // Log or handle the exception here
            throw new Exception("Failed to add PasswordUnit", ex);
        }
    }

    public PasswordUnit GetPasswordUnitById(int id)
    {
        try
        {
            return _context.PasswordUnits.Find(id);
        }
        catch (Exception ex)
        {
            // Log or handle the exception here
            throw new Exception("Failed to retrieve PasswordUnit by id", ex);
        }
    }

    public IEnumerable<PasswordUnit> GetAllPasswordUnits()
    {
        try
        {
            return _context.PasswordUnits.ToList();
        }
        catch (Exception ex)
        {
            // Log or handle the exception here
            throw new Exception("Failed to retrieve all PasswordUnits", ex);
        }
    }

    public void UpdatePasswordUnit(PasswordUnit passwordUnit)
    {
        try
        {
            _context.PasswordUnits.Update(passwordUnit);
            _context.SaveChanges();
        }
        catch (Exception ex)
        {
            // Log or handle the exception here
            throw new Exception("Failed to update PasswordUnit", ex);
        }
    }

    public void DeletePasswordUnit(PasswordUnit passwordUnit)
    {
        try
        {
            _context.PasswordUnits.Remove(passwordUnit);
            _context.SaveChanges();
        }
        catch (Exception ex)
        {
            // Log or handle the exception here
            throw new Exception("Failed to delete PasswordUnit", ex);
        }
    }
}
