import * as express from 'express';

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        name: string;
        email: string;
        role: string;
        admin_stan?: {
          id: string;
          stan_id: string;  
        }
      };
    }
  }
}