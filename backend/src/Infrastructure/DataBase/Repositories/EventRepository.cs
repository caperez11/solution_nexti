using System.Data;
using Application.Abstractions.Data;
using Dapper;
using Domain.Events;
using Domain.Events.Repository;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.DataBase.Repositories;

public sealed class EventRepository(ApplicationDbContext dbContext) : Repository<Event>(dbContext), IEventRepository
{
    private readonly ApplicationDbContext _dbContext = dbContext;

    private readonly ISqlConnectionFactory _sqlConnectionFactory = null!;

    public EventRepository(ApplicationDbContext dbContext, ISqlConnectionFactory sqlConnectionFactory) : this(dbContext)
    {
        _sqlConnectionFactory = sqlConnectionFactory ?? throw new ArgumentNullException(nameof(sqlConnectionFactory));
    }

    public async Task<(IReadOnlyList<Event> Events, bool HasPrevious, bool HasNext)> GetEvents(int pageNumber, int pageSize, CancellationToken cancellationToken = default)
    {
        // Filtrar los eventos por Status = true
        var query = _dbContext.Set<Event>().Where(e => e.Status);

        // Total de eventos que cumplen la condición
        var totalEvents = await query.CountAsync(cancellationToken);

        // Calcular hasPrevious y hasNext
        var hasPrevious = pageNumber > 1;
        var hasNext = pageNumber * pageSize < totalEvents;

        // Calcular el número de elementos a omitir
        var skip = (pageNumber - 1) * pageSize;

        // Obtener los eventos paginados usando Skip y Take
        var events = await query
            .OrderBy(e => e.Id)
            .Skip(skip)
            .Take(pageSize)
            .ToListAsync(cancellationToken);

        return (events, hasPrevious, hasNext);
    }

    public async Task<(int ErrorCode, string ErrorMessage)> DeleteEventAsync(Guid id)
    {
        using var connection = _sqlConnectionFactory.CreateConnection();

        var parameters = new DynamicParameters();
        parameters.Add("@str_id", id, DbType.Guid);
        parameters.Add("@int_o_cod_error", dbType: DbType.Int32, direction: ParameterDirection.Output);
        parameters.Add("@str_o_error", dbType: DbType.String, size: 255, direction: ParameterDirection.Output);

        await connection.ExecuteAsync("sp_delete_event", parameters, commandType: CommandType.StoredProcedure);

        var errorCode = parameters.Get<int>("@int_o_cod_error");
        var errorMessage = parameters.Get<string>("@str_o_error");

        return (errorCode, errorMessage);

    }
}