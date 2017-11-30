import React from 'react';
import { shallow, mount } from 'enzyme';
import Book from './Book';

const books = {
    title: 'teste',
    authors: ['teste'],
    shelf: 'teste',
    imageLinks: [
        {
            smallThumbnail: 'teste'
        }
    ]
}

describe('<Book />', () => {
    it('shallow renders correctly', () => {
        expect(shallow(<Book book={books} />))
    })

})