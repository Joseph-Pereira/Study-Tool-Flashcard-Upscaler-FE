import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NoteDto } from '../../models/notes';
import { NotesComponent } from "../notes/notes.component";
import { NotesService } from '../../services/note.service';

@Component({
  selector: 'app-notes-dashboard',
  standalone: true,
  imports: [NotesComponent, CommonModule, FormsModule],
  templateUrl: './notes-dashboard.component.html',
  styleUrls: ['./notes-dashboard.component.css']
})
export class NotesDashboardComponent {

  public notes: NoteDto[] = [];
  public showNotes: String = "ShowNote";

  newTopic: string = '';
  newDescription: string = '';
  newKeypoints: string[] = ['', '', '', ''];

  constructor(private noteService: NotesService) { }

  public ngOnInit(): void {
    this.loadNotes();
  }

  private loadNotes(): void {
    this.noteService.getAllNotes().subscribe({
      next: (responseData: NoteDto[]) => {
        this.notes = responseData;
      },
      error: (error: any) => {
        console.error('Error fetching notes:', error);
      }
    });
  }

  public toggleAddNewNote(): void {
    this.showNotes = "AddNote";
  }

  public showNote(): void {
    this.showNotes = "ShowNote";
    this.loadNotes();
  }

  public saveEditNote(note?: any): void {
    if (this.newTopic && this.newDescription && this.newKeypoints.some(k => k.trim() !== '')) {
      const newNote: NoteDto = {
        id: note.id,
        topic: this.newTopic,
        description: this.newDescription,
        points: this.newKeypoints.filter(k => k.trim() !== '')
      };

      this.noteService.putNote(note.id,newNote).subscribe({
        next: (responseData: NoteDto) => {
          this.loadNotes();
          this.showNote();
          // this.toggleAddNewNote();
          this.resetNewNoteForm();
        },
        error: (error: any) => {
          console.error('Error adding note:', error);
        }
      });
    } else {
      alert('Please fill in the topic, description, and at least one key point.');
    }
  }

  public saveNewNote(): void {
    if (this.newTopic && this.newDescription && this.newKeypoints.some(k => k.trim() !== '')) {
      const newNote: NoteDto = {
        id: 0,
        topic: this.newTopic,
        description: this.newDescription,
        points: this.newKeypoints.filter(k => k.trim() !== '')
      };

      this.noteService.addNote(newNote).subscribe({
        next: (responseData: NoteDto) => {
          this.loadNotes();
          this.showNote();
          this.resetNewNoteForm();
        },
        error: (error: any) => {
          console.error('Error adding note:', error);
        }
      });
    } else {
      alert('Please fill in the topic, description, and at least one key point.');
    }
  }

  public deleteNote(id: number): void {
    this.noteService.deleteNote(id).subscribe({
      next: () => { this.loadNotes(); },
      error: (error: any) => {
        console.error('Error deleting note:', error);
      }
    });
  }

  public toggleEditNote(note? : any)
  {
    this.notes = note
    this.newTopic= note.topic
    this.newDescription= note.description
    this.newKeypoints= [...note.points]
    this.showNotes="EditNote"
    

  }

  private resetNewNoteForm(): void {
    this.newTopic = '';
    this.newDescription = '';
    this.newKeypoints = ['', '', '', ''];
  }
}




