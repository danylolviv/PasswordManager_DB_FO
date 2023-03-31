using PasswordManager_Main.Models;

namespace PasswordManager_Main.IService;

public interface IPasswordUnitService
{
    void AddPasswordUnit(PasswordUnit passwordUnit);
    PasswordUnit GetPasswordUnitById(int id);
    IEnumerable<PasswordUnit> GetAllPasswordUnits();
    void UpdatePasswordUnit(PasswordUnit passwordUnit);
    void DeletePasswordUnit(PasswordUnit passwordUnit);
}