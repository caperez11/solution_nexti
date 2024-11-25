using Application.Abstractions.Messaging.Query;

namespace Application.Features.Events.Query.GetEvents;

public sealed record GetEventsQuery(int PageNumber, int PageSize) : IQuery<EventResponse>;