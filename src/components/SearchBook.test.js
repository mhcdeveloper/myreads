import React from 'react';
import { shallow, mount } from 'enzyme';
import SearchBook from './SearchBook';

describe('<SearchBook />', () => {
    it('shallow renders without crashing', () => {
        expect(shallow(<SearchBook />))
    })
})