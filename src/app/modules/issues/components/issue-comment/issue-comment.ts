import { Component, input } from '@angular/core';
import { GitHubIssue } from '../../interfaces';
import { MarkdownComponent } from 'ngx-markdown';

@Component({
  selector: 'issue-comment',
  imports: [MarkdownComponent],
  templateUrl: './issue-comment.html',
})
export class IssueComment {
  issue = input.required<GitHubIssue>();
}
