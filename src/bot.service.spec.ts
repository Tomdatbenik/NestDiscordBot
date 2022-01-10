import { BotService } from "./bot.service";

describe('botservice test', () => {
  let service: BotService;

  beforeEach(() => {
    service = new BotService();
  });

  describe('findAll', () => {
    it('should return an array of cats', async () => {
      const result = 'Hello World! you send: test';
      jest.spyOn(service, 'getHello').mockImplementation(async () => result);

      expect(await service.getHello('test')).toBe(result);
    });
  });
});
