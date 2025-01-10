import {Component, EventEmitter, OnInit, Output} from
   '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {FormsModule} from "@angular/forms";
import {TextFormatDirective} from '../../directives/text-format.directive';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [FormsModule, TextFormatDirective],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css'
})
export class SearchBarComponent implements OnInit {
  public filterText: string = '';

  @Output() name = new EventEmitter<string>();

  constructor(private router: Router, private route: ActivatedRoute){ }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.filterText = params['name'];
      this.sendFilter(this.filterText);
    });
  }


  sendFilter($event: any): void {
    this.name.emit($event);
    this.router.navigate(['/'], {queryParams: {name:
          $event?.toLowerCase()
    }});
  }
}
