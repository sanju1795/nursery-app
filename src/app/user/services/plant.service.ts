import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PlantService {

  apiUrl = 'http://localhost:3000/api/plants';

  constructor(private http: HttpClient) {}

  // ✅ GET ALL
  getPlants() {
    return this.http.get<any[]>(this.apiUrl);
  }

  // ✅ GET BY ID (🔥 IMPORTANT)
  getPlantById(id: any) {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }
}