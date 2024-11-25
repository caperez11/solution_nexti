using Application.Abstractions.Messaging.Command;

namespace Application.Features.Events.Command.AddEvent;


public sealed record AddEventCommand(
    string NameEvent,
    string Description,
    string Location,
    DateTime DateEvent,
    decimal Price
) : ICommand;