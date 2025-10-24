import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'keywordTooltip',
  standalone: true
})
export class KeywordTooltipPipe implements PipeTransform {

  /**
   * Transforma uma string, substituindo palavras-chave [KEYWORD] por spans
   * que exibem uma definição em um tooltip (title attribute).
   * @param value A string de descrição a ser transformada.
   * @param definitions Um objeto/mapa com as definições.
   * @returns Uma string com HTML formatado.
   */
  transform(value: string, definitions: { [key: string]: string }): string {
    if (!value || !definitions) {
      return value;
    }

    // Regex para encontrar palavras dentro de colchetes, como [AGARRAR]
    const regex = /\[([^\]]+)\]/g;

    return value.replace(regex, (match, keyword) => {
      const definition = definitions[keyword.toUpperCase()];
      if (definition) {
        // Substitui por um <span> com a classe 'keyword' e o atributo 'title' para o tooltip.
        // O atributo 'title' é o que cria o efeito de hover nativo do navegador.
        return `<span class="keyword" title="${this.escapeHtml(definition)}">${keyword}</span>`;
      }
      // Se não encontrar definição, retorna a palavra sem os colchetes.
      return keyword;
    });
  }

  // Função auxiliar para escapar caracteres HTML e evitar quebra no atributo 'title'.
  private escapeHtml(text: string): string {
    const map: { [key: string]: string } = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, (m) => map[m]);
  }
}
