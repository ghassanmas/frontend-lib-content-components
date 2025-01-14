import React from 'react';
import { shallow } from 'enzyme';
import { selectors } from '../../data/redux';
import SourceCodeModal from '../SourceCodeModal';
import ImageUploadModal from '../ImageUploadModal';
import { imgModalToggle, sourceCodeModalToggle } from './hooks';
import { TinyMceWidget, mapStateToProps } from '.';

// Per https://github.com/tinymce/tinymce-react/issues/91 React unit testing in JSDOM is not supported by tinymce.
// Consequently, mock the Editor out.
jest.mock('@tinymce/tinymce-react', () => {
  const originalModule = jest.requireActual('@tinymce/tinymce-react');
  return {
    __esModule: true,
    ...originalModule,
    Editor: () => 'TiNYmCE EDitOR',
  };
});

jest.mock('../ImageUploadModal', () => 'ImageUploadModal');
jest.mock('../SourceCodeModal', () => 'SourceCodeModal');

jest.mock('../../data/redux', () => ({
  selectors: {
    app: {
      lmsEndpointUrl: jest.fn(state => ({ lmsEndpointUrl: state })),
      studioEndpointUrl: jest.fn(state => ({ studioEndpointUrl: state })),
      isLibrary: jest.fn(state => ({ isLibrary: state })),
      assets: jest.fn(state => ({ assets: state })),
    },
  },
}));

jest.mock('./hooks', () => ({
  editorConfig: jest.fn(args => ({ editorConfig: args })),
  imgModalToggle: jest.fn(() => ({
    isImgOpen: true,
    openImgModal: jest.fn().mockName('openModal'),
    closeImgModal: jest.fn().mockName('closeModal'),
  })),
  sourceCodeModalToggle: jest.fn(() => ({
    isSourceCodeOpen: true,
    openSourceCodeModal: jest.fn().mockName('openModal'),
    closeSourceCodeModal: jest.fn().mockName('closeModal'),
  })),
  selectedImage: jest.fn(() => ({
    selection: 'hooks.selectedImage.selection',
    setSelection: jest.fn().mockName('hooks.selectedImage.setSelection'),
    clearSelection: jest.fn().mockName('hooks.selectedImage.clearSelection'),
  })),
  filterAssets: jest.fn(() => [{ staTICUrl: '/assets/sOmEaSsET' }]),
}));

describe('TinyMceWidget', () => {
  const props = {
    editorType: 'text',
    editorRef: { current: { value: 'something' } },
    isLibrary: false,
    assets: { sOmEaSsET: { staTICUrl: '/assets/sOmEaSsET' } },
    lmsEndpointUrl: 'sOmEvaLue.cOm',
    studioEndpointUrl: 'sOmEoThERvaLue.cOm',
    disabled: false,
    id: 'sOMeiD',
  };
  describe('snapshots', () => {
    imgModalToggle.mockReturnValue({
      isImgOpen: false,
      openImgModal: jest.fn().mockName('modal.openModal'),
      closeImgModal: jest.fn().mockName('modal.closeModal'),
    });
    sourceCodeModalToggle.mockReturnValue({
      isSourceCodeOpen: false,
      openSourceCodeModal: jest.fn().mockName('modal.openModal'),
      closeSourceCodeModal: jest.fn().mockName('modal.closeModal'),
    });
    test('renders as expected with default behavior', () => {
      expect(shallow(<TinyMceWidget {...props} />)).toMatchSnapshot();
    });
    test('SourcecodeModal is not rendered', () => {
      const wrapper = shallow(<TinyMceWidget {...props} editorType="problem" />);
      expect(wrapper).toMatchSnapshot();
      expect(wrapper.find(SourceCodeModal).length).toBe(0);
    });
    test('ImageUploadModal is not rendered', () => {
      const wrapper = shallow(<TinyMceWidget {...props} isLibrary />);
      expect(wrapper).toMatchSnapshot();
      expect(wrapper.find(ImageUploadModal).length).toBe(0);
    });
  });
  describe('mapStateToProps', () => {
    const testState = { A: 'pple', B: 'anana', C: 'ucumber' };
    test('lmsEndpointUrl from app.lmsEndpointUrl', () => {
      expect(
        mapStateToProps(testState).lmsEndpointUrl,
      ).toEqual(selectors.app.lmsEndpointUrl(testState));
    });
    test('studioEndpointUrl from app.studioEndpointUrl', () => {
      expect(
        mapStateToProps(testState).studioEndpointUrl,
      ).toEqual(selectors.app.studioEndpointUrl(testState));
    });
    test('assets from app.assets', () => {
      expect(
        mapStateToProps(testState).assets,
      ).toEqual(selectors.app.assets(testState));
    });
    test('isLibrary from app.isLibrary', () => {
      expect(
        mapStateToProps(testState).isLibrary,
      ).toEqual(selectors.app.isLibrary(testState));
    });
  });
});
