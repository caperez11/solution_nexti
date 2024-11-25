using Domain.Abstractions;

namespace Infrastructure.DataBase.Repositories;

public abstract class Repository<T>(ApplicationDbContext dbContext) where T : Entity
{

    public virtual void Add(T entity)
    {
        dbContext.Add(entity);
    }

}