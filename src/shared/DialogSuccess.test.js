import React from 'react';
import { shallow, mount } from 'enzyme';
import DialogSuccess from './DialogSuccess';

describe('<DialogSuccess />', () => {
    it('shallow renders without crashing', () => {
        expect(shallow(<DialogSuccess open={true} />))
    })
})