import express, { Request, Response } from "express";
import { saveRewardMember, updateRewardMember } from './rewardMemberService';
import { log } from '../logger/logger';
import { HandelException, ExceptionMessage } from "../error/exceptionHandeler";

export const rewardMemberRouter = express.Router();


rewardMemberRouter.post("/", async (req: Request, res: Response) => {
  log.info("Member Reward post request", req.body);
  try {
    const result = await saveRewardMember(req.body);
    if (result === 1) {
      res.status(200).json({ sucess: 'New Member Reward created' });
    }
  }
  catch (err) {
    log.error("Member Reward create", err);
    const exceptionMessage: ExceptionMessage = HandelException(err);
    res.status(exceptionMessage.code).json({ errormessage: exceptionMessage.message, errorCode: exceptionMessage.code });
  }
});


rewardMemberRouter.put("/", async (req: Request, res: Response) => {
  log.info("Member Reward put request", req.body);
  try {
    const result = await updateRewardMember(req.body);
    if (result === 1) {
      res.status(200).json({ sucess: 'Member Reward updated' });
    } else {
      res.status(404).json({ error: 'Member Reward not found' });
    }
  }
  catch (err) {
    log.error("Member Reward create", err);
    const exceptionMessage: ExceptionMessage = HandelException(err);
    res.status(exceptionMessage.code).json({ errormessage: exceptionMessage.message, errorCode: exceptionMessage.code });
  }
});

