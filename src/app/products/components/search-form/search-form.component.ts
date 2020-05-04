import {Component, OnInit, Output, EventEmitter} from '@angular/core';

@Component({
    selector: 'fis-search-form',
    templateUrl: './search-form.component.html',
    styleUrls: ['./search-form.component.scss']
})
export class SearchFormComponent implements OnInit {

    @Output() search = new EventEmitter<any>();

    constructor() {
    }

    keywordSearch: any;

    ngOnInit(): void {
    }

    onSearch(keyword: any) {
        this.search.emit(keyword);
    }

}
