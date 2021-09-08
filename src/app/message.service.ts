import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MessageService {

  messages: string[] = [];

  // adiciona uma nova mensagem
  add(message: string) {
    this.messages.push(message);
  }

  // limpa a lista de mensagens
  clear() {
    this.messages = [];
  }
}
