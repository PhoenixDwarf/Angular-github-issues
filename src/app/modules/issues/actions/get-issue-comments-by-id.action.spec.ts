import { environment } from 'src/environments/environment';
import { getIssueCommentsById } from './get-issue-comments-by-id.action';

const BASE_URL = environment.baseUrl;
const GITHUB_TOKEN = environment.gitHubToken;

const mockIssueComments = [
  {
    id: 1,
    number: 123,
    title: 'Test issue 1',
    body: 'Test body',
  },
  {
    id: 2,
    number: 124,
    title: 'Test issue 2',
    body: 'Test body',
  },
  {
    id: 3,
    number: 125,
    title: 'Test issue 3',
    body: 'Test body',
  },
];

describe('getIssueCommentsById', () => {
  const mockIssueId = '1234';
  const errorMsg = "Couldn't retreive issues";

  // Following code will make sure to reset the fetch fn to its original value after the test

  let originalFetch: typeof window.fetch;

  beforeEach(() => {
    originalFetch = window.fetch;
  });

  afterEach(() => {
    window.fetch = originalFetch;
  });

  // ---

  it('Should fetch and return issue comments successfully', async () => {
    window.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockIssueComments),
    });

    const result = await getIssueCommentsById(mockIssueId);

    expect(window.fetch).toHaveBeenCalledWith(`${BASE_URL}/issues/${mockIssueId}/comments`, {
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
      },
    });

    expect(result).toEqual(mockIssueComments);
  });

  it('Should throw an error when response is not ok', async () => {
    window.fetch = vi.fn().mockRejectedValue({
      ok: false,
      status: 404,
      json: vi.fn(),
    });

    await expect(getIssueCommentsById(mockIssueId)).rejects.toBe(errorMsg);
  });

  it('Should throw an error when fetch fails', async () => {
    window.fetch = vi.fn().mockRejectedValue(new Error('Network error'));

    await expect(getIssueCommentsById(mockIssueId)).rejects.toBe(errorMsg);
  });
});
