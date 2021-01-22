import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { map } from 'rxjs/operators';
import { CategoryService } from 'src/app/shared/services/category.service';

@Component({
  selector: 'products-filter',
  templateUrl: './products-filter.component.html',
  styleUrls: ['./products-filter.component.css']
})
export class ProductsFilterComponent implements OnInit {
  categories$;

  @ViewChild('drawer', { static: true }) drawer;
  @Input('category') category;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(categoryService: CategoryService, private breakpointObserver: BreakpointObserver) {
    this.categories$ = categoryService.getAll();
  }

  ngOnInit(): void {
  }
  ngAfterViewInit() {
    // this.drawer is NOW valid !!
  }

  collapse() {
    if (this.drawer.mode == 'over') this.drawer.toggle(); //toggle drawer only if view is in mobile
  }
}
