import React from 'react';
import App from './App';
import { shallow } from 'enzyme';
import { retrieveAllMovies } from '../../fetchCalls';

jest.mock('../../fetchCalls.js')

describe('App', () => {
  beforeEach(() => {
    retrieveAllMovies.mockImplementation(() => {
      return Promise.resolve([{}, {}, {}])
    });
  });

  it('should match the snapshot', () => {
    let wrapper = shallow(<App />);
    expect(wrapper).toMatchSnapshot()
  });

  it('should invoke retrieveAllMovies after componentDidMount triggers', () => {
    shallow(<App />);
    expect(retrieveAllMovies).toHaveBeenCalled();
    //Imports are solid, syntax is fine, why won't this invoke in the test (0 invokes)?
    //Shallow should trigger componentDidMount which invokes retrieveAllMovies
    //I've tried declaring const retrieveAllMovies = jest.fn.mockimpl() as an alternative with no dice
    //File pathway isn't the problem
    //I've tried writing the jest.mock(url with and without the .js suffix)
    //Jest dependency IS installed; the snapshot test works
    //I've tried breaking the test into a nested described('componentDidMount' ...), but that didn't work
    //I tried to first manually invoke componentDidMount (wrapper.instance().componentDidMount();)
    //Could it have something to do with our class syntax in App.js (App extends React.Component instead of Component)?
  });
});
