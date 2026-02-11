import { Injectable, signal } from '@angular/core';
import { injectQuery } from '@tanstack/angular-query-experimental';
import { getIssueByNumber } from '../actions';

@Injectable({
  providedIn: 'root',
})
export class Issue {
  private issueId = signal<string | null>(null);

  public issueQuery = injectQuery(() => ({
    queryKey: ['issue', this.issueId()],
    queryFn: () => getIssueByNumber(this.issueId()!),
    enabled: this.issueId() !== null,
  }));

  setIssueId(id: string) {
    this.issueId.set(id);
  }
}
