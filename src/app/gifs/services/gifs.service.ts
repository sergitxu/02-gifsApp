import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { gifsAPI } from 'src/environments/environment';
import { Gif, SearchGifsResponse } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private api_key: string = gifsAPI;
  private servicioURL: string = "https://api.giphy.com/v1/gifs"
  private _historial: string[] = [];

  public resultados: Gif[] = []
  public resultadosCache: any;

  get historial() {
    return [...this._historial];
  }

  constructor(private http: HttpClient) {
    // if (localStorage.getItem('historial') !== null) {
    //   this._historial = JSON.parse(localStorage.getItem('historial')!);
    // }
    this._historial = JSON.parse(localStorage.getItem('historial')!) || [];
    this.resultados = JSON.parse(localStorage.getItem('resultadosCache')!) || [];
  }

  buscarGifs(query: string = '') {

    query = query.trim().toLowerCase();

    if (!this._historial.includes(query)) {
      this._historial.unshift(query);
      this._historial = this._historial.splice(0, 10);

      localStorage.setItem('historial', JSON.stringify(this._historial));
    }

    const params = new HttpParams()
      .set('api_key', this.api_key)
      .set('q', query)
      .set('limit', '10')


    this.http.get<SearchGifsResponse>(`${this.servicioURL}/search`, { params })
      .subscribe((resp) => {
        this.resultados = resp.data;
        this.resultadosCache = localStorage.setItem('resultadosCache', JSON.stringify(this.resultados));
      })

    // Opción Vanilla JS de conexión a la API
    // fetch('https://api.giphy.com/v1/gifs/search?api_key=VYLAbGgRGbxyI9knVRyokfE2fRvSP7NL&q=patata&limit=10')
    //   .then(resp => {
    //     resp.json().then(data => console.log(data))
    //   })

    // Opción mejorada Vanilla JS de conexión a la API - poner async en el método
    // const resp = await fetch('https://api.giphy.com/v1/gifs/search?api_key=VYLAbGgRGbxyI9knVRyokfE2fRvSP7NL&q=patata&limit=10');
    // const data = await resp.json();
    // console.log(data)

  }
}
