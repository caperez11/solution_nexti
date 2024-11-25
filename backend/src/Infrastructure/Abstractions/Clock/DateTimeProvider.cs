using Application.Abstractions.Clock;

namespace Infrastructure.Abstractions.Clock;

public sealed class DateTimeProvider : IDateTimeProvider
{
    public DateTime UtcNow => DateTime.UtcNow;
}