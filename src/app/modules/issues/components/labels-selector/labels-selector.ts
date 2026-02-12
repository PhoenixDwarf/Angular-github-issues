import { Component, inject, input } from '@angular/core';
import { GitHubLabel } from '../../interfaces';
import { NgStyle } from '@angular/common';
import { Issues } from '../../services/issues';

@Component({
  selector: 'issue-labels-selector',
  imports: [NgStyle],
  templateUrl: './labels-selector.html',
})
export class LabelsSelector {
  labels = input.required<GitHubLabel[]>();
  issuesService = inject(Issues);

  isSelected(labelName: string) {
    return this.issuesService.selectedLabels().has(labelName);
  }

  toggleLabel(labelName: string) {
    this.issuesService.toggleLabel(labelName);
  }
}
