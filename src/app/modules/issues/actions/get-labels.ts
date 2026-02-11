import { sleep } from '@helpers/sleep';
import { GitHubLabel } from '../interfaces/github-label.interface';

const errorMsg = "Couldn't retreive labels";

export const getLabels = async (): Promise<GitHubLabel[]> => {
  await sleep(1500);

  try {
    const resp = await fetch(`https://api.github.com/repos/angular/angular/labels`);
    if (!resp.ok) throw errorMsg;

    const labels: GitHubLabel[] = await resp.json();
    console.log(labels);

    return labels;
  } catch (error) {
    throw errorMsg;
  }
};
