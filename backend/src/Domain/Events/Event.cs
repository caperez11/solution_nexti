using Domain.Abstractions;

namespace Domain.Events;

public sealed class Event : Entity
{
    public Event(Guid id, DateTime createdAt, bool status, string nameEvent, string location, string description, DateTime dateEvent, decimal price) : base(id, createdAt, status)
    {
        NameEvent = nameEvent;
        Location = location;
        Description = description;
        DateEvent = dateEvent;
        Price = price;
    }
    public Event()
    {

    }

    public string NameEvent { get; init; } = null!;

    public string Location { get; init; } = null!;

    public string Description { get; init; } = null!;

    public DateTime DateEvent { get; init; }

    public decimal Price { get; init; }


    public static Result<Event> Create(string nameEvent, string location, string description, DateTime dateEvent, decimal price)
    {
        return Result.Success(new Event(Guid.NewGuid(), DateTime.UtcNow, true, nameEvent, location, description, dateEvent, price));
    }

}