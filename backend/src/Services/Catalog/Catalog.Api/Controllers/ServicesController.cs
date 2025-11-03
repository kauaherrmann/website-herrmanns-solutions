using Microsoft.AspNetCore.Mvc;
using Asp.Versioning;

namespace Catalog.Api.Controllers;

[ApiController]
[ApiVersion("1.0")]
[Route("api/v{version:apiVersion}/services")]
public class ServicesController : ControllerBase
{
    [HttpGet]
    public IActionResult Get()
    {
        var items = new[]
        {
            new { id = "1", titulo = "Projeto de Refrigeração", descricao = "Dimensionamento e engenharia de sistemas." },
            new { id = "2", titulo = "Instalação", descricao = "Montagem, start-up e comissionamento." },
            new { id = "3", titulo = "Manutenção", descricao = "Preventiva e corretiva com monitoramento." }
        };

        return Ok(items);
    }
}
