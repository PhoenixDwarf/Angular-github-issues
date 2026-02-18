import { TestBed } from '@angular/core/testing';
import {
  injectQuery,
  provideTanStackQuery,
  QueryClient,
} from '@tanstack/angular-query-experimental';
import { Issues } from './issues';
import { State } from '../interfaces';
import { ApplicationRef } from '@angular/core';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false, // ✅ faster failure tests
    },
  },
});

describe('IssuesService', () => {
  let service: Issues;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideTanStackQuery(queryClient)],
    });
    service = TestBed.inject(Issues);
  });

  afterEach(() => {
    queryClient.clear();
  });

  it('Should be created', () => {
    expect(service).toBeTruthy();
  });

  /**
   * This only evaluates that the properties exist in the service
   */
  it('Should be created with default values', () => {
    expect(service.selectedState()).toBe(State.All);
    expect(service.selectedLabels()).toEqual(new Set<string>());
    expect(service.labelsQuery.isLoading()).toBe(true);
    expect(service.issuesQuery.isLoading()).toBe(true);
  });

  it('Should set selectedLabels', () => {
    const label = 'Accessibility';

    service.toggleLabel(label);
    expect(service.selectedLabels().has(label)).toBe(true);

    service.toggleLabel(label);
    expect(service.selectedLabels().has(label)).toBe(false);
  });

  it('Should set selected state, OPEN, CLOSE, ALL', () => {
    service.showIssuesByState(State.Closed);
    expect(service.selectedState()).toBe(State.Closed);

    service.showIssuesByState(State.Open);
    expect(service.selectedState()).toBe(State.Open);

    service.showIssuesByState(State.All);
    expect(service.selectedState()).toBe(State.All);
  });

  /**
   * Following test suggested by the tanstack testing documentation works unstably or intermittently
   * Sometimes it passess and sometimes it does not
   * (CHECK THE VERSION OF THE APP) This may have been fixed in higher versions of vitest/angular/tanstack
   */

  // it('Default test from tanstack angular testing page', async () => {
  //   const appRef = TestBed.inject(ApplicationRef);
  //   const query = TestBed.runInInjectionContext(() =>
  //     injectQuery(() => ({
  //       queryKey: ['greeting'], // When changing this to 'labels' then it does not work. Why? Who knows
  //       queryFn: () => 'Hello',
  //     })),
  //   );

  //   TestBed.tick(); // Trigger effect

  //   // Application is stable when queries are idle
  //   await appRef.whenStable();

  //   expect(query.status()).toBe('success');
  //   expect(query.data()).toBe('Hello');
  // });

  /**
   * Following test hits the backend, therefore might not be ideal
   * This is rather an integration test than an unit test since we are also evaluating the action
   * Also, we are evaluating the types of the returned data that may change in the backend
   */

  it('Should resolve labelsQuery when is called', async () => {
    expect(service.labelsQuery.status()).toBe('pending');

    const { status, data } = await service.labelsQuery.refetch();

    // console.log(data);

    TestBed.tick();

    console.log({ service: service.labelsQuery.data() });

    expect(status).toBe('success');
    expect(data?.length).toBe(30);

    const label = data!.at(0)!;

    expect(typeof label.id).toBe('number'); // 2732535159
    expect(typeof label.node_id).toBe('string'); // 'MDU6TGFiZWwyNzMyNTM1MTU5'
    expect(typeof label.url).toBe('string'); // 'https://api.github.com/repos/angular/angular/labels/Accessibility'
    expect(typeof label.name).toBe('string'); // 'Accessibility'
    expect(typeof label.color).toBe('string'); // 'b52eea'
    expect(typeof label.default).toBe('boolean'); // false
    expect(typeof label.description).toBe('string'); // 'issues related to accessibility (a11y)'
  });

  /**
   * Following test hits the backend as well, therefore we must create mocks to avoid it
   */

  it('Should set selectedLabels and get issues by Label', async () => {
    const testLabel = 'Accessibility';
    service.toggleLabel(testLabel);
    expect(service.selectedLabels().has(testLabel)).toBe(true);

    TestBed.tick();

    const { data, status } = await service.issuesQuery.refetch();

    expect(status).toBe('success');

    data!.forEach((issue) => {
      const hasLabel = issue.labels.some((label) => label.name === testLabel);
      expect(hasLabel).toBe(true);
    });
  });
});
