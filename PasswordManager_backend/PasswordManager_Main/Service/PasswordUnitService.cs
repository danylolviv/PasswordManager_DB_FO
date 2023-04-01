using PasswordManager_Main.IService;
using PasswordManager_Main.Models;
using PasswordManager_Main.Repository;

namespace PasswordManager_Main.Service;

public class PasswordUnitService : IPasswordUnitService
{
    private readonly MainDbContext _context;
    private IEncryptionService _encryptionService;

    public PasswordUnitService(MainDbContext context)
    {
        _context = context ?? throw new ArgumentNullException(nameof(context));
        _encryptionService = new EncryptionService();
    }

    public void AddPasswordUnit(PasswordUnit passwordUnit)
        {
            try
            {
                passwordUnit.Password = _encryptionService.Encrypt(passwordUnit.Password, passwordUnit.MasterPassword);
                passwordUnit.Username = _encryptionService.Encrypt(passwordUnit.Username, passwordUnit.MasterPassword);
                _context.PasswordUnits.Add(passwordUnit);
                _context.SaveChanges();
            }
            catch (Exception ex)
            {
                // Log or handle the exception here
                throw new Exception("Failed to add PasswordUnit", ex);
            }
        }

        public PasswordUnit GetPasswordUnitById(int id, string masterPassword)
        {
            try
            {
                var passwordUnit = _context.PasswordUnits.Find(id);
                passwordUnit.Password = _encryptionService.Decrypt(passwordUnit.Password, masterPassword);
                passwordUnit.Username = _encryptionService.Decrypt(passwordUnit.Username, masterPassword);
                return passwordUnit;
            }
            catch (Exception ex)
            {
                // Log or handle the exception here
                throw new Exception("Failed to retrieve PasswordUnit by id", ex);
            }
        }

        public IEnumerable<PasswordUnit> GetAllPasswordUnits(string masterPassword)
        {
            try
            {
                var passwordUnits = _context.PasswordUnits.ToList();
                foreach (var passwordUnit in passwordUnits)
                {
                    passwordUnit.Password = _encryptionService.Decrypt(passwordUnit.Password, masterPassword);
                    passwordUnit.Username = _encryptionService.Decrypt(passwordUnit.Username, masterPassword);
                }
                return passwordUnits;
            }
            catch (Exception ex)
            {
                // Log or handle the exception here
                throw new Exception("Failed to retrieve all PasswordUnits", ex);
            }
        }

        public void UpdatePasswordUnit(PasswordUnit passwordUnit, string masterPassword)
        {
            try
            {
                passwordUnit.Password = _encryptionService.Encrypt(passwordUnit.Password, masterPassword);
                passwordUnit.Username = _encryptionService.Encrypt(passwordUnit.Username, masterPassword);
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
