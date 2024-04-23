import { Test, TestingModule } from '@nestjs/testing';
import { TaskEventsController } from './task-events.controller';
import { TaskEventsService } from './task-events.service';

describe('TaskEventsController', () => {
  let controller: TaskEventsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TaskEventsController],
      providers: [TaskEventsService],
    }).compile();

    controller = module.get<TaskEventsController>(TaskEventsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
