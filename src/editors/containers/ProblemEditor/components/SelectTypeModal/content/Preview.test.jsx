import React from 'react';
import { shallow } from 'enzyme';

import { formatMessage } from '../../../../../../testUtils';
import { selectors } from '../../../../../data/redux';
import * as module from './Preview';

jest.mock('../../../../../data/redux', () => ({
  selectors: {
    problem: {
      problemType: jest.fn(state => ({ isLibrary: state })),
    },
  },
}));

describe('Preview', () => {
  const props = {
    intl: { formatMessage },
    problemType: '',
  };
  describe('snapshots', () => {
    test('snapshots: renders as expected with default props', () => {
      expect(
        shallow(<module.Preview {...props} />),
      ).toMatchSnapshot();
    });
    test('snapshots: renders as expected with problemType is stringresponse', () => {
      expect(
        shallow(<module.Preview {...props} problemType="stringresponse" />),
      ).toMatchSnapshot();
    });
    test('snapshots: renders as expected with problemType is numericalresponse', () => {
      expect(
        shallow(<module.Preview {...props} problemType="numericalresponse" />),
      ).toMatchSnapshot();
    });
    test('snapshots: renders as expected with problemType is optionresponse', () => {
      expect(
        shallow(<module.Preview {...props} problemType="optionresponse" />),
      ).toMatchSnapshot();
    });
    test('snapshots: renders as expected with problemType is choiceresponse', () => {
      expect(
        shallow(<module.Preview {...props} problemType="choiceresponse" />),
      ).toMatchSnapshot();
    });
    test('snapshots: renders as expected with problemType is multiplechoiceresponse', () => {
      expect(
        shallow(<module.Preview {...props} problemType="multipechoiceresponse" />),
      ).toMatchSnapshot();
    });
  });
  describe('mapStateToProps', () => {
    const testState = { A: 'pple', B: 'anana', C: 'ucumber' };
    test('problemType from problem.problemType', () => {
      expect(
        module.mapStateToProps(testState).problemType,
      ).toEqual(selectors.problem.problemType(testState));
    });
  });
  describe('mapDispatchToProps', () => {
    test('mapDispatchToProps to equal an empty object', () => {
      expect(module.mapDispatchToProps).toEqual({});
    });
  });
});
