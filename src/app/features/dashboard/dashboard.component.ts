import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import {selectAllRooms, selectFreeRooms, selectOccupiedRooms} from '../store/selectors/room.selectors';
import { IRoom } from '../models/room.model';
import {loadRooms} from '../store/actions/room.actions';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  occupiedRooms$!: Observable<IRoom[]>;
  freeRooms$!: Observable<IRoom[]>;
  chart: any;
  occupiedCount: number = 0;
  freeCount: number = 0;

  constructor(
    private readonly store: Store,
    ) {
    this.store.dispatch(loadRooms());
    this.occupiedRooms$ = this.store.select(selectOccupiedRooms);
    this.freeRooms$ = this.store.select(selectFreeRooms);
  }

  public ngOnInit(): void {
    this.store.select(selectOccupiedRooms).subscribe(occupiedRooms => console.log('DashboardComponent occupiedRooms: ', occupiedRooms));



    this.occupiedRooms$.subscribe((rooms: IRoom[]) => {
      console.log('rooms: ', rooms);
      this.occupiedCount = rooms.length;
      this.updateChart();
    });

    this.freeRooms$.subscribe((rooms: IRoom[]) => {
      this.freeCount = rooms.length;
      this.updateChart();
    });

    this.initPieChart();
  }

  private initPieChart(): void {
    console.log('initPieChart: ', this.occupiedCount, this.freeCount);
    if (this.occupiedCount && this.freeCount) {
      this.chart = new Chart('pie-chart', {
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

  private updateChart(): void {
    // Оновлюємо чарт після зміни кількості кімнат
    if (this.chart) {
      this.chart.data.datasets[0].data = [this.occupiedCount, this.freeCount];
      this.chart.update();
    }
  }
}
