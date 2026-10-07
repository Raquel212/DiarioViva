# DiarioViva  

📘 **DiarioViva** é um site desenvolvido para aproximar pacientes e profissionais de saúde, funcionando como um diário digital compartilhado. Ele combina **tarefas diárias, anotações pessoais e recados do profissional**, criando um cuidado mais próximo e personalizado.  

---

## 🌟 Ideia Principal  
O **DiarioViva** é como um caderno inteligente e colaborativo:  
- O paciente registra suas atividades, reflexões e progresso.  
- O profissional acompanha de perto, define metas e deixa orientações.  

✨ Objetivo: **Motivar o paciente** e oferecer ao profissional um cuidado mais humano, contínuo e organizado.  

---

## 👥 Quem Usa?  
- **Paciente**: pessoas em tratamento ou buscando hábitos mais saudáveis.  
- **Profissional**: especialistas como médicos, enfermeiros ou fisioterapeuta.  

---

## 📝 Funcionalidades  

### Para o Paciente  
- ✅ Visualizar metas diárias definidas pelo profissional.  
- ✅ Marcar tarefas concluídas.  
- ✅ Escrever livremente em um diário digital.  
- ✅ Receber recados e feedback do profissional.  

### Para o Profissional  
- 👩‍⚕️ Acessar a lista de pacientes.  
- 👩‍⚕️ Criar e gerenciar metas diárias para cada paciente.  
- 👩‍⚕️ Ler o diário do paciente.  
- 👩‍⚕️ Deixar recados de apoio ou orientação.  

---

## 📖 Exemplo Prático  
- **Dr. Carlos (profissional)** cria metas para Maria (paciente).  
- **Maria (paciente)** marca as tarefas como concluídas e escreve no diário.  
- **Dr. Carlos** acompanha o progresso e envia feedback motivacional.  

---

## 🛠️ Tecnologias Utilizadas  
- **Front-End**: React.js, Vite
- **Linguagem**: JavaScript
- **IA**: API compatível com OpenAI (OpenAI, OpenRouter etc.)
- **Hospedagem**: Vercel
- **Controle de Versão**: GitHub  
- **Outras Ferramentas**: Visual Studio Code  

---

## ✨ Assistente de IA

O projeto já inclui um **assistente de IA** (botão ✨ flutuante em todas as páginas internas)
e ações de IA em pontos específicos:

- **Paciente**
  - Assistente flutuante: dúvidas sobre metas, motivação e bem-estar.
  - **Diário Pessoal**: botão "Sugestão com IA" que ajuda a escrever a reflexão do dia.
- **Profissional**
  - Assistente flutuante: rascunho de recados, sugestão de metas e resumos.
  - **Gerar recado com IA** na página de Recados.
  - **Resumo do diário com IA** na página do perfil do paciente.

### Como configurar a chave de API

1. Copie o arquivo `.env.example` para `.env` e preencha suas variáveis:

   ```bash
   VITE_AI_API_KEY=sk-...
   VITE_AI_BASE_URL=https://api.openai.com/v1
   VITE_AI_MODEL=gpt-4o-mini
   ```

2. Reinicie o servidor (`npm run dev`).

> **Alternativa (sem editar arquivos):** clique no ícone de engrenagem do assistente
> (canto inferior direito) e cole sua chave + URL + modelo. Isso é salvo no
> `localStorage` do navegador.

> O projeto é compatível com **OpenRouter** — basta usar
> `VITE_AI_BASE_URL=https://openrouter.ai/api/v1` e, por exemplo,
> `VITE_AI_MODEL=openai/gpt-4o-mini`. Não fica nenhuma chave exposta no código.

---

## 🔑 Acesso de Teste  

- **Login Paciente**  
  - 📧 Email: `paciente@email.com`  
  - 🔑 Senha: `123456`  

- **Login Profissional**  
  - 📧 Email: `profissional@email.com`  
  - 🔑 Senha: `123456`  

---

## 🚀 Como Rodar o Projeto  

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/diarioviva.git
cd diarioviva

# Instale as dependências
npm install

# Rode o servidor local
npm run dev
