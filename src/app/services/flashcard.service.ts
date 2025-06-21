import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { FlashcardDto } from "../models/flashcard";

@Injectable({
  providedIn: 'root'
})
export class FlashcardService {
    constructor(private http: HttpClient, private router: Router) {}

    private baseUrl = 'http://localhost:5013/api/'

    public getAllFlashCards() : Observable<FlashcardDto[]> {
        return this.http.get<FlashcardDto[]>(this.baseUrl+'Flashcard');
    }

    public getFlashcard(id : number) : Observable<FlashcardDto> {
        return this.http.get<FlashcardDto>(this.baseUrl+'Flashcard' + '/' + id);
    }

    public addFlashcard(newFlashcard : FlashcardDto) : Observable<FlashcardDto> {
        return this.http.post<FlashcardDto>(this.baseUrl+'Flashcard', newFlashcard);
    }

    public deleteFlashcard(id : number) : Observable<FlashcardDto> {
        return this.http.delete<FlashcardDto>(this.baseUrl+'Flashcard'+ '/' + id);
    }

    public updateFlashcard(updatedFlashCard:FlashcardDto) : Observable<FlashcardDto> {
        return this.http.put<FlashcardDto>(this.baseUrl+'Flashcard'+ '/' + updatedFlashCard.id, updatedFlashCard);
    }
}