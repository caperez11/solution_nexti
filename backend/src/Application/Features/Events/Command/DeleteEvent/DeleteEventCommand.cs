using Application.Abstractions.Messaging.Command;

namespace Application.Features.Events.Command.DeleteEvent;

public record DeleteEventCommand(Guid Id) : ICommand;