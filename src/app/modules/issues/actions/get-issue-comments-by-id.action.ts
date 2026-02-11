import { sleep } from '@helpers/sleep';
import { environment } from 'src/environments/environment';
import { GitHubIssue } from '../interfaces';

const BASE_URL = environment.baseUrl;
const GITHUB_TOKEN = environment.gitHubToken;

const errorMsg = "Couldn't retreive issue";

export const getIssueCommentsById = async (issueId: string): Promise<GitHubIssue[]> => {
  await sleep(1500);

  try {
    const resp = await fetch(`${BASE_URL}/issues/${issueId}/comments`, {
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
      },
    });
    if (!resp.ok) throw errorMsg;

    const issue: GitHubIssue[] = await resp.json();
    // console.log(issue);

    return issue;
  } catch (error) {
    throw errorMsg;
  }
};
