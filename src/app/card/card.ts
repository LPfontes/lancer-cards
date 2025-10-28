import { Component, OnInit } from '@angular/core';
import actionsData from './date.json'; // Ajuste o caminho conforme necessário
import { KeywordLinkPipe } from "./keyword-link.pipe";


// Defina uma interface para a estrutura de um card, baseada no seu JSON
export interface CardItem {
  title: string;
  category: string;
  description: string;
  tags?: { name: string }[];
  isExpanded?: boolean; // Propriedade para controlar o estado
}

@Component({
  selector: 'card-component',
  imports: [KeywordLinkPipe],
  templateUrl: './card.html',
  styleUrl: './card.css'
})
export class CardComponent implements OnInit {
  groupedCards: { [category: string]: CardItem[] } = {};
  Pcategories: string[] = []; // Categorias-pai (para o NAV)
  categories: string[] = []; // Subcategorias (para o CONTEÚDO)
  selectedCards: CardItem[] = [];
  selectedCategory: string | null = null;
  masterDictionary: Map<string, CardItem> = new Map();

  // NOVO: Mapeia a categoria-pai para suas subcategorias filhas
  parentChildMap: Map<string, string[]> = new Map();
 
  ngOnInit(): void {
    const categoryData = actionsData.category;
    this.Pcategories = Object.keys(categoryData);
    
    for (const categoryName of Object.keys(categoryData)) {
      const categoryValue = categoryData[categoryName as keyof typeof categoryData];

      // CASO 1: Categoria Aninhada (ex: "Ações", "Ficha")
      if (Array.isArray(categoryValue) && categoryValue.length > 0 && typeof categoryValue[0] === 'object' && !categoryValue[0].hasOwnProperty('title')) {
        const subcategories = categoryValue[0];
        // Pega os nomes das subcategorias (ex: ["Ações Rápidas", "Ações Completas"])
        const subcategoryNames = Object.keys(subcategories);

        // ATUALIZAÇÃO: Popula o mapa de relação
        this.parentChildMap.set(categoryName, subcategoryNames);

        for (const subcategoryName of subcategoryNames) {
          const items: CardItem[] = subcategories[subcategoryName as keyof typeof subcategories];
          this.groupedCards[subcategoryName] = items;
          this.categories.push(subcategoryName);
          for (const item of items) {
            this.masterDictionary.set(item.title.toUpperCase(), item);
          }
        }
      } 
      // CASO 2: Lista Plana (ex: "Condições", "Estados")
      else if (Array.isArray(categoryValue) && (categoryValue.length === 0 || categoryValue[0].hasOwnProperty('title'))) {
        const items: CardItem[] = categoryValue as CardItem[];
        
        // ATUALIZAÇÃO: Popula o mapa (aqui, o pai é seu próprio filho)
        this.parentChildMap.set(categoryName, [categoryName]);

        this.groupedCards[categoryName] = items;
        this.categories.push(categoryName);
        for (const item of items) {
          this.masterDictionary.set(item.title.toUpperCase(), item);
        }
      }
    }
  }

  // NOVO: Método para verificar se um bloco de conteúdo deve estar visível
  isCategoryVisible(childCategoryName: string): boolean {
    // Se nenhuma categoria-pai estiver selecionada, esconde tudo
    if (!this.selectedCategory) {
      return false;
    }
    
    // Pega a lista de filhos da categoria-pai selecionada
    const children = this.parentChildMap.get(this.selectedCategory);
    
    // Verifica se o bloco de conteúdo atual (childCategoryName) 
    // está na lista de filhos que devem ser exibidos
    return children ? children.includes(childCategoryName) : false;
  }

  showCategory(category: string): void {
    if (this.selectedCategory === category) {
      this.selectedCategory = null;
    } else {
      this.selectedCategory = category;
    }
  }
  openModal(card: CardItem): void {
    // Evita abrir o mesmo modal em cima dele mesmo
    if (this.selectedCards.length > 0 && this.selectedCards[this.selectedCards.length - 1] === card) {
      return;
    }
    this.selectedCards.push(card);
  }

  closeModal(): void {
    this.selectedCards.pop();
  }

  // Permite fechar o modal clicando no fundo
  onOverlayClick(event: MouseEvent): void {
    // Garante que apenas o último overlay (o do topo) possa fechar o modal
    if ((event.target as HTMLElement).classList.contains('modal-overlay')) {
      this.closeModal();
    }
  }

  // Abre o modal a partir do nome de uma ação (usado pelo pipe)
  openModalByKeyword(keyword: string): void {
    const card = this.masterDictionary.get(keyword.toUpperCase());
    if (card) {
      this.openModal(card);
    }
  }

  // Manipula cliques dentro da descrição do card para abrir modais de palavras-chave
  handleKeywordClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    if (target.classList.contains('keyword-link')) {
      const keyword = target.getAttribute('data-keyword');
      if (keyword) this.openModalByKeyword(keyword);
    }
  }

  // Cria um ID seguro para usar em URLs e atributos HTML
  getSafeId(category: string): string {
    return category.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase();
  }
}