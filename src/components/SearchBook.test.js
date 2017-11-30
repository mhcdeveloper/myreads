import React from 'react';
import { shallow, mount } from 'enzyme';
import SearchBook from './SearchBook';

describe('<SearchBook />', () => {
    it('shallow renders without crashing', () => {
        expect(shallow(<SearchBook />))
    })

    it('22', () => {
        const updateQuery = jest.fn()

        const wrapper = mount(<SearchBook updateQuery={updateQuery} />)
        wrapper.find('input[type="text"]')
        .simulate('change')
        expect(updateQuery).toHaveBeenCalledTimes(1)
    })
})