# CTF Login - Site de teste para brute force

Site simples (HTML + função serverless) pra subir na Vercel e testar ataques
de força bruta contra o próprio login.

## Estrutura

- `index.html` - formulário de login
- `api/login.js` - endpoint que valida usuário/senha (sem rate limit, sem captcha, sem delay)
- `package.json` - metadados do projeto

## Credenciais alvo

Definidas em `api/login.js`:

```
usuário: admin
senha:   flag{ctf_senha_fraca_123}
```

Troque como quiser antes de subir, pra calibrar a dificuldade do desafio.

## Deploy na Vercel

1. Crie um repositório no GitHub e suba esta pasta (ou use a CLI da Vercel direto):
   ```
   npm i -g vercel
   cd ctf-login
   vercel
   ```
2. A Vercel detecta o `index.html` como estático e `api/login.js` como uma
   Serverless Function automaticamente — não precisa de `vercel.json`.
3. Depois do deploy, o endpoint fica em:
   ```
   https://SEU-PROJETO.vercel.app/api/login
   ```
   Método `POST`, corpo JSON: `{ "username": "...", "password": "..." }`.

## Testando o brute force

O endpoint responde:
- `200` + `{"success": true}` quando acerta
- `401` + `{"success": false}` quando erra
- `400` se faltar usuário ou senha

Isso facilita escrever um script (Python com `requests`, por exemplo) que testa
uma wordlist de senhas contra o endpoint e para quando receber `success: true`.

## Avisos importantes

- Isso é **propositalmente vulnerável** (sem rate limit, sem bloqueio de IP,
  sem captcha). Não reaproveite esse código de login em nada real.
- A Vercel tem limites de uso no plano gratuito (número de invocações de
  função por dia/mês). Um bruteforce muito agressivo pode esbarrar nesses
  limites ou até acionar proteção de abuso da própria Vercel — se isso
  acontecer, é esperado, não é bug.
- Teste só contra esse ambiente seu, nunca contra sistemas de terceiros sem
  autorização.
