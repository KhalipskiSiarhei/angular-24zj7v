import { Injectable, Inject, ApplicationRef } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { SwUpdate } from '@angular/service-worker';
import { fromEvent, Subscription, Observable, Subscriber, of as observableOf, timer, interval, concat } from 'rxjs';
import { take, first } from 'rxjs/operators';
import { IdentityConfigService } from './identity-config.service';

@Injectable()
// The idea of the service is got from this article:
// https://medium.com/@alshakero/how-to-setup-your-web-app-manifest-dynamically-using-javascript-f7fbee899a61
export class ManifestService {
    constructor(private identifyConfigService: IdentityConfigService, @Inject(DOCUMENT) private document: Document) {
    }

    public injectManifest() {
      if (this.identifyConfigService.initialized) {
        const manifestElement = this.document.getElementById('manifest.webmanifest');

        if (manifestElement) {
            const jsonManifest = {
                name: this.identifyConfigService.vendor + '-' +
                 this.identifyConfigService.country + '-' + this.identifyConfigService.policyId,
                short_name: this.identifyConfigService.policyId,
                theme_color: '#1976d2',
                background_color: '#fafafa',
                display: 'standalone',
                scope: this.getScope(),
                start_url: this.getStartUrl(),
                icons: [
                  {
                    src: this.getAssetUrl('/assets/icons/icon-72x72.png'),
                    sizes: '72x72',
                    type: 'image/png'
                  },
                  {
                    src: this.getAssetUrl('/assets/icons/icon-96x96.png'),
                    sizes: '96x96',
                    type: 'image/png'
                  },
                  {
                    src: this.getAssetUrl('/assets/icons/icon-128x128.png'),
                    sizes: '128x128',
                    type: 'image/png'
                  },
                  {
                    src: this.getAssetUrl('/assets/icons/icon-144x144.png'),
                    sizes: '144x144',
                    type: 'image/png'
                  },
                  {
                    src: this.getAssetUrl('/assets/icons/icon-152x152.png'),
                    sizes: '152x152',
                    type: 'image/png'
                  },
                  {
                    src: this.getAssetUrl('/assets/icons/icon-192x192.png'),
                    sizes: '192x192',
                    type: 'image/png'
                  },
                  {
                    src: this.getAssetUrl('/assets/icons/icon-384x384.png'),
                    sizes: '384x384',
                    type: 'image/png'
                  },
                  {
                    src: this.getAssetUrl('/assets/icons/icon-512x512.png'),
                    sizes: '512x512',
                    type: 'image/png'
                  }
                ]
              };
            const stringManifest = JSON.stringify(jsonManifest);
            const blobManifest = new Blob([stringManifest], {type: 'application/json'});
            const urlManifest = URL.createObjectURL(blobManifest);

            manifestElement.setAttribute('href', urlManifest);
        }
      }
    }

    private getStartUrl() {
      const origin = this.document.defaultView.location.origin;
      const baseHref = this.identifyConfigService.baseHref;
      const startUrl = origin + baseHref + 'home';

      return startUrl;
    }

    private getScope() {
      const origin = this.document.defaultView.location.origin;
      const baseHref = this.identifyConfigService.baseHref;
      const scope = origin + baseHref;

      return scope;
    }

    private getAssetUrl(assetUrl: string) {
      return this.document.defaultView.location.origin + assetUrl;
    }
}
