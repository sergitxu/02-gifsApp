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

  get historial() {
    return [...this._historial];
  }

  constructor(private http: HttpClient) { }

  buscarGifs(query: string = '') {

    query = query.trim().toLowerCase();

    if (!this._historial.includes(query)) {
      this._historial.unshift(query);
      this._historial = this._historial.splice(0, 10);
    }

    this.http.get<SearchGifsResponse>(`https://api.giphy.com/v1/gifs/search?api_key=VYLAbGgRGbxyI9knVRyokfE2fRvSP7NL&q=${query}&limit=10`)
      .subscribe((resp) => {
        this.resultados = resp.data;
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
