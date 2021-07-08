import { AfterContentInit, ChangeDetectionStrategy, Component, Inject, Input } from '@angular/core';
import { NgxMaterialTimepickerHoursFace } from '../timepicker-hours-face/ngx-material-timepicker-hours-face';
import { disableHours } from '../../utils/timepicker-time.utils';
import { TIME_LOCALE } from '../../tokens/time-locale.token';

@Component({
    selector: 'ngx-material-timepicker-24-hours-face',
    templateUrl: 'ngx-material-timepicker-24-hours-face.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class NgxMaterialTimepicker24HoursFaceComponent extends NgxMaterialTimepickerHoursFace implements AfterContentInit {
    private _locale: string;
    @Input() set locale(value: string) {
        this._locale = value;
    }
    get locale() { return this._locale || this.timeLocale; }

    constructor(@Inject(TIME_LOCALE) private timeLocale: string) {
        super(24);
    }

    ngAfterContentInit() {
        this.hoursList = disableHours(this.hoursList, {
            min: this.minTime,
            max: this.maxTime,
            format: this.format
        });
    }
}
