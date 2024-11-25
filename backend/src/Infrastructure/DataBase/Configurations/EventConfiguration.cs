using Domain.Events;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.DataBase.Configurations;

public sealed class EventConfiguration : IEntityTypeConfiguration<Event>
{
    public void Configure(EntityTypeBuilder<Event> builder)
    {
        builder.ToTable("events");

        builder.HasKey(e => e.Id);
        
        builder.Property(e => e.Id).HasColumnName("id").IsRequired().ValueGeneratedOnAdd();
        
        builder.Property(e => e.NameEvent).HasColumnName("name").IsRequired().HasMaxLength(100);

        builder.Property(e => e.Description).HasColumnName("description").IsRequired().HasMaxLength(255);

        builder.Property(e => e.Location).HasColumnName("location").IsRequired().HasMaxLength(100);

        builder.Property(e => e.Price).HasColumnName("price").IsRequired().HasPrecision(18, 2).HasDefaultValue(0.00);
        
        builder.Property(e => e.DateEvent).HasColumnName("date").IsRequired();

        builder.Property(e => e.CreatedAt).HasColumnName("created_at").IsRequired().HasDefaultValue(DateTime.UtcNow);

        builder.Property(e => e.Status).HasColumnName("status").IsRequired().HasDefaultValue(true);
        
        builder.HasIndex(e => e.NameEvent).IsUnique();
    }
}