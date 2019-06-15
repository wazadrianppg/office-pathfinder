import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MainService } from '../../../services/main.service'

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
    myControl = new FormControl();
    filteredOptions: Observable<string[]>;

    constructor(
        private mainService: MainService) {
    }

    ngOnInit() {
        this.mainService.options = this.mainService.kitchen.map(x => x.name);
        this.filteredOptions = this.myControl.valueChanges.pipe(
            startWith(''),
            map(value => this._filter(value))
        );
    }

    private _filter(value: string): string[] {
        const filterValue = value.toLowerCase();

        return this.mainService.options.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
    }

    onClickSearch(text: string) {
        let placeIndex: number;
        let helpArray: string[];
        this.mainService.options.forEach((x, index) => { if (x.toLowerCase() == text.toLowerCase()) placeIndex = index; });
        if (placeIndex != undefined) {
            helpArray = [this.mainService.all[placeIndex].numberSVG];
            this.mainService.changeSelect(helpArray);
        }
    }
}