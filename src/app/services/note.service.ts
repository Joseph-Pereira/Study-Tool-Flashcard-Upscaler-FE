import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { NoteDto } from "../models/notes";


@Injectable({
  providedIn: 'root'
})
export class NotesService {
    constructor(private http: HttpClient, private router: Router) {}

    private baseUrl = 'http://localhost:5013/api/'

    public getAllNotes() : Observable<NoteDto[]> {
        return this.http.get<NoteDto[]>(this.baseUrl+'Note');
    }

    public getNote(id : number) : Observable<NoteDto> {
        return this.http.get<NoteDto>(this.baseUrl+'Note' + '/' + id);
    }

    public addNote(newNote : NoteDto) : Observable<NoteDto> {
        return this.http.post<NoteDto>(this.baseUrl+'Note', newNote);
    }

    public putNote(id: Number ,updatedNote : NoteDto) : Observable<NoteDto> {
        return this.http.put<NoteDto>(this.baseUrl+'Note' + '/' + id, updatedNote);
    }

    public deleteNote(id : number) : Observable<NoteDto> {
        return this.http.delete<NoteDto>(this.baseUrl+'Note'+ '/' + id);
    }
}