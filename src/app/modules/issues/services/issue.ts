import { Injectable, signal } from '@angular/core';
import { injectQuery } from '@tanstack/angular-query-experimental';
import { getIssueById, getIssueCommentsById } from '../actions';

@Injectable({
  providedIn: 'root',
})
export class Issue {
  private issueId = signal<string | null>(null);

  public issueQuery = injectQuery(() => ({
    queryKey: ['issue', this.issueId()],
    queryFn: () => getIssueById(this.issueId()!),
    enabled: this.issueId() !== null,
  }));

  public commentsQuery = injectQuery(() => ({
    queryKey: ['issue', this.issueId(), 'comments'],
    queryFn: () => getIssueCommentsById(this.issueId()!),
    enabled: this.issueId() !== null,
  }));

  setIssueId(id: string) {
    this.issueId.set(id);
  }
}
