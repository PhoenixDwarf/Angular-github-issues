import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { map, tap } from 'rxjs';
import { Issue } from '../../services/issue';
import { IssueComment } from '../../components/issue-comment/issue-comment';

@Component({
  selector: 'app-issue-page',
  imports: [RouterLink, IssueComment],
  templateUrl: './issue-page.html',
})
export default class IssuePage {
  route = inject(ActivatedRoute);
  issueService = inject(Issue);

  issueNumber = toSignal<string>(
    this.route.paramMap.pipe(
      map((params) => params.get('id') ?? ''),
      tap((id) => this.issueService.setIssueId(id)),
    ),
  );

  public issueQuery = this.issueService.issueQuery;
}
