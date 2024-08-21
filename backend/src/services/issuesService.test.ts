import { Request, Response } from 'express';
import {
  getIssues,
  createIssue,
  updateIssue,
  deleteIssue,
} from './issuesService';

let mockIssues = [
  { id: 1, title: 'Test Issue 1', description: 'Description 1' },
  { id: 2, title: 'Test Issue 2', description: 'Description 2' },
];

const mockRequest = (body?: any, params?: any): Partial<Request> => ({
  body,
  params,
} as Partial<Request>);

const mockResponse = (): Partial<Response> => {
  const res: Partial<Response> = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  res.send = jest.fn().mockReturnValue(res);
  return res;
};

describe('Issue Service', () => {
  beforeEach(() => {
    mockIssues = [
      { id: 1, title: 'Test Issue 1', description: 'Description 1' },
      { id: 2, title: 'Test Issue 2', description: 'Description 2' },
    ];
  });

  test('getIssues should return all issues', () => {
    const req = mockRequest();
    const res = mockResponse();

    getIssues(req as Request, res as Response);

    expect(res.json).toHaveBeenCalledWith(mockIssues);
  });

  test('createIssue should create a new issue', () => {
    const newIssue = { title: 'New Issue', description: 'New Description' };
    const req = mockRequest(newIssue);
    const res = mockResponse();

    createIssue(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
      id: expect.any(Number),
      ...newIssue,
    }));
  });

  test('updateIssue should update an existing issue', () => {
    const updatedIssue = { title: 'Updated Title', description: 'Updated Description' };
    const req = mockRequest(updatedIssue, { id: '1' });
    const res = mockResponse();

    updateIssue(req as Request, res as Response);

    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
      id: 1,
      ...updatedIssue,
    }));
  });
});
