using Application.Features.Events.Command.AddEvent;
using Application.Features.Events.Command.DeleteEvent;
using Application.Features.Events.Query.GetEvents;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace WebApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class EventController(ISender sender) : ControllerBase
{


    [HttpGet]
    public async Task<IActionResult> GetEvents([FromQuery] int pageNumber, [FromQuery] int pageSize)
    {
        var result = await sender.Send(new GetEventsQuery(pageNumber, pageSize));

        if (result.IsFailure)
        {
            return BadRequest(result.Error);
        }

        return Ok(result.Value);
    }


    [HttpPost]
    public async Task<IActionResult> AddEvent([FromBody] AddEventCommand addEventCommand)
    {
        var result = await sender.Send(addEventCommand);

        if (result.IsFailure)
        {
            return BadRequest(result.Error);
        }

        return Created();
    }

    [HttpDelete("{id:guid}")]
    public async Task<IActionResult> DeleteEvent([FromRoute] Guid id)
    {
        var result = await sender.Send(new DeleteEventCommand(id));

        if (result.IsFailure)
        {
            return BadRequest(result.Error);
        }

        return Ok();
    }


}