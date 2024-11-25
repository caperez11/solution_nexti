using Application;
using Infrastructure;
using WebApi.Extensions;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddRouting(r => r.LowercaseUrls = true);
builder.Services.AddControllers();
builder.Services.AddApplication();
builder.Services.AddInfrastructure(builder.Configuration);

builder.Services.AddEndpointsApiExplorer();

var app = builder.Build();


if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
    // app.ApplyMigrations();
}

app.UseCustomCors();
app.UseAuthorization();

app.UseCustomExceptionHandler();


app.MapControllers();

await app.RunAsync();