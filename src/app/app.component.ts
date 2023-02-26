import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { park } from './park';
import { delay, interval, map, Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnChanges {
  constructor(private Http: HttpClient) { }
  ngOnChanges(changes: SimpleChanges): void {

    this.park = this.parkingList
  }
  public parkingList: park[] = [];
  private upd: Subscription | undefined;
  ngOnInit() {

    // this.upd = interval(20).subscribe(val => {
    //   this.get().subscribe({
    //     next: (parks: park[]) => {
    //       console.log(parks)
    //       this.park = parks;
    //       this.check();
    //     }
    //   });
    // })

    this.get().subscribe({
      next: (parks: park[]) => {
        console.log(parks)
        this.park = parks;
        this.check();
      }
    });



    // console.log(this.parkingList);
  }
  title = 'Park-Mate';

  public park: { id: number, name: string, total: number, available: number, class?: number }[] = this.parkingList;
  public get() {
    return this.Http.get<park[]>("https://63fb3b507a045e192b654b62.mockapi.io/v1/Parking").pipe(map(datas => datas.map(data => { return <park>{ id: data["id"], name: data["name"], total: data["total"], available: data["available"] } })),);
  }
  public check() {
    console.log("Hi")
    for (let i = 0; i < this.park.length; i++) {
      let c = this.park[i].available / this.park[i].total * 100;
      if (c >= 75) this.park[i].class = 1;
      else if (c >= 50) this.park[i].class = 2;
      else if (c >= 30) this.park[i].class = 3;
      else this.park[i].class = 4;

    }
  }
}

