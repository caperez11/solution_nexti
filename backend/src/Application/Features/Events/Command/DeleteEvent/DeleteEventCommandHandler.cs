using Application.Abstractions.Messaging.Command;
using Domain.Abstractions;
using Domain.Events.Repository;

namespace Application.Features.Events.Command.DeleteEvent;

public class DeleteEventCommandHandler(IEventRepository eventRepository) : ICommandHandler<DeleteEventCommand>
{

    public async Task<Result> Handle(DeleteEventCommand request, CancellationToken cancellationToken)
    {
        try
        {
            var result = await eventRepository.DeleteEventAsync(request.Id);

            var strCode = result.ErrorCode.ToString().PadLeft(4, '0');

            if (!strCode.Equals("0000"))
            {
                return Result.Failure(new Error(strCode, result.ErrorMessage));
            }
        }
        catch (Exception e)
        {
            return Result.Failure(new Error("500", e.Message));
        }

        return Result.Success();
    }
}