


import { getCsrfToken, getProviders } from "next-auth/react";
import { PrismaClient } from '@prisma/client';
import {clientDB} from '../db';

export default async (req, res)=>{


  return res.json({error:"NOTFOUND"});
};