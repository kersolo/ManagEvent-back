import { Test, TestingModule } from '@nestjs/testing';
import { UserTaskEventsController } from './user-task-events.controller';
import { UserTaskEventsService } from './user-task-events.service';

describe('UserTaskEventsController', () => {
  let controller: UserTaskEventsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserTaskEventsController],
      providers: [UserTaskEventsService],
    }).compile();

    controller = module.get<UserTaskEventsController>(UserTaskEventsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
