import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Issues } from '../../services/issues';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-issues-list-page',
  imports: [RouterLink, JsonPipe],
  templateUrl: './issues-list-page.html',
})
export default class IssuesListPage {
  issuesService = inject(Issues);

  get labelsQuery() {
    return this.issuesService.labelsQuery;
  }
}
