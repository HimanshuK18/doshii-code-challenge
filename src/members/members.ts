import express, { Request, Response } from "express";
import { getAllMembers, getMembersByEmailID, saveMember, updateMember, deleteMember, searchMembers } from './memberService';
import { log } from '../logger/logger';
import { ErrorCustom } from "../error/errorCustom";
import { HandelException, ExceptionMessage } from "../error/exceptionHandeler";

export const memberRouter = express.Router();

memberRouter.get("/", async (req: Request, res: Response) => {
  try {
    const allMembers = await getAllMembers()
    res.json(allMembers);
  }
  catch (err) {
    log.error("Member create", err);
    const exceptionMessage: ExceptionMessage = HandelException(err);
    res.status(exceptionMessage.code).json({ errormessage: exceptionMessage.message, errorCode: exceptionMessage.code });
  }

});

memberRouter.get('/:emailID', async (req: Request, res: Response) => {
  try {
    const memberEmailId = req.params.emailID;
    const includeRewards = req.query.includeRewards === 'true';
    const propertiesToReturn = req.query.includeProperties as string;
    const member = await getMembersByEmailID(memberEmailId, includeRewards, propertiesToReturn);

    if (member) {
      res.json(member);
    } else {
      res.status(404).json({ error: 'Member not found' });
    }
  } catch (error) {
    if (error instanceof ErrorCustom) {
      if (error.code === 404) {
        res.status(404).json(error);
      }
    } else {
      const exceptionMessage: ExceptionMessage = HandelException(error);
      res.status(exceptionMessage.code).json({ errormessage: exceptionMessage.message, errorCode: exceptionMessage.code });
    }
  }
});


memberRouter.post("/", async (req: Request, res: Response) => {
  log.info("Member post request", req.body);
  try {
    const result = await saveMember(req.body);
    if (result === 1) {
      res.status(200).json({ sucess: 'New Member created' });
    }
  }
  catch (err) {
    log.error("Member create", err);
    const exceptionMessage: ExceptionMessage = HandelException(err);
    res.status(exceptionMessage.code).json({ errormessage: exceptionMessage.message, errorCode: exceptionMessage.code });
  }
});

memberRouter.put("/", async (req: Request, res: Response) => {
  log.info("Member put request", req.body);
  try {
    const result = await updateMember(req.body);
    if (result === 1) {
      res.status(200).json({ sucess: 'Member updated' });
    } else {
      res.status(200).json({ sucess: 'Member not found.' });
    }
  }
  catch (err) {
    log.error("Member update", err);
    const exceptionMessage: ExceptionMessage = HandelException(err);
    res.status(exceptionMessage.code).json({ errormessage: exceptionMessage.message, errorCode: exceptionMessage.code });
  }
});

memberRouter.delete("/", async (req: Request, res: Response) => {
  log.info("Member delete request", req.body);
  try {
    const result = await deleteMember(req.body.memberID);
    if (result === 1) {
      res.status(200).json({ sucess: 'Member and corresponding rewards deleted.' });
    } else {
      res.status(200).json({ sucess: 'Member not found.' });
    }
  }
  catch (err) {
    log.error("Member delete", err);
    const exceptionMessage: ExceptionMessage = HandelException(err);
    res.status(exceptionMessage.code).json({ errormessage: exceptionMessage.message, errorCode: exceptionMessage.code });
  }
});


memberRouter.get('/searchmember/:seachPhrase', async (req: Request, res: Response) => {
  try {
    const memberSeachPhrase = req.params.seachPhrase;
    const member = await searchMembers(memberSeachPhrase);

    if (member) {
      res.json(member);
    } else {
      res.status(200).json({ sucess: 'No member found' });
    }
  } catch (error) {
    if (error instanceof ErrorCustom) {
      if (error.code === 404) {
        res.status(404).json(error);
      }
    } else {
      const exceptionMessage: ExceptionMessage = HandelException(error);
      res.status(exceptionMessage.code).json({ errormessage: exceptionMessage.message, errorCode: exceptionMessage.code });
    }
  }
});