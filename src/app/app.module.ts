import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER  } from '@angular/core';
import { APP_BASE_HREF, DOCUMENT } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { IdentityConfigService } from './services/identity-config.service';
import { PwaService } from './services/pwa.service';
import { ManifestService } from './services/manifest.service';

export function getBaseLocation(identityConfigService: IdentityConfigService, document: Document) {
  if (identityConfigService.init(document)) {
    return identityConfigService.baseHref;
  }
  return '/';
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
  ],
  providers: [
    IdentityConfigService,
    {
      provide: APP_BASE_HREF,
      useFactory: getBaseLocation,
      deps: [IdentityConfigService, DOCUMENT]
    },
    PwaService,
    ManifestService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
