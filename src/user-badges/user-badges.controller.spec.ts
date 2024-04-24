import { Test, TestingModule } from '@nestjs/testing';
import { UserBadgesController } from './user-badges.controller';
import { UserBadgesService } from './user-badges.service';

describe('UserBadgesController', () => {
  let controller: UserBadgesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserBadgesController],
      providers: [UserBadgesService],
    }).compile();

    controller = module.get<UserBadgesController>(UserBadgesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
