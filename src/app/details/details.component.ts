import { AfterViewChecked, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { APIService } from '../api.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit, AfterViewChecked {

  constructor(private api:APIService, private activatedRoute:ActivatedRoute) { 
  }

  movieId!: string | null;
  movieObj: any;
  castAndCrewObj: any;
  castArr: any;
  ngOnInit(): void {
    this.movieId = this.activatedRoute.snapshot.paramMap.get('id');
    this.movieObj = this.api.getMovieDetils(this.movieId).subscribe(data => this.movieObj = data)
    this.castAndCrewObj = this.api.getCastAndCrew(this.movieId).subscribe(data => {this.castAndCrewObj = data;
    });
  }
  ngAfterViewChecked(): void {
      this.castArr = this.castAndCrewObj.cast
      
  }
  btnText: 'More' | 'Less' = "More";
  more(){
    if(this.btnText === 'More') {
      this.btnText = 'Less'
    }else {
      this.btnText = 'More'
    }
  }
  next(){
    let temp = this.castArr[0]
    this.castArr.push(temp);
    this.castArr.shift()
  }
  prev(){
    let temp = this.castArr[this.castArr.length - 1]
    this.castArr.unshift(temp);
    this.castArr.pop()
  }
}
