import { inject, Injectable, signal } from '@angular/core';
import { injectQuery, QueryClient } from '@tanstack/angular-query-experimental';
import { getIssueById, getIssueCommentsById } from '../actions';
import { GitHubIssue } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class Issue {
  private issueId = signal<string | null>(null);
  private queryClient = inject(QueryClient);

  public issueQuery = injectQuery(() => ({
    queryKey: ['issue', this.issueId()],
    queryFn: () => getIssueById(this.issueId()!),
    enabled: this.issueId() !== null,
    staleTime: 1000 * 60 * 5,
  }));

  public commentsQuery = injectQuery(() => ({
    queryKey: ['issue', this.issueId(), 'comments'],
    queryFn: () => getIssueCommentsById(this.issueId()!),
    enabled: this.issueId() !== null,
  }));

  setIssueId(id: string) {
    this.issueId.set(id);
  }

  prefetchIssue(issueId: string) {
    this.queryClient.prefetchQuery({
      queryKey: ['issue', issueId], // Stric type here, make sure you use the right type
      queryFn: () => getIssueById(issueId),
      staleTime: 1000 * 60 * 5, // How much time the state remains fresh/stale
    });
  }

  setIssueData(issue: GitHubIssue) {
    this.queryClient.setQueryData(['issue', issue.number.toString()], issue, {
      updatedAt: Date.now() + 1000 * 60,
    });
  }
}
