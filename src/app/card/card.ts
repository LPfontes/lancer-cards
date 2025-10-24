import { Component, OnInit } from '@angular/core';
import actionsData from './actions.json'; // Ajuste o caminho conforme necessário
import { KeywordTooltipPipe } from './keyword.pipe';

// Defina uma interface para a estrutura de um card, baseada no seu JSON
export interface CardItem {
  imageUrl: string;
  imageAlt: string;
  title: string;
  category: string;
  description: string;
  tags: { name: string }[];
  isExpanded?: boolean; // Propriedade para controlar o estado
}

@Component({
  selector: 'card-component',
  imports: [KeywordTooltipPipe],
  templateUrl: './card.html',
  styleUrl: './card.css'
})
export class CardComponent implements OnInit {
  groupedCards: { [category: string]: CardItem[] } = {};
  categories: string[] = Array.from(new Set(actionsData.rules.map(card => card.category)));
  definitions: { [key: string]: string } = actionsData.definitions;
  selectedCard: CardItem | null = null;
  allRules: CardItem[] = actionsData.rules;
  actionTitleMap: Map<string, CardItem> = new Map();

  ngOnInit(): void {
    // Agrupa os cards por categoria
    this.categories.forEach(category => {
      this.groupedCards[category] = actionsData.rules
        .filter(card => card.category === category);
    });

    // Cria um mapa de títulos de ação para acesso rápido
    this.allRules.forEach(rule => {
      this.actionTitleMap.set(rule.title.toUpperCase(), rule);
    });
  }

  openModal(card: CardItem): void {
    this.selectedCard = card;
  }

  closeModal(): void {
    this.selectedCard = null;
  }

  // Permite fechar o modal clicando no fundo
  onOverlayClick(event: MouseEvent): void {
    if ((event.target as HTMLElement).classList.contains('modal-overlay')) {
      this.closeModal();
    }
  }

  // Abre o modal a partir do nome de uma ação (usado pelo pipe)
  openModalByKeyword(keyword: string): void {
    const card = this.actionTitleMap.get(keyword.toUpperCase());
    if (card) {
      this.openModal(card);
    }
  }
}