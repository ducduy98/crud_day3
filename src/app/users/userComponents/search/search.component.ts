import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
    selector: 'fis-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
    @Output() search = new EventEmitter<any>();
    keywordSearch: any;

    constructor() {
    }

    ngOnInit(): void {
    }

    onSearch(keyword: any) {
        this.search.emit(keyword);
    }
}
