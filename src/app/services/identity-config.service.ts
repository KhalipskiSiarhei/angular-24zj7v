import { Injectable } from '@angular/core';

@Injectable()
export class IdentityConfigService {
    private vendorSrc: string;
    private countrySrc: string;
    private policyIdSrc: string;
    private initSrc: boolean;

    constructor() {
    }

    public get initialized(): boolean {
        return this.initSrc;
    }

    public get vendor(): string {
        if (this.initialized) {
            return this.vendorSrc;
        }
        return null;
    }

    public get country(): string {
        if (this.initialized) {
            return this.countrySrc;
        }
        return null;
    }

    public get policyId(): string {
        if (this.initialized) {
            return this.policyIdSrc;
        }
        return null;
    }

    public get baseHref(): string {
        if (this.initialized) {
            return '/' + this.vendor + '/' + this.country + '/' + this.policyIdSrc + '/';
        }
        return null;
    }

    public init(document: Document) {
        const paths: string[] = document.location.pathname.split('/').filter(p => p);

        if (paths.length >= 3) {
          this.vendorSrc = paths[0];
          this.countrySrc = paths[1];
          this.policyIdSrc = paths[2];
          this.initSrc = true;
        } else {
            this.initSrc = false;
        }

        return this.initSrc;
    }
}
