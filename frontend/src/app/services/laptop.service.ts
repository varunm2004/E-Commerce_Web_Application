import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Laptop } from '../models/laptop.model';

@Injectable({
  providedIn: 'root',
})
export class LaptopService {
  private apiUrl = 'http://localhost:5000/api/laptops'; // Backend API URL

  constructor(private http: HttpClient) {}

  // Fetch all laptops
  getLaptops(): Observable<Laptop[]> {
    return this.http.get<Laptop[]>(this.apiUrl);
  }

  // Fetch a single laptop by ID
  getLaptopById(id: string): Observable<Laptop> {
    return this.http.get<Laptop>(`${this.apiUrl}/${id}`);
  }

  // Add a new laptop
  addLaptop(laptop: Laptop): Observable<Laptop> {
    return this.http.post<Laptop>(this.apiUrl, laptop);
  }

  // Update an existing laptop
  updateLaptop(id: string, laptop: Laptop): Observable<Laptop> {
    return this.http.put<Laptop>(`${this.apiUrl}/${id}`, laptop);
  }

  // Delete a laptop
  deleteLaptop(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
