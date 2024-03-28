const jwt = require('jsonwebtoken');
const { AuthMiddleware } = require('../Middlewares/AuthMiddleware');

jest.mock('jsonwebtoken');

describe('AuthMiddleware2', () => {
  let req, res, next;

  beforeEach(() => {
    req = {
      headers: {}
    };
    res = {
      status: jest.fn(() => res),
      send: jest.fn()
    };
    next = jest.fn();
  });

  it('should return 401 status and "Token not found" message if token is not provided', () => {
    AuthMiddleware(req, res, next);
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.send).toHaveBeenCalledWith('Token not found');
    expect(next).not.toHaveBeenCalled();
  });

  it('should return 403 status and "Invalid token" message if token is invalid', () => {
    req.headers['authorization'] = 'Bearer invalidToken';
    jwt.verify.mockImplementationOnce((token, key, callback) => {
      callback(new Error('Invalid token'));
    });

    AuthMiddleware(req, res, next);

    expect(jwt.verify).toHaveBeenCalledWith('invalidToken', process.env.TOKEN_KEY, expect.any(Function));
    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.send).toHaveBeenCalledWith('Invalid token');
    expect(next).not.toHaveBeenCalled();
  });

  it('should call next() if token is valid', () => {
    req.headers['authorization'] = 'Bearer validToken';
    jwt.verify.mockImplementationOnce((token, key, callback) => {
      callback(null, { userId: 123 });
    });

    AuthMiddleware(req, res, next);

    expect(jwt.verify).toHaveBeenCalledWith('validToken', process.env.TOKEN_KEY, expect.any(Function));
    expect(next).toHaveBeenCalled();
  });
});