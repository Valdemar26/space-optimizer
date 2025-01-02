import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectFreeRooms, selectOccupiedRooms } from '../store/selectors/room.selectors';
import { IRoom } from '../models/room.model';
import { loadRooms } from '../store/actions/room.actions';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, AfterViewInit {
  occupiedRooms$!: Observable<IRoom[]>;
  freeRooms$!: Observable<IRoom[]>;
  chart: any;
  occupiedCount: number = 0;
  freeCount: number = 0;

  constructor(private readonly store: Store) {
    this.store.dispatch(loadRooms());
    this.occupiedRooms$ = this.store.select(selectOccupiedRooms);
    this.freeRooms$ = this.store.select(selectFreeRooms);

    Chart.register(...registerables);
  }

  public ngOnInit(): void {
    this.occupiedRooms$.subscribe((rooms: IRoom[]) => {
      this.occupiedCount = rooms.length;
      this.updateChart();
    });

    this.freeRooms$.subscribe((rooms: IRoom[]) => {
      this.freeCount = rooms.length;
      this.updateChart();
    });
  }

  public ngAfterViewInit(): void {
    this.initPieChart();
    this.initLineChart();
  }

  private initPieChart(): void {
    const canvas = document.getElementById('pie-chart') as HTMLCanvasElement;
    if (canvas && this.occupiedCount + this.freeCount > 0) {
      this.chart = new Chart(canvas.getContext('2d')!, {
        type: 'pie',
        data: {
          labels: ['Occupied', 'Free'],
          datasets: [
            {
              data: [this.occupiedCount, this.freeCount],
              backgroundColor: ['#FF6384', '#36A2EB'],
            },
          ],
        },
      });
    }
  }

  private initLineChart(): void {
    const canvas = document.getElementById('line-chart') as HTMLCanvasElement;
    if (canvas) {
      new Chart(canvas.getContext('2d')!, {
        type: 'line',
        data: {
          labels: ['January', 'February', 'March', 'April', 'May', 'June'], // TODO need to change to some real data
          datasets: [
            {
              label: 'Occupied Rooms',
              data: [65, 59, 80, 81, 56, 55], // TODO need to change to some real data
              borderColor: '#FF6384',
              backgroundColor: 'rgba(255, 99, 132, 0.2)',
              fill: true,
            },
            {
              label: 'Free Rooms',
              data: [35, 41, 20, 19, 44, 45], // TODO need to change to some real data
              borderColor: '#36A2EB',
              backgroundColor: 'rgba(54, 162, 235, 0.2)',
              fill: true,
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'top',
            },
          },
          scales: {
            x: {
              title: {
                display: true,
                text: 'Months',
              },
            },
            y: {
              title: {
                display: true,
                text: 'Number of Rooms',
              },
            },
          },
        },
      });
    }
  }

  private updateChart(): void {
    if (this.chart) {
      this.chart.data.datasets[0].data = [this.occupiedCount, this.freeCount];
      this.chart.update();
    }
  }
}
