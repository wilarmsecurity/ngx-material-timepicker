import { ChangeDetectionStrategy, Component, Inject, Input, OnChanges, SimpleChanges } from '@angular/core';
import { NgxMaterialTimepickerHoursFace } from '../timepicker-hours-face/ngx-material-timepicker-hours-face';
import { TimePeriod } from '../../models/time-period.enum';
import { disableHours } from '../../utils/timepicker-time.utils';
import { TIME_LOCALE } from '../../tokens/time-locale.token';


@Component({
    selector: 'ngx-material-timepicker-12-hours-face',
    templateUrl: 'ngx-material-timepicker-12-hours-face.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class NgxMaterialTimepicker12HoursFaceComponent extends NgxMaterialTimepickerHoursFace implements OnChanges {
    private _locale: string;
    @Input() period: TimePeriod;
    @Input() set locale(value: string) {
        this._locale = value;
    }
    get locale() { return this._locale || this.timeLocale; }

    constructor(@Inject(TIME_LOCALE) private timeLocale: string) {
        super(12);
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes['period'] && changes['period'].currentValue) {
            this.hoursList = disableHours(this.hoursList, {
                min: this.minTime,
                max: this.maxTime,
                format: this.format,
                period: this.period
            });
        }
    }
}
