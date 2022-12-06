import { Injectable } from '@angular/core';
import { prefix } from '@fortawesome/free-solid-svg-icons';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root',
})
export class UniqueServiceId {
  private numberOfGeneratedIds = 0;
  private regex = /^[A-Za-z]+[\w\-\:\.]*$/;

  constructor() {}

  // Gera o id e incrementa a propriedade que consta os id
  public generateUniqueIdWithPrefix(prefix: string): string {
    if (!this.regex.test(prefix) || !prefix) {
      throw Error('Prefix can not be empty');
    }
    const uniqueId = this.generateUniqueId();
    this.numberOfGeneratedIds++;
    return `${prefix}-${uniqueId}`;
  }

  public getNumberOfGeneratedIds(): number {
    return this.numberOfGeneratedIds;
  }

  // Gera um id unico apartir da lib
  private generateUniqueId(): string {
    return uuidv4();
  }
}
