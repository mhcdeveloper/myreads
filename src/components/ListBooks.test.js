import React from 'react';
import { shallow, mount } from 'enzyme';
import ListBooks from './ListBooks';

const books = [
    {
        title: 'teste',
        authors: 'teste',
        shelf: 'teste',
        imageLinks: [
            {
                smallThumbnail: 'teste'
            }
        ]
    }
]
const updateShelf = () => {
    
}

describe('<ListBooks />', () => {
    it('shallow renders correctly', () => {
        expect(shallow(<ListBooks books={books} updateShelf={updateShelf} />))
    })
})