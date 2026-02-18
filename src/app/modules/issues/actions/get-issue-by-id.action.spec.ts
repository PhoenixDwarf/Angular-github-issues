import { environment } from 'src/environments/environment';
import { getIssueById } from './get-issue-by-id.action';

const BASE_URL = environment.baseUrl;
const GITHUB_TOKEN = environment.gitHubToken;

const mockIssue = {
  id: 1,
  number: 123,
  title: 'Test issue',
  body: 'Test body',
};

describe('getIssueById', () => {
  const mockIssueNumber = '123';

  // Following code will make sure to reset the fetch fn to its original value after the test

  let originalFetch: typeof window.fetch;

  beforeEach(() => {
    originalFetch = window.fetch;
  });

  afterEach(() => {
    window.fetch = originalFetch;
  });

  // ---

  it('Should fetch and return an issue successfully', async () => {
    console.log('FETCH', window.fetch);

    window.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockIssue),
    });

    const result = await getIssueById(mockIssueNumber);
    console.log(result);

    expect(window.fetch).toHaveBeenCalledWith(`${BASE_URL}/issues/${mockIssueNumber}`, {
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
      },
    });

    expect(result).toEqual(mockIssue);
  });
});
