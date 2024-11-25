using Application.Abstractions.Messaging.Command;
using Domain.Abstractions;
using Domain.Events;
using Domain.Events.Repository;

namespace Application.Features.Events.Command.AddEvent;

public sealed class AddEventHandler(IEventRepository eventRepository, IUnitOfWork unitOfWork) : ICommandHandler<AddEventCommand>
{

    public async Task<Result> Handle(AddEventCommand request, CancellationToken cancellationToken)
    {

        try
        {
            var newEvent = Event.Create(request.NameEvent, request.Location, request.Description, request.DateEvent, request.Price);

            if (newEvent.IsFailure)
            {
                return Result.Failure(newEvent.Error);
            }

            eventRepository.Add(newEvent.Value);

            await unitOfWork.SaveChangesAsync(cancellationToken);

        }
        catch (Exception e)
        {
            var error = new Error("Error adding event", e.Message);
            
            return Result.Failure(error);
        }

        return Result.Success();

    }
}