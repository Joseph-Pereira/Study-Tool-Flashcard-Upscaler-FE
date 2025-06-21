import { Component, Input, EventEmitter, Output } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FlashcardDto } from '../../models/flashcard';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-flashcard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './flashcard.component.html',
  styleUrl: './flashcard.component.css'
})
export class FlashcardComponent {

  @Input() public flashCard!: FlashcardDto;
  @Output() edit = new EventEmitter<FlashcardDto>();
  @Output() delete = new EventEmitter<number>();

  isFlipped = false;
  selectedOption: string | null = null;

  submitAnswer() {
    this.isFlipped = true;
  }

  onEdit() {
    this.edit.emit(this.flashCard);
  }

  onDelete() {
    this.delete.emit(this.flashCard.id);
  }


  flipBack() {
    this.isFlipped = false;
    this.selectedOption = null;
  }
}
