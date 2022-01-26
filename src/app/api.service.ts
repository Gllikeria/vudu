import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class APIService {

  constructor(private http: HttpClient) { }
  private _key = '64cc73a2c7f8837f74edf76b0b7883c9'
  popularMoviesPage: number = 1;
  trendingMoviesPage: number = 1;
  searchedMoviePage: number = 1;
  // popularUrl = 'https://api.themoviedb.org/3/movie/popular?api_key=64cc73a2c7f8837f74edf76b0b7883c9&language=en-US&page=1'

  getPopularMovies(){
    return this.http.get(`https://api.themoviedb.org/3/movie/popular?api_key=${this._key}&language=en-US&page=${this.popularMoviesPage}`)
  }
  getTrendingMovies(){
    return this.http.get(`https://api.themoviedb.org/3/trending/movie/day?api_key=${this._key}`)
  }
  getSearchedMovie(searchWord:string){
    return this.http.get(`https://api.themoviedb.org/3/search/movie?api_key=${this._key}&language=en-US&query=${searchWord}&page=${this.searchedMoviePage}&include_adult=false`)
  }
  getMovieImg(imgUrl:string){
    return this.http.get(`https://image.tmdb.org/t/p/w500/${imgUrl}`)
  }
  getMovieDetils(id:string|null|undefined){
    return this.http.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${this._key}&language=en-US`)
  }
  getCastAndCrew(id:string|null|undefined){
    return this.http.get(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${this._key}&language=en-US`)
  }
}
