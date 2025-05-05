# EduMais - Website Educacional Interativo ✨

Este repositório contém o código front-end para o EduMais, um conceito para um website educacional interativo focado em cursos de programação online. O projeto foi desenvolvido como um exercício para aplicar princípios de um **mini Design System**, visando padronização visual, acessibilidade inicial e reutilização de componentes, além de explorar interatividade com JavaScript.

## 🚀 Visão Geral

O objetivo foi criar uma página inicial (Homepage) atraente e funcional, demonstrando os elementos visuais definidos no Design System e adicionando interações modernas para melhorar a experiência do usuário.

*(Recomendado: Adicione aqui um GIF ou screenshot principal da página em ação!)*
![Screenshot da Homepage EduMais](link_para_sua_imagem_ou_gif.png)

## 🎨 Design System Aplicado

A interface foi construída seguindo as diretrizes de um mini Design System, definindo:

*   **Tipografia:**
    *   Fonte Principal/UI: `Inter` (Regular, Medium, SemiBold, Bold)
    *   Fonte para Código: `Fira Code` (com ligatures)
    *   Hierarquia de tamanhos e pesos bem definida.
*   **Paleta de Cores:**
    *   Primária: Azul Profissional (`#0052CC`)
    *   Secundária: Verde/Teal Vibrante (`#00A884`)
    *   Neutras: Escala de cinzas para fundos e textos.
    *   Feedback: Cores semânticas para sucesso, aviso, erro e informação.
    *   CSS Custom Properties (Variáveis) para fácil manutenção e theming (Dark Mode).
*   **Ícones:**
    *   Biblioteca: [Feather Icons](https://feathericons.com/)
    *   Estilo: Outline, leve e moderno.
    *   Tamanhos padronizados (16px, 20px, 24px).

## ✨ Funcionalidades Implementadas

*   **Homepage Estruturada:** Seções de Cabeçalho, Hero, Cursos em Destaque, "Por que EduMais?", CTA Final e Rodapé.
*   **Layout Responsivo:** Adapta-se a diferentes tamanhos de tela (desktop, tablet, mobile) usando Flexbox e Grid Layout.
*   **Cabeçalho Fixo (Sticky Header):** Com transição suave e efeito de *backdrop-filter*.
*   **Animações de Scroll (ScrollReveal.js):** Elementos surgem suavemente na tela conforme o usuário rola a página.
*   **Fundo Interativo na Hero Section (Particles.js):** Efeito dinâmico de partículas.
*   **Modo Escuro (Dark Mode):** Botão para alternar entre tema claro e escuro, com persistência via `localStorage`.
*   **Menu Mobile Funcional:** Navegação acessível em telas menores.
*   **Botão "Favoritar" (Visual):** Interação simples nos cards de curso.
*   **Estilização Consistente:** Aplicação das cores, fontes e ícones do Design System.
*   **Código Semântico HTML5.**

*(Recomendado: Adicione mais screenshots/GIFs mostrando o Dark Mode, Menu Mobile, Animações)*

## 🛠️ Tecnologias Utilizadas

*   **HTML5:** Estrutura semântica do conteúdo.
*   **CSS3:** Estilização, Layout (Flexbox, Grid), Custom Properties (Variáveis), Transições e Animações básicas.
*   **JavaScript (ES6+):** Manipulação do DOM, Interatividade, Event Listeners.
*   **Bibliotecas JavaScript:**
    *   [Feather Icons](https://feathericons.com/): Para os ícones SVG.
    *   [Particles.js](https://vincentgarreau.com/particles.js/): Para o efeito de fundo na Hero Section.
    *   [ScrollReveal.js](https://scrollrevealjs.org/): Para as animações de scroll.

## ⚙️ Como Executar Localmente

1.  **Clone o repositório:**
    ```bash
    git clone https://github.com/[SEU_USUARIO]/[SEU_REPOSITORIO].git
    ```
    *(Substitua `[SEU_USUARIO]/[SEU_REPOSITORIO]` pelo seu usuário e nome do repositório)*

2.  **Navegue até a pasta do projeto:**
    ```bash
    cd [SEU_REPOSITORIO]
    ```

3.  **Abra o arquivo `index.html`:**
    Abra o arquivo `index.html` diretamente no seu navegador web preferido (Chrome, Firefox, Edge, etc.). Não é necessário um servidor local para esta versão do projeto.

## 💡 Possíveis Melhorias Futuras

*   Implementar as páginas internas (Página do Curso, Login, Cadastro).
*   Adicionar validação de formulários.
*   Integrar com um backend (para dados de cursos, usuários, etc.).
*   Realizar uma auditoria completa de acessibilidade (WCAG).
*   Otimizar o carregamento de imagens e assets.
*   Refatorar CSS (ex: usar metodologia BEM, Sass/SCSS).
*   Escrever testes unitários/integração.

## 📄 Licença

Este projeto é distribuído sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes. *(Se você não adicionou um arquivo LICENSE, considere adicionar um ou remova esta linha)*.

---

Criado por: `Matheus`