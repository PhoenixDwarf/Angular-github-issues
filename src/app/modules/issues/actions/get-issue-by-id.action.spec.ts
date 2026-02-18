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
  const errorMsg = "Couldn't retreive issue";

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
    window.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockIssue),
    });

    const result = await getIssueById(mockIssueNumber);
    // console.log(result);

    expect(window.fetch).toHaveBeenCalledWith(`${BASE_URL}/issues/${mockIssueNumber}`, {
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
      },
    });

    expect(result).toEqual(mockIssue);
  });

  it('Should throw an error when response is not ok', async () => {
    window.fetch = vi.fn().mockRejectedValue({
      ok: false,
      status: 404,
      json: vi.fn(),
    });

    // const response = await getIssueById(mockIssueNumber);
    // console.log(response);

    await expect(getIssueById(mockIssueNumber)).rejects.toBe(
      errorMsg + ` #${mockIssueNumber}. - catch`,
    );
  });

  it('Should throw an error when fetch fails', async () => {
    window.fetch = vi.fn().mockRejectedValue(new Error('Network error'));

    await expect(getIssueById(mockIssueNumber)).rejects.toBe(
      errorMsg + ` #${mockIssueNumber}. - catch`,
    );
  });
});
