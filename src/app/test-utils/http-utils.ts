import { HttpTestingController } from '@angular/common/http/testing';

export type MockedRequest = {
  method: string;
  url: string;
  body?: any;
};

export function flushRequests(
  httpMock: HttpTestingController,
  mockedRequests: MockedRequest[]
): void {
  mockedRequests.forEach((mockedRequest) => {
    httpMock
      .match({
        method: mockedRequest.method,
        url: mockedRequest.url,
      })
      .forEach((req) => {
        req.flush(mockedRequest.body);
      });
  });
}
