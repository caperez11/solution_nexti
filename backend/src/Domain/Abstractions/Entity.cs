namespace Domain.Abstractions;

public abstract class Entity
{
    protected Entity(Guid id, DateTime createdAt, bool status)
    {
        Id = id;
        CreatedAt = createdAt;
        Status = status;
    }

    protected Entity()
    {
    }

    public Guid Id { get; init; }

    public DateTime CreatedAt { get; init; } = DateTime.UtcNow;

    public bool Status { get; init; } = true;


}