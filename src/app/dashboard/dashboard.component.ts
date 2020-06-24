import { Component, OnInit } from '@angular/core';

import { environment } from './../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserServiceService } from '../user-service.service';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private http: HttpClient, private userService: UserServiceService) { }

  dashboardData: any = [];

  selectedLongURL: string = "";

  selectedShortURL: string = "";

  selectedClicks: number = 0;


  ngOnInit(): void {

    this.refresh();
  }

  public barChartOptions: ChartOptions = {
    responsive: true,
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true
          }
        }
      ],
      xAxes: [
        {
          ticks: {
            beginAtZero: true
          }
        }
      ]
    }
  };

  public barChartLabels: Label[] = [];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];

  public barChartData: ChartDataSets[] = [
    { data: [], label: 'Clicks' },
  ];

  setChartData() {
    this.barChartLabels = [];
    let tempChartData = [];
    for (let i = 0; i < this.dashboardData.length; i++) {
      this.barChartLabels.push(this.dashboardData[i].shortURL);
      tempChartData.push(this.dashboardData[i].count);
    }
    this.barChartData = [{ data: tempChartData, label: "Clicks" }];
    console.log(this.barChartData);
  }

  chartClicked(event) {
    if(event.active[0] == undefined){
      return;
    }

    this.selectedLongURL = this.dashboardData[event.active[0]["_index"]].longURL;

    this.selectedShortURL = this.dashboardData[event.active[0]["_index"]].shortURL;
  
    this.selectedClicks = this.dashboardData[event.active[0]["_index"]].count;
  }


  refresh(){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.userService.getToken(),
      'responseType': 'json'
    });

    let options = { headers: headers };

    this.http.get(environment.apiURL + "/dashboard", options).subscribe((data) => {
      this.dashboardData = data;
      console.log(data);
      this.setChartData();
    },
      (error) => {

      });
  }
}