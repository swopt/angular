import { FisPage } from './app.po';

describe('fis App', function() {
  let page: FisPage;

  beforeEach(() => {
    page = new FisPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
