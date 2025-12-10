Com base nos ficheiros que partilhaste, aqui tens uma proposta completa de `README.md` formatada e pronta a usar.

Este documento destaca as funcionalidades (Compêndio e Ficha), a tecnologia utilizada (Angular 20) e inclui os créditos e avisos legais necessários (Massif Press/Tria Editora) encontrados no teu `index.html`.

-----

# Lancer Cards

**Lancer Cards** é uma aplicação web desenvolvida em **Angular** criada para servir como um companheiro digital para jogadores do RPG de mesa **Lancer**. A aplicação combina um compêndio de regras de consulta rápida com uma ficha de personagem digital (Piloto e Mecha).

## Funcionalidades

### 1\. Compêndio Digital (`/card`)

Uma interface de referência rápida para as regras do sistema, organizada em categorias.

  * **Visualização em Cartões:** Regras apresentadas num estilo "brutalista" e legível.
  * **Categorias Principais:**
      * **Ações:** Completas, Rápidas, Livres, Reações e Variáveis.
      * **Estados e Condições:** Explicação rápida de *status* como "Bloqueado", "Exposto", etc.
      * **Definições de Armas:** Tipos, Tamanhos, Áreas (Cone, Linha, Explosão) e Tags.
  * **Sistema de Modais:** Clique nos cartões para ver detalhes expandidos.
  * **Palavras-Chave Interativas:** O sistema reconhece termos específicos entre colchetes (ex: `[Calor]`) e cria links automáticos para as suas definições.

### 2\. Ficha de Personagem (Em desenvolvimento) (`/sheet`)

Uma ficha digital interativa dividida em duas vistas principais, com um **Resumo de Turno** sempre visível no topo para facilitar a gestão de ações em combate.

  * **Ficha de Mecha:**
      * Upload e pré-visualização da imagem do Mecha.
      * Campos para estatísticas base (Casco, Agilidade, Sistemas, Engenharia).
      * Cálculo e registo de estatísticas derivadas (PV, Calor, Estrutura, Estresse, etc.).
      * Gestão de **Armas** (com suporte para Encaixes, Alcance, Dano e Efeitos).
      * Gestão de **Sistemas** e cálculo automático de PS (Pontos de Sistema).
      * Visualização gráfica de "Bônus de Núcleo" e status (input hexagonal personalizado).
  * **Ficha de Piloto:**
      * (Em desenvolvimento) Estrutura preparada para atributos de piloto, talentos e equipamentos.

## Tecnologias Utilizadas

  * **Framework:** [Angular v20](https://angular.dev/)
  * **Linguagem:** TypeScript
  * **Estilos:** CSS3 com Variáveis (Custom Properties) para gestão de temas (Dark Mode nativo).
  * **Design:** Fonte *Quantico* para a estética Sci-Fi/HUD.
  * **Build Tool:** Angular CLI

## Como Executar o Projeto

Certifica-te de que tens o **Node.js** e o **npm** instalados.

1.  **Clonar o repositório:**

    ```bash
    git clone https://github.com/lpfontes/lancer-cards.git
    cd lancer-cards
    ```

2.  **Instalar dependências:**

    ```bash
    npm install
    ```

3.  **Iniciar o servidor de desenvolvimento:**

    ```bash
    npm start
    # ou
    ng serve
    ```

4.  **Aceder à aplicação:**
    Abre o browser e vai a `http://localhost:4200/`. A aplicação recarrega automaticamente se alterares algum ficheiro de código.

## Estrutura do Projeto

  * `src/app/card`: Lógica e template do Compêndio (leitura do `date.json`).
  * `src/app/sheet`: Componente pai da ficha, contém o resumo de turno e a navegação Mecha/Piloto.
  * `src/app/sheet-mecha`: Componente específico para os dados do robot.
  * `src/app/sheet-pilot`: Componente específico para os dados do piloto.
  * `public/icons`: Ícones SVG e imagens utilizados na interface (ícones de ações, status, etc.).

## Licença e Créditos

**Autor:** [lpfontes](https://github.com/lpfontes)

Este projeto é uma ferramenta de fã não oficial.

> **Lancer RPG** é um produto da **Massif Press**.
> Publicado no Brasil pela **Tria Editora**.
>
> [Apoie o lançamento oficial\!](https://triaeditora.com.br/produto-categoria/lancer)

O conteúdo das regras utilizado na aplicação segue a *Lancer Third Party License*.
