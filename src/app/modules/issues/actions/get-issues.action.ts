import { sleep } from '@helpers/sleep';
import { environment } from 'src/environments/environment';
import { GitHubIssue } from '../interfaces';

const BASE_URL = environment.baseUrl;
const GITHUB_TOKEN = environment.gitHubToken;

const errorMsg = "Couldn't retreive issues";

export const getIssues = async (): Promise<GitHubIssue[]> => {
  await sleep(1500);

  try {
    const resp = await fetch(`${BASE_URL}/issues`, {
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
      },
    });
    if (!resp.ok) throw errorMsg;

    const issues: GitHubIssue[] = await resp.json();
    // console.log(issues);

    return issues;
  } catch (error) {
    throw errorMsg;
  }
};
