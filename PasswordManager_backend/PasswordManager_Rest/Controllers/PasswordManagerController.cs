using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PasswordManager_Main.IService;
using PasswordManager_Main.Models;

namespace PasswordManager_Rest.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class PasswordManagerController : ControllerBase
{
    private readonly IPasswordUnitService _passwordUnitService;

    public PasswordManagerController(IPasswordUnitService passwordUnitService)
    {
        _passwordUnitService = passwordUnitService;
    }

    [HttpPost]
    public IActionResult AddPasswordUnit([FromBody] PasswordUnit passwordUnit)
    {
        _passwordUnitService.AddPasswordUnit(passwordUnit);
        return Ok();
    }

    [HttpGet("{id}")]
    public IActionResult GetPasswordUnitById(int id, [FromQuery] string masterPassword)
    {
        PasswordUnit passwordUnit = _passwordUnitService.GetPasswordUnitById(id, masterPassword);
        if (passwordUnit == null)
        {
            return NotFound();
        }
        return Ok(passwordUnit);
    }

    [HttpGet]
    public IActionResult GetAllPasswordUnits([FromQuery] string masterPassword)
    {
        IEnumerable<PasswordUnit> passwordUnits = _passwordUnitService.GetAllPasswordUnits(masterPassword);
        return Ok(passwordUnits);
    }

    [HttpPut]
    public IActionResult UpdatePasswordUnit([FromBody] PasswordUnit passwordUnit, [FromQuery] string masterPassword)
    {
        _passwordUnitService.UpdatePasswordUnit(passwordUnit, masterPassword);
        return Ok();
    }

    [HttpDelete("{id}")]
    public IActionResult DeletePasswordUnit(int id)
    {
        PasswordUnit passwordUnit = _passwordUnitService.GetPasswordUnitById(id, "");
        if (passwordUnit == null)
        {
            return NotFound();
        }
        _passwordUnitService.DeletePasswordUnit(passwordUnit);
        return Ok();
    }
}