using System.Data;
using Application.Abstractions.Data;
using Npgsql;

namespace Infrastructure.DataBase.Data;

public sealed class SqlConnectionFactory(string connectionString) : ISqlConnectionFactory
{

    public IDbConnection CreateConnection()
    {
        var connection = new NpgsqlConnection(connectionString);
        connection.Open();

        return connection;
    }
}