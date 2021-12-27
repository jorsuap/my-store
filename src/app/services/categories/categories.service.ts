import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Category } from 'src/app/models/product.model';
@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  private apiUrl = `${environment.API_URL}/api/categories`;

  constructor(
    private http:HttpClient
  ) { }

  getAll(limit?:number, offset?:number){
    let params = new HttpParams();
    const temp_limit = limit as number;
    const temp_offset = offset as number;
    if(temp_limit?.toString().length > 0 && temp_offset?.toString().length > 0){
      params = params.set('limit', temp_limit)
      params = params.set('offset', temp_offset)
    }
    return this.http.get<Category[]>(this.apiUrl,{params})
  }
}
