# Identity API

ASP.NET Core 8 Web API do domínio de Identidade/Autenticação (esqueleto). Inclui Swagger e estrutura para evoluir com versionamento, CORS e logging.

## Pré-requisitos
- .NET SDK 8.x

## Como rodar (dev)
```powershell
cd "d:\- Downloads\PROJETOS\PC\Landing page - willian\website-herrmanns-solutions\backend\src\Services\Identity\Identity.Api"
dotnet restore
dotnet watch run
```

- O console mostrará a URL local, ex.: `http://localhost:5xxx`.
- Swagger UI: `http://localhost:5xxx/swagger`

## Endpoints atuais
- Endpoints gerados pelo template (WeatherForecast) — podem ser removidos quando começar a implementar a API de verdade.

## Próximos passos
- Definir modelo de autenticação/autorização (JWT, IdentityServer, etc.).
- Adicionar versionamento (Asp.Versioning) e CORS conforme o Catalog.Api.
- Integrar com o BFF (Public.Bff) quando houver endpoints públicos agregados.
