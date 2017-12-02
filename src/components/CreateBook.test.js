import React from 'react';
import { shallow, mount } from 'enzyme';
import CreateBook from './CreateBook';

describe('<CreateBook />', () => {
    it('shallow renders without crashing', () => {
        expect(shallow(<CreateBook />))
    })
})