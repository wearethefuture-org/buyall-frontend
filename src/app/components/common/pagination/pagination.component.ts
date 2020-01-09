import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {
  @Input() pages: any[];
  @Input() page: number;

  constructor() { }

  ngOnInit(): void {
  }

  get canPrev(): boolean {
    return !(this.page === this.pages[0]);
  }

  get canNext(): boolean {
    return !(this.page === this.pages[this.pages.length - 1]);
  }
}
