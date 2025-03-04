import express from 'express';
import { handlerWrapper } from './utils';
import TreeModel, {Tree} from '../models/Tree';
import Joi from 'joi';
import Session from '../infra/database/Session';
import TreeRepository from '../infra/database/TreeRepository';

const router = express.Router();

router.get('/featured', handlerWrapper(async (req, res, next) => {
  const repo = new TreeRepository(new Session());
  const exe = TreeModel.getFeaturedTree(repo);
  const result = await exe();
  res.send({
    trees: result,
  });
  res.end();
}));

router.get('/:id', handlerWrapper(async (req, res, next) => {
  Joi.assert(req.params.id, Joi.number().required());
  const repo = new TreeRepository(new Session());
  const exe = TreeModel.getById(repo);
  const result = await exe(req.params.id);
  res.send(result);
  res.end();
}));

router.get('/', handlerWrapper(async (req, res, next) => {
  Joi.assert(req.query, Joi.object().keys({
    planter_id: Joi.number().integer().min(0),
    organization_id: Joi.number().integer().min(0),
    limit: Joi.number().integer().min(1).max(1000),
    offset: Joi.number().integer().min(0),
  }));
  let {limit, offset, planter_id, organization_id} = req.query;
  limit = limit || 20;
  offset = offset || 0;
  const repo = new TreeRepository(new Session());
  const filter = {};
  if(planter_id) {
    filter['planter_id'] = planter_id;
  }else if(organization_id){
    filter['organization_id'] = organization_id;
  }
  const result = await TreeModel.getByFilter(repo)(
    filter,
    {
      limit,
      offset,
    }
  );
  res.send({
    total: null,
    offset,
    limit,
    trees: result,
  });
  res.end();
}));


export default router;