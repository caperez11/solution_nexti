using Application.Abstractions.Messaging.Query;
using Domain.Abstractions;
using Domain.Events.Repository;

namespace Application.Features.Events.Query.GetEvents;

public sealed class GetEventsQueryHandler(IEventRepository eventRepository): IQueryHandler<GetEventsQuery,EventResponse>
{

    public async Task<Result<EventResponse>> Handle(GetEventsQuery request, CancellationToken cancellationToken)
    {
        var eventResponse = new EventResponse();
        
        try
        {
            var result = await eventRepository.GetEvents(request.PageNumber, request.PageSize, cancellationToken);
            
            var lstResult = result.Events.Select(x => new EventResponse2
            {
                Id = x.Id,
                NameEvent = x.NameEvent,
                Description = x.Description,
                Location = x.Location,
                DateEvent = x.DateEvent,
                CreateAt = x.CreatedAt
                
            }).ToList();
            
            eventResponse.Events = lstResult;
            eventResponse.HasPrevious = result.HasPrevious;
            eventResponse.HasNext = result.HasNext;
            

        }
        catch (Exception e)
        {
            var error = new Error("GetEventsQueryHandler", e.Message);
            
            return Result.Failure<EventResponse>(error);
        }
        
        return Result.Success(eventResponse);
    }
}