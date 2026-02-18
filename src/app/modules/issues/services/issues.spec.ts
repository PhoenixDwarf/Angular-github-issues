import { TestBed } from '@angular/core/testing';
import { provideTanStackQuery, QueryClient } from '@tanstack/angular-query-experimental';
import { Issues } from './issues';
import { State } from '../interfaces';

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
});
