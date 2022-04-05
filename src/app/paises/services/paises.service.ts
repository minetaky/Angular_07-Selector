import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PaisSmall, Pais } from '../interfaces/paises.interface';
import { combineLatest, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaisesService {

  private _baseUrl: string = 'https://restcountries.com/v3.1';

  private _regiones: string[] = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];

  get regiones(): string[]{
    return [ ...this._regiones];
  }

  constructor( private _http: HttpClient  ) { }


  getPaisesPorRegion( region: string ): Observable<PaisSmall[]>{
    const url: string = `${ this._baseUrl }/region/${ region }?fields=name,ccn3`;
    return this._http.get<PaisSmall[]>( url );
  }



  getPaisPorCodigo( codigo: string ): Observable<Pais[] | null>{

    if( !codigo ){
      return of(null)
    }

    const url: string = `${ this._baseUrl }/alpha/${ codigo }`;
    return this._http.get<Pais[]>( url );
  }



  getPaisPorCodigoSmall( codigo: string ): Observable<PaisSmall>{

    const url: string = `${ this._baseUrl }/alpha/${ codigo }?fields=name,ccn3`;
    return this._http.get<PaisSmall>( url );
  }


  getPaisesPorCodigos( borders: string[] ): Observable<PaisSmall[]>{

    if( !borders){
      return of([]);
    }

    const peticiones: Observable<PaisSmall>[] = [];
    
    borders.forEach( codigo => {
      const peticion = this.getPaisPorCodigoSmall( codigo );
      peticiones.push( peticion );
    });

    return combineLatest(peticiones);

  }

}
