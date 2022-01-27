import { Component, OnDestroy, OnInit } from '@angular/core';
import { APIService } from '../api.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  constructor(private api: APIService, private router: Router) {}
  // სათითაო მასივები მოძებნილი ფილმების დასაფუშად, ამ ლოგიკას სულ ესე ვწერ ხოლმე და რამე უკეთესი გზა არაა?
  // ინტერფეისები  ვერ გაუწერე იმის გამო რო თავიდან ანდეფაინდი რო იყო ერეი აღარ ფუშავდა
  // genreArr: [GenreInterfase]; <-- ასე რო აღვწერე ინტერფეისით undefined რო იყო ერეის მეთოდებს ვეღარ ვიყენებ

  popularMoviesArr: any = [];
  trendingMoviesArr: any = [];
  searchedMoviesArr: any = [];
  genresArr: any = []
  openTab: 'popular' | 'trending' | 'search' = 'popular';
  showSeachedMovies: boolean = false;
  firstSearch: boolean = true;
  pending: boolean = false;
  searchedMovieName: string = '';
  oldMovieName: string = '';

  ngOnInit(): void {
    // ყველა ჟანრი მომაქვს თავიდან და მერე ჰავერზე ფილმის genre_id ს ვადარებ და ისე გამომაქვს
    this.api.getGenres().subscribe((data) => {

      let apiKeys = Object.values(data);
      apiKeys[0].forEach((element:any) => {
        this.genresArr?.push(element);
      });

    });

    this.api.getPopularMovies().subscribe((data) => {

      let apiKeys = Object.values(data);
      apiKeys[1].forEach((element: any) => {
        this.popularMoviesArr.push(element);
      });

      this.api.popularMoviesPage++;
    });
  }
  trendingMovies() {
    // სხვა ტაბზე გადასვლისას ფილმის სახელს ვასუფთავებ რომ ინფუთში ძველი მოძენბილი ფილმის სახელი აღარ დარჩეს
    this.searchedMovieName = '';
    // მასივსაც ვასუფთავებ რო ახალი მოძენბილი ფილმები ბოლოში არ ჩაფუშოს
    this.searchedMoviesArr = [];
    this.firstSearch = true;
    this.api.searchedMoviePage = 1;
    this.openTab = 'trending';
    this.api.getTrendingMovies().subscribe((data) => {
      let apiKeys = Object.values(data);
      apiKeys[1].forEach((element: any) => {
        this.trendingMoviesArr.push(element);
      });
      this.api.trendingMoviesPage++;
    });
  }
  popularMovies() {
    this.searchedMovieName = '';
    this.searchedMoviesArr = [];
    this.firstSearch = true;
    this.api.searchedMoviePage = 1;
    this.openTab = 'popular';

    this.api.getPopularMovies().subscribe((data) => {
      let apiKeys = Object.values(data);
      apiKeys[1].forEach((element: any) => {
        this.popularMoviesArr.push(element);
      });

      this.api.popularMoviesPage++;
    });
  }
  movieDetails(id: number) {
    this.router.navigate(['/details', id]);
  }
  searchBar() {
    this.openTab = 'search';
  }
  searchMovie() {
    this.pending = false;
    if (this.firstSearch) {
      this.oldMovieName = this.searchedMovieName;
      this.firstSearch = false;
    }
    if (!this.firstSearch && this.oldMovieName !== this.searchedMovieName) {
      // თუ ტაბის შეუცვლელად წაშალა წინა ქივორდი და ახალი შეიყვანა გაასუფთავოს მასივი რო ბოლოში არ მიაბას ახალი ქივორდის ფილმები
      this.api.searchedMoviePage = 1;
      this.searchedMoviesArr = [];
      this.oldMovieName = this.searchedMovieName;
    }
    if (!this.firstSearch && this.oldMovieName !== this.searchedMovieName) {
      this.oldMovieName = this.searchedMovieName;
    }

    this.api.getSearchedMovie(this.oldMovieName).subscribe((data) => {
      this.pending = true;
      let apiKeys = Object.values(data);
      apiKeys[1].forEach((element: any) => {
        this.searchedMoviesArr.push(element);
      });
      this.api.searchedMoviePage++;
      this.showSeachedMovies = true;
    });
    this.pending = false;
  }

  ngOnDestroy(): void {
    this.api.popularMoviesPage = 1;
    this.api.searchedMoviePage = 1;
    this.api.trendingMoviesPage = 1;
  }
}
