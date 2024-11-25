using Application.Abstractions.Exceptions;
using Domain.Abstractions;
using Domain.Events;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.DataBase;

public sealed class ApplicationDbContext(DbContextOptions options) : DbContext(options), IUnitOfWork
{

    public DbSet<Event> Events { get; init; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.ApplyConfigurationsFromAssembly(typeof(ApplicationDbContext).Assembly);

        base.OnModelCreating(modelBuilder);
    }

    public async override Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
    {
        try
        {
            var result = await base.SaveChangesAsync(cancellationToken);

            return result;
        }
        catch (DbUpdateException ex)
        {
            throw new DataException("Data Base exception occurred.", ex);
        }
    }
    
}