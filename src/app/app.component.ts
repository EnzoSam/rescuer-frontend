import { Component, DoCheck, OnInit } from '@angular/core';
import { ActivatedRoute, ActivationEnd, Router } from '@angular/router';
import { GeneralService } from './services/general.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements DoCheck,OnInit {
  title = 'Rescatistas';
  dashboard: boolean;

  constructor(private route: ActivatedRoute,
    private router: Router) {
    this.dashboard = false;
    
    router.events.subscribe((val: any) => {
      if (val instanceof ActivationEnd) {
        if (val.snapshot && val.snapshot && val.snapshot.routeConfig &&
          val.snapshot.routeConfig.path &&
          val.snapshot.routeConfig.path.toLowerCase().indexOf('configuracion') != -1) {
          this.dashboard = true;
          console.log('aaaaaaaaaaaaaaaaaa');
        }
        else {
          this.dashboard = false;
        }
      }
    });
  }
  ngOnInit(): void {
    
  }

  ngDoCheck() {
    //console.log(this.route.routeConfig?.component);
  }
}
