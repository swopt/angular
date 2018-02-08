import {Component,Input} from '@angular/core';
import {ObservableService} from '../../services/services.old';

/**
 * @title Nested menu
 */
@Component({
  selector: 'appmenu',
  templateUrl: 'appmenu.html',
  providers: [ObservableService]
})
export class AppMenuComponent {
  @Input()
  url:string;

  metadata:any;
  
  constructor(private obsSrv: ObservableService){}

  ngOnInit(): void{
    this.obsSrv.getMetadata(this.url).subscribe(
      
    )
  }
}