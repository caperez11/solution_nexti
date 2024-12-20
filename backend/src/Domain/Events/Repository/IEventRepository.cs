namespace Domain.Events.Repository;

public interface IEventRepository
{
    Task<(IReadOnlyList<Event> Events, bool HasPrevious, bool HasNext, int TotalRecords, int TotalPages)> GetEvents(int pageNumber, int pageSize, CancellationToken cancellationToken = default);

    void Add(Event @event);

    Task<(int ErrorCode, string ErrorMessage)> DeleteEventAsync(Guid id);
}