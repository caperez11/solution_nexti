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

    public string NameEvent { get; set; }

    public string Location { get; set; }

    public string Description { get; set; }

    public DateTime DateEvent { get; set; }

    public decimal Price { get; set; }

}