import { APP_INITIALIZER, CUSTOM_ELEMENTS_SCHEMA, Injector, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SharedModule } from './shared/shared.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PropertySearchModule } from './property-search/property-search.module';
import { UtilityService } from 'src/utility/utility.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { formReducer } from './store/property-search/property-search-form.reducer';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { propertiesReducer, propertiesSuggessionReducer, pagenationPropertiesReducer } from './store/property-search/property-search-details.reducer';
import { PropertySearchEffects } from './store/property-search/property-search-details.effects';
import { GeoJsonEffects } from './store/property-search/geo-json-details.effects';
import { EffectsModule } from '@ngrx/effects';
import { SpinnerService } from './shared/spinner/spinner.service';
import { SpinnerInterceptorService } from './shared/spinner/spinner-interceptor.service';
import { MatSidenavModule } from '@angular/material/sidenav';
import { AllFiltersComponent } from './property-search/filters-header/all-filters/all-filters.component';
import { sideNavReducer } from './store/property-search/sidenav.reducer';
import { toggleMapReducer } from './store/property-search/togglemap.reducer';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatChipsModule } from '@angular/material/chips';
import { updateSelectedGlobalSearchValuesReducer } from './store/property-search/global-search-details.reducer';
import { PipesModule } from './shared/pipes/pipes.module';
import { submitFormValuesReducer } from './store/property-search/formValues.reducer';
import { MatIconModule } from '@angular/material/icon';
import { getGeoJsonReducer } from './store/property-search/geo-json-details.reducer';
import { clearOptionReducer } from './store/property-search/clearOptionValue.reducer';
import { getErrorReducer } from './store/property-search/error.reducer';
import { LayoutModule } from '@angular/cdk/layout';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { propertyImagesReducer } from './store/property-search/property-images.reducer';
import { PropertyImagesEffects } from './store/property-search/property-images.effects';

export function setEnvironmentVariables(injector: Injector) {
  return () => injector.get(UtilityService).setEnvironmentVariables();
}
@NgModule({
  declarations: [AppComponent, AllFiltersComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    PropertySearchModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatSidenavModule,
    MatAutocompleteModule,
    MatChipsModule,
    MatIconModule,
    PipesModule,
    LayoutModule,
    StoreModule.forRoot({
      payload: formReducer,
      properties: propertiesReducer,
      pagenationProperties: pagenationPropertiesReducer,
      images: propertyImagesReducer,
      propertiesSuggession: propertiesSuggessionReducer,
      toggleMap: toggleMapReducer,
      sideNavState: sideNavReducer,
      formValues: submitFormValuesReducer,
      selectedGlobalSearchValues: updateSelectedGlobalSearchValuesReducer,
      geoJsons: getGeoJsonReducer,
      clearOptionValue: clearOptionReducer,
      errorMessage: getErrorReducer,
    }, {
      runtimeChecks: {
        strictStateImmutability: false,
        strictActionImmutability: false,
      }
    }),
    StoreDevtoolsModule.instrument({ maxAge: 25 }),
    EffectsModule.forRoot([PropertySearchEffects, GeoJsonEffects, PropertyImagesEffects]),
  ],
  providers: [
    { provide: MatBottomSheetRef, useValue: {} },
    UtilityService,
    {
      provide: APP_INITIALIZER,
      useFactory: setEnvironmentVariables,
      deps: [Injector],
      multi: true,
    },

    SpinnerService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: SpinnerInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule { }
