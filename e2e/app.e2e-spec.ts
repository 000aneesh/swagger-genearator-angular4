import { VehiclesPage } from './app.po';

describe('vehicles App', () => {
  let page: VehiclesPage;

  beforeEach(() => {
    page = new VehiclesPage();
  });

  it('should display welcome message', done => {
    page.navigateTo();
    page.getParagraphText()
      .then(msg => expect(msg).toEqual('Welcome to app!!'))
      .then(done, done.fail);
  });
});
