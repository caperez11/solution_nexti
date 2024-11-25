namespace Application.Features.Events.Query.GetEvents;

public class EventDto
{
    public Guid Id { get; set; }

    public string NameEvent { get; set; } = null!;

    public string Description { get; set; } = null!;

    public string Location { get; set; } = null!;
    
    public string Price { get; set; } = null!;

    public DateTime DateEvent { get; set; }

    public DateTime CreateAt { get; set; }

}

public sealed class EventResponse
{
    public IReadOnlyList<EventDto> Events { get; set; } = null!;
    public bool HasPrevious { get; set; }
    public bool HasNext { get; set; }
    public int TotalRecords { get; set; }
    public int TotalPages { get; set; }
    
}