using Serilog;

var builder = WebApplication.CreateBuilder(args);

builder.Host.UseSerilog((ctx, cfg) =>
  cfg.ReadFrom.Configuration(ctx.Configuration)
     .Enrich.FromLogContext()
     .WriteTo.Console());

builder.Services.AddCors(o => o.AddPolicy("All", p => p
    .AllowAnyOrigin()
    .AllowAnyHeader()
    .AllowAnyMethod()));

var app = builder.Build();

app.UseSerilogRequestLogging();
app.UseCors("All");

// BFF endpoints (agregadores/compose entre serviços) ficarão aqui.
app.MapGet("/health", () => Results.Ok(new { status = "ok" }));

app.Run();
