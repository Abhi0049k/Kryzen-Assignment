const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();

jest.mock('../../models/user.model');
jest.mock('jsonwebtoken');
jest.mock('bcrypt');

describe('Auth Controller', ()=>{
    beforeAll(()=>{
        jest.spyOn(console, 'error').mockImplementation(()=>{});
    })

    afterEach(()=>{
        jest.clearAllMocks();
    })

    afterAll(()=>{
        jest.restoreAllMocks();
    })

    describe('Register Function', ()=>{
        it('registers a new user successfully', async()=>{
            const req={
                body: {
                    name: 'Naruto',
                    email: 'naruto@example.com',
                    password: '123456789'
                }
            };
            const res = {
                status: jest.fn(()=> res),
                send: jest.fn()
            };
            const next = jest.fn();

            userModel.findOne.mockResolvedValue(null);
            bcrypt.hash.mockResolvedValue('hashedpassword');
            const saveSpy = jest.spyOn(userModel.prototype, 'save');

            await register(req, res, next);

            expect(saveSpy).toHaveBeenCalledTimes(1);
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.send).toHaveBeenCalledWith({message: 'User Added'});
            expect(next).not.toHaveBeenCalled();
        });

        it('handles validation error', async()=>{
            const req = {
                body: {
                    name: 'Naruto',
                    email: 'mail@gmail.com',
                    password: '123456789'
                }
            }
            const res = {
                status: jest.fn(()=>res),
                send: jest.fn()
            };
            const next = jest.fn();

            await register(req,res, next);

            expect(res.status).toHaveBeenCalledWith(422);
            expect(res.send).toHaveBeenCalledWith({status: 422, message: 'Invalid Credentials'});
            expect(next).not.toHaveBeenCalled();
        })
    });

    describe('Login Function', () => {
        it('logs in a user successfully', async () => {
          const req = {
            body: {
              email: 'naruto@example.com',
              password: '123456789',
            },
          };
          const res = {
            status: jest.fn(() => res),
            send: jest.fn(),
          };
          const next = jest.fn();
    
          userModel.findOne.mockResolvedValue({
            email: 'naruto@example.com',
            password: '123456789',
          });
          bcrypt.compare.mockResolvedValue(true);
          jwt.sign.mockReturnValue('mockedtoken');
    
          await login(req, res, next);
    
          expect(res.status).toHaveBeenCalledWith(200);
          expect(res.send).toHaveBeenCalledWith({ token: 'mockedtoken' });
          expect(next).not.toHaveBeenCalled();
        });
    
        it('handles user not found error', async () => {
          const req = {
            body: {
              email: 'sfasdfafsad@example.com',
              password: '123456789',
            },
          };
          const res = {
            status: jest.fn(() => res),
            send: jest.fn(),
          };
          const next = jest.fn();
    
          userModel.findOne.mockResolvedValue(null);
    
          await login(req, res, next);
    
          expect(res.status).toHaveBeenCalledWith(401);
          expect(res.send).toHaveBeenCalledWith({ status: 401, message: 'User not found' });
          expect(next).not.toHaveBeenCalled();
        })
      })
})