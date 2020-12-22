import { TestBed } from '@angular/core/testing';
import { ResponsiveUiService } from './ng-responsive-ui.service';


describe('RsesponsiveUiService', () => {
    let service: ResponsiveUiService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(ResponsiveUiService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
