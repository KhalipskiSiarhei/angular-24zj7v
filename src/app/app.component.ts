import { Inject, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PwaService } from './services/pwa.service';
import {ManifestService} from './services/manifest.service';
import { IdentityConfigService } from './services/identity-config.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'pwa-poc!!!';

  constructor(private router: Router,
              public pwaService: PwaService,
              private manifestService: ManifestService,
              private identityConfigService: IdentityConfigService) {
  }

  ngOnInit(): void {
    if (this.identityConfigService.initialized) {
      this.pwaService.subscribeToPromt();
      this.pwaService.subscribeToCheckForUpdates();
      this.pwaService.subscribeToManageNewAvailableVersions();
      this.pwaService.subscribeToAppInstalled();

      this.manifestService.injectManifest();
    } else {
      this.router.navigate(['/not-found']);
    }
  }

  public showAddHomePagePopup() {
    this.pwaService.showAddHomePagePopup();
  }

  public get isIdentityConfigInitialized() {
    return this.identityConfigService.initialized;
  }
}
