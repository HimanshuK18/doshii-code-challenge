import express, { Request, Response } from "express";
import { log } from '../logger/logger';
import { ErrorCustom } from "../error/errorCustom";
import { HandelException, ExceptionMessage } from "../error/exceptionHandeler";
import { getAllRewards, getRewardByID, saveReward, updateReward, searchRewards } from '../rewards/rewardService';

export const rewardsRouter = express.Router();


rewardsRouter.get("/", async (req: Request, res: Response) => {
  try {
    const allRewards = await getAllRewards()
    res.json(allRewards);
  }
  catch (err) {
    log.error("Reward create", err);
    const exceptionMessage: ExceptionMessage = HandelException(err);
    res.status(exceptionMessage.code).json({ errormessage: exceptionMessage.message, errorCode: exceptionMessage.code });
  }
});


rewardsRouter.get('/:rewardID', async (req: Request, res: Response) => {
  try {
    const rewardId = req.params.rewardID;
    const reward = await getRewardByID(rewardId);

    if (reward) {
      res.json(reward);
    } else {
      res.status(404).json({ error: 'Reward not found' });
    }
  } catch (error) {
    const exceptionMessage: ExceptionMessage = HandelException(error);
    res.status(exceptionMessage.code).json({ errormessage: exceptionMessage.message, errorCode: exceptionMessage.code });

  }
});

rewardsRouter.post("/", async (req: Request, res: Response) => {
  log.info("Reward post request", req.body);
  try {
    const result = await saveReward(req.body);
    if (result === 1) {
      res.status(200).json({ sucess: 'New Reward created' });
    }
  }
  catch (err) {
    log.error("Reward create", err);
    const exceptionMessage: ExceptionMessage = HandelException(err);
    res.status(exceptionMessage.code).json({ errormessage: exceptionMessage.message, errorCode: exceptionMessage.code });
  }
});

rewardsRouter.put("/", async (req: Request, res: Response) => {
  log.info("Reward put request", req.body);
  try {
    const result = await updateReward(req.body);
    if (result === 1) {
      res.status(200).json({ sucess: 'Reward updated' });
    }
  }
  catch (err) {
    log.error("Reward update", err);
    const exceptionMessage: ExceptionMessage = HandelException(err);
    res.status(exceptionMessage.code).json({ errormessage: exceptionMessage.message, errorCode: exceptionMessage.code });
  }
});

rewardsRouter.get('/searchreward/:seachPhrase', async (req: Request, res: Response) => {
  try {
    const rewardSearchPhrase = req.params.seachPhrase;
    const member = await searchRewards(rewardSearchPhrase);

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