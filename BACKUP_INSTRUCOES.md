# 🔒 Como fazer backup do Supabase (Free Plan) — 2 minutos

## Método mais simples — pelo SQL Editor

1. Acesse: https://supabase.com/dashboard/project/vuomkohlwomdeyobddhw/sql/new
2. Cole e execute cada query abaixo
3. Clique em **Download CSV** no resultado de cada uma
4. Salve os arquivos em uma pasta segura

---

## Queries de backup (rode uma por vez)

### 1. Perfis dos participantes
```sql
SELECT * FROM public.profiles;
```

### 2. Inscrições e cotas
```sql
SELECT * FROM public.inscricoes;
```

### 3. Palpites dos grupos
```sql
SELECT * FROM public.palpites_grupos;
```

### 4. Artilheiro + Palpitão
```sql
SELECT * FROM public.palpites_artilheiro;
```

### 5. Configurações
```sql
SELECT * FROM public.config;
```

### 6. Jogos cadastrados
```sql
SELECT * FROM public.jogos;
```

---

## Quando fazer?
- Uma vez por semana durante a Copa
- Sempre antes de fazer qualquer alteração no banco
- Leva menos de 2 minutos

## Dica extra — evitar pausa do projeto
O Supabase pausa projetos free após 7 dias sem acesso.
Para evitar: acesse bolaocopa.com pelo menos uma vez por semana
(qualquer visita já conta como atividade).

