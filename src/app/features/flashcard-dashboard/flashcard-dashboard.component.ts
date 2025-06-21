import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FlashcardComponent } from '../flashcard/flashcard.component';
import { FlashcardDto } from '../../models/flashcard';
import { FlashcardService } from '../../services/flashcard.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-flashcard-dashboard',
  standalone: true,
  imports: [FlashcardComponent, CommonModule, FormsModule],
  templateUrl: './flashcard-dashboard.component.html',
  styleUrl: './flashcard-dashboard.component.css'
})
export class FlashcardDashboardComponent {
  
  public flashCards: FlashcardDto[] = [];

  public showFlashCards: string = "show";

  public currentScore: number = 0;
  public totalScore: number = 0;

  newQuestion: string = '';
  newAnswer: string = '';
  newOptions: string[] = ['', '', '', ''];

  constructor(private flashCardService: FlashcardService) {}
  
  public ngOnInit() {    
    this.loadFlashCards();
  }

  private loadFlashCards() : void {
     this.flashCardService.getAllFlashCards().subscribe({
      next: (responseData: FlashcardDto[]) => {
        this.flashCards = responseData;
        
        this.currentScore = 0;
        this.totalScore = this.flashCards.length;
      },
      error: (error: any) => {
        console.error('Error fetching flashcards:', error);
      }
    });
  }

  public toggleAddNewFlashCard() : void {
    this.showFlashCards = "addNew";
    this.resetNewFlashcardForm();
  }
  public toggleEditFlashCard() : void {
    this.showFlashCards = "edit";
  }
  public cancel() : void {
    this.showFlashCards = "show";
    this.loadFlashCards();
  }

  public saveNewFlashcard() : void {
    if (this.newQuestion && this.newAnswer && this.newOptions.some(option => option !== '')) {
      const newCard: FlashcardDto = {
        question: this.newQuestion,
        answer: this.newAnswer,
        options: this.newOptions.filter(option => option !== ''),
        id: 0
      };
      this.flashCardService.addFlashcard(newCard).subscribe({
        next: (responseData: FlashcardDto) => {
          this.loadFlashCards();
          this.cancel();
          this.resetNewFlashcardForm();
          return responseData;
        },
        error: (error: any) => {
          console.error('Error adding flashcard:', error);
        }
      });
    } else {
      alert('Please fill in the question, answer, and at least one option.');
    }
  }

  private resetNewFlashcardForm() {
    this.newQuestion = '';
    this.newAnswer = '';
    this.newOptions = ['', '', '', ''];
  }

  public deleteFlashcard(id: number): void {
    this.flashCardService.deleteFlashcard(id).subscribe({
      next: () => { this.loadFlashCards(); },
      error: (error: any) => {
        console.error('Error deleting note:', error);
      }
    });
  }

  public editCard: FlashcardDto | null = null;

  public editFlashcard(flashcard? : any){
    this.toggleEditFlashCard();
    this.editCard = {...flashcard};
    this.newQuestion = flashcard.question
    this.newAnswer = flashcard.answer
    this.newOptions = [...flashcard.options]
    // const editCard: FlashcardDto = {
    //     question: flashcard.question,
    //     answer: flashcard.answer,
    //     options: flashcard.options,
    //     id: flashcard.id
    //   };
  }

  public updateFlashcard(): void {
  if (this.newQuestion && this.newAnswer && this.newOptions.some(option => option !== '') && this.editCard) {
    const updatedCard: FlashcardDto = {
      id: this.editCard.id,
      question: this.newQuestion,
      answer: this.newAnswer,
      options: this.newOptions.filter(option => option !== '')
    };

    this.flashCardService.updateFlashcard(updatedCard).subscribe({
      next: (responseData: FlashcardDto) => {
        this.loadFlashCards();
        this.cancel();
        this.resetNewFlashcardForm();
      },
      error: (error: any) => {
        console.error('Error updating flashcard:', error);
      }
    });
  } else {
    alert('Please fill in the question, answer, and at least one option.');
  }
}

  
}
