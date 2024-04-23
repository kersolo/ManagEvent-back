import { Test, TestingModule } from '@nestjs/testing';
import { UserTaskEventsService } from './user-task-events.service';

describe('UserTaskEventsService', () => {
  let service: UserTaskEventsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserTaskEventsService],
    }).compile();

    service = module.get<UserTaskEventsService>(UserTaskEventsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
