import React from 'react';
import { shallow } from 'enzyme';
import { App } from './App';

const baseProps = {
  onInit: () => {},
  loading: false,
  loadingText: '',
  isInitialized: false,
  theme: {}
};

it('renders without crashing', () => {
  shallow(<App {...baseProps} />);
});

it('call onInit when the component was rendered', () => {
  const props = {
      ...baseProps,
      onInit: jest.fn()
  };

  shallow(<App {...props} />);

  expect(props.onInit).toBeCalled();
});

it('main content should be hidden when the isInitialized field is false', () => {
  const props = {
    ...baseProps,
    isInitialized: false
  };

  const enzymeWrapper = shallow(<App {...props} />);

  expect(enzymeWrapper.children().length).toEqual(0);
});

it('main content should be visible when the isInitialized field is true', () => {
  const props = {
    ...baseProps,
    isInitialized: true
  };

  const enzymeWrapper = shallow(<App {...props} />);

  expect(enzymeWrapper.children().length).toEqual(1);
});
