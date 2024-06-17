import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { inject } from '@angular/core';
import {Service} from "../../service.service";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-contest-page',
  standalone: true,
  imports: [],
  templateUrl: './contest-page.component.html',
  styleUrl: './contest-page.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContestPageComponent {
  route:ActivatedRoute=inject(ActivatedRoute)
  id:number
  service:Service=inject(Service)
  constructor(){
    this.id=Number(this.route.snapshot.params['id']);
  }
}
