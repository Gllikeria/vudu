import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { APIService } from '../api.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  constructor(private api:APIService, private router: Router) { }
  popularMoviesArr: any = []
  trendingMoviesArr: any = []
  searchedMoviesArr: any = []
  showPopularMovies: boolean = true;
  showTrendingMovies: boolean = false;
  showSearchBar: boolean = false;
  showSeachedMovies: boolean = false;
  searchResult: boolean = false;
  activeName: string = 'popular';
  movieDetailsObj: any;
  ngOnInit(): void {
    this.api.getPopularMovies().subscribe(
      data => {
        
        let apiKeys = Object.values(data);
        apiKeys[1].forEach((element: any) => {
          this.popularMoviesArr.push(element)
          console.log('ki');
          
        });
        this.api.popularMoviesPage++;
        console.log(this.popularMoviesArr)
    }
    )
  }
  trendingMovies(){
    this.activeName = 'trending'
    this.showPopularMovies = false;
    this.showSearchBar = false;
    this.showSeachedMovies = false;
    this.showTrendingMovies = true;
    this.searchResult = false;
    console.log('trending')
    this.api.getTrendingMovies().subscribe(
      data => {
        let apiKeys = Object.values(data);
        apiKeys[1].forEach((element: any) => {
          this.trendingMoviesArr.push(element);
        });
        this.api.trendingMoviesPage++;
    }
    )
  }
  popularMovies(){
    this.activeName = 'popular'
    this.showPopularMovies = true;
    this.showSearchBar = false;
    this.showTrendingMovies = false;
    this.showSeachedMovies = false;
    this.searchResult = false;

    this.api.getPopularMovies().subscribe(
      data => {
        let apiKeys = Object.values(data);
        apiKeys[1].forEach((element: any) => {
          this.popularMoviesArr.push(element);
        });
        this.api.popularMoviesPage++;
    }
    )
  }
  movieDetails(id: number){
    console.log(id);
    this.router.navigate(['/details',id]); 
  }
  searchBar(){    
    this.activeName = 'search'
    this.showSearchBar = true;
    this.showPopularMovies = false;
    this.showTrendingMovies = false;
    this.searchResult = false;
    
  }
  searchedMovieName: any;
  firstSearch: boolean = true;
  temp: any;
  pending:boolean = false;
  searchMovie(){
    this.pending = false;
    if(this.firstSearch){
      this.temp = this.searchedMovieName;
      this.firstSearch = false;
      console.log(this.temp, this.firstSearch);

    }
    if(!this.firstSearch && this.temp !== this.searchedMovieName){
      this.searchedMoviesArr = [];
      this.temp = this.searchedMovieName;
    } 

    this.showSearchBar = true;
    this.showPopularMovies = false;
    this.showTrendingMovies = false;
    
    this.api.getSearchedMovie(this.searchedMovieName).subscribe(
      data => {
        this.pending = true;
        let apiKeys = Object.values(data);
        if(apiKeys[1]){
          this.searchResult = true
        }
        apiKeys[1].forEach((element: any) => {
          this.searchedMoviesArr.push(element);
        });
        this.api.searchedMoviePage++;
              this.showSeachedMovies = true;
              
            }
    )
    this.pending = false;
  }
  onPopularMoviesScroll(){
    this.popularMovies()
  }
  onTrendingMoviesScroll(){
    this.trendingMovies()
  }
  onSearchedMoviesScroll(){
    console.log('s');

    this.searchMovie()
  }
  ngOnDestroy(): void {
      this.api.popularMoviesPage = 1;
      this.api.searchedMoviePage = 1;
      this.api.trendingMoviesPage = 1;
  }
}
