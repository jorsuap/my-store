import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { Product, CreateProductDTO, UpdateProductDTO} from '../models/product.model';
import { retry, catchError, throwError, map} from 'rxjs';
import { environment } from 'src/environments/environment';
import { checkTime } from '../interceptor/time.interceptor';
@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private apiUrl = `${environment.API_URL}/api/products`;// se creo un proxy para solucionar errores de CORS

  constructor(
    private http:HttpClient
  ) { }

  getAllProducts(limit:number, offset:number){
    let params = new HttpParams();
    if(limit && offset){
      params = params.set('limit', limit)
      params = params.set('offset', limit)
    }
    return this.http.get<Product[]>(this.apiUrl, {params, context: checkTime()})//tipar la peticion
    .pipe(
      retry(3),
      map(products => products.map(item =>{
        return{
          ...item,
          taxes: .19* item.price
        }
      }))
    );
  }

  getProductsByPage(limit:number, offset:number){
    return this.http.get<Product[]>(`${this.apiUrl}`,{
      params: {limit, offset}
    })

  }

  getProduct(id:string){
    return this.http.get<Product>(`${this.apiUrl}/${id}`)
    .pipe(
      catchError((error:HttpErrorResponse) => {
        if(error.status === HttpStatusCode.Conflict){
          return throwError('Algo esta fallando en el servirdor')
        }
        if(error.status === HttpStatusCode.NotFound){
          return throwError('El producto no existe')
        }
        if(error.status === HttpStatusCode.Unauthorized){
          return throwError('No estas permitido')
        }
        return throwError('Ups algo salio mal')
      })
    )
  }

  create(data:CreateProductDTO){
    return this.http.post<Product>(this.apiUrl, data)
  }

  update(id:string, dto: UpdateProductDTO){
    return this.http.put<Product>(`${this.apiUrl}/${id}`, dto)
  }

  delete(id:string){
    return this.http.delete<boolean>(`${this.apiUrl}/${id}`)
  }


}
