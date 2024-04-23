import { Test, TestingModule } from '@nestjs/testing';
import { TaskEventsService } from './task-events.service';

describe('TaskEventsService', () => {
  let service: TaskEventsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TaskEventsService],
    }).compile();

    service = module.get<TaskEventsService>(TaskEventsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
