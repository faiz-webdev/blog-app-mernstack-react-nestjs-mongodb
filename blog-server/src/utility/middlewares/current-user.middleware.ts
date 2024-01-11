import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { UserService } from "src/user/user.service";
import {ObjectId} from 'mongodb';
import { User } from "src/user/models/user.model";

declare global{
    namespace Express{
        interface Request{
            currentUser?:User;
        }
    }
}

@Injectable()
export class CurrentUserMiddleware implements NestMiddleware{
    constructor(private readonly userService:UserService){}

    async use(req:Request,res:Response,next:NextFunction){
        try{
            const {jwt}=req.cookies;
            const {_id}=<JwtPayload>(verify(jwt,process.env.TOKEN_SECRET));
            const currentUser=await this.userService.findOneForMiddleware(new ObjectId(_id));
            req.currentUser=currentUser;
            next();
        }catch(error){
            req.currentUser=null;
            next();
        }
    }
}

interface JwtPayload{
    _id:string;
}