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
  categories: string[] = Array.from(new Set(actionsData.content.map(card => card.category)));
  selectedCards: CardItem[] = [];
  selectedCategory: string | null = null;

  // Um grande dicionário para todas as entradas clicáveis (ações, definições, etc.)
  masterDictionary: Map<string, CardItem> = new Map();
 
  ngOnInit(): void {
    // Popula o dicionário mestre e agrupa os cards por categoria
    const allItems = actionsData.content;
    
    // Extrai todas as categorias únicas
    this.categories = Array.from(new Set(allItems.map(card => card.category)));
 
    this.categories.forEach(category => {
      this.groupedCards[category] = allItems.filter(card => card.category === category);
    });
 
    allItems.forEach(item => {
      this.masterDictionary.set(item.title.toUpperCase(), item);
    });
  }
  showCategory(category: string): void {
    // Se a categoria clicada já está selecionada, esconde (define como null).
    // Caso contrário, mostra a nova categoria.
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