# Catalog API

ASP.NET Core 8 Web API do domínio de Catálogo. Inclui Versioning (v1), Swagger, CORS e Serilog (console).

## Pré-requisitos
- .NET SDK 8.x

## Como rodar (dev)
```powershell
# na raiz deste projeto
cd "d:\- Downloads\PROJETOS\PC\Landing page - willian\website-herrmanns-solutions\backend\src\Services\Catalog\Catalog.Api"
dotnet restore
dotnet watch run
```

- O console mostrará a URL local, ex.: `http://localhost:5xxx`.
- Swagger UI: `http://localhost:5xxx/swagger`

## Endpoints
- GET `/api/v1/services` → lista mock de serviços
- GET `/health` → health check simples

## Versionamento
- Rotas no padrão: `/api/v{version}/...` (ex.: `/api/v1/services`)
- Versão default: `1.0`

## CORS
- Liberado para o frontend Vite: `http://localhost:5173`
- Ajuste em `Program.cs` caso mude a origem do front.

## Logging
- Serilog configurado para logar no console (`UseSerilog` e `UseSerilogRequestLogging`).

## Dicas
- Para fixar uma porta, use `launchSettings.json` (perfil Kestrel) ou rode com `ASPNETCORE_URLS`:
  ```powershell
  $env:ASPNETCORE_URLS="http://localhost:5101"; dotnet run
  ```

## Próximos passos
- Substituir mocks por dados reais.
- Adicionar testes nos projetos `tests/`.
