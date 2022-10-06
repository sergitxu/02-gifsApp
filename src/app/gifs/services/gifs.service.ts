import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchGifsResponse } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKey: string = 'VYLAbGgRGbxyI9knVRyokfE2fRvSP7NL';
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

    this.http.get<SearchGifsResponse>(`https://api.giphy.com/v1/gifs/search?api_key=VYLAbGgRGbxyI9knVRyokfE2fRvSP7NL&q=${query}&limit=10`)
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
