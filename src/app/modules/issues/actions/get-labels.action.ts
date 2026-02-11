import { sleep } from '@helpers/sleep';
import { GitHubLabel } from '../interfaces/github-label.interface';
import { environment } from 'src/environments/environment';

const BASE_URL = environment.baseUrl;
const GITHUB_TOKEN = environment.gitHubToken;

const errorMsg = "Couldn't retreive labels";

export const getLabels = async (): Promise<GitHubLabel[]> => {
  await sleep(1500);

  try {
    const resp = await fetch(`${BASE_URL}/labels`, {
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
      },
    });
    if (!resp.ok) throw errorMsg;

    const labels: GitHubLabel[] = await resp.json();
    console.log(labels);

    return labels;
  } catch (error) {
    throw errorMsg;
  }
};
