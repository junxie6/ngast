import { WorkspaceSymbols } from '../../lib/ngtsc/workspace.symbols';
import { join } from 'path';

function getFolder(name: string) {
  return join(__dirname, '/../../../test/fixture', name);
}

fdescribe('WorkspaceSymbols', () => {
  describe('basic project', () => {
    let workspace: WorkspaceSymbols;
    const folder = getFolder('basic');

    beforeEach(() => workspace = new WorkspaceSymbols(`${folder}/tsconfig.json`));

    it('Should get the component', () => {
      const [component] = workspace.getAllComponents();
      expect(component.name).toBe('MainComponent');
      expect(component.isSymbol('Component')).toBeTrue();
      expect(component.metadata.selector).toBe('main-component');
    });
  });

  describe('basic primitive token', () => {
    let workspace: WorkspaceSymbols;
    const folder = getFolder('basic-primitive-token');

    beforeEach(() => workspace = new WorkspaceSymbols(`${folder}/tsconfig.json`));

    it('Should get dependancies', () => {
      const [component] = workspace.getAllComponents();
      const [basic] = component.getDependancies();
      expect(basic.name).toBe('BasicProvider');
    });
  });

  describe('ngtsc-deps', () => {
    let workspace: WorkspaceSymbols;
    const folder = getFolder('ngtsc-deps');

    beforeEach(() => workspace = new WorkspaceSymbols(`${folder}/tsconfig.json`));

    it('Should get dependancies', () => {
      const [component] = workspace.getAllComponents();
      const [basic, primitive] = component.getDependancies();
      expect(basic.name).toBe('BasicProvider');
      expect(primitive.name).toBe('primitive');
    });
  });
});
