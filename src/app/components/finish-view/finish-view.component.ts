import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-finish-view',
  templateUrl: './finish-view.component.html',
  styleUrls: ['./finish-view.component.css']
})
export class FinishViewComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  goHome() {
    this.router.navigate(['/']);
  }
}
