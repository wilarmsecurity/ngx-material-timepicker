import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { TimePeriod } from '../../models/time-period.enum';
import { TimeUnit } from '../../models/time-unit.enum';
import { ClockFaceTime } from '../../models/clock-face-time.interface';
import { animate, sequence, style, transition, trigger } from '@angular/animations';
import { DateTime } from 'luxon';
import { disableHours, disableMinutes } from '../../utils/timepicker-time.utils';
import { TIME_LOCALE } from '../../tokens/time-locale.token';

@Component({
    selector: 'ngx-material-timepicker-period',
    templateUrl: 'ngx-material-timepicker-period.component.html',
    styleUrls: ['ngx-material-timepicker-period.component.scss'],
    animations: [
        trigger('scaleInOut', [
            transition(':enter', [
                style({transform: 'scale(0)'}),
                animate('.2s', style({transform: 'scale(1)'})),
                sequence([
                    animate('3s', style({opacity: 1})),
                    animate('.3s', style({opacity: 0}))
                ])
            ])
        ])
    ]
})
export class NgxMaterialTimepickerPeriodComponent {

    timePeriod = TimePeriod;
    isPeriodAvailable = true;

    @Input() selectedPeriod: TimePeriod;
    @Input() format: number;
    @Input() activeTimeUnit: TimeUnit;
    @Input() hours: ClockFaceTime[];
    @Input() minutes: ClockFaceTime[];
    @Input() minTime: DateTime;
    @Input() maxTime: DateTime;
    @Input() selectedHour: number | string;
    @Input() meridiems: string[];
    private _locale: string;
    @Input() set locale(value: string) { this._locale = value; }
    get locale() { return this._locale || this.timeLocale; }

    @Output() periodChanged = new EventEmitter<TimePeriod>();

    constructor(@Inject(TIME_LOCALE) public timeLocale: string) {
    }

    changePeriod(period: TimePeriod): void {
        this.isPeriodAvailable = this.isSwitchPeriodAvailable(period);
        if (this.isPeriodAvailable) {
            this.periodChanged.next(period);
        }
    }

    animationDone(): void {
        this.isPeriodAvailable = true;
    }

    private isSwitchPeriodAvailable(period: TimePeriod): boolean {
        const time = this.getDisabledTimeByPeriod(period);
        return !time.every(t => t.disabled);
    }

    private getDisabledTimeByPeriod(period: TimePeriod): ClockFaceTime[] {
        switch (this.activeTimeUnit) {
            case TimeUnit.HOUR:
                return disableHours(this.hours, {
                    min: this.minTime,
                    max: this.maxTime,
                    format: this.format,
                    period
                });
            case TimeUnit.MINUTE:
                return disableMinutes(this.minutes, +this.selectedHour, {
                    min: this.minTime,
                    max: this.maxTime,
                    format: this.format,
                    period
                });
            default:
                throw new Error('no such TimeUnit');
        }
    }
}
