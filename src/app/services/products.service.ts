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

  private apiUrl = `${environment.API_URL}/api`;// se creo un proxy para solucionar errores de CORS

  constructor(
    private http:HttpClient
  ) { }

  getByCategory(categoryId:string,limit?:number, offset?:number){
    let params = new HttpParams();
    const temp_limit = limit as number;
    const temp_offset = offset as number;
    if(temp_limit?.toString().length > 0 && temp_offset?.toString().length > 0){
      params = params.set('limit', temp_limit)
      params = params.set('offset', temp_offset)
    }
    return this.http.get<Product[]>(`${this.apiUrl}/categories/${categoryId}/products`, {params})
  }

  getAllProducts(limit?:number, offset?:number){
    let params = new HttpParams();
    const temp_limit = limit as number;
    const temp_offset = offset as number;
    if(temp_limit?.toString().length > 0 && temp_offset?.toString().length > 0){
      params = params.set('limit', temp_limit)
      params = params.set('offset', temp_offset)
    }
    return this.http.get<Product[]>(`${this.apiUrl}/products`, {params, context: checkTime()})//tipar la peticion
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
    return this.http.get<Product[]>(`${this.apiUrl}/products`,{
      params: {limit, offset}
    })

  }

  getProduct(id:string){
    return this.http.get<Product>(`${this.apiUrl}/products/${id}`)
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
    return this.http.post<Product>(`${this.apiUrl}/products`, data)
  }

  update(id:string, dto: UpdateProductDTO){
    return this.http.put<Product>(`${this.apiUrl}/products/${id}`, dto)
  }

  delete(id:string){
    return this.http.delete<boolean>(`${this.apiUrl}/products/${id}`)
  }


}
