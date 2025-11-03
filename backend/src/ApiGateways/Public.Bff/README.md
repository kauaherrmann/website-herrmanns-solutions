# Public BFF (API Gateway)

Backend-for-Frontend público para expor endpoints agregados/otimizados para o website. Baseado em ASP.NET Core 8 minimal API + Serilog.

## Pré-requisitos
- .NET SDK 8.x

## Como rodar (dev)
```powershell
cd "d:\- Downloads\PROJETOS\PC\Landing page - willian\website-herrmanns-solutions\backend\src\ApiGateways\Public.Bff"
dotnet restore
dotnet watch run
```

- Health check: `GET /health`
- Use este serviço para compor dados de múltiplas APIs (ex.: Catalog + Identity) e reduzir overfetch no frontend.

## CORS
- Política atual: permissiva (qualquer origem) para facilitar o dev. Ajuste antes de produção.

## Próximos passos
- Criar endpoints agregados (ex.: `/api/home`) que chamam as APIs internas.
- Adicionar cache, rate limit e autenticação conforme necessário.
