import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { environment } from 'src/environments/environment';
import { closeNavState, closeRightNavState } from './store/property-search/sidenav.action';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'dotcompropertysearch-angular-polarisplatform';
  openSideNav: any;
  openRightNav: any;
  currentUrl = environment.BCOM_CURRENT_URL;
  baseUrl = environment.BCOM_BASE_URL;
  gmapsAPIKey = environment.GMAPS_API_KEY;
  menuItems = [
    {
      name: 'Services',
      url: `${this.currentUrl}/our-services/`
    },
    {
      name: 'Specialities',
      url: `${this.currentUrl}/specialties/`
    },
    {
      name: 'Properties',
      url: `${this.baseUrl}/properties/`
    },
    {
      name: 'Insight',
      url: `${this.baseUrl}/blog/`
    },
    {
      name: 'Research',
      url: `${this.baseUrl}/research-and-resources/`
    },
    {
      name: 'About Us',
      url: `${this.currentUrl}/specialties/aboutus/`
    },
    {
      name: 'Newsroom',
      url: `${this.baseUrl}/aboutus/newsroom/`
    },
    {
      name: 'Careers',
      url: `${this.baseUrl}/about/careers/`
    },
    {
      name: 'Contact',
      url: `${this.currentUrl}/contact/`
    },
    {
      name: 'Login',
      url: `${this.currentUrl}/login/`
    }
  ]
  constructor(private readonly store: Store<any>) { }

  ngOnInit(): void {
    this.store.select('sideNavState').subscribe((data) => {
      this.openSideNav = data.leftNavValue;
      this.openRightNav = data.rightNavValue;
    });
    // this.loadScript(`https://maps.googleapis.com/maps/api/js?key=${this.gmapsAPIKey}&libraries=places`)
  }

  closeSideNav() {
    this.store.dispatch(closeNavState());
  }
  closeRightSideNav() {
    this.store.dispatch(closeRightNavState());
    return;
  }

  loadScript(name: string) {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = name;
    document.getElementsByTagName('head')[0].appendChild(script);
  }

}
